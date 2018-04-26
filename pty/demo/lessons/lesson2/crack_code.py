import sys
import os
# This is used to add new path to sys path,then can load module correspondingly
sys.path.append(os.path.abspath(''))

from PIL import Image


def getHistogram():
    im = Image.open('code.gif')
    im.convert('P')
    his = im.histogram()
    values = {}
    dest={}
    for i in range(len(his)):
        values[i] = his[i]

# reference https://www.shiyanlou.com/courses/running

    for i,j in sorted(values.items(),key=lambda x:x[1],reverse=True)[:10]:
        dest[i]=j
    return dest

im = Image.open('code.gif')
im.convert('P')
im2 = Image.new('P',im.size,255)

for height in range(im.size[1]):
    for width in range(im.size[0]):
        pix = im.getpixel((width,height))
        # 220 is red ,227 is gray, these are we need
        if pix ==220 or pix == 227:
            im2.putpixel((width,height),0)


# get letter start/end
inletter = False
foundletter = False
start = 0
end = 0
letters=[]

for x in range(im2.size[0]):
    for y in range(im2.size[1]):
        pix = im2.getpixel((x, y))
        if pix != 255:
            inletter = True
    if foundletter == False and inletter == True:
        foundletter = True
        start = x
    if foundletter == True and inletter == False:
        foundletter = False
        end = x
        letters.append((start,end))
    inletter = False

#crop letter and save
count=0
for letter in letters:
    im3 = im2.crop((letter[0],0,letter[1],im2.size[1]))
    im3.save('letter{0}{1}.gif'.format(os.sep,count))
    print('save completed')
    count+=1

