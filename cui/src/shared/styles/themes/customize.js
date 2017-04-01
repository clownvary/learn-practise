export function isCustomizedTheme(name) {
  if(!name) {
    return undefined;
  }
  return name === "Custom" ? true : false;
}

export function getNavBarClass({name}) {
  return isCustomizedTheme(name) ? null : `${name}-bar`;
}

export function getNavBarStyles(theme) {
  if(!isCustomizedTheme(theme.name)) {
    return {};
  }
  const {dark_accent_color, dark_accent_color_darker} = theme.customizedColors.toJS();
  return {
    background: `linear-gradient(to bottom,  ${dark_accent_color} 0%, ${dark_accent_color_darker} 100%)`
  };
}

export function getNavItemStyles(theme) {
  if(!isCustomizedTheme(theme.name)) {
    return {};
  }
  const {
    dark_accent_color,
    dark_accent_color_darker,
    primary_color,
    primary_color_darker,
    primary_color_brighter,
    dark_accent_color_brighter,
    dark_accent_color_brighter_less
  } = theme.customizedColors.toJS();
  return {
    navItem: {
      ":hover": {
        background: `linear-gradient(to bottom,  ${dark_accent_color} 0%,${dark_accent_color_darker} 100%)`
      }
    },
    active: {
      boxShadow: "0px 0px 0px rgba(000,000,000,0)",
      textShadow: "0px 0px 0px rgba(000,000,000,0)",
      background: `linear-gradient(to bottom, ${dark_accent_color_brighter_less} 0%, ${dark_accent_color_brighter} 100%)`
    },
    myCart: {
      background: `linear-gradient(to bottom,  ${primary_color} 0%, ${primary_color_darker} 100%)`,
      ":hover": {
        background: `linear-gradient(to bottom,  ${primary_color_brighter} 0%, ${primary_color} 100%)`
      }
    }
  };
}

export function getSecondaryMenuStyles(theme) {
  if(!isCustomizedTheme(theme.name)) {
    return {};
  }
  return {
    background: `${theme.customizedColors.get('light_neutral_color')}`
  };
}

export function getFooterLineStyles(theme) {
  if(!isCustomizedTheme(theme.name)) {
    return {};
  }
  return {
    'border-top': `1px solid ${theme.customizedColors.get('dark_accent_color')}`
  };
}
