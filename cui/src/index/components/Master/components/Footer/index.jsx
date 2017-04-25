import React, { Component } from 'react';
import { decodeHtmlStr } from 'react-base-ui/lib/utils';
import 'shared/assets/images/poweredbyactive_Reversed.png';

import ActiveLogo from './ActiveLogo';
import SiteLinks from './SiteLinks';
import TextNotice from './TextNotice';
import SeparationLine from './SeparationLine';

import './index.less';


export default class Footer extends Component {

  static contextTypes = {
    configurations: React.PropTypes.object,
    systemSettings: React.PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { configurations, systemSettings } = this.context;
    const { active_links: activeLinks, site_links: siteLinks,
      site_info: siteInfo, methods_of_payment: methodsOfPayment,
      have_questions: haveQuestions, custom_content: customContent,
      copy_right: copyRight } = systemSettings.get('footer').toJS();

    return (
      <div className="cui-footer-wrap">
        <div className="cui-footer">
          <div className="aaui-flex afx-xl-mg-12 footer-siteNotice">
            <div className="afx-col afx-xl-3-9">
              <TextNotice data={siteInfo} />
            </div>
            <div className="afx-col afx-xl-3-9">
              <TextNotice data={methodsOfPayment} />
              <TextNotice data={haveQuestions} />
            </div>
            <div className="afx-col afx-xl-2-9">
              <TextNotice data={customContent} />
            </div>
          </div>
          <SeparationLine />
          <div className="footer-links">
            <SiteLinks siteLinks={activeLinks} isActiveLinks />
            <SiteLinks siteLinks={siteLinks} />
            <p className="ft-copyRight">
              <span dangerouslySetInnerHTML={{ __html: decodeHtmlStr(copyRight ? copyRight.title : '') }} />
            </p>
            <ActiveLogo showLogo={!configurations.get('hide_active_branding')} />
          </div>
        </div>
      </div>
    );
  }
}
