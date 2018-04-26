/*
 * @Author: gary.wang
 * @Date: 2018-04-18 17:29:13
 * @Last Modified by: gary.wang
 * @Last Modified time: 2018-04-19 14:40:21
 * #This demo is for practising logging module
 */

import logging
import os,sys


def start():
    logfile = os.path.join(os.path.dirname(__file__),'log.txt')
    print('logging to ...')
    logging.basicConfig(
        filemode='a+',
        filename=logfile,
        format='%(asctime)s : %(levelname)s : %(message)s',
        level=logging.DEBUG  # debug<ino<warning<error<fatal
    )
    logging.debug('this is debug')
    logging.info("Doing something")
    logging.warning("Dying now")

str = 'this is error'
# assert 1==2,'this is error'
print(str[::-1])
# start()
