
// let Per = require('./module/class');
// const p = new Per('gary',22);
// p.getName();
// p.getAge();

// append file data

// const fs = require('fs');

// fs.appendFile('./input.txt','this is test data2\r',(err)=>{
//    if(err)
//    {
//        console.log('occur error');
//    }else{
//        console.log('success');
//    }
// });

// const path =require('path');
// console.log(path.resolve('./input.txt'));

// readline 

// const readline = require('readline');
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
//   prompt: '请输入> '
// });

// rl.prompt();

// rl.on('line', (line) => {
//   switch (line.trim()) {
//     case 'hello':
//       console.log('world!');
//       break;
//     default:
//       console.log(`你输入的是：'${line.trim()}'`);
//       break;
//   }
//   rl.prompt();
// }).on('close', () => {
//   console.log('再见!');
//   process.exit(0);
// });

// const readline = require('readline');
// const fs = require('fs');

// const rl = readline.createInterface({
//   input: fs.createReadStream('input.txt')
// });

// rl.on('line', (line) => {
//   console.log(`文件的单行内容：${line}`);
// });

