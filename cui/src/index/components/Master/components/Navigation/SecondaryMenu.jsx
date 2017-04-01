import radium from 'radium';
import React, { Component } from 'react';
import classNames from 'classnames';
import { getSecondaryMenuStyles } from 'shared/styles/themes/customize';
import SecondaryMenuColumn from './SecondaryMenuColumn';

export class SecondaryMenu extends Component {

  static contextTypes = {
    theme: React.PropTypes.object
  }

  static propTypes = {
    row: React.PropTypes.number,
    column: React.PropTypes.number,
    items: React.PropTypes.shape([React.PropTypes.object]),
    className: React.PropTypes.string
  }

  static defaultProps = {
    row: 5,
    column: 3
  }

  /**
   * Filter and groupby items according to row and column properties.
   * @return {[immutable]}
   */
  getGroupedItems() {
    const { row, column, items } = this.props;
    let _increase = 0;
    // Always use itmes.last ("See All Categories") to replace the last one of the filtered items.
    return items.filter((item, i) => i < row * column).map((item, i, l) =>
      ((i + 1 === l.size) ? items.last() : item)
    ).groupBy((item, i) => {
      if (i >= _increase * row) {
        _increase += 1;
      }
      return _increase;
    });
  }

  render() {
    const { theme } = this.context;
    const { className } = this.props;

    return (
      <div
        className={classNames('Nav-secondary-menu', className)}
        style={getSecondaryMenuStyles(theme)}
      >
        {
          this.getGroupedItems().toArray().map((items, i) => (
            <SecondaryMenuColumn key={i} items={items} />
            ))
        }
      </div>
    );
  }
}

export default radium(SecondaryMenu);
