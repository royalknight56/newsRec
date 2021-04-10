/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-07 12:30:26
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-09 13:06:41
 */
let {getRecUser}= require('../tools/getRecUsers')
let {getRecNews,getRandomNews,getNewsContent}=require("../tools/getNews")
let {storeKeyWords}= require('../tools/getNewsKeyWords')
let {browserNews}= require("../tools/userBrowse")
let {register}= require("../tools/registerUser")

let express = require('express');
const bodyParser = require('body-parser');
const loger = require('../util/loger');

let app = express();
// app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=UTF-8");
    next();
});

async function newsRecUser(title,artic){
    let newid =await storeKeyWords(title,artic);//提取新闻关键词
    return await getRecUser(newid)//获得推荐用户列表
}

app.post('/test', async function (req, respon) {//上传新闻接口
    loger.info('/test')
    console.log(req.body.id)
    respon.send('ttt')
})

app.post('/uploadNews', async function (req, respon) {//上传新闻接口
    loger.info('/uploadNews')
    let res =await newsRecUser(req.body.title,req.body.content);
    respon.send(JSON.stringify(res))
})
app.post('/browserNews', async function (req, respon) {//浏览新闻接口
    loger.info('/browserNews')
    let res =await browserNews(req.body.userid,req.body.newsid);
    respon.send(JSON.stringify(res))
})
app.post('/register', async function (req, respon) {//注册
    loger.info('/register')
    let res =await register();
    respon.send(JSON.stringify(res))
})

app.post('/getRecNews', async function (req, respon) {//获得主页推荐新闻列表
    loger.info('/getRecNews')
    let res = await getRecNews(req.body.userid,req.body.curPage,req.body.pageSize)
    respon.send(JSON.stringify(res))
})

app.post('/getRandomNews', async function (req, respon) {//获得主页推荐新闻列表
    loger.info('/getRandomNews')
    let res = await getRandomNews(req.body.pageSize)
    respon.send(JSON.stringify(res))
})
app.post('/getNewsContent', async function (req, respon) {//获得主页推荐新闻列表
    loger.info('/getNewsContent')
    let res = await getNewsContent(req.body.id)
    respon.send(JSON.stringify(res))
})


app.listen(8068)


// console.log(newsRecUser(title,artic))
// console.log(browserNews(1001,9))
