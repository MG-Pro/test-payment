document.addEventListener("DOMContentLoaded", function () {

  window.artPay = function (param, successCb, errorCb) {
    if(!param) {
      console.log('Функция artPay вызвана без обязательных параметров');
      return;
    }
    createIframe({
      terminalKey: param.terminalKey,
      orderId: param.orderId,
      amount: param.amount,
      descr: param.descr,
      currency: param.currency,
      clientOrigin: location.origin
    });
    window.successCb = successCb || null;
    window.errorCb = errorCb || null;

  };

  window.addEventListener('message', function (e) {
    if (e.origin !== 'https://192.168.2.37:8920') {
      return;
    }
    if (e.data === 'close') {
      closeModal(e);
    }
    if (e.data === 'success' && window.successCb) {
      successCb(e);
    }
    if (e.data === 'error' && window.errorCb) {
      errorCb(e);
    }
  });

  function createIframe(order) {
    var iframe = document.createElement('iframe'),
        iframeStyle = iframe.style,
        scrollLeft = window.pageXOffset,
        scrollTop = window.pageYOffset + 'px',
        scrollHeight = document.body.scrollHeight,
        orderStr = '?';

    for (var item in order) {
      orderStr += item + '=' + order[item] + '&';
    }
    orderStr = encodeURI(orderStr);

    iframeStyle.position = 'absolute';
    iframeStyle.width = '100%';
    iframeStyle.height = scrollHeight + 'px';
    iframeStyle.display = 'block';
    iframeStyle.border = '0px';
    iframeStyle.top = '0px';
    iframeStyle.left = scrollLeft + 'px';
    iframeStyle.overflowX = 'hidden';
    iframeStyle.overflowY = 'scroll';
    iframeStyle.zIndex = '10000';
    iframe.src = 'https://192.168.2.37:8920/#!/sbkazpaymentwiz' + orderStr;

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('data-offset', scrollTop);

    document.body.insertBefore(iframe, document.body.firstChild);
    return iframe;
  }

  function closeModal() {
    document.body.removeChild(document.querySelector('iframe'));
  }
});
