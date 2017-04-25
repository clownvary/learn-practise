import React from 'react';
import { encodeHtmlStr } from 'react-base-ui/lib/utils';

export default class TextNotice extends React.PureComponent {
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
          {
            !item.url ?
              <span dangerouslySetInnerHTML={{ __html: encodeHtmlStr(item.title) }} /> :
              <a
                href={item.url}
                dangerouslySetInnerHTML={{ __html: encodeHtmlStr(item.title) }}
              />
          }
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
