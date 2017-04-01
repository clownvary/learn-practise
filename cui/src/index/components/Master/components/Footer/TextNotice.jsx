import React from 'react';

import UIComponent from 'shared/components/UIComponent';
import NetCUILink from 'shared/components/NetCUILink';
import { encodeHtmlStr } from 'shared/utils/func';

export default class TextNotice extends UIComponent {
    // Specifies the default values for props:
  static defaultProps = {
    title: '<<Notice title>>',
    items: [{
      title: '<<item  title here.>>',
      url: null
    }],
    cssStyle: 'ft-siteNotice-block'
  }
  render() {
    const cssStyle = this.props.cssStyle;
    const data = this.props.data || {};
    const title = data.title || '';
    const items = data.items || [];

    const domContents = [];
    items.forEach((item, index) => {
      domContents.push(
        <dd key={index}>
          { !item.url ? <span dangerouslySetInnerHTML={{ __html: encodeHtmlStr(item.title) }} />
: <NetCUILink href={item.url} dangerouslySetInnerHTML={{ __html: encodeHtmlStr(item.title) }} /> }
        </dd>
            );
    });
    return (
      <dl className={cssStyle}>
        <dt dangerouslySetInnerHTML={{ __html: encodeHtmlStr(title) }} />
        { domContents }
      </dl>);
  }
}
