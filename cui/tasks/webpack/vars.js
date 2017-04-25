import path from 'path';

export const includeDirs = [
  path.resolve('src'),
  path.resolve('test/json'),
  path.resolve('i18n'),
  path.resolve('node_modules/active.css'),
  path.resolve('node_modules/react-aaui'),
  path.resolve('node_modules/react-base-ui'),
  path.resolve('node_modules/font-awesome')
];

export const excludeDirs = process.platform === 'win32' ?
  /\\node_modules(?!\\react-aaui|\\active.css|\\react-base-ui)/ :
  /node_modules(?!\/react-aaui|\/active.css|\/react-base-ui)/;

export const includeJadeDirs = [
  path.resolve('src'),
  path.resolve('tasks')
];
