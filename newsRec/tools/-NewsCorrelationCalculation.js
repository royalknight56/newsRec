/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-03-11 09:32:53
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-06 12:04:22
 */
let mysql = require('../mysql/mysql');
// let fs = require("fs")
// var readline = require('readline');
let lineReader = require('../util/lineReader')
const loger = require('../util/loger');

class Correlation {
    constructor(file) {
        this.db = this.connect()
        this.file = file
        this.news_tags = this.loadData();
        this.news_cor_list = this.getCorrelation()
    }
    connect() {//连接数据库
        return mysql.connection
    }
    loadData() {//同步加载文件中的数据
        let news_tags_dict = {};

        let line = new lineReader();
        line.open(this.file);
        while (!line._EOF) {
            let theline = line.next();
            if (theline) {
                let newid = theline.split('\t')[0];
                let newtags = theline.split('\t')[1];
                news_tags_dict[newid] = newtags;
            }
        }

        line.close();

        return news_tags_dict
    }
    getCorrelation() {
        let news_cor_list = [];
        for (let newid1 in this.news_tags) {
            let id1_tags = this.news_tags[newid1].split(",");
            for (let newid2 in this.news_tags) {
                let id2_tags = this.news_tags[newid2].split(",");
                if (newid1 != newid2) {

                    let copy_id1_tags = Array.from(new Set(id1_tags));
                    let copy_id2_tags = Array.from(new Set(id2_tags));

                    let total_length = copy_id1_tags.length + copy_id2_tags.length
                    let copy_total_array = copy_id1_tags.concat(copy_id2_tags);
                    let not_sim_array = Array.from(new Set(copy_total_array));
                    let not_sim_length = not_sim_array.length;

                    let cor = (total_length - not_sim_length) / total_length;
                    cor = cor.toFixed(4)
                    if (cor > 0.0) {
                        news_cor_list.push([newid1, newid2, cor])
                    }

                }
            }
        }
        return news_cor_list
    }
    updateMySQL() {
        for (let i = 0; i < this.news_cor_list.length; i++) {
            mysql.update('newsim',
                { correlation: this.news_cor_list[i][2] },
                `new_id_base = ${this.news_cor_list[i][0]} AND new_id_sim = ${this.news_cor_list[i][1]};`
            ).catch((res) => {
                if (i == this.news_cor_list.length - 1) {
                    loger.erro(JSON.stringify(res))
                }
            })
            if (i == this.news_cor_list.length - 1) {
                loger.info('新闻相似度数据库-更新完毕')
            }
        }
    }
    writeToMySQL() {
        for (let i = 0; i < this.news_cor_list.length; i++) {
            mysql.insert('newsim',
                {
                    new_id_base: this.news_cor_list[i][0],
                    new_id_sim: this.news_cor_list[i][1],
                    correlation: this.news_cor_list[i][2]
                }).then((res) => {
                    if (i == this.news_cor_list.length - 1) {
                        loger.info('新闻相似度数据库-插入完毕')
                    }
                }).catch((res) => {
                    // if (res.state == false) {
                    //     mysql.update('newsim',
                    //         { correlation: this.news_cor_list[i][2] },
                    //         `new_id_base = ${this.news_cor_list[i][0]} AND new_id_sim = ${this.news_cor_list[i][1]};`
                    //     ).catch((res) => {
                    //         if (i == this.news_cor_list.length - 1) {
                    //             loger.erro(JSON.stringify(res))
                    //         }
                    //     })
                    //     if (i == this.news_cor_list.length - 1) {
                    //         loger.info('新闻相似度数据库-更新完毕')
                    //     }
                    // }
                })
        }
    }
}
loger.info('1txt')
let test = new Correlation('../data/1.txt')
test.updateMySQL()
loger.info('2txt')
let test2 = new Correlation('../data/2.txt')
loger.info('3txt')
let test3 = new Correlation('../data/3.txt')
loger.info('4txt')
let test4 = new Correlation('../data/4.txt')
// test.writeToMySQL()
