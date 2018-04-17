#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# def sum(a, b):
#     return a + b


# func = sum
# r = func(5, 6)
# print(r)
# print(10 // 3)
# full = 100
# me = 80
# print('grade is %s%%'%(me*100/full))
# tp = ('jack', 'tom', 'ss')
# print(tp[1])

# if-else
# age = 3
# if age >= 18:
#     print('your age is', age)
#     print('adult')
# else:
#     print('your age is', age)
#     print('teenager')

# for in
# sum = 0
# for x in tuple(range(101)):
#     sum = sum + x
# print(sum)

# n = 0
# while n < 10:
#     n = n + 1
#     if n % 2 == 0:  # 如果n是偶数，执行continue语句
#         continue  # continue语句会直接继续下一轮循环，后续的print()语句不会执行
#     print(n)

# d = {'Michael': 95, 'Bob': 75, 'Tracy': 85}
# if not 'Bob' in d:
#     print('yes')
# else:
#     print('no')

# print(d)

# import random;
# x=random.choice(range(1,10,3))
# st='hskdsds'
# print(st[1:4]*2)

# html='''
# <HTML><HEAD><TITLE>
# Friends CGI Demo</TITLE></HEAD>
# <BODY><H3>ERROR</H3>
# <B>%s</B><P>
# <FORM><INPUT TYPE=button VALUE=Back
# ONCLICK="window.history.back()"></FORM>
# </BODY></HTML>
# '''
# tup1 = ('physics', 'chemistry', 1997, 2000);
# print(tup1.__str__());

# #dict
# dict = {'Google': 'www.google.com', 'Runoob': 'www.runoob.com', 'taobao': 'www.taobao.com'};
# for key in dict.keys():
#     print(key);
# # pop
# dict['taobao']='test';
# print(dict.pop('Runoob'));
# print(dict);

# date&time
# import time;
# curtime = time.localtime(time.time());
# print(time.strftime("%Y-%m-%d %H:%M:%S",curtime));

# import calendar

# cal = calendar.month(2016, 4)
# print(time.clock());

# import datetime
# i = datetime.datetime.now()

# print ("当前的日期和时间是 %s" % i)
# print ("ISO格式的日期和时间是 %s" % i.isoformat() )
# print ("当前的年份是 %s" %i.year)
# print ("当前的月份是 %s" %i.month)
# print ("当前的日期是  %s" %i.day)
# print ("dd/mm/yyyy 格式是  %s/%s/%s" % (i.day, i.month, i.year) )
# print ("当前小时是 %s" %i.hour)
# print ("当前分钟是 %s" %i.minute)
# print ("当前秒是  %s" %i.second)

# print(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"));
# print(datetime.datetime.now().timestamp());

# 函数
# def printme( str ):
#    "打印任何传入的字符串"
#    print(str);
#    return;

# printme(str='sdsdd');

# sumx = lambda x,y:x+y;
# print(sumx(1,5));

# globvar = 0

# def set_globvar_to_one():
#     global globvar    # 使用 global 声明全局变量
#     globvar = 1
#     print(sumx(3,4))

# def print_globvar():
#     print(globvar)     # 没有使用 global

# set_globvar_to_one()
# print(globvar)        # 输出 1
# print_globvar()

# from testPkg.person import Person
# p = Person('gary',23)
# print(p.age)
# p.increaseAge(4)
# print(p.age)

# def manyPar(name='li',age=23,*other):
#     print(name+str(age));
#     for item in other:
#         print(item);

# manyPar('wang',233,'ddfdf','2323');

#-- IO
# str = input("请输入：");
# print("你输入的内容是: ", str);
# import os;
# os.mkdir('files');
# tempFile = os.open('files/test.txt',os.O_RDWR);
# # tempFile.writelines('thisi is tesst\n');
# print(os.read(tempFile,10));
# os.openpty();


# try :
#     print('trigger exception');
#     raise Exception('test',1);
# except Exception as e:
#     print('has error');
#     print(e);

# try:
#     assert 1==2,'this is error';
# except AssertionError as e:
#     print(e);
# stringIO,byteIO
# from io import BytesIO,StringIO
# f = BytesIO()
# s = StringIO()
# f.write('中w'.encode('UTF-8'))
# s.write('i am stringIo')
# print(s.getvalue())


#内置方法
# print(id('sdsd'));
# print('2:',bin(1024));
# print('8:',oct(1000));
# print('16:',hex(100));

# print(len(set('google')));

# a,b =[1,2,3],[4,5,6];
# c = zip(a,b);
# print(list(c));

