/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-03-07 10:52:29
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-03-07 10:56:18
 */
let sql = require('./mysql')
let loger = require('../util/loger')
async function mysqlTest() {
    let testTable = 'test'

    let re = await sql.insert(testTable, [0,new Date().toDateString()]).then((res)=>{
        loger.info('数据库插入操作成功');
        return res
    }).catch((res)=>{
        loger.erro('数据库插入操作失败');
        return res
    });

    let re2 = await sql.update(testTable,{time:new Date().toDateString()}, `id=${re.result.insertId}`).then((res)=>{
        loger.info('数据库更改操作成功');
    }).catch((res)=>{
        loger.erro('数据库更改操作失败');
        loger.erro(JSON.stringify(res))
    });

    let re3 = await sql.select(testTable,'*', `id=${re.result.insertId}`).then((res)=>{
        if(res.result[0].id==re.result.insertId){
            loger.info('数据库查询操作成功');
        }else{
            loger.info('数据库查询操作失败-id不匹配');
        }
    }).catch((res)=>{
        loger.erro('数据库查询操作失败');
        loger.erro(JSON.stringify(res))
    });

    let re4 = await sql.delete(testTable, `id=${re.result.insertId}`).then((res)=>{
        loger.info('数据库删除操作成功');
    }).catch((res)=>{
        loger.erro('数据库删除操作失败');
        loger.erro(JSON.stringify(res))
    });
    return re
}
mysqlTest()