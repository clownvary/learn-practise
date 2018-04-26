from PIL import Image
import os
import argparse

ascii_chars = list(".!^*@-_+~<>")

def getChar(r,g,b,alpha=256):
    if alpha ==0:
        return ''
    length = len(ascii_chars)
    gray = int(0.2126 * r + 0.7152 * g + 0.0722 * b)
    return ascii_chars[int((gray*length)/(256))]


#accept args
parse = argparse.ArgumentParser()
parse.add_argument('file')
parse.add_argument('-o','--output')
parse.add_argument('--width',default = 80, type=int,required=False)
parse.add_argument('--height',default = 20, type=int,required=False)
args = parse.parse_args()
IMG = args.file
WIDTH = args.width
HEIGHT = args.height
OUTPUT = args.output

if __name__ == '__main__':
    im = Image.open(IMG)
    im = im.resize((WIDTH, HEIGHT), Image.NEAREST)
    txt = ''
    for i in range(HEIGHT):
        for j in range(WIDTH):
           txt+= getChar(*im.getpixel((j, i)))
        txt+= '\n'
print(txt)

if OUTPUT:
    with open(OUTPUT,'w') as target:
        target.write(txt)
else:
    outfile = os.path.join(os.path.dirname(__file__),'output.txt')
    with open(outfile,'w') as f:
        f.write(txt)


