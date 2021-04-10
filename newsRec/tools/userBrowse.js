/*
 * @Descripttion: 用户浏览新闻,并且更新用户特征

                接口:用户,新闻id,
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-03-12 15:09:22
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-09 14:48:50
 */
// let sql = require("../mysql/mysql")
let {NewTag,UserTag} =require("../mysql/sqlClass")
async function browserNews(user_id,news_id){
    await new UserTag().timeReduce(user_id)
    let newtag =await new NewTag().find(news_id);
    let newtaglist = newtag.top(8).getTags().list;

    let userTag =await new UserTag().find(user_id);
    let usertaglist = userTag.getTags().list;

    for(let i=0;i<newtaglist.length;i++){
        let ind = usertaglist.indexOf(newtaglist[i])
        // console.log(usertaglist[ind])
        if(ind>=0){
            userTag.set(newtaglist[i],userTag.list[ind].correlation+10)
        }else{
            userTag.add(user_id,newtaglist[i],newtag.list[i].correlation)
        }
    }
    // sql.insert('newbrowse',[0,user.id,news.id,new Date().toLocaleString()])

}
module.exports ={
    browserNews
}
// browserNews(101,7)