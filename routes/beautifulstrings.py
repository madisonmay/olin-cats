#beautifulstrings.py
import string
letters = string.lowercase
values = range(26, 0, -1)
d =  {letters[i]: values[i] for i in range(26)}

data = open('file.txt', 'r')
n = data[0].strip()
print n
