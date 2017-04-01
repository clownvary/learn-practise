import React from 'react';
import classNames from 'classnames';
import UIComponent from 'shared/components/UIComponent';
import {encodeHtmlStr} from 'shared/utils/func';
import { FormattedHtmlMessage } from 'shared/translation/formatted';

import './index.less';

export default class PageFooter extends UIComponent {

  static defaultProps = {
    classes: 'page-footer'
  }

  render() {
    const {className, classes, children, specificContent, ...rest} = this.props;
    return (
      <div
        {...rest}
        className={classNames(classes, className)}>
        {children}
        {
          specificContent ?
            <div className='page-footer-specific'>
              <FormattedHtmlMessage value={specificContent} />
            </div> : null
        }
      </div>
    )
  }

}
