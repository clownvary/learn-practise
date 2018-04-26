# just like middleware as redux

def star(func):
    def inner(*arg,**kargs):
        print('*'*30)
        func(*arg,**kargs)
        print('*'*30)
    return inner

def face(func):
    def inner(*args,**kargs):
        print('-_-'*10)
        func(*args,**kargs)
        print('-_-'*10)
    return inner


# with args
def customizeIcon(icon, number):
    def wrapper(func):
        def inner(*args, **kargs):
            print(icon * number)
            func(*args, **kargs)
            print(icon * number)
        return inner
    return wrapper

@face
@customizeIcon('@',30)
def log(text):
    print('this is log:{0}'.format(text))

log('test')


