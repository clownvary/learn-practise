import React, {Component} from "react";

export default class Img extends Component {

  render() {
    const {src} = this.props;
    const isFullPath = src.slice(0, 4).toLocaleLowerCase() === "http";
    //Temporarily not need rootPath logic.
    // const rootPath = window.__siteBaseName ? window.__siteBaseName + "/" : "/";
    const rootPath = isFullPath ? "" : "/";
    return (
      <img {...this.props} src={rootPath + this.props.src}/>
    )
  }

};
