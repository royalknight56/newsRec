/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-09 12:41:00
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-05-20 20:20:32
 */
let sql = require("../mysql/mysql");
const { News } = require("../mysql/sqlClass");
let loger = require('../util/loger')
async function getRecNews(id,curPage=1,pageSize=20) {
    let recNewsList = []
    let res1 = await sql.query(`

    SELECT * from (SELECT ri.id,ri.tag,COUNT(ri.tag) as cou from
(SELECT * from usertag WHERE usertag.correlation>10 AND usertag.user_id = ${id}) as le
LEFT JOIN
(SELECT * from newtag WHERE newtag.correlation>10) as ri
ON le.tag = ri.tag
GROUP BY id
HAVING cou>2) AS tes
LEFT JOIN
news
ON news.new_id = tes.id
ORDER BY cou DESC
limit ${(curPage-1)*pageSize},${pageSize}
    `)
    let newslist = res1.result;

    // console.log(newslist)
    for (let i = 0; i < newslist.length; i++) {
        recNewsList.push({
            id: newslist[i].id,
            title: newslist[i].new_title
        })
    }
    return recNewsList
}

async function getRandomNews(pageSize=20) {
    let recNewsList = []
    let res1 = await sql.query(`
    SELECT new_id,new_title FROM news ORDER BY RAND() LIMIT ${pageSize}
    `)
    let newslist = res1.result;

    // console.log(newslist)
    for (let i = 0; i < newslist.length; i++) {
        recNewsList.push({
            id: newslist[i].new_id,
            title: newslist[i].new_title
        })
    }
    return recNewsList
}
async function getNewsContent(id){
    let news =await new News().find(id);
    return news.list[0]
}
module.exports={
    getRecNews,
    getRandomNews,
    getNewsContent
}