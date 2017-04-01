import React from "react";
import {fromJS} from "immutable";
import jsonConfigurations from "common/get_configurations.json";
import jsonSystemSettings from "common/get_systemSettings.json";

const {body: {configuration}} = jsonConfigurations;
const {body: {originalConfig}} = jsonSystemSettings;

const configurations = fromJS(configuration);
const systemSettings = fromJS(originalConfig);

const getWording = (key, conf) => {
  const scopeConfigurations = conf || configurations;
  return key ? scopeConfigurations.get(key) : undefined;
};

export const childContextTypes ={
  configurations: React.PropTypes.object,
  systemSettings: React.PropTypes.object,
  theme: React.PropTypes.object,
  getWording: React.PropTypes.func
};

export default {
  configurations: configurations,
  systemSettings: systemSettings,
  theme: {
    name: systemSettings.getIn(['customizeStyle', 'current_theme']),
    customizedColors: systemSettings.getIn(['customizeStyle', 'customized_theme'])
  },
  getWording: getWording
};
