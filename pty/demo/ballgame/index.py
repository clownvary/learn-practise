import pygame
from random import randint
from Ball import Color,Ball
def main():
    pygame.init()
    # 定义用来装所有球的容器
    balls = []
    screen = pygame.display.set_mode((400,200))
    pygame.display.set_caption('大球吃小球')

    image=pygame.image.load('demo/ballgame/ball.png')
    x,y=50,50
    # screen.blit(image,(50,50))
    # pygame.display.flip()
    running = True
    # 开启一个事件循环处理发生的事件
    while running:
    	# 从消息队列中获取事件并对事件进行处理
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.MOUSEBUTTONDOWN and event.button == 1:
                # 获得点击鼠标的位置
                x, y = event.pos
                radius = randint(10, 15)
                sx, sy = randint(-10, 10), randint(-10, 10)
                color = Color.random_color()
                # 在点击鼠标的位置创建一个球(大小、速度和颜色随机)
                ball = Ball(x, y, radius, sx, sy, color)
                # 将球添加到列表容器中
                balls.append(ball)
        screen.fill((242,242,242))
        # 取出容器中的球 如果没被吃掉就绘制 被吃掉了就移除
        for ball in balls:
            if ball.alive:
                ball.draw(screen)
            else:
                balls.remove(ball)
        pygame.display.flip()
        # 每隔50毫秒就改变球的位置再刷新窗口
        pygame.time.delay(50)
        for ball in balls:
            ball.move(screen)
            # 检查球有没有吃到其他的球
            for other in balls:
                ball.eat(other)

main()

