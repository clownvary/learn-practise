import React from "react";
import classNames from "classnames";

export default class FlexLayout extends React.Component {

  static defaultProps = {
    classes: "flexlayout"
  }

  render() {
    const {
        className,
        classes,
        children,
        ...rest
      } = this.props;
    return (
      <div
        {...rest}
        className={classNames(classes, className)}>
        {
          React.Children.map(children, (child) => React.cloneElement(child, {

          }))
        }
      </div>
    )
  }

}

export class FlexLayoutCell extends React.Component {

  static defaultProps = {
    classes: "flexlayout-cell"
  }

  render() {
    const {
        className,
        classes,
        children,
        ...rest
      } = this.props;
    return (
      <div
        {...rest}
        className={classNames(classes, className)}>
        {children}
      </div>
    )
  }

}

// export FL = {
//
// }
