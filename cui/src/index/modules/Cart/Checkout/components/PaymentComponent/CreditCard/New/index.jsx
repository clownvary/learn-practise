import React from 'react';
import { fromJS } from 'immutable';
import classNames from 'classnames';
import Checkbox from 'react-aaui/lib/Checkbox';
import Button from 'react-aaui/lib/Button';
import Input from 'react-aaui/lib/Input';
import Dropdown from 'react-aaui/lib/Dropdown';
import Popover from 'react-aaui/lib/Popover';
import { payment as paymentHelper } from 'react-base-ui/lib/helper';

import 'shared/assets/images/img-card-tips.png';

import { injectIntl } from 'react-intl';
import { FormattedMessage } from 'shared/translation/formatted';
import selfMessages from '../translations';
import Validation, { getCardTypeItem, checkoutCardTypeId } from '../validation';

import creditCardConsts from '../../consts/creditCard';

import './index.less';

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
const allowedExpirationYears = Array(...{ length: 11 }).map((v, i) => {
  const val = i + currentYear;
  return { value: val, text: val };
});
const allowedExpirationMonths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                                    .map(v => ({ value: v, text: v }));

const getSecurityGuaranteeContent = () => (
  <div className="security-guarantee-content">
    <FormattedMessage
      {...selfMessages.form_guarantee_text} values={{
        active_company_name: <span><a target="activenetwork" href="http://www.activenetwork.com/"><FormattedMessage {...selfMessages.active_company_name} /></a><i className="icon icon-ex-link-m" /></span>,
        active_payment_guidelines: <span><a target="pcicomplianceguide" href="http://www.pcicomplianceguide.org/"><FormattedMessage {...selfMessages.active_payment_guidelines} /></a><i className="icon icon-ex-link-m" /></span>
      }}
    />
  </div>
);

export const validateNumber = (e) => {
  const value = e.target.value;
  const regedValue = value.replace(/[^\d]/g, '');
  if (regedValue !== value) {
    e.target.value = regedValue;
  }
};

const initialState = {
  errors: {
    ccNumber: null,
    ccNumberCardType: null,
    ccExpiry: null,
    ccCVVandCVC: null,
    savedCard: null
  },
  apiErrors: {},
  showForm: false,
  showGuarantee: false,
  ccNumber: '',
  ccExpiryYear: '',
  ccExpiryMonth: '',
  ccCVVandCVC: '',
  ccSaveForFurture: false,
  cardTypeId: ''
};

export class AddNewCreditCard extends React.PureComponent {

  static contextTypes = {
    configurations: React.PropTypes.object
  }

  static defaultProps = {
    currentYear,
    currentMonth,
    expirationYears: allowedExpirationYears,
    expirationMonths: allowedExpirationMonths,
    cardTypes: fromJS([])
  }

  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  componentDidMount() {
    this.validation = new Validation();
  }

  onCardNumberChange(e) {
    this.resetApiErrors();
    validateNumber(e);
    const value = e.target.value;
    const { validation: { cardValidation } } = paymentHelper;
    const cardTypeId = cardValidation(value);
    this.setState({ ccNumber: value, cardTypeId });
  }

  onCardNumberBlur(e) {
    const value = e.target.value;
    const { validation: { cardValidation } } = paymentHelper;
    const cardTypeId = cardValidation(value);
    this.setState({ ccNumber: value, cardTypeId }, () => this.validate('ccNumber'));
  }

  onExpirationMonthChange(value) {
    this.resetApiErrors();
    this.setState({ ccExpiryMonth: value }, () => this.validate('ccExpiryMonth'));
  }

  onExpirationYearChange(value) {
    this.resetApiErrors();
    this.setState({ ccExpiryYear: value }, () => this.validate('ccExpiryYear'));
  }

  onCVVandCVCChange(e) {
    this.resetApiErrors();
    validateNumber(e);
    const value = e.target.value;
    this.setState({ ccCVVandCVC: value });
  }

