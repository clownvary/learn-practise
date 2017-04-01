import React from 'react';
import radium from 'radium';
import UIComponent from 'shared/components/UIComponent';

import { getFooterLineStyles } from 'shared/styles/themes/customize';

/**
 * The color of this line needs to follow the five themes.
 */
export class SeparationLine extends UIComponent {

  static contextTypes = {
    systemSettings: React.PropTypes.object
  }

  render() {
    const { systemSettings } = this.context;
    const theme = systemSettings.getIn(['customizeStyle', 'current_theme']);
    const styles = systemSettings.getIn(['customizeStyle', 'customized_theme']);

    return (
      <div style={getFooterLineStyles(theme, styles.toJS())} className="footer-separation-line" />
    );
  }

}

export default radium(SeparationLine);
