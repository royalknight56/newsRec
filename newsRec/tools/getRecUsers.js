/*
 * @Descripttion: 根据新闻关键词获取推荐的用户列表
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-03-12 14:40:43
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-09 12:41:34
 */

let sql = require("../mysql/mysql")
let loger = require('../util/loger')
let { NewTag, UserTag, User, News } = require("../mysql/sqlClass")


async function test() {
    let newtagTest = new NewTag();
    let res = await newtagTest.find(10001);

    let usertagTest = new UserTag();
    let resu = await usertagTest.find(101);

    let res2 = res.top().getTags().commonTags(resu.top().getTags())
    console.log(res2)
}
// test()


/**
 * @name: 从标签列表中获取推荐用户
 * @param {*} tag_list
 * @return {*}
 * 标签列表是新闻的id标签,将top10标签与每个用户匹配,只要有3个以上与用户前50相同,就将该用户加入返回数组
 * @Date: 2021-04-06 18:42:46
 * @LastEditors: RoyalKnight
 */
async function getRecUser(id) {
    loger.info('新闻id' + id)
    let recUserList = []
    // let newtagObj = new NewTag();
    //SELECT newtag.id,newtag.tag,COUNT(newtag.tag) from usertag LEFT JOIN newtag ON usertag.tag = newtag.tag GROUP BY id

    let newtag = await new NewTag().find(id);

    let userObj = await new User().all();

    let userlist = userObj.getList();

    for (let i = 0; i < userlist.length; i++) {
        // let usertagObj = new UserTag();
        let usertag = await new UserTag().find(userlist[i].id);

        let commonTags_List = newtag.top(10).getTags().commonTags(usertag.top(50).getTags())
        if (commonTags_List.length > 0) {
            if (commonTags_List.length > 4) {
                recUserList.push(userlist[i])
            }
        }
    }
    // console.log(recUserList)
    return recUserList
}


// getRecUser(10003)//TEST

module.exports = {
    getRecUser
}