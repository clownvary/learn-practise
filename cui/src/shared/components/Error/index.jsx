import React from 'react';
import { connect } from 'react-redux';
import Button from 'react-aaui/lib/Button';
import Modal from 'react-aaui/lib/Modal';
import * as da from 'shared/utils/data-access';
import { clearError } from 'shared/actions/error';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import UIComponent from 'shared/components/UIComponent';

import './index.less';

export class Error extends UIComponent {
  constructor(props, context) {
    super(props, context);
    this.bind('onClick', 'gotoLogin', 'reload');
  }

  displayError() {
    const { error } = this.props;
    const errorList = da.get(error, 'list');
    return !!errorList.size;
  }

  sessionTimeoutError() {
    const { error } = this.props;
    const errorList = da.get(error, 'list');
    return !!errorList.find((item)=> {
      return item && item.code === '0002';
    });
  }

  render() {
    const {title='Error', reload=false } = this.props;
    const display = this.displayError();

    return (
      <Modal shown={display} title={title} className='error-bar' onClose={this.onClick}>
        <div className='error-bar-body aaui-clearfix'>
          {this.renderErrorAlert()}
          <Button type='strong' className='error-bar-button' onClick={this.onClick}>
            {reload ? 'Reload Page' : 'OK'}
          </Button>
        </div>
      </Modal>
    );
  }

  renderErrorAlert() {
    let {label, error, className, style} = this.props;
    let errorList = da.get(error, 'list');
    let sessionTimeoutError = errorList.find((item)=> {
      return item && item.code === '0002';
    });
    label = label || 'Reload page';

    return (
      <div className='error-content'>
        <ul>
          {errorList.map((item, k) => {
            return <li key={k}><FormattedDyncMessage value={item.message}/></li>
          })}
        </ul>
      </div>
    );
  }

  reload() {

  }

  gotoLogin() {
    if (!__STATIC__) {
      /**
       * TODO: need to implement forward to login page after finish ANE-51830
       * and ANE-51828.
       */
    } else {
      this.reload();
    }
  }

  onClick() {
    const { reload, clearError } = this.props;
    clearError();

    if (this.sessionTimeoutError()) {
      return this.gotoLogin();
    }

    if (reload) {
      return this.reload();
    }
  }
}

export default connect(
  null,
  {
    clearError
  }
)(Error)
