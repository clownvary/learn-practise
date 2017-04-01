export default function throttle(method, delay, duration) {
  let timer = null,
    begin = new Date();

  return function () {
    let context = this,
      args = arguments,
      current = new Date(),
      delay = delay || 100;

    clearTimeout(timer);

    if (duration && (current - begin >= duration)) {
      method.apply(context, args);
      begin = current;
    } else {
      timer = setTimeout(function () {
        method.apply(context, args);
      }, delay);
    }
  }
}
