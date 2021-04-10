/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-09 09:41:55
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-09 14:16:01
 */
import {
    instance
} from "./axios_cfg.js"


/**
 * @name: 测试api
 * @param {*} e
 * @return {*}
 * @Date: 2021-04-09 14:14:13
 * @LastEditors: RoyalKnight
 */
export const testCall = function (e) {//测试api
    instance.post('/test', {
        id: '2323'
    })
    return
}

/**
 * @name: 上传新闻
 * @param {*} {
        title: e.title,
        content: e.content
    }
 * @return {*}
 * @Date: 2021-04-09 14:14:29
 * @LastEditors: RoyalKnight
 */
export const uploadNews = function (e) {//上传新闻
    return instance.post('/uploadNews', {
        title: e.title,
        content: e.content
    })
}

/**
 * @name: 用户浏览新闻
 * @param {*} {
        userid: e.userid,
        newsid: e.newsid
    }
 * @return {*}
 * @Date: 2021-04-09 14:14:46
 * @LastEditors: RoyalKnight
 */
export const browserNews = function (e) {//用户浏览新闻
    return instance.post('/browserNews', {
        userid: e.userid,
        newsid: e.newsid
    })
}

/**
 * @name: 用户注册
 * @param {*} e
 * @return {*}
 * @Date: 2021-04-09 14:15:10
 * @LastEditors: RoyalKnight
 */
export const register = function (e) {
    return instance.post('/register', {
    })
}

/**
 * @name: 获得推荐新闻
 * @param {*} e{
        userid:e.userid,
        curPage:e.curPage,
        pageSize:e.pageSize
    }
 * @return {*}
 * @Date: 2021-04-09 11:06:17
 * @LastEditors: RoyalKnight
 */
export const getRecNews = function (e) {

    return instance.post('/getRecNews', 
        {
            userid: e.userid,
            curPage: e.curPage,
            pageSize: e.pageSize
        }
    )
}


/**
 * @name: 获得随机新闻
 * @param {*} {
            pageSize: e.pageSize
        }
 * @return {*}
 * @Date: 2021-04-09 14:15:38
 * @LastEditors: RoyalKnight
 */
export const getRandomNews = function (e) {

    return instance.post('/getRandomNews', 
        {
            pageSize: e.pageSize
        }
    )
}


/**
 * @name: 获得新闻信息
 * @param {*} {
            id: e.id
        }
 * @return {*}
 * @Date: 2021-04-09 14:15:50
 * @LastEditors: RoyalKnight
 */
export const getNewsContent = function (e) {

    return instance.post('/getNewsContent', 
        {
            id: e.id
        }
    )
}