  onCVVandCVCBlur(e) {
    const value = e.target.value;
    this.setState({ ccCVVandCVC: value }, () => this.validate('ccCVVandCVC'));
  }

  onCheckSaveFutureUse(e) {
    this.resetApiErrors();
    this.setState({ ccSaveForFurture: e.target.checked });
  }

  getCardTypeIcon() {
    const { cardTypeId } = this.state;
    return <span className={`icon ${creditCardConsts.icons[`${cardTypeId}`]}`} />;
  }

  resetApiErrors() {
    this.setState({
      apiErrors: {}
    });
  }

  validate(triggerField) {
    const {
      ccNumber,
      ccExpiryYear,
      ccExpiryMonth,
      ccCVVandCVC
    } = this.state;

    this.validation.validate({
      ccNumber,
      ccCardTypeId: checkoutCardTypeId(ccNumber, this.props.data.get('cardTypes')),
      ccCardList: this.props.data.get('totalList'),
      ccExpiryMonth,
      ccExpiryYear,
      ccCVVandCVC
    }, triggerField);

    this.setState({
      errors: { ...this.validation.getErrors() }
    });
  }

  submitForm() {
    const { typeName, onPayItemAdded } = this.props;
    const {
      ccNumber, ccExpiryYear, ccExpiryMonth,
      ccCVVandCVC, ccSaveForFurture
    } = this.state;

    this.validate();

    if (!this.validation.hasError()) {
      onPayItemAdded(typeName, {
        ccNumber,
        ccExpiryYear,
        ccExpiryMonth,
        ccCVVandCVC,
        ccSaveForFurture,
        ccCardTypes: this.props.data.get('cardTypes'),
        ccCardTypeItem: getCardTypeItem(ccNumber, this.props.data.get('cardTypes'))
      }).then(({ errors }) => {
        if (errors) {
          this.setState({
            apiErrors: { ...this.state.apiErrors, ...errors }
          });
        } else {
          this.setState({
            ...initialState
          });
        }
      });
    }
  }