# print([x * x for x in range(1, 11)]);

# def add(x,y,f):
#     if hasattr(f,'__call__'):
#         return f(x)+f(y)
#     else:
#       print('error');
# print(add(1,2,bin));
# x=set([1,2,3]);
# y=set([3,4,5]);
# print(x|y);
# x = tuple([1,23,34,5,67,21]);
# func = lambda a:len(str(a));

# print(sorted(x,key=func))

# 返回函数
# def lazy_sum(*args):
#     def sum():
#         ax = 0
#         for n in args:
#             ax = ax + n
#         return ax
#     return sum;


# # 装饰器
# def log(func):
#     def wrapper(*params):
#         print('call ',func.__name__);
#         func(*params);
#     return wrapper;

# import functools;
# def logtext(text):
#     def log(func):
#         @functools.wraps(func) //让__name__ 指向func而不是functools
#         def wrapper(*param):
#             print(text,func.__name__);
#             func(*param);
#         return wrapper;
#     return log;
# @logtext('this is test')
# # // 相当于执行了pnow=logtext('this is test')(pnow);
# # //此时的pnow就指向了新的包装过的函数，如果直接调用pnow()相当于调用logtext('this is test')(pnow)(),就会执行内部程序，
# # //也可以手动logtext('this is test')(pnow)()，结果是一样的
# #@log
# def pnow():
#     print('2015-6-7');

# print(pnow.__name__);

# 偏函数
# import functools;
# def pInfo(name,age=20):
#     print(name,'is',age);
# # pInfo('gary',30);
# pInfox=functools.partial(pInfo,age=23);

# 类

# class person:

#     def __init__(self,age):
#         self.age=age;
#     def getAge(self):
#         global age;
#         return self.age;

# class men(person):
#     __info='this private';
#     _infoP = 'this i protect';
#     def __init__(self,sex):
#         person.__init__(self,11);
#         self.__sex=sex;
#     def getSex(self):
#         print(person.getAge(self));
#         print(self.__info);
#         return self.__sex;
# m =men('men');
# print(m.getSex())

# print(type(2)==int);
# print(isinstance(2,int));
# print(isinstance(m,men));

# class Student(object):

#     @property
#     def birth(self):
#         return self._birth

#     @birth.setter
#     def birth(self, value):
#         self._birth = value

#     @property
#     def age(self):
#         return 2015 - self._birth
# b =Student();
# b.birth=123;
# print(b.birth);
# b.age=33;
# print(b.age);

# 枚举
# "sdsd"
# from enum import Enum, unique
# @unique
# class Week(Enum):
#     """sdsd"""
#     Mon = 0
#     Thu = 1
#     Whe = 2
#     Thr = 3
#     Fri = 4


# if  Week.Fri.value == 4:
#     print('yes')
# print(Week.Thu.name)
# print(Week.Thu.value)


#单元测试,使用命令`python3 -m unittest hello.py`运行
# import unittest
# from testPkg.person import Person

# class TestPerson(unittest.TestCase):
#     'test for Person'
#     p = Person('gary', 20)

#     def setUp(self):
#         print('setUp...')

#     def test_increase(self):
#         'test for increase'
#         TestPerson.p.increaseAge(2)
#         self.assertEqual(TestPerson.p.age, 22)

#     def test_init(self):
#         'test for __init__'
#         x = Person('lal', 23)
#         self.assertEqual(x.name, 'lal')
#         self.assertEqual(x.age, 23)

#     def test_change(self):
#         'test for changeName'
#         TestPerson.p.changeName('lik')
#         print(TestPerson.p.name)
#         self.assertEqual(TestPerson.p.name, 'lik')
# 文档测试
# class Dict(dict):
#     '''
#     Simple dict but also support access as x.y style.

#     >>> d1 = Dict()
#     >>> d1['x'] = 100
#     >>> d1.x
#     100
#     >>> d1.y = 200
#     >>> d1['y']
#     200
#     >>> d2 = Dict(a=1, b=2, c='3')
#     >>> d2.c
#     '3'
#     >>> d2['empty']
#     Traceback (most recent call last):
#         ...
#     KeyError: 'empty'
#     >>> d2.empty
#     Traceback (most recent call last):
#         ...
#     AttributeError: 'Dict' object has no attribute 'empty'
#     '''
#     def __init__(self, **kw):
#         super(Dict, self).__init__(**kw)

#     def __getattr__(self, key):
#         try:
#             return self[key]
#         except KeyError:
#             raise AttributeError(r"'Dict' object has no attribute '%s'" % key)

