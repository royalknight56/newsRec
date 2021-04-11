/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-03-06 15:45:24
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-11 09:39:41
 */
let fs = require('fs')
function file_write(text) {
    fs.writeFile('./log', text + '\n', { flag: 'a' }, function (err) {
        if (err) {
            return console.error(err);
        }
    });
}
function console_print(text) {
    console.log(text)
}
function getString(state,text){
    let time = new Date();
    let styMap={
        INFO:'\x1B[32m',
        ERRO:'\x1B[31m'
    }
 
    return `${styMap[state]}[${state}] [${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}] ${text} \x1B[0m`
}
function out_show(state,text){
    let str = getString(state,text)
    file_write(str);
    console_print(str)
}
module.exports={
    info:function(text){
        out_show(`INFO`,text)
    },
    erro:function(text){
        out_show(`ERRO`,text)
    }
}