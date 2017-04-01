import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';


class AppRoot extends Component {

  static childContextTypes = {
    configurations: React.PropTypes.object,
    systemSettings: React.PropTypes.object,
    theme: React.PropTypes.object,
    getWording: React.PropTypes.func
  }

  static propTypes = {
    configurations: React.PropTypes.shape({}),
    systemSettings: React.PropTypes.shape({}),
    intl: React.PropTypes.shape({}),
    children: React.PropTypes.node
  }

  getChildContext() {
    const { configurations, systemSettings } = this.props;
    return {
      configurations,
      systemSettings,
      theme: {
        name: systemSettings.getIn(['customizeStyle', 'current_theme']),
        customizedColors: systemSettings.getIn(['customizeStyle', 'customized_theme'])
      },
      getWording: this.getWording.bind(this)
    };
  }

  getWording(key) {
    const { configurations } = this.props;
    return key ? configurations.get(key) : undefined;
  }

  render() {
    const { intl, children } = this.props;
    const { currentLocale, defaultLocale, messages } = intl.toJS();

    let DevTools;
    if (__DEV__ || __STATIC__) {
      DevTools = require('shared/components/DevTools/DevTools'); // eslint-disable-line global-require
    }

    return (
      <IntlProvider
        defaultLocale={defaultLocale}
        locale={currentLocale}
        key={currentLocale}
        messages={messages[currentLocale]}
      >
        <div className="cui">
          <div style={{ height: '100%' }}>
            { children }
          </div>
          { DevTools ? <DevTools /> : '' }
        </div>
      </IntlProvider>
    );
  }
}

export default connect(
  state => ({
    intl: state.intl,
    configurations: state.configurations,
    systemSettings: state.systemSettings
  })
)(AppRoot);
