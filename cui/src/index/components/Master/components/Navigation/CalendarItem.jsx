import React from 'react';
import radium from 'radium';
import NetCUILink from 'shared/components/NetCUILink';
import { FormattedDyncMessage } from 'shared/translation/formatted';
import SecondaryMenu from './SecondaryMenu';
import BaseItem from './BaseItem';

/**
 * Special Navigation Item for following the old cui logic.
 * The logic to show second level for calendars tab: (from: ANE-48065)
 * The max display second level calendars is 23 and the max columns is 3.
 * one column will display 8 second level calendars. the last one is
 * always "See All Calendars" link.
 */
export class CalendarItem extends BaseItem {
  render() {
    const { getWording } = this.context;
    const { item, itemStyles } = this.props;
    const wording = getWording('online_calendars_lable');

    return (
      <li style={itemStyles.navItem} className="Nav-calendar-item Nav-has-secondary-menu">
        <NetCUILink href={item.get('url')}>
          <FormattedDyncMessage value={wording || item.get('title')} />
        </NetCUILink>
        <SecondaryMenu items={item.get('children')} row={8} column={3} />
      </li>
    );
  }
}

export default radium(CalendarItem);