#     def __setattr__(self, key, value):
#         self[key] = value

# if __name__=='__main__':
#     import doctest
#     doctest.testmod()

# 多进程
# unix
# import os

# print('Process (%s) start...' % os.getpid())
# # Only works on Unix/Linux/Mac:
# pid = os.fork()
# if pid == 0:
#     print('I am child process (%s) and my parent is %s.' % (os.getpid(), os.getppid()))
# else:
#     print('I (%s) just created a child process (%s).' % (os.getpid(), pid))
# 跨平台
# from multiprocessing import Process
# import os

#   # 子进程要执行的代码
# def run_proc(name):
#       print('Run child process %s (%s)...' % (name, os.getpid()))
#       print('parent process pid is ', os.getppid())

# if __name__=='__main__':
#       print('Parent process %s.' % os.getpid())
#       p = Process(target=run_proc, args=('test',))
#       print('Child process will start.')
#       p.start()
#       p.join()
#       print('Child process end.')

# import re
# reg = r'^(\d{3})-(\d{1,5})$'
# m=re.match(reg,'010-1234')
# print(m[0])

# import datetime
# print(datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S'))

# collections
# from collections import defaultdict,Counter
# d=defaultdict(lambda: 'x')
# d['key1']='sdsd'
# print(d['key2'])

# c= Counter('asjdsfdsfsaadsklflsdmfl')
# print(c['a'])
# print(c['s'])

#hashlib

# import hashlib

# md5 = hashlib.md5()
# md5.update('how to use md5 in python hashlib?'.encode('utf-8'))
# sha =hashlib.sha1()
# sha.update('sfddfsjdjshfsdfksmfkfjufhs'.encode('UTF-8'))
# print(md5.hexdigest())
# print(sha.hexdigest())

# urllib
# from urllib import request

# req = request.Request('http://www.douban.com/')
# req.add_header('User-Agent', 'Mozilla/6.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/8.0 Mobile/10A5376e Safari/8536.25')
# with request.urlopen(req) as f:
#     print('Status:', f.status, f.reason)
#     for k, v in f.getheaders():
#         print('%s: %s' % (k, v))
#     print('Data:', f.read().decode('utf-8'))
# from urllib import request, parse

# print('Login to weibo.cn...')
# email = input('Email: ')
# passwd = input('Password: ')
# login_data = parse.urlencode([
#     ('username', email),
#     ('password', passwd),
#     ('entry', 'mweibo'),
#     ('client_id', ''),
#     ('savestate', '1'),
#     ('ec', ''),
#     ('pagerefer', 'https://passport.weibo.cn/signin/welcome?entry=mweibo&r=http%3A%2F%2Fm.weibo.cn%2F')
# ])

# req = request.Request('https://passport.weibo.cn/sso/login')
# req.add_header('Origin', 'https://passport.weibo.cn')
# req.add_header('User-Agent', 'Mozilla/6.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/8.0 Mobile/10A5376e Safari/8536.25')
# req.add_header('Referer', 'https://passport.weibo.cn/signin/login?entry=mweibo&res=wel&wm=3349&r=http%3A%2F%2Fm.weibo.cn%2F')

# with request.urlopen(req, data=login_data.encode('utf-8')) as f:
#     print('Status:', f.status, f.reason)
#     for k, v in f.getheaders():
#         print('%s: %s' % (k, v))
#     print('Data:', f.read().decode('utf-8'))

# 第三方模块
# from PIL import Image,ImageFilter
# im = Image.open('files/aerial.jpg')
# w,h = im.size
# im3 = im.filter(ImageFilter.BLUR)
# im3.save('files/blur.jpg','jpeg')
# print("save successful")

# GUI
# from tkinter import *
# import tkinter.messagebox as messagebox
# class Application(Frame):
#     def __init__(self,master=None):
#         Frame.__init__(self,master)
#         self.pack()
#         self.createWidgets()
#     def createWidgets(self):
#         self.helloLabel = Label(self,text="why not this")
#         self.helloLabel.pack()
#         self.quitButton = Button(self,text="Quit", command=self.quit)
#         self.quitButton.pack()
#         self.nameInput = Entry(self)
#         self.nameInput.pack()
#         self.alertButton = Button(self, text='Hello', command=self.hello)
#         self.alertButton.pack()
#     def hello(self):
#         name = self.nameInput.get() or 'world'
#         messagebox.showinfo('Messagex', 'Hello, %s' % name)

# app = Application()
# app.master.title('x')
# app.mainloop()
# print('sdsd'*4)

# print(list(range(5,100)))

# print(2 << 2)














