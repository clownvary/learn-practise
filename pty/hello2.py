
#!/usr/bin/env python
# import sys
# import os

# print(os.getcwd())

# """
# Package demo
# """
# from testPkg.Animal.cat import run as catRun
# from testPkg.Animal import dog
# catRun()
# dog.run()

# """
# Decorator func
# """
# import functools
# def logText(text):
#     def log(func):
#         @functools.wraps(func)
#         def wrapper(*args):
#             print('this is log text'+text)
#             func(*args)
#         return wrapper
#     return log

# @logText('ttttttt')
# def test(name,sex,**other):
#     print(name+':'+sex)

# test('g','male')

test2 = lambda x,y:x+y

print(test2(1,4))
site = {"name": "菜鸟教程", "url": "www.runoob.com"}
print("网站名：{name}, 地址 {url}".format(**site))

