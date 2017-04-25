import React from 'react';
import Modal from 'react-aaui/lib/Modal';
import Button from 'react-aaui/lib/Button';
import { decodeHtmlStr } from 'react-base-ui/lib/utils';
import buttonsMessages from 'shared/translation/messages/button';
import { injectIntl } from 'react-intl';
import { FormattedMessage } from 'shared/translation/formatted';
import selfMessages, { PREFIX } from './translations';

export class CheckScrollModal extends React.PureComponent {

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
        <div className="modal-footer">
          <Button type="strong" onClick={() => onClose()}>
            <FormattedMessage {...buttonsMessages.ok} />
          </Button>
        </div>
      </Modal>
    );
  }
}
export default injectIntl(CheckScrollModal);
