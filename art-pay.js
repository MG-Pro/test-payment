document.addEventListener("DOMContentLoaded", function () {

  window.artPay = function (param) {
    createIframe({
      prodName: param.prodName,
      count: param.count,
      price: param.price,
      currency: param.currency
    });

  };

  window.addEventListener('message', function (e) {
    console.log(e);
    if(e.origin !== 'https://192.168.10.12:8919') {
      return;
    }
    if(e.data === 'close') {
      closeModal(e);
    }
  });

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
    iframe.src = 'https://192.168.10.12:8920/#!/sbkazpaymentwiz'; // + orderStr

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('data-offset', scrollTop);

    document.body.insertBefore(iframe, document.body.firstChild);
    return iframe;
  }

  function closeModal() {
    document.body.removeChild(document.querySelector('iframe'));
  }


});


