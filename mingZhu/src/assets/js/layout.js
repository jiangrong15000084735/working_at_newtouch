(function (designWidth, maxWidth) {
  var doc = document
  var win = window
  var docEl = doc.documentElement
  var remStyle = document.createElement('style')
  var tid

  function refreshRem () {
    var width = docEl.getBoundingClientRect().width
    maxWidth = maxWidth || 540
    width > maxWidth && (width = maxWidth)
    // var rem = width * 100 / designWidth
    var rem = width * 16 / designWidth
    remStyle.innerHTML = 'html{font-size:' + rem + 'px;}'
    // console.log('rem', rem)
  }
  if (docEl.firstElementChild) {
    docEl.firstElementChild.appendChild(remStyle)
  } else {
    var wrap = doc.createElement('div')
    wrap.appendChild(remStyle)
    doc.write(wrap.innerHTML)
    wrap = null
  }
  refreshRem()
  win.addEventListener('resize', function () {
    // console.log('resize');
    clearTimeout(tid)
    tid = setTimeout(refreshRem, 50)
  }, false)
  win.addEventListener('pageshow', function (e) {
    // console.log('pageshow');
    if (e.persisted) {
      clearTimeout(tid)
      tid = setTimeout(refreshRem, 50)
    }
  }, false)
  if (doc.readyState === 'complete') {
    doc.body.style.fontSize = '16px'
    // console.log('complete');
  } else {
    doc.addEventListener('DOMContentLoaded', function (e) {
      doc.body.style.fontSize = '16px'
      // console.log('DOMContentLoaded');
    }, false)
  }
})(window.screen.width, window.screen.width)
