/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-05-12 20:43:11
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-05-12 21:36:58
 */
let sql = require("../mysql/mysql")
module.exports={
    addPush,
    getPush
}
async function addPush(userlist,message){
    for(let i= 0;i<userlist.length;i++){
        await sql.insert('message',[0,userlist[i].id,'push',message])
    }
}
async function getPush(userid){
    let res =  await sql.select('message','*',`user_id=${userid}`)

    console.log(res.result)
    // sql.delete('message',`user_id=${userid}`)
    return res.result
}