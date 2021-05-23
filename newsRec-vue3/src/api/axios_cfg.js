/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-09 09:24:28
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-05-19 15:25:57
 */
import axios from 'axios';

let instance = axios.create({
    baseURL: 'http://myim.online:8068/',//接口统一域名
    // baseURL: 'http://localhost:8068/',//接口统一域名
    timeout: 6000                                                       //设置超时
})

export {
    instance
}