/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-07 09:53:33
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-07 10:22:30
 */
let sql = require("./mysql")
async function main(){
    // let userid = 103;
    // for(let i=0;userid<200;i++){
    //     // let userid = id+i
    //     userid++
    //     console.log(userid)
    //     await sql.insert('user',[userid]).catch((res)=>{
    //         console.log(res)
    //     })
    //     let tag = 0;
        
    //     for(let j=0;j<20;j++){
    //         tag+=Math.floor(Math.random()*4)+1
    //         await sql.insert('usertag',[userid,tag,Math.random().toFixed(4)]).catch((res)=>{
    //             console.log(res)
    //         })
    //     }
    // }
    
    let newsid = 10002;
    for(let i=0;i<100;i++){
        // sql.insert('user',[id+i])
        console.log(newsid+i)
        let tag = 0;
        for(let j=0;j<20;j++){
            tag+=Math.floor(Math.random()*4)+1
            await sql.insert('newtag',[newsid+i,tag,Math.random().toFixed(4)]).catch((res)=>{
                console.log(res)
            })
        }
    }
}
