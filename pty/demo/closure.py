#
def time(x):
    return lambda n:n*x

time3 = time(3)
time5 = time(5)

'''
>>> 21
'''
print(time3(7))

'''
>>> 35
'''
print(time5(7))
