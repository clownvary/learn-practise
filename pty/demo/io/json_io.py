import json

def main():
    mydict = {
        'name': 'gary',
        'age': 28,
        'qq': 957658,
        'friends': ['jack', 'lim'],
        'cars': [
            {'brand': 'BYD', 'max_speed': 180},
            {'brand': 'Audi', 'max_speed': 280},
            {'brand': 'Benz', 'max_speed': 320}
        ]
    }
    try:
        print('saving data...')
        with open('demo/io/json.data','w',encoding='utf-8') as file:
            json.dump(mydict,file)
            file.close()
    except IOError as e:
        print('error',e)
    print('saved data')

main()

