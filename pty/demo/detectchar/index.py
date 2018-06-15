import chardet
code = chardet.detect('手动舒适多所sdssd'.encode('utf-8'))
code2 = chardet.detect('算得上是的V型从v'.encode('gbk'))
print(code2['language'])
