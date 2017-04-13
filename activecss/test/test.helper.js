//在karma中已经全部导入test文件夹下的文件，所以会全局生效，直接使用sinon等
import { expect } from 'chai';
import sinon from 'sinon';
global.expect = expect;
global.sinon = sinon;