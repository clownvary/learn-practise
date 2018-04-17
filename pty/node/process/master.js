// exec...
// const fs = require('fs');
// const child_process = require('child_process');

// for (var index = 0; index < 3; index++) {
//     const child = child_process.exec(`node slave.js ${index}`, {'cwd':'../process/'},(err, stdout, stderr) => {
//         if (err) {
//             console.log('occur error');
//             console.log(err);
//         } else {
//             console.log('stdout: ' + stdout);
//             console.log('stderr: ' + stderr);
//         }
//     });
//     child.on('exit',(code)=>{
//         console.log(`子进程已经退出，退出码${code}`);
//     });
// }

//spawn...

// const fs = require('fs');
// const child_process = require('child_process');

// for(var i=0; i<3; i++) {
//    var workerProcess = child_process.spawn('node', ['slave.js', i],{'cwd':'./process'});

//    workerProcess.stdout.on('data', function (data) {
//       console.log('stdout: ' + data);
//    });

//    workerProcess.stderr.on('data', function (data) {
//       console.log('stderr: ' + data);
//    });

//    workerProcess.on('close', function (code) {
//       console.log('子进程已退出，退出码 '+code);
//    });
// }

/**  
 * @description need cd to current file folder then run CMD 
 */
//fork...
const fs = require('fs');
const child_process = require('child_process');

for (var i = 0; i < 3; i++) {
    var worker_process = child_process.fork("./slave.js", [i], { 'cwd': '../process' });

    //    worker_process.stdout.on('data',(d)=>{
    //        console.log(`stdout is ${d}`);
    //    });

    worker_process.on('close', function (code) {
        console.log('子进程已退出，退出码 ' + code);
    });
    worker_process.on('message', m => {
        console.log('message from child: ', m);
    });
    worker_process.send('send from parent');
}
