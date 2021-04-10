/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-03-06 15:45:24
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-03-07 11:05:03
 */

module.exports={
    out:function(fom,text){
        let time = new Date();
        console.log(`${fom} [${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}] ${text}`)
    },
    info:function(text){
        this.out(`[INFO]`,text)
    },
    erro:function(text){
        this.out(`[ERRO]`,text)
    }
}