import os,sys,time
from time import time, localtime, sleep

from PIL import Image,ImageFilter,ImageGrab,ImageOps,ImageFilter,ImageDraw,ImageFont,ImageEnhance
img = Image.open(os.path.dirname(__file__)+os.sep+'chess.jpg')

destpath = lambda name: os.path.dirname(__file__)+os.sep+name+'.jpg'

# h,w = img.size
# img.thumbnail((w//1,h//1))
# print('image thumbnailing...')
# img.save(os.path.dirname(__file__)+os.sep+'thumbnail.png','png')

# print('grab image...')
# grab = ImageGrab.grab()
# grab = ImageOps.fit(grab,(700,500))#
# grab.save(os.path.dirname(__file__)+os.sep+'grab1.png','png')
# grab.show()

# print('image filter...')
# img2 =img.filter(ImageFilter.EDGE_ENHANCE_MORE)
# img2.save(destpath('filter'),'jpeg')
# img2.show()

# print('image draw text')
# img2 = img.copy()
# draw = ImageDraw.Draw(img2)
# text = 'hello world'
# color = (255,0,0)
# position =(20,20)
# draw.text(position,text,color,direction='btt',align='right')
# img2.save(destpath('text'))
# img2.show()

# print('image enhance')
# img2 = img.copy()
# enhancer = ImageEnhance.Contrast(img2)
# img3 = enhancer.enhance(50)
# img3.save(destpath('enhance'))
# img3.show()

import tkinter
import tkinter.messagebox


def main():
	flag = True

	# 修改标签上的文字
	def change_label_text():
		nonlocal flag
		flag = not flag
		color, msg = ('red', 'Hello, world!')\
			if flag else ('blue', 'Goodbye, world!')
		label.config(text=msg, fg=color)

	# 确认退出
	def confirm_to_quit():
		if tkinter.messagebox.askokcancel('温馨提示', '确定要退出吗?'):
			top.quit()

	# 创建顶层窗口
	top = tkinter.Tk()
	# 设置窗口大小
	top.geometry('240x160')
	# 设置窗口标题
	top.title('小游戏')
	# 创建标签对象并添加到顶层窗口
	label = tkinter.Label(top, text='Hello, world!', font='Arial -32', fg='red')
	label.pack(expand=1)
	# 创建一个装按钮的容器
	panel = tkinter.Frame(top)
	# 创建按钮对象 指定添加到哪个容器中 通过command参数绑定事件回调函数
	button1 = tkinter.Button(panel, text='修改', command=change_label_text)
	button1.pack(side='left')
	button2 = tkinter.Button(panel, text='退出', command=confirm_to_quit)
	button2.pack(side='right')
	panel.pack(side='bottom')
	# 开启主事件循环
	tkinter.mainloop()

main()
