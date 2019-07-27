const isVisible = elem =>
  !!elem &&
  !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length); // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js

const EVENT = "mousedown";

export function onClickOutside(element, callback) {
  const outsideClickListener = event => {
    if (!element.contains(event.target) && isVisible(element)) {
      // or use: event.target.closest(selector) === null
      callback();
    }
  };

  document.addEventListener(EVENT, outsideClickListener);

  return () => {
    document.removeEventListener(EVENT, outsideClickListener);
  };
}
