import socket
import const


# single mode
def startClient():
    try:
        client =socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        print('connnecting server......')
        client.connect((const.CONNECT_ADDRESS.get('hostname'),const.CONNECT_ADDRESS.get('port')))
        while True:
            ipt = input('input your msg:')
            msf=client.send(ipt.encode('UTF-8'))
            recv = client.recv(1024)
            if str(recv,encoding="utf8") == 'bye bye':
                break
            else:
                print('msg from server:{0}'.format(str(recv,encoding="utf8")))
        print('client close')
        client.close()

    except Exception as e:
        print('exception is:',e)

# multi mode, not work

def startClients():
    sk = socket.socket()
    sk.connect((const.CONNECT_ADDRESS.get('hostname'),const.CONNECT_ADDRESS.get('port')))  # 主动初始化与服务器端的连接
    while True:
        send_data = input("输入发送内容:")
        sk.sendall(bytes(send_data, encoding="utf8"))
        if send_data == "byebye":
            break
        accept_data = str(sk.recv(1024), encoding="utf8")
        print("".join(("接收内容：", accept_data)))
    sk.close()


# startClients()
startClient();



