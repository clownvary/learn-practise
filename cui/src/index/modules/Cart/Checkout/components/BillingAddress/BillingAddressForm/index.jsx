import React from 'react';
import Input from 'react-aaui/lib/Input';
import Dropdown from 'react-aaui/lib/Dropdown';
import Button from 'react-aaui/lib/Button';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';

import UIComponent from 'shared/components/UIComponent';
import { FormattedMessage } from 'shared/translation/formatted';
import stringHelper from 'shared/utils/stringHelper';
import { billingAddressFormFields as fields, formModes } from '../../../consts';

import selfMessages from './translations';
import './index.less';

export class BillingAddressForm extends UIComponent {
  static propTypes = {
    data: React.PropTypes.shape({
      toJS: React.PropTypes.func,
      get: React.PropTypes.func
    }).isRequired,
    config: React.PropTypes.shape({
      canCreate: React.PropTypes.bool.isRequired
    }).isRequired,

    onCreate: React.PropTypes.func.isRequired,
    onHide: React.PropTypes.func.isRequired,
    onChangeCountry: React.PropTypes.func.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired
  };

  renderError = errMessage =>
    (
      errMessage ?
        <div className="form__filed__error">
          <i className="icon icon-close-circle" />
          <FormattedMessage {...selfMessages[errMessage]} />
        </div>
        : null
    );

