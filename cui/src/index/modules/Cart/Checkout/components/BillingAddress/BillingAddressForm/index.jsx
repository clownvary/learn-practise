import React from 'react';
import Input from 'react-aaui/lib/Input';
import Dropdown from 'react-aaui/lib/Dropdown';
import Button from 'react-aaui/lib/Button';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';

import { FormattedMessage } from 'shared/translation/formatted';
import stringHelper from 'react-base-ui/lib/helper/string';
import { billingAddressFormFields as fields, formModes } from '../../../consts';

import selfMessages from './translations';
import './index.less';

export class BillingAddressForm extends React.PureComponent {
  static propTypes = {
    data: React.PropTypes.shape({
      toJS: React.PropTypes.func,
      get: React.PropTypes.func
    }).isRequired,
    config: React.PropTypes.shape({
      canCreate: React.PropTypes.bool.isRequired,
      isInternational: React.PropTypes.bool.isRequired
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
          {
            selfMessages[errMessage] ?
              <FormattedMessage {...selfMessages[errMessage]} />
              : errMessage
          }
        </div>
        : null
    );

  renderFormField = (
    fieldType,
    fieldLabelObj,
    fieldControl,
    fieldError,
    required) =>
    (
      <div
        className={classNames(
          'form__wraper',
          'form__group',
          {
            'form__group--error':
            !stringHelper.isNullOrEmpty(fieldError)
          })}
      >
        <div className="layout-width-limited">
          <div className="aaui-flexbox afx-xl-mg-10">
            <label
              className={classNames(
                'form__label',
                { 'form__label--require': required },
                'afx-col',
                'afx-xl-4-12')}
              htmlFor={`frm${fieldType}`}
            >
              {fieldLabelObj && <FormattedMessage {...fieldLabelObj} />}
            </label>
            <div className="form__control afx-col afx-xl-8-12">
              {fieldControl}
              {this.renderError(fieldError)}
            </div>
          </div>
        </div>
      </div>
    )


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
    const isStateShownAsList = data.get('isStateShownAsList');

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
          isFormDisplay &&
            <div className="billingaddressform">

              {
                formMode === formModes.CREATE && this.renderFormField(
                  fields.FIRST,
                  selfMessages.labelFirstName,
                  <Input
                    id={`frm${fields.FIRST}`}
                    maxLength={40}
                    value={formData.get(fields.FIRST)}
                    onBlur={
                      e => this.props.onChange(fields.FIRST, e.target.value, formMode)
                    }
                  />,
                  formErrors.get(fields.FIRST),
                  true
                )
              }

              {
                formMode === formModes.CREATE && this.renderFormField(
                  fields.LAST,
                  selfMessages.labelLastName,
                  <Input
                    id={`frm${fields.LAST}`}
                    maxLength={40}
                    value={formData.get(fields.LAST)}
                    onBlur={
                      e => this.props.onChange(fields.LAST, e.target.value, formMode)
                    }
                  />,
                  formErrors.get(fields.LAST),
                  true
                )
              }

              {
                formMode === formModes.UPDATE && this.renderFormField(
                  fields.MAILINGNAME,
                  selfMessages.labelMailingName,
                  <Input
                    id={`frm${fields.MAILINGNAME}`}
                    maxLength={150}
                    value={formData.get(fields.MAILINGNAME)}
                    onBlur={
                      e => this.props.onChange(fields.MAILINGNAME, e.target.value, formMode)
                    }
                  />,
                  formErrors.get(fields.MAILINGNAME),
                  true
                )
              }

              {
                this.renderFormField(
                  fields.ADDRESS1,
                  selfMessages.labelStreetAddress,
                  <Input
                    id={`frm${fields.ADDRESS1}`}
                    maxLength={35}
                    value={formData.get(fields.ADDRESS1)}
                    onBlur={
                      e => this.props.onChange(fields.ADDRESS1, e.target.value, formMode)
                    }
                  />,
                  formErrors.get(fields.ADDRESS1),
                  true
                )
              }

              {
                this.renderFormField(
                  fields.ADDRESS2,
                  '',
                  <Input
                    id={`frm${fields.ADDRESS2}`}
                    maxLength={35}
                    value={formData.get(fields.ADDRESS2)}
                    onBlur={
                      e => this.props.onChange(fields.ADDRESS2, e.target.value, formMode)
                    }
                  />,
                  formErrors.get(fields.ADDRESS2),
                  false
                )
              }

              {
                config.isInternational && this.renderFormField(
                  fields.COUNTRY,
                  selfMessages.labelCountry,
                  <Dropdown
                    id={`frm${fields.COUNTRY}`}
                    placeholder={messages[selfMessages.placeholderCountry.id]}
                    data={countries.toJS()}
                    value={selectedCountry.get('value')}
                    onChange={({ value }) => {
                      if (value !== selectedCountry.get('value')) {
                        this.props.onChangeCountry(value, formMode);
                      }
                    }}
                    maxHeight="350px"
                  />,
                  formErrors.get(fields.COUNTRY),
                  true
                )
              }

              {
                this.renderFormField(
                  fields.STATE,
                  selfMessages.labelStateProvince,
                  isStateShownAsList ?
                    <Dropdown
                      id={`frm${fields.STATE}`}
                      placeholder={messages[selfMessages.placeholderCStateProvince.id]}
                      data={selectedCountry.toJS().states || []}
                      value={selectedState.get('value')}
                      onChange={
                        ({ value }) => { this.props.onChange(fields.STATE, value, formMode); }
                      }
                      maxHeight="350px"
                    />
                    :
                    <Input
                      id={`frm${fields.STATE}`}
                      maxLength={15}
                      value={formData.get(fields.STATE)}
                      onBlur={
                        e => this.props.onChange(fields.STATE, e.target.value, formMode)
                      }
                    />,
                  formErrors.get(fields.STATE),
                  true
                )
              }

              {
                this.renderFormField(
                  fields.CITY,
                  selfMessages.labelCity,
                  <Input
                    id={`frm${fields.CITY}`}
                    maxLength={40}
                    value={formData.get(fields.CITY)}
                    onBlur={
                      e => this.props.onChange(fields.CITY, e.target.value, formMode)
                    }
                  />,
                  formErrors.get(fields.CITY),
                  true
                )
              }

              {
                this.renderFormField(
                  fields.ZIPCODE,
                  selfMessages.labelZipCode,
                  <Input
                    id={`frm${fields.ZIPCODE}`}
                    style={{ width: '125px' }}
                    maxLength={10}
                    value={formData.get(fields.ZIPCODE)}
                    onBlur={
                      (e) => {
                        this.props.onChange(fields.ZIPCODE, e.target.value, formMode);
                        this.props.onChange(fields.ZIPCODE_SERVICE);
                      }
                    }
                  />,
                  formErrors.get(fields.ZIPCODE) || formErrors.get(fields.ZIPCODE_SERVICE),
                  true
                )
              }

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
        }
      </div>
    );
  }
}

export default injectIntl(BillingAddressForm);
