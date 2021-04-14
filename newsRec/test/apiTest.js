/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-11 11:01:26
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-11 22:15:01
 */
var assert = require('assert');
let should = require('should');

let {getRecUser}= require('../tools/getRecUsers')
let {getRecNews,getRandomNews,getNewsContent}=require("../tools/getNews")
let {storeKeyWords}= require('../tools/getNewsKeyWords')
let {browserNews}= require("../tools/userBrowse")
let {register,isAdmin}= require("../tools/registerUser")

describe('API', function () {

    it('getRecUser',async function () {
        let res = await getRecUser(1);
        res.should.Array()
    });
    it('getRecNews',async function () {
        let res = await getRecNews(1001);
        res.should.Array()
    });
    it('getRecNews',async function () {
        let res = await getRandomNews();
        res.should.Array()
        res.should.have.length(20)
        res.should.have.value
    });
    it('getNewsContent',async function () {
        let res = await getNewsContent(1);
        res.should.have.key("new_title")
    });

    it('browserNews',async function () {
        let res = await browserNews(1004,1);

        res.should.Boolean()
    });
    it('register',async function () {
        let res = await register();

        res.should.Number()
    });
    it('isAdmin',async function () {
        let res = await isAdmin(1004);
        let res2 = await isAdmin(1002);
        res.should.true()
        res2.should.false()
    });
    
    

});