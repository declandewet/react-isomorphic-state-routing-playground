
/* common constants */

/* decorators */

global.title = function title(titleFn) {
  return function decorate(target) {
    target.title = titleFn
  }
}
