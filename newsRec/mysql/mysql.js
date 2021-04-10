/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-03-06 15:36:47
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-07 18:47:42
 */
let loger = require('../util/loger')
var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: '42.192.121.220',
//     user: 'rec',
//     password: 'qq451582108',
//     database: 'rec'
// });

// connection.connect();
// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     if (results[0].solution == 2) {
//         loger.info('数据库连接成功')
//     }
// });

var pool = mysql.createPool({
    host: '42.192.121.220',
    user: 'rec',
    password: 'qq451582108',
    database: 'rec',
    port: '3306'
});

queryBySql('SELECT 1 + 1 AS solution',null).then((res)=>{//node时测试
    if (res.result[0].solution == 2) {
        loger.info('数据库连接成功')
    }else{
        loger.info('数据库连接失败')
    }
})

function queryBySql(sql,parm){
    return new Promise((res, rej) => {
        let retOBJ = {}
        //查
        pool.getConnection((err, conn) => {
            if (err) {
            } else {
                conn.query(sql,parm, function (err, result) {
                    if (err) {
                        retOBJ = { state: false, err };
                        console.log(err)
                        rej(retOBJ)
                        return
                    } else {
                        retOBJ = { state: true, result };
                        res(retOBJ)
                        return
                    }
                });
                
            }
            conn.release();
        });
    })
}

module.exports = {
    // connection,
    reconnection: function () {
        connection.end((err) => {
            connection.connect();
        })
    },
    /**
     * @name: 
     * @param {String} table
     * @param {String} select
     * @param {String} where
     * @return {*}
     * @Date: 2021-03-07 10:45:21
     * @LastEditors: RoyalKnight
     */
    select: function (table, select, where) {

        let sql;
        if (where) {
            sql = `SELECT ${select} FROM ${table} WHERE ${where}`;
        } else {
            sql = `SELECT ${select} FROM ${table}`;
        }
        return queryBySql(sql,null);

    },

    /**
     * @name: 
     * @param {String} table
     * @param {Object} params
     * @return {*}
     * @Date: 2021-03-07 10:45:27
     * @LastEditors: RoyalKnight
     */
    insert: function (table, params) {
        let valstr = '';
        let addSqlParams = [];

        for (let item in params) {
            valstr += '?,';
            addSqlParams.push(params[item])
        }
        valstr = valstr.slice(0, -1)

        var addSql = `INSERT INTO ${table} VALUES (${valstr})`;
        // loger.info(addSql)
        return queryBySql(addSql,addSqlParams)


    },

    /**
     * @name: 
     * @param {String} table
     * @param {Object} params
     * @param {String} where
     * @return {*}
     * @Date: 2021-03-07 10:45:31
     * @LastEditors: RoyalKnight
     */
    update: function (table, params, where) {
        let setStr = '';
        let modSqlParams = [];
        for (let key in params) {
            setStr += `${key} = ?,`;
            modSqlParams.push(params[key])
        }
        setStr = setStr.slice(0, -1);
        let modSql = `UPDATE ${table} SET ${setStr} WHERE ${where}`;

        return queryBySql(modSql,modSqlParams)

    },

    /**
     * @name: 
     * @param {*} table
     * @param {*} where
     * @return {*}
     * @Date: 2021-03-07 10:45:34
     * @LastEditors: RoyalKnight
     */
    delete: function (table, where) {
        var delSql = `DELETE FROM ${table} where ${where}`;
        return queryBySql(delSql)

    },

    /**
     * @name: 
     * @param {*} table
     * @param {*} where
     * @return {*}
     * @Date: 2021-03-07 10:45:34
     * @LastEditors: RoyalKnight
     */
     query: function (sql) {
        return queryBySql(sql)

    }
}