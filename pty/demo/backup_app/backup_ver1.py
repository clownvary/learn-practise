import os
import time

source = ['/Users/garywang/work/learn/learn-practise/pty/files']

target_dir ='/Users/garywang/work/learn/learn-practise/pty/backup_dir'

target = target_dir + os.sep +time.strftime('%Y%m%d%H%M%S')+".zip"

if not os.path.exists(target_dir):
    os.makedirs(target_dir)

zip_command = 'zip -r {0} {1}'.format(target,''.join(source))

print('Zip command is:')

print(zip_command);

if os.system(zip_command) == 0:
    print("successfull back up",target)
else:
    print('Backup failed')
