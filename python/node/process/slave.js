console.log(`进程${process.argv[2]}执行`);

// console.log('child argv: ', process.argv);
process.on('message', m => {
  console.log('message in child:', m);
});
setTimeout(() => {
  process.send('send from child');
}, 2000);