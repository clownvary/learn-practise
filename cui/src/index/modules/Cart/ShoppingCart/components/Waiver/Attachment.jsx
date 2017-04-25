import React from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { FormattedMessage, FormattedDyncMessage } from 'shared/translation/formatted';
import orderSummaryMessages from 'shared/translation/messages/Cart/orderSummary';
import { decodeHtmlStr } from 'react-base-ui/lib/utils';
import classNames from 'classnames';
import Input from 'react-aaui/lib/Input';
import Checkbox from 'react-aaui/lib/Checkbox';
import { confirm } from 'react-base-ui/lib/confirmation';
import { changeAgreementEntryAction } from '../../actions/waiver';


import selfMessages, { PREFIX } from './translations';


export class Attachment extends React.PureComponent {

  isInvalidEntry() {
    const {
      itemData: { id },
      waiversAgreements, checkout
    } = this.props;
    const { needValidate } = checkout.toJS();
    const agreement = waiversAgreements[id];
    return needValidate && agreement && agreement.error;
  }
  capitalize = (str) => {
    if (str.length > 0) {
      return str.replace(/[a-zA-Z]/, x => x.toUpperCase());
    }
    return str;
  }

  render() {
    const {
      itemData: {
        stage,
        id,
        description,
        attachment_link: attachmentLink,
        require_initials_online: requireInitialsOnline,
        required_before_completing_transaction: requiredBeforeCompletingTransaction
      },
      intl: { messages }, waiversAgreements } = this.props;

    return (
      <div>
        <div className="attachment">
          <div
            className={classNames(
              'attachment-form-item',
              {
                'form-item-required': requiredBeforeCompletingTransaction
              }
            )}
          >
            { requireInitialsOnline ?
              <Input
                errored={this.isInvalidEntry()} type="text" maxLength="4" size="m" onBlur={(e) => {
                  this.props.changeAgreementEntryAction({
                    id,
                    value: e.target.value
                  });
                }} value={waiversAgreements[id].value} placeholder="Initials"
              /> :
              <Checkbox
                onChange={(e) => {
                  this.props.changeAgreementEntryAction({
                    id,
                    value: e.target.checked
                  });
                }} checked={waiversAgreements[id].value} size="m" defaultChecked={false} value="agree"
              /> }
          </div>
          <div className="attachment-content">
            <b>
              <FormattedMessage {...selfMessages.have_reade_text} />{ ' ' }
              { stage.item_type === 0 ?
                <FormattedDyncMessage value={description} /> :
                <a
                  href="#hash" onClick={(e) => {
                    confirm(
                      (
                        <div className="waiver-attachment-alert-message">
                          <h3>
                            <FormattedDyncMessage value={this.capitalize(stage.description)} />
                          </h3>
                          <div className="atch-msg-content" dangerouslySetInnerHTML={{ __html: decodeHtmlStr(stage.item_text) }} />
                        </div>
                      ),
                      {
                        title: messages[`${PREFIX}.title`]
                      }
                    );
                    e.preventDefault();
                  }}
                >
                  <FormattedDyncMessage value={description} />
                </a> }
              { stage.uploaded_file_href_text ?
                <span>
                  <b>{ ' ( ' }</b>
                  <a href={attachmentLink} target="_blank" rel="noopener noreferrer">
                    <i className="icon icon-file-o" />
                    { ' ' }
                    <FormattedDyncMessage value={stage.uploaded_file_href_text} />
                    { ' ' }
                  </a>
                  <i className="icon icon-ex-link-m" />
                  <b>{ ' )' }</b>
                </span> : null }{ '.' }
            </b>
          </div>
        </div>
        {
          this.isInvalidEntry() ? <span style={{ color: 'red' }}><FormattedMessage {...orderSummaryMessages.required} /></span> : null
        }
      </div>
    );
  }

}

export default connect(
  null,
  {
    changeAgreementEntryAction
  }
)(injectIntl(Attachment));
