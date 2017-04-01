import path from 'path';
import os from 'os';

const ifaces = os.networkInterfaces();
const ips = [];
for (let dev in ifaces) {
  ifaces[dev].forEach((details) => {
    if (details.family === 'IPv4') {
      if (details.address !== '127.0.0.1') {
        ips.push(details.address);
      }
    }
  });
}

let isRunningByIp = false;
process.argv.forEach((arg) => {
  if (arg === '--ip') {
    isRunningByIp = true;
  }
});

export const host = isRunningByIp ? ips[0] : 'localhost';
export const port = 7002;

export const srcDir = './src';
export const examplesDir = './examples';
export const showExamplesOnStatic = true;

const homeDir = process.platform === 'win32' ? 'C:' : process.env.HOME;

export const outputDir = {
  static: path.resolve('dist'),
  dev: path.resolve(`${homeDir}/active/ActiveNetCUI/jetty/webapps/ActiveNetCUI`),
  server: path.resolve('../activenet-cui/src/main/resources/static'),
  prod: path.resolve('../activenet-cui/src/main/webapp')
};
export const linkExtraPrefix = '';
