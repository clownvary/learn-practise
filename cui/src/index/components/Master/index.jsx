import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MessageBoard, clearAll } from 'react-base-ui/lib/messages';
import { syncLegencyCUISessionAction } from 'index/actions/syncSession';
import PageHeader from 'shared/components/PageHeader';
import { Breadcrumb } from 'react-base-ui/lib/components';
import { isCustomizedTheme } from 'shared/styles/themes/customize';
import 'shared/styles/index.less';
import { Header, Navigation, Footer } from './components/';
import './index.less';

export class Master extends Component {

  static propTypes = {
    children: React.PropTypes.node,
    syncLegencyCUISessionAction: React.PropTypes.func,
    theme: React.PropTypes.string,
    routes: React.PropTypes.shape([]),
    params: React.PropTypes.shape({})
  }

  static contextTypes = {
    getWording: React.PropTypes.func,
    configurations: React.PropTypes.object
  }

  componentDidMount() {
    this.props.syncLegencyCUISessionAction();
  }

  getNewSiteClassName() {
    const theme = this.props.theme;
    return isCustomizedTheme(theme) === undefined ?
      'cui-app cui-app-theme-new' :
      `cui-app cui-app-theme-legacy cui-app-theme-${theme}`;
  }

  render() {
    const { routes, params, children } = this.props;
    clearAll();

    return (
      <div className={this.getNewSiteClassName()}>
        <Header />
        <Navigation />
        <div className="cui-main-container-wrap">
          <div className="cui-main-container">
            <PageHeader routes={routes}>
              <Breadcrumb routes={routes} params={params} />
            </PageHeader>
            <MessageBoard />
            {children}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default connect(
  state => ({
    theme: state.systemSettings.getIn(['customizeStyle', 'current_theme'])
  }), {
    syncLegencyCUISessionAction
  }
)(Master);
