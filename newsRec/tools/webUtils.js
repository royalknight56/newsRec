/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-07 22:17:06
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-07 22:34:27
 */
let {News} =require("../mysql/sqlClass")
let {getRecNews} = require("./getRecUsers")
async function getNewsList(userid){
    let res = await getRecNews(userid)
    console.log(res)
    return res
}

getNewsList(1001)