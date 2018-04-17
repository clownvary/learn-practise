const fs = require('fs');
const path = require('path');

function finalResult() {
    return new Promise((resolve,reject)=> {
        fs.readFile(path.resolve(__dirname,'./demo.js'),'utf-8',(err,data)=> {

            if(err){
                reject(err);
            }else {
                resolve(data);
            }
        });
    })
}
async function writeFile() {
    const data = await finalResult();
    const filename = 'writefile.txt';
    fs.writeFile(path.resolve(__dirname,filename),data,{encoding:'utf-8'});
}
const getResult = async ()=> {
const x = await finalResult();
return x;
}

/**
 * @description read file
 *
 */
getResult().then(d=>{
    console.log(d);
}).catch(e=> {
    console.log('error',e);
});
/** 
 * @description write file with async
 */
writeFile()