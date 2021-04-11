/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-11 11:00:32
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-11 11:00:33
 */
var assert = require('assert');
let should = require('should');
let sql = require("../mysql/mysql")
describe('SQL', function () {
    let testTable = 'test'
    let insID = 0;
    it('SQL插入测试',async function () {
        const res = await sql.insert(testTable, [0,new Date().toDateString()]);
        res.result.should.have.value("affectedRows",1);
        res.result.should.have.key("insertId");
        insID = res.result.insertId
    });
    it('SQL更新测试',async function(){
        const res =await sql.update(testTable,{time:new Date().toDateString()}, `id=${insID}`)
        res.result.should.have.value("affectedRows",1);
        // res.result.should.have.key("insertId");
    })
    it('SQL查询测试',async function(){
        const res =await sql.select(testTable,'*', `id=${insID}`)

        res.result.should.have.length(1)
        res.result[0].should.have.value("id",insID);
    })
    it('SQL删除测试',async function(){
        const res =await sql.delete(testTable, `id=${insID}`)
        res.result.should.have.value("affectedRows",1);
    })
});