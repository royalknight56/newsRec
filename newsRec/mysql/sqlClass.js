/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-06 18:55:48
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-09 13:07:00
 */
let sql = require("./mysql")

class TagList {
    constructor(Arr) {
        this.list=[];
        for(let i=0;i<Arr.length;i++){
            this.list.push(
                Arr[i].tag
            )
        }
    }
    commonTags(obj) {
        let newArr = [];
        for (let i = 0; i < obj.list.length; i++) {
            for (let j = 0; j < this.list.length; j++) {
                if (this.list[j] === obj.list[i]) {
                    newArr.push(this.list[j]);
                }
            }
        }
        return newArr;
    }
}

class UserTag {
    constructor() {
        this.list = []
        this.id = 0;
    }
    async find(id) {
        this.id = id;
        let res = await sql.select('usertag', '*', `user_id = ${id}`)
        this.list = res.result;
        return this
    }
    top(num) {
        this.list = this.list.sort((a, b) => {
            return b.correlation - a.correlation
        })
        this.list.splice(num)
        return this
    }
    getTags(){
        return new TagList(this.list)
    }
    async timeReduce(user_id){
        sql.query(
            `UPDATE usertag SET correlation= correlation-1 WHERE user_id=${user_id}`
        )
        //UPDATE `usertag` SET `correlation`= `correlation`-0.1 WHERE `user_id`=101
        //UPDATE `usertag` SET `correlation`= `correlation`-0.2 WHERE `user_id`=
    }
    async add(user_id,tag,correlation){
        
        sql.insert('usertag',[user_id,tag,correlation])
    }
    async set(newsTag,corr){
        sql.query(
            `UPDATE usertag SET correlation=${corr} WHERE user_id=${this.id} AND tag="${newsTag}"`
        )
    }
}

class NewTag {
    constructor() {
        this.list = []
    }
    async find(id) {
        let res = await sql.select('newtag', '*', `id = ${id}`)
        this.list = res.result;
        return this
    }
    top(num) {
        this.list = this.list.sort((a, b) => {
            return b.correlation - a.correlation
        })
        this.list.splice(num)
        return this
    }
    getTags(){
        return new TagList(this.list)
    }
    async add(new_id,tag,correlation){
        sql.insert('newtag',[new_id,tag,correlation])

    }
}

class User {
    constructor() {
        this.list = []
    }
    async all(id) {
        let res = await sql.select('user', '*')
        this.list = res.result;
        return this
    }
    getList(){
        return this.list
    }
    top(num) {
        this.list = this.list.sort((a, b) => {
            return b.correlation - a.correlation
        })
        this.list.splice(num)
        return this
    }
    async add(){
        let res =await sql.select('user',"max(id)")
        let maxid = res.result[0]['max(id)'];
        let id = maxid+1;
        sql.insert('user',[id])

        return id
    }
}


class News {
    constructor() {
        this.list = []
        this.id = 0;
    }
    async all(id) {
        let res = await sql.select('news', '*')
        this.list = res.result;
        return this
    }
    async find(id){
        this.id = id
        let res = await sql.select('news', '*', `new_id = ${id}`)
        this.list = res.result;
        return this
    }
    getList(){
        return this.list
    }
    async getMax(){
        let res =await sql.select('news',"max(new_id)")
        let maxid = res.result[0]['max(new_id)'];
        return maxid
    }
    async add(title,content){
        "select max(`new_id`) from news"
        let res =await sql.select('news',"max(new_id)")
        let maxid = res.result[0]['max(new_id)'];
        this.id = maxid+1;
        sql.insert('news',[maxid+1,0,new Date(),0,0,title,content])
    }
}

module.exports = {
    TagList,
    UserTag,
    NewTag,
    User,
    News
}