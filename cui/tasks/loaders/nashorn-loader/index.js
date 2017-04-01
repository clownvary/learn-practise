/**
 * Created for server render.
 */

module.exports = function (content, sourceMap) {

  this.cacheable && this.cacheable();

  var isServerRender = this.options &&
        this.options.plugins[0] &&
        this.options.plugins[0].definitions &&
        this.options.plugins[0].definitions.___SERVERRENDER___
        ? true : false;

  if(isServerRender) {
    console.log("Call nashorn-loader...");
  }
  var emptyCompText = [
    "var React = require('react');",
    "module.exports = React.createClass({",
      "render: function () {",
        "return null",
      "}",
    "})"
  ].join("\n\n");
  return isServerRender ? emptyCompText : content;
};
