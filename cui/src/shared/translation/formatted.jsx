import React from 'react';
import * as ReactIntl from 'react-intl';
import { encodeHtmlStr, decodeHtmlStr } from 'react-base-ui/lib/utils';

const isIE = () => {
    let ua = window.navigator.userAgent;
    let msie = ua.indexOf("MSIE ");
    let result = false;
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))
    {
        result = true;
    }

    return result;
}

/**
 * Wrap the components of react-intl for extending them in the future.
 * components list:
 *    FormattedDate,
 *    FormattedMessage,
 *    FormattedNumber,
 *    FormattedPlural,
 *    FormattedRelative,
 *    FormattedTime
 */

export class FormattedDate extends React.Component {
  render() {
    const {
      children,
      ...rest
    } = this.props;
    return (
      <span>
        <ReactIntl.FormattedDate {...rest}>
          {children}
        </ReactIntl.FormattedDate>
      </span>
    );
  }
}

export class FormattedMessage extends React.Component {
  render() {
    const {
      children,
      values,
      ...rest
    } = this.props;
    const formattedValues = {};
    if (values) {
      Object.keys(values).forEach((key) => {
        const val = values[key];
        formattedValues[key] = typeof val === 'string' ? decodeHtmlStr(val) : val;
      });
    }
    return (
      <ReactIntl.FormattedMessage values={formattedValues} {...rest}>
        {children}
      </ReactIntl.FormattedMessage>
    );
  }
}

export class FormattedNumber extends React.Component {
  /**
   * IE11 supports ECMASCRIPT Intl is not well and has a bug for formated currency.
   * This bug happens on the locale setting to be "en".
   * Issue link: https://github.com/yahoo/react-intl/issues/568
   * So I always set locale setting to be "en-CA"(Newfoundland English) for currency to avoid this bug.
   * Languages list:
   * 		http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry.
   */
  getCurrencyInIE() {
    const { currency, currencyDisplay, value, children } = this.props;
    const formattedNumber = new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency,
      currencyDisplay: currencyDisplay || 'symbol'
    }).format(value);
    if (typeof children === 'function') {
      return children(formattedNumber);
    }
    return formattedNumber;
  }

  render() {
    const {
      numberStyle,
      children,
      ...rest
    } = this.props;

    rest.style = numberStyle;
    return (
      <span>
        {
          isIE() && numberStyle === 'currency' ? this.getCurrencyInIE() :
          <ReactIntl.FormattedNumber {...rest}>
            {children}
          </ReactIntl.FormattedNumber>
        }
      </span>
    );
  }
}

export class FormattedPlural extends React.Component {
  render() {
    const {
      children,
      ...rest
    } = this.props;
    return (
      <span>
        <ReactIntl.FormattedPlural {...rest}>
          {children}
        </ReactIntl.FormattedPlural>
      </span>
    );
  }
}

export class FormattedRelative extends React.Component {
  render() {
    const {
      children,
      ...rest
    } = this.props;
    return (
      <span>
        <ReactIntl.FormattedRelative {...rest}>
          {children}
        </ReactIntl.FormattedRelative>
      </span>
    );
  }
}

export class FormattedTime extends React.Component {
  render() {
    const {
      children,
      ...rest
    } = this.props;
    return (
      <span>
        <ReactIntl.FormattedTime {...rest}>
          {children}
        </ReactIntl.FormattedTime>
      </span>
    );
  }
}

export class FormattedDyncMessage extends React.Component {
  render() {
    const {
      value,
      children,
      ...rest
    } = this.props;
    /**
     * TODO: prevent XSS.
     */
    return (
      <span {...rest}>
        {decodeHtmlStr(`${value || ''}`)}
        {children}
      </span>
    );
  }
}

export class FormattedHtmlMessage extends React.Component {
  render() {
    const {
      value,
      ...rest
    } = this.props;
    /**
     * TODO: prevent XSS.
     */
    return (
      <span {...rest} dangerouslySetInnerHTML={{ __html: encodeHtmlStr(`${value || ''}`) }} />
    );
  }
}
