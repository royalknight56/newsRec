/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-07 12:30:26
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-05-19 11:08:13
 */
require("../mysql/makeData")

let { getRecUser } = require('../tools/getRecUsers')
let { getRecNews, getRandomNews, getNewsContent } = require("../tools/getNews")
let { storeKeyWords } = require('../tools/getNewsKeyWords')
let { browserNews } = require("../tools/userBrowse")
let { register, isAdmin } = require("../tools/registerUser")
let { addPush,getPush } = require("../tools/pushSys")

getPush(1011)

let express = require('express');
const bodyParser = require('body-parser');
const loger = require('../util/loger');

const HTTP_PORT = 8068

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

async function newsRecUser(title, artic) {
    let newid = await storeKeyWords(title, artic);//提取新闻关键词
    let list =await getRecUser(newid)//获得推荐用户列表
    return {newid,list}
}

app.post('/test', async function (req, respon) {//测试接口
    loger.info('/test')
    respon.send('ttt')
})

app.post('/uploadNews', async function (req, respon) {//上传新闻接口
    loger.info('/uploadNews')
    let isAd =await isAdmin(req.body.id)
    if (isAd) {
        if (req.body.content && req.body.title) {
            let res = await newsRecUser(req.body.title, req.body.content);
            respon.send(JSON.stringify(res))
        } else {
            respon.send(JSON.stringify({
                code: 404
            }))
        }
    } else {
        respon.send(JSON.stringify({
            code: 403
        }))
    }
})

app.post('/uploadNewsTest', async function (req, respon) {//上传新闻接口(测试)
    loger.info('/uploadNews')
    let isAd =await isAdmin(req.body.id)
    if (isAd) {
        if (req.body.content && req.body.title) {
            // let res = await newsRecUser(req.body.title, req.body.content);
            let newid= 1003;
            let list = [{id:1004}]
            respon.send(JSON.stringify({newid,list}))
        } else {
            respon.send(JSON.stringify({
                code: 404
            }))
        }
    } else {
        respon.send(JSON.stringify({
            code: 403
        }))
    }
})

app.post('/browserNews', async function (req, respon) {//浏览新闻接口
    loger.info('/browserNews')
    let res = await browserNews(req.body.userid, req.body.newsid);
    respon.send(JSON.stringify(res))
})

app.post('/register', async function (req, respon) {//注册
    loger.info('/register')
    let res = await register();
    respon.send(JSON.stringify(res))
})

app.post('/ifadmin', async function (req, respon) {//测试接口
    loger.info('/ifadmin')
    let res = await isAdmin(req.body.id);
    respon.send(JSON.stringify(res))
})

app.post('/getRecNews', async function (req, respon) {//获得主页推荐新闻列表
    loger.info('/getRecNews')
    let res = await getRecNews(req.body.userid, req.body.curPage, req.body.pageSize)
    respon.send(JSON.stringify(res))
})

app.post('/getRandomNews', async function (req, respon) {//获得主页推荐新闻列表
    loger.info('/getRandomNews')
    let res = await getRandomNews(req.body.pageSize)
    respon.send(JSON.stringify(res))
})
app.post('/getNewsContent', async function (req, respon) {//获得新闻内容
    loger.info('/getNewsContent')
    let res = await getNewsContent(req.body.id)
    respon.send(JSON.stringify(res))
})
app.post('/getPush', async function (req, respon) {//获得推送消息
    // loger.info('/getPush')
    let res = await getPush(req.body.id)
    respon.send(JSON.stringify(res))
})
app.post('/addPush', async function (req, respon) {//添加推送消息
    loger.info('/addPush')
    let res = await addPush(req.body.userlist,JSON.stringify({
        newsid:req.body.newsid
    }))
    respon.send(JSON.stringify(res))
})

app.listen(HTTP_PORT)
loger.info('服务启动,监听端口' + HTTP_PORT)
// loger.erro('服务启动,监听端口'+HTTP_PORT)

