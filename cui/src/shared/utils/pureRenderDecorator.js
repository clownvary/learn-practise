import shallowCompare from "react-addons-shallow-compare";

/**
 * [react-addons-shallow-compare] is a helper function to
 * achieve the same functionality as PureRenderMixin.
 * Link: https://facebook.github.io/react/docs/shallow-compare.html
 */
function shouldComponentUpdate(nextProps, nextState) {
  return shallowCompare(this, nextProps, nextState);
}

export default function pureRenderDecorator(component) {
  component.prototype.shouldComponentUpdate = shouldComponentUpdate;
}
