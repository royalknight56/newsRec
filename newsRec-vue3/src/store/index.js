/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2020-12-07 15:58:42
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-09 10:30:46
 */
import { provide,ref,reactive } from 'vue'

export function kvProvide(store){
    for(let key in store ){
        let type = typeof store[key]
        if(type == 'function'){
            provide(key,store[key])
        }else if(type == 'object'){
            provide(key,reactive(store[key]))
        }else{
            provide(key,ref(store[key]))
        }
    }
}