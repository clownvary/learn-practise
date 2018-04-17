import re

str = 'cat1smarter2than3dog'

result = re.match(r'\w{3}',str,re.I)
print(result.group())
res = re.sub(r'\d','xxx',str)
print(res)

