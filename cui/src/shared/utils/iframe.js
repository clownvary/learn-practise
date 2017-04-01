export let isInIframe = window.location != window.parent.location ? true : false;
export const layHeightExceptBody = 420;
export const minFrameWidth = 1000;
export const scrollbarHeight = 20;
export const minHeight = 560;

let iframeElement = isInIframe && window.frameElement;

export function getParentFrameHeight(iframe) {
  iframe = iframe || iframeElement;
  if (isInIframe) {
    return iframe.contentWindow.parent.innerHeight || 0;
  }

  return 0;
}

export function getParentFrameWidth(iframe) {
  iframe = iframe || iframeElement;
  if (isInIframe) {
    return iframe.contentWindow.parent.innerWidth || 0;
  }

  return 0;
}


export function setIFrameHeight(iframe, height) {
  if (!height) {
    height = iframe;
    iframe = null;
  }

  iframe = iframe || iframeElement;
  if (height && iframe) {
    setTimeout(function () {
      iframe.height = height;
    }, 500)
  }
}

export function setIFrameWidth(iframe, width) {
  if (!width) {
    width = iframe;
    iframe = null;
  }

  iframe = iframe || iframeElement;
  if (width && iframe) {
    setTimeout(function () {
      iframe.style.minWidth = width;
    }, 500)
  }
}


export function getOffsetTop(elem) {
  let box = elem.getBoundingClientRect();

  return box.top + window.pageYOffset - document.documentElement.clientTop;
}


export function getWindowSizeOfIframe() {

  return {
    height: window.parent.innerHeight,
    width: window.parent.innerWidth
  }
}