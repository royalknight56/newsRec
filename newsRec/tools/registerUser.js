/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-07 19:39:52
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-07 19:41:11
 */
let {User} =require("../mysql/sqlClass")
async function register(){
    let newuser =await new User().add();
    return newuser
}
module.exports = {
    register
}