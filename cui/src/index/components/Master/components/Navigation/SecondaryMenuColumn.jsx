import React, { Component } from 'react';
import { FormattedDyncMessage } from 'shared/translation/formatted';


export default class SecondaryMenuColumn extends Component {

  static propTypes = {
    items: React.PropTypes.shape([React.PropTypes.object])
  }

  static defaultProps = {}

  render() {
    const { items } = this.props;
    return (
      <div className="Nav-secondary-menu-column">
        <ul>
          {
            items.map((item, i) => (
              <li key={i}>
                <a href={item.get('url')}>
                  <FormattedDyncMessage value={item.get('title')} />
                </a>
              </li>
              ))
          }
        </ul>
      </div>
    );
  }
}
