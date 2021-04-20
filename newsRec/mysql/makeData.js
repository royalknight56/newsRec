/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-07 09:53:33
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-17 16:57:59
 */
let sql = require("./mysql")
let { getRecUser } = require('../tools/getRecUsers')
let { storeKeyWords } = require('../tools/getNewsKeyWords')
let fs = require('fs')
let conf = require("./config")
let loger = require('../util/loger')
var request = require('request');

const schedule = require('node-schedule');

var rule1     = new schedule.RecurrenceRule();
var times1    = [1,9,11,16,21];
rule1.hour  = times1;
rule1.minute = 20;

const scheduleCronstyle = () => {
    loger.info('定时任务已经启动')
    //每小时执行一次

    schedule.scheduleJob(rule1, () => {
        loger.info('每小时执行一次导入每日新闻:')
        main()
        // console.log('scheduleCronstyle:' + new Date());
    });
}

scheduleCronstyle();


async function newsRecUser(title, artic) {
    let newid = await storeKeyWords(title, artic);//提取新闻关键词
    return await getRecUser(newid)//获得推荐用户列表
}


async function main() {

    request({
        url: 'http://jisunews.market.alicloudapi.com/news/get',
        method: "GET",
        json: true,
        headers: {
            "content-type": "application/json",
            "Authorization": "APPCODE " + conf.appcode
        },
        qs: {
            channel: "新闻",
            num: "40",
            start: "0"
        }
    }, async function (error, response, body) {
        loger.info('请求中..')
        if (!error && response.statusCode == 200) {
            let newlist = response.body.result.list;
            for (let i = 0; i < newlist.length; i++) {
                let neid = await storeKeyWords(newlist[i].title, newlist[i].content)
                loger.info('新闻已经导入' + i + '篇;' + "新闻id:" + neid)
            }
            loger.info('新闻已经导入结束')
        }
    }
    )
}
