import React from "react";
import {Link} from "react-router";
import classNames from "classnames";
import "./index.less";

export default class Breadcrumb extends React.Component {

  static defaultProps = {
    classes: "breadcrumb",
    separator: ">"
  }

  render() {
    const paths = [];
    const {
        routes=[],
        params,
        className,
        classes,
        separator,
        children,
        ...rest
      } = this.props;
    const {breadcrumbOptions} = routes[routes.length - 1] || {};
    const {hideIndex} = breadcrumbOptions || {};
    const validRoutes = routes.filter((route) => !!route.path);
    return (
      <ul
        {...rest}
        className={classNames(classes, className)}>
        {/*
          if provide routes property,
          render BreadcrumbItem by current router data.
        */}
        {


          validRoutes.map((route, i) => {
            if(hideIndex && hideIndex.indexOf(i) !== -1) {
              return undefined;
            }
            let {path = ""} = route;
            path = path.replace(/^\//, '');
            Object.keys(params).forEach((p) => {
              path = path.replace(`:${p}`, params[p]);
            });
            if(path) {
              paths.push(path);
            }
            const {name, href=""} = route.breadcrumbOptions || {};
            let link = "";
            if(!href && i + 1 < validRoutes.length) {
              link = `/${paths.join('/')}`;
            }
            if(i + 1 === validRoutes.length) {
              link = "";
            }
            return name ?
              <BreadcrumbItem separator={separator} key={i} href={href} link={link}>
                {name}
              </BreadcrumbItem> :
              undefined;
          })
        }
        {/*
          if provide child tag BreadcrumbItem,
          render it and bind separator property on it.
        */}
        {
          React.Children.map(children, (child) => React.cloneElement(child, {
            separator
          }))
        }
      </ul>
    )
  }

}

export class BreadcrumbItem extends React.Component {

  static defaultProps = {
    classes: "breadcrumb-item"
  }

  render() {
    const {href, link, separator, classes, className, children} = this.props;
    return (
      <li className={classNames(classes, className)}>
        {
          href ?
          <a href={href}>{children}</a> :
          (link ? <Link to={link}>{children}</Link> : <span>{children}</span>)
        }
        <span className="breadcrumb-separator">{separator}</span>
      </li>
    )
  }

}
