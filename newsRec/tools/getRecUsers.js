/*
 * @Descripttion: 根据新闻关键词获取推荐的用户列表
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-03-12 14:40:43
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-05-20 20:25:11
 */

let sql = require("../mysql/mysql")
let loger = require('../util/loger')
let { NewTag, UserTag, User, News } = require("../mysql/sqlClass")

/**
 * @name: 从标签列表中获取推荐用户
 * @param {*} tag_list
 * @return {*}
 * 标签列表是新闻的id标签,将top10标签与每个用户匹配,只要有3个以上与用户前50相同,就将该用户加入返回数组
 * @Date: 2021-04-06 18:42:46
 * @LastEditors: RoyalKnight
 */
async function getRecUser(id,curPage=1,pageSize=20) {
    // loger.info('新闻id' + id)
    let recUserList = []
    let res1 = await sql.query(
    `SELECT * from (SELECT le.user_id,ri.tag,COUNT(ri.tag) as cou from
(SELECT * from usertag WHERE usertag.correlation>10) as le
LEFT JOIN
(SELECT * from newtag WHERE newtag.correlation>10 AND newtag.id = ${id}) as ri
ON le.tag = ri.tag
GROUP BY id
HAVING cou>2) AS tes
ORDER BY cou DESC
limit ${(curPage-1)*pageSize},${pageSize}
`
    )
    let userlist =res1.result;
    for (let i = 0; i < userlist.length; i++) {
        recUserList.push({
            id: userlist[i].user_id,
        })
    }
    //nodejs查询:
    // let newtag = await new NewTag().find(id);

    // let userObj = await new User().all();

    // let userlist = userObj.getList();

    // for (let i = 0; i < userlist.length; i++) {
    //     let usertag = await new UserTag().find(userlist[i].id);

    //     let commonTags_List = newtag.top(10).getTags().commonTags(usertag.top(50).getTags())//选出共有标签列表
    //     if (commonTags_List.length > 0) {
    //         if (commonTags_List.length > 4) {
    //             recUserList.push(userlist[i])
    //         }
    //     }
    // }
    return recUserList
}



module.exports = {
    getRecUser
}