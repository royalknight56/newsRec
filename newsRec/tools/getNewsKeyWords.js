/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-07 10:56:17
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-14 09:41:58
 */
var nodejieba = require("nodejieba");
let {News,NewTag} = require("../mysql/sqlClass")
function getKeyWords(string){
    nodejieba.load();//加载词典包括停用词表
    return nodejieba.extract(string, 10)
}
async function storeKeyWords(title,artic){
    let newslist = new News();
    let preCN =artic.replace(/((?![\u4e00-\u9fa5]).)/g, "")//提取出纯中文
    let tag = getKeyWords(preCN)//通过文本得到关键词表

    await newslist.add(title,artic)//添加到数据库中
    let newid = newslist.id;
    let newtag = new NewTag();
    for(let i=0;i<tag.length;i++){
        await newtag.add(newid,tag[i].word,tag[i].weight)//逐个保存new-tag到数据库中
    }
    return newid
}

module.exports={
    storeKeyWords
}