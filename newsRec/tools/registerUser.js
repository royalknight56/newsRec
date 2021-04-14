/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-07 19:39:52
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-13 16:34:49
 */
let { User, Admin } = require("../mysql/sqlClass")
async function register() {
    let newuser = await new User().add();
    return newuser
}
async function isAdmin(id) {
    if (id) {
        let newadmin = await new Admin().find(id);
        if (newadmin.list.length > 0) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }

    // console.log(newadmin)
}
module.exports = {
    register,
    isAdmin
}