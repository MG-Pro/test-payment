document.addEventListener("DOMContentLoaded", function () {

  window.artPay = function (param) {
    createIframe({
      prodName: param.prodName,
      count: param.count,
      price: param.price,
      currency: param.currency
    });

  };

  function createCloseElem() {
    var closeEl = document.createElement('div');
    closeEl.textContent = 'CLOSE';

    closeEl.style.position = 'fixed';
    closeEl.style.top = '20px';
    closeEl.style.right = '100px';
    closeEl.style.color = '#fff';
    closeEl.style.fontSize = '28px';
    closeEl.style.cursor = 'pointer';
    closeEl.style.fontWeight = '700';
    closeEl.style.zIndex = '10000000';
    document.body.insertBefore(closeEl, document.body.firstChild);
    closeEl.addEventListener('click', closeModal);

  }

  function createIframe(order) {
    var iframe       = document.createElement('iframe'),
        iframeStyle  = iframe.style,
        orderStr     = JSON.stringify(order),
        scrollLeft   = window.pageXOffset,
        scrollTop    = window.pageYOffset + 'px',
        scrollHeight = document.body.scrollHeight;

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
    iframe.src = 'http://192.168.10.12:8920/#!/sbkazpaymentwiz'; // + orderStr

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('data-offset', scrollTop);

    document.body.insertBefore(iframe, document.body.firstChild);
    iframe.addEventListener('load', function () {
      createCloseElem();
    });
    return iframe;
  }

  function closeModal(e) {
    var iframe = document.querySelector('iframe');
    document.body.removeChild(iframe);
    document.body.removeChild(e.currentTarget);
  }


});


