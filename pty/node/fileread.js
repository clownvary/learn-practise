var fs = require('fs');
// import fs from 'fs';
// var x= fs.readFile('./input.txt',function(err,data){
//     if(err) return console.log(err);
//     console.log(data.toString());
// })
// console.log('end');

//exports
// var exp  = require('./module/exports');
// console.log(exp.name());

//module.exports
var mexp = require('./module/module_exports');
var p = new mexp('me',12);
p.about();
p.arrow();
