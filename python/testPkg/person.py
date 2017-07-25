
"""Parent docstring"""


class Person:
    """Parent docstring"""

    def __init__(self, name, age):
        """init method"""
        self.__name = name
        self.__age = age

    def increaseAge(self, step=1):
        """ 
        increase age method
        retrun age
        >>> p = Person('gary',23)
        >>> p.increaseAge(3)
        >>> p.age
        26
        """
        if type(step) == int:
            self.__age += step

    def changeName(self, newName):
        """
        change name 
        return new name
        >>> p = Person('garyx',23)
        >>> p.name 
        'garyx'
        >>> p.changeName('lik')
        >>> p.name
        'lik'
        """
        self.__name = newName

    @property
    def name(self):
        """name getter"""
        return self.__name

    @property
    def age(self):
        """age setter"""        
        return self.__age

if __name__=='__main__':
    import doctest
    doctest.testmod()
