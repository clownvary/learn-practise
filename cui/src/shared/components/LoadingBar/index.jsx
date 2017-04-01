'use strict';
import UIComponent from 'shared/components/UIComponent';
import './index.less';

export default class LoadingBar extends UIComponent {

  render() {
    let loading = this.props.loading;
    loading = loading && typeof loading === 'object' && loading.toJS() || null;
    let {display=false, text = ''} = loading;
    let {style, className} = this.props;
    className = className || "";
    className += !display ? " loading-bar-hidden" : "";

    return (
      <div className={`loading-bar ${className}`} style={style}>
        <div className="loading-bar-mask"/>
        <div className="loading-bar-outer-box">
          <div className="loading-bar-icon">
            <i className="icon icon-loading-m icon-spin"></i>
            <div className="loading-bar-text">{text}</div>
          </div>
        </div>
      </div>
    )
  }
}
