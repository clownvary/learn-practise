# encoding=utf-8
import pickle


class Person(object):
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def getInfo(self):
        print('name:{0}, age:{1}'.format(self.name, self.age))


def serialize():
    p = Person('gary', 20)
    print('start serialize')
    p.getInfo()
    file = open('demo/io/person.data', 'wb')
    pickle.dump(p, file)
    file.close()
    print('serialize successful')


def unSerialize():
    file = open('demo/io/person.data', 'rb')
    p = pickle.load(file)
    print('start unSerialize')
    p.getInfo()
    print('unSerialize successful')

# serialize()
unSerialize()

# print('x')
