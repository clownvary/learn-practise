import React from 'react';
import { encodeHtmlStr } from 'react-base-ui/lib/utils';

export default class SiteLinks extends React.PureComponent {

  static contextTypes = {
    configurations: React.PropTypes.object
  }

  // Specifies the default values for props:
  static defaultProps = {
    siteLinks: []
  }

  render() {
    const { siteLinks, isActiveLinks } = this.props;
    const { configurations } = this.context;

    return (
      <div className="footer-siteLinks">
        <div className="ft-siteLinks-links">
          { siteLinks.map((link, index) => {
            const linkDom = link.url ?
                (
                  <a
                    href="#hash" onClick={(e) => {
                      window.open(link.url, 'l1'); e.preventDefault();
                    }} dangerouslySetInnerHTML={{ __html: encodeHtmlStr(link.title) }}
                  />
                ) :
                (
                  <span dangerouslySetInnerHTML={{ __html: encodeHtmlStr(link.title) }} />
                );
            const updated = configurations.get('new_privacy_policy') &&
              isActiveLinks &&
              link.title === 'Your Privacy Rights' ?
                (<b>: <font color="#FBAD18">Updated</font></b>) : null;
            return (
              <span key={index}>{ linkDom }{ updated }</span>
            );
          }) }
        </div>
      </div>
    );
  }

}
