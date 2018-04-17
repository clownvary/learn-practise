import socket
import socketserver
import const


def startServer():
    try:
        server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        server.bind((const.CONNECT_ADDRESS.get('hostname'),
                     const.CONNECT_ADDRESS.get('port')))
        print('server start bind on {0}'.format(
            const.CONNECT_ADDRESS.get('port')))
        server.listen(3)
        while True:
            conn, addr = server.accept()
            while True:
                accept_data = str(conn.recv(1024), encoding="utf8")
                print(
                    "".join(["接收内容：", accept_data, "     客户端口：", str(addr[1])]))
                if accept_data == "byebye":  # 如果接收到“byebye”则跳出循环结束和第一个客户端的通讯，开始与下一个客户端进行通讯
                    break
                send_data = input("输入发送内p容：")
                conn.sendall(bytes(send_data, encoding="utf8"))
            conn.close()  # 跳出循环时结束通讯
    except Exception as e:
        print('error is ', e)


class MyServer(socketserver.BaseRequestHandler):
    def handle(self):
        while True:
            conn = self.BaseRequestHandler
            addr = self.client_address
            while True:
                accept_data = str(conn.recv(1024), encoding='utf-8')
                print(accept_data)
                if accept_data == 'bye bye':
                    break
                send_data = bytes(input('>>>>'), encoding='utf-8')
                conn.sendall(send_data)
            conn.close()


# start single mode
startServer()

# # start multi mode, not work
# if __name__ == '__main__':
#     server = socketserver.ThreadingTCPServer((const.CONNECT_ADDRESS.get('hostname'), const.CONNECT_ADDRESS.get('port')), MyServer)
#     server.serve_forever()
