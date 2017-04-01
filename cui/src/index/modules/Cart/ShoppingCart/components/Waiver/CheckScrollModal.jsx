import React from 'react';
import UIComponent from 'shared/components/UIComponent';
import Modal from 'react-aaui/lib/Modal';
import { decodeHtmlStr } from 'shared/utils/func';

import { injectIntl } from 'react-intl';
import { FormattedMessage } from 'shared/translation/formatted';
import selfMessages, { PREFIX } from './translations';

export class CheckScrollModal extends UIComponent {

  componentWillUpdate(props) {
    if (props.shown) {
      this.handleScroll();
    } else {
      this.container.scrollTop = 0;
    }
  }

  handleScroll() {
    if (this.container &&
        this.container.getBoundingClientRect().bottom > this.flag.getBoundingClientRect().bottom) {
      this.props.onScrollToBottom();
    }
  }

  render() {
    const { waiverText, shown, onClose, intl: { messages } } = this.props;
    return (
      <Modal title={messages[`${PREFIX}.title`]} shown={shown} onClose={() => onClose()}>
        <div className="modal-body" onScroll={() => this.handleScroll()}>
          <h3><FormattedMessage {...selfMessages.default_name} /></h3>
          <div ref={(c) => { this.container = c; }} className="checkScrollModal-container">
            <div dangerouslySetInnerHTML={{ __html: decodeHtmlStr(waiverText) }} />
            <br ref={(c) => { this.flag = c; }} />
          </div>
        </div>
        <div className="modal-footer hidden-button" />
      </Modal>
    );
  }
}
export default injectIntl(CheckScrollModal);