  render() {
    const {
      intl: { messages },
      data,
      config
    } = this.props;

    const countries = data.get('countries');
    const selectedCountry = data.get('selectedCountry');
    const selectedState = data.get('selectedState');
    const formData = data.get('formData');
    const isFormDisplay = data.get('isFormDisplay');
    const isFormHeaderDisplay = data.get('isFormHeaderDisplay');
    const formErrors = data.get('formErrors');
    const formMode = data.get('formMode');

    return (
      <div className="billingaddressformwrapper">
        {
          config.canCreate && isFormHeaderDisplay ?
            <a
              className={classNames('title', 'link', { disable: !config.canAdd })}
              onClick={() => { isFormDisplay ? this.props.onHide() : this.props.onCreate(); }}
            >
              <FormattedMessage {...selfMessages.labelAdd} />
              <i className={`icon icon-chevron-${isFormDisplay ? 'up' : 'down'}`} />
            </a>
            : null
        }
        {
          isFormDisplay ?


            <div className="billingaddressform">
              {
                formMode === formModes.CREATE ?
                  <div
                    className={classNames(
                      'form__wraper',
                      'form__group',
                      {
                        'form__group--error':
                        !stringHelper.isNullOrEmpty(formErrors.get(fields.FIRST))
                      })}
                  >
                    <div className="layout-width-limited">
                      <div className="aaui-flexbox afx-xl-mg-10">
                        <label className="form__label form__label--require afx-col afx-xl-4-12" htmlFor="frmFirstName">
                          <FormattedMessage {...selfMessages.labelFirstName} />
                        </label>
                        <div className="form__control afx-col afx-xl-8-12">
                          <Input
                            id="frmFirstName"
                            value={formData.get(fields.FIRST)}
                            maxLength={40}
                            onBlur={
                              e => this.props.onChange(fields.FIRST, e.target.value, formMode)
                              }
                          />
                          {this.renderError(formErrors.get(fields.FIRST))}
                        </div>
                      </div>
                    </div>
                  </div>
                  : null
              }
              {
                formMode === formModes.CREATE ?
                  <div
                    className={classNames(
                      'form__wraper',
                      'form__group',
                      {
                        'form__group--error':
                        !stringHelper.isNullOrEmpty(formErrors.get(fields.LAST))
                      })}
                  >
                    <div className="layout-width-limited">
                      <div className="aaui-flexbox afx-xl-mg-10">
                        <label className="form__label form__label--require afx-col afx-xl-4-12" htmlFor="frmLastName">
                          <FormattedMessage {...selfMessages.labelLastName} />
                        </label>
                        <div className="form__control afx-col afx-xl-8-12">
                          <Input
                            id="frmLastName"
                            maxLength={40}
                            value={formData.get(fields.LAST)}
                            onBlur={
                              e => this.props.onChange(fields.LAST, e.target.value, formMode)
                              }
                          />
                          {this.renderError(formErrors.get(fields.LAST))}
                        </div>
                      </div>
                    </div>
                  </div>
                  : null
              }
              {
                formMode === formModes.UPDATE ?
                  <div
                    className={classNames(
                      'form__wraper',
                      'form__group',
                      {
                        'form__group--error':
                        !stringHelper.isNullOrEmpty(formErrors.get(fields.MAILINGNAME))
                      })}
                  >
                    <div className="layout-width-limited">
                      <div className="aaui-flexbox afx-xl-mg-10">
                        <label className="form__label form__label--require afx-col afx-xl-4-12" htmlFor="frmLastName">
                          <FormattedMessage {...selfMessages.labelMailingName} />
                        </label>
                        <div className="form__control afx-col afx-xl-8-12">
                          <Input
                            id="frmMailingName"
                            maxLength={40}
                            value={formData.get(fields.MAILINGNAME)}
                            onBlur={
                              e => this.props.onChange(fields.MAILINGNAME, e.target.value, formMode)
                              }
                          />
                          {this.renderError(formErrors.get(fields.MAILINGNAME))}
                        </div>
                      </div>
                    </div>
                  </div>
                  : null
              }
              <div
                className={classNames(
                  'form__wraper',
                  'form__group',
                  {
                    'form__group--error':
                    !stringHelper.isNullOrEmpty(formErrors.get(fields.ADDRESS1))
                  })}
              >
                <div className="layout-width-limited">
                  <div className="aaui-flexbox afx-xl-mg-10">
                    <label className="form__label form__label--require afx-col afx-xl-4-12" htmlFor="frmStreetAddress1">
                      <FormattedMessage {...selfMessages.labelStreetAddress} />
                    </label>
                    <div className="form__control afx-col afx-xl-8-12">
                      <Input
                        id="frmStreetAddress1"
                        maxLength={75}
                        value={formData.get(fields.ADDRESS1)}
                        onBlur={
                          e => this.props.onChange(fields.ADDRESS1, e.target.value, formMode)
                          }
                      />
                      {this.renderError(formErrors.get(fields.ADDRESS1))}
                    </div>
                  </div>
                </div>
              </div>


              <div
                className={classNames(
                  'form__wraper',
                  'form__group',
                  {
                    'form__group--error':
                    !stringHelper.isNullOrEmpty(formErrors.get(fields.ADDRESS2))
                  })}
              >
                <div className="layout-width-limited">
                  <div className="aaui-flexbox afx-xl-mg-10">
                    <label className="form__label afx-col afx-xl-4-12" htmlFor="frmStreetAddress2" />
                    <div className="form__control afx-col afx-xl-8-12">
                      <Input
                        id="frmStreetAddress2"
                        maxLength={75}
                        value={formData.get(fields.ADDRESS2)}
                        onBlur={
                          e => this.props.onChange(fields.ADDRESS2, e.target.value, formMode)
                          }
                      />
                    </div>
                  </div>
                </div>
              </div>


              <div
                className={classNames(
                  'form__wraper',
                  'form__group',
                  {
                    'form__group--error':
                    !stringHelper.isNullOrEmpty(formErrors.get(fields.COUNTRY))
                  })}
              >
                <div className="layout-width-limited">
                  <div className="aaui-flexbox afx-xl-mg-10">
                    <label className="form__label form__label--require afx-col afx-xl-4-12" htmlFor="frmCountry">
                      <FormattedMessage {...selfMessages.labelCountry} />
                    </label>
                    <div className="form__control afx-col afx-xl-8-12">
                      <Dropdown
                        id="frmCountry"
                        placeholder={messages[selfMessages.placeholderCountry.id]}
                        data={countries.toJS()}
                        value={selectedCountry.get('value')}
                        onChange={({ value }) => {
                          if (value !== selectedCountry.get('value')) {
                            this.props.onChangeCountry(value, formMode);
                          }
                        }}
                        maxHeight="350px"
                      />
                      {this.renderError(formErrors.get(fields.COUNTRY))}
                    </div>
                  </div>
                </div>
              </div>


              <div
                className={classNames(
                  'form__wraper',
                  'form__group',
                  {
                    'form__group--error':
                    !stringHelper.isNullOrEmpty(formErrors.get(fields.STATE))
                  })}
              >
                <div className="layout-width-limited">
                  <div className="aaui-flexbox afx-xl-mg-10">
                    <label className="form__label form__label--require afx-col afx-xl-4-12" htmlFor="frmStateProvince">
                      <FormattedMessage {...selfMessages.labelStateProvince} />
                    </label>
                    <div className="form__control afx-col afx-xl-8-12">
                      <Dropdown
                        id="frmStateProvince"
                        placeholder={messages[selfMessages.placeholderCStateProvince.id]}
                        data={selectedCountry.toJS().states || []}
                        value={selectedState.get('value')}
                        onChange={
                          ({ value }) => { this.props.onChange(fields.STATE, value, formMode); }
                        }
                        maxHeight="350px"
                      />
                      {this.renderError(formErrors.get(fields.STATE))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form__wraper">
                <div className="layout-width-limited">
                  <div className="aaui-flexbox afx-xl-mg-10">
                    <div
                      className={classNames(
                        'form__group',
                        'afx-col',
                        'afx-xl-4-7',
                        {
                          'form__group--error':
                          !stringHelper.isNullOrEmpty(formErrors.get(fields.CITY))
                        })}
                    >
                      <div className="aaui-flexbox afx-xl-mg-10">
                        <label className="form__label form__label--require afx-col afx-xl-7-12" htmlFor="frmCity">
                          <FormattedMessage {...selfMessages.labelCity} />
                        </label>
                        <div className="form__control afx-col afx-xl-5-12">
                          <Input
                            id="frmCity"
                            maxLength={40}
                            value={formData.get('city')}
                            onBlur={
                              e => this.props.onChange(fields.CITY, e.target.value, formMode)
                            }
                          />
                          {this.renderError(formErrors.get(fields.CITY))}
                        </div>
                      </div>
                    </div>

                    <div
                      className={classNames(
                        'form__group',
                        'afx-col',
                        'afx-xl-3-7',
                        {
                          'form__group--error':
                          !stringHelper.isNullOrEmpty(formErrors.get(fields.ZIPCODE))
                        })}
                    >
                      <div className="aaui-flexbox afx-xl-mg-10">
                        <label className="form__label form__label--require afx-col afx-xl-4-9" htmlFor="frmZipCode" >
                          <FormattedMessage {...selfMessages.labelZipCode} />
                        </label>
                        <div className="form__control afx-col afx-xl-5-9">
                          <Input
                            id="frmZipCode"
                            maxLength={8}
                            value={formData.get('zip_code')}
                            onBlur={
                              e => this.props.onChange(fields.ZIPCODE, e.target.value, formMode)
                            }
                          />
                          {this.renderError(formErrors.get(fields.ZIPCODE))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form__wraper form__group">
                <div className="layout-width-limited">
                  <div className="aaui-flexbox afx-xl-mg-10">
                    <div className="afx-col afx-xl-4-12" />
                    <div className="afx-col afx-xl-8-12">
                      {
                        formMode === formModes.CREATE ?
                          <Button
                            type="primary"
                            size="sm"
                            style={{ width: '84px' }}
                            onClick={() => this.props.onSubmit()}
                          >
                            <FormattedMessage {...selfMessages.buttonAdd} />
                          </Button>
                          : null
                      }
                      {formMode === formModes.UPDATE ?
                        <div className="aaui-flexbox button-row-update">
                          <Button
                            size="sm"
                            style={{ width: '84px' }}
                            onClick={this.props.onCancel}
                          >
                            <FormattedMessage {...selfMessages.buttonCancel} />
                          </Button>

                          <Button
                            type="primary"
                            size="sm"
                            style={{ width: '84px' }}
                            onClick={() => this.props.onSubmit()}
                          >
                            <FormattedMessage {...selfMessages.buttonSave} />
                          </Button>
                        </div>
                        : null
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            : null
        }
      </div >
    );
  }
}

export default injectIntl(BillingAddressForm);

