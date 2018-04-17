import os,time,subprocess,sys,getopt

def backup():
    source = ['/Users/garywang/work/learn/learn-practise/pty/files']
    target_dir ='/Users/garywang/work/learn/learn-practise/pty/backup_dir'

    today = target_dir + os.sep + time.strftime('%y%m%d');
    target = today + os.sep + time.strftime('%H%M%S')+'.zip'

    if not os.path.exists(today):
        os.makedirs(today)
        print('Successfully created directory', today)
    command = 'zip -r {0} {1}'.format(target,''.join(source))

    print('zip command start...')
    if subprocess.call(command,shell = True) == 0:
        print('successful backup')
    else:
        print('failed')

backup()