  render() {
    const showPriorCc = this.context.configurations.get('show_prior_cc');

    const {
      data, intl: { messages },
      expirationYears, expirationMonths
    } = this.props;

    const {
      errors, apiErrors, ccNumber,
      ccExpiryYear, ccExpiryMonth,
      ccCVVandCVC, ccSaveForFurture
    } = this.state;

    const {
      ERROR_AMS_MISSING_CCNUMBER,
      ERROR_AMS_INVALID_CCNUMBER,
      ERROR_AMS_MISSING_CCTYPE,
      ERROR_AMS_MISSING_EXPMONTH,
      ERROR_AMS_INVALID_EXPMONTH,
      ERROR_AMS_MISSING_EXPYEAR,
      ERROR_AMS_INVALID_EXPYEAR,
      ERROR_AMS_INVALID_EXPIRATION,
      ERROR_AMS_INVALID_CSC
    } = apiErrors;

    const { showForm, showGuarantee } = this.state;

    const hasCardNumberError = (errors && (errors.ccNumber || errors.ccCardType)) ||
                                      ERROR_AMS_MISSING_CCNUMBER ||
                                      ERROR_AMS_INVALID_CCNUMBER ||
                                      ERROR_AMS_MISSING_CCTYPE;
    const hasExpirationDateError = (errors && errors.ccExpiry) ||
                                      ERROR_AMS_MISSING_EXPMONTH ||
                                      ERROR_AMS_INVALID_EXPMONTH ||
                                      ERROR_AMS_MISSING_EXPYEAR ||
                                      ERROR_AMS_INVALID_EXPIRATION ||
                                      ERROR_AMS_INVALID_EXPYEAR;
    const hasCVVandCVCError = (errors && errors.ccCVVandCVC) ||
                                      ERROR_AMS_INVALID_CSC;

    return (
      <div className="payment-comp-credit-card-new">
        {
          data.get('list').size > 0 ?
            <div className="collapseTrigger">
              <a onClick={() => this.setState({ showForm: !showForm })}>
                <FormattedMessage {...selfMessages.use_new_card_text} />
                <i className={classNames('icon', { 'icon-chevron-down': !showForm, 'icon-chevron-up': showForm })} />
              </a>
            </div> : null
        }
        {
          data.get('list').size === 0 || showForm ? <div className="form--horizontal">

            {/* Card Number row */}
            <div className={classNames('form__wraper form__group', { 'form__group--error': hasCardNumberError })}>
              <div className="layout-width-limited">
                <div className="aaui-flexbox afx-xl-mg-10">
                  <label className="form__label form__label--require afx-col afx-xl-4-12" htmlFor="fieldCardNumber">
                    <FormattedMessage {...selfMessages.form_label_card_number} />
                  </label>
                  <div className="form__control afx-col afx-xl-8-12">
                    <div className="wraper-card-input-icon">
                      <Input
                        id="fieldCardNumber"
                        type="text"
                        value={ccNumber}
                        onInput={e => this.onCardNumberChange(e)}
                        onBlur={e => this.onCardNumberBlur(e)}
                      />
                      {this.getCardTypeIcon()}
                    </div>
                    {
                      hasCardNumberError ?
                        <div className="form__filed__error">
                          <i className="icon-close-circle" />
                          {
                            errors.ccNumber ?
                              <FormattedMessage {...selfMessages[errors.ccNumber]} /> : null
                          }
                          {
                            errors.ccCardType ?
                              <FormattedMessage {...selfMessages[errors.ccCardType]} /> : null
                          }
                          <span>{ERROR_AMS_MISSING_CCNUMBER}</span>
                          <span>{ERROR_AMS_MISSING_CCTYPE}</span>
                          <span>{ERROR_AMS_INVALID_CCNUMBER}</span>
                        </div> : ''
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Expiration Date row */}
            <div className={classNames('form__wraper form__group', { 'form__group--error': hasExpirationDateError })}>
              <div className="layout-width-limited">
                <div className="aaui-flexbox afx-xl-mg-10">
                  <label className="form__label form__label--require afx-col afx-xl-4-12" htmlFor="fieldExpirationDate">
                    <FormattedMessage {...selfMessages.form_label_expiration_date} />
                  </label>
                  <div className="form__control aaui-flexbox afx-col afx-xl-8-12">
                    <div className="afx-col afx-xl-11-23">
                      <Dropdown
                        value={ccExpiryMonth}
                        data={expirationMonths}
                        onChange={({ value }) => this.onExpirationMonthChange(value)}
                        placeholder={messages[selfMessages.placeholder_expiration_month.id]}
                      />
                    </div>
                    <div className="afx-col afx-xl-1-23 u-textCenter">/</div>
                    <div className="afx-col afx-xl-11-23">
                      <Dropdown
                        value={ccExpiryYear}
                        data={expirationYears}
                        onChange={({ value }) => this.onExpirationYearChange(value)}
                        placeholder={messages[selfMessages.placeholder_expiration_year.id]}
                      />
                    </div>
                    {
                      hasExpirationDateError ?
                        <div className="form__filed__error">
                          <i className="icon-close-circle" />
                          {
                            errors.ccExpiry ?
                              <FormattedMessage {...selfMessages[errors.ccExpiry]} /> : null
                          }
                          <span>{ERROR_AMS_MISSING_EXPMONTH}</span>
                          <span>{ERROR_AMS_INVALID_EXPMONTH}</span>
                          <span>{ERROR_AMS_MISSING_EXPYEAR}</span>
                          <span>{ERROR_AMS_INVALID_EXPIRATION}</span>
                          <span>{ERROR_AMS_INVALID_EXPYEAR}</span>
                        </div> : ''
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* CVV and CVC row */}
            <div className={classNames('form__wraper form__group', { 'form__group--error': hasCVVandCVCError })}>
              <div className="layout-width-limited">
                <div className="aaui-flexbox afx-xl-mg-10">
                  <label className="form__label form__label--require afx-col afx-xl-4-12" htmlFor="fieldCVVandCVC">
                    <FormattedMessage {...selfMessages.form_label_CVVandCVC} />
                  </label>
                  <div className="form__control aaui-flexbox afx-col afx-xl-8-12">
                    <div className="afx-col afx-xl-3-12">
                      <Input
                        id="fieldCVVandCVC"
                        type="text"
                        maxLength={4}
                        value={ccCVVandCVC}
                        onInput={e => this.onCVVandCVCChange(e)}
                        onBlur={e => this.onCVVandCVCBlur(e)}
                      />
                    </div>
                    <div className="afx-col afx-xl-1-12">
                      <span className="icon icon-question-circle" data-popover-trigger>
                        <Popover className="popover system-font-family" direction="e" style={{ zIndex: 1 }}>
                          <p>
                            <FormattedMessage {...selfMessages.cvv_cvc_help_text} />
                          </p>
                          <img alt="CVV/CVC tips" src="/images/img-card-tips.png" />
                        </Popover>
                      </span>
                    </div>
                    {
                      hasCVVandCVCError ?
                        <div className="form__filed__error">
                          <i className="icon-close-circle" />
                          {
                            errors.ccCVVandCVC ?
                              <FormattedMessage {...selfMessages[errors.ccCVVandCVC]} /> : null
                          }
                          <span>{ERROR_AMS_INVALID_CSC}</span>
                        </div> : ''
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Show 'Saving Electronic Check Security Guarantee' row */}
            {
              showPriorCc ?
                <div className="form__wraper">
                  <div className="layout-width-limited">
                    <div className="form__group aaui-flexbox afx-xl-mg-10">
                      <span className="form__label afx-col afx-xl-4-12" />
                      <div className="form__control afx-col afx-xl-8-12">
                        <div className="collapseTrigger">
                          <a
                            className="security-guarantee"
                            onClick={() => this.setState({ showGuarantee: !showGuarantee })}
                          >
                            <FormattedMessage {...selfMessages.form_guarantee_title} />
                            <i className={classNames('icon', { 'icon-chevron-down': !showGuarantee, 'icon-chevron-up': showGuarantee })} />
                          </a>
                        </div>
                        {
                          showGuarantee ? getSecurityGuaranteeContent() : null
                        }
                      </div>
                    </div>
                  </div>
                </div> : null
            }

            {/* Show 'Save the card for furture use' row */}
            {
              showPriorCc ?
                <div className="form__wraper form__group">
                  <div className="layout-width-limited">
                    <div className="aaui-flexbox afx-xl-mg-10">
                      <span className="form__label afx-col afx-xl-4-12" />
                      <div className="form__control afx-col afx-xl-8-12">
                        <Checkbox
                          size="sm"
                          onChange={e => this.onCheckSaveFutureUse(e)}
                          checked={ccSaveForFurture}
                        >
                          <FormattedMessage {...selfMessages.save_card_for_furture} />
                        </Checkbox>
                      </div>
                    </div>
                  </div>
                </div> : null
            }

            {/* Add button row */}
            <div className="form__wraper form__group">
              <div className="layout-width-limited">
                <div className="aaui-flexbox afx-xl-mg-10">
                  <span className="form__label afx-col afx-xl-4-12" />
                  <div className="form__control afx-col afx-xl-8-12">
                    <Button
                      size="sm" type="primary"
                      onClick={() => this.submitForm()}
                    >
                      <FormattedMessage {...selfMessages.add_button} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

          </div> : null
        }
      </div>
    );
  }
}
export default injectIntl(AddNewCreditCard);
