<!--
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-09 10:15:20
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-05-20 20:03:08
-->
<template>

<div class="login">
    <div class="bg"></div>
    <div class="login_outer">
      <div class="row-div" style="width: 100%; height: 10px">
        <div
          style="width: 190px; height: 100%; background-color: rgb(0, 110, 255)"
        ></div>
        <div
          style="width: 160px; height: 100%; background-color: rgb(0, 164, 255)"
        ></div>
        <div
          style="
            width: 100px;
            height: 100%;
            background-color: rgb(90, 213, 224);
          "
        ></div>
      </div>
      <div class="login_inner_width">
        <div class="login_continer">
          <div class="login_login login_tab">
            <!-- <img src="../../assets/mylogo.png" width="150px" /> -->
            <div class="label">民生新闻网</div>
            <input id="account" placeholder="请输入账号"  v-model="inputUserid" />
              <button  class="primary" @click="login()">登录</button>
                  <button class="missed" @click="newUser()">新用户</button>
          </div>

        </div>
      </div>
    </div>
  </div>

</template>

<script setup>

import { inject, ref } from "vue";
import { register } from "../api/api_call";
import {useRouter} from "vue-router"

let inputUserid =ref('')
let userid = localStorage.getItem("userid");
let global_userid = inject("global_userid");
let router = useRouter()
loginFun();

async function newUser(){
    let res =await register();
    global_userid.value = res.data;
    localStorage.setItem("userid", res.data);
    router.push('/home')
}

async function loginFun() {
  if (userid) {
    //已经有userid了
    global_userid.value = userid;
  
  router.push('/home')
  console.log(localStorage.getItem("userid"));
  } 
}
function login(){
  global_userid.value = inputUserid.value;
  localStorage.setItem("userid", inputUserid.value);
  console.log(localStorage.getItem("userid"));
  router.push('/home')
}
</script>

<style scoped>

.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
  background: url(../assets/bg.jpg) no-repeat 0 0;
  background-size: cover;
}
.row-div {
  display: flex;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  animation: rowdivan 5s infinite;
}
@keyframes rowdivan{
  0%{
    filter: hue-rotate(0deg);
  }
  50%{
    filter: hue-rotate(10deg);
  }
  100%{
    filter: hue-rotate(0deg);
  }
}

.login_continer {
  position: relative;
  /* width: 450px;
  background: #fff;
  color: #000;
  border-radius: 5px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  box-shadow: 0 11px 20px 0 rgba(0, 0, 0, 0.3); */
  display: flex;
  flex-wrap: nowrap;
  flex-flow: row;
  left: 0px;
  transition: all 0.3s;
}
.login_inner_width {
  width: 450px;
  background: #fff;
  color: #000;
  overflow: hidden;
  border-radius: 5px;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  box-shadow: 0 11px 20px 0 rgba(0, 0, 0, 0.3);
}
.login_tab {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  flex-shrink: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  height: 500px;
}

.login_outer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-top: 60px;
}
.login button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
  margin-bottom: 20px;
  width: 70%;
  outline: none;
}
.login button:hover{
    filter: brightness(110%);
    animation: colrot 5s linear  infinite;
}
@keyframes colrot{
    0%{
        filter: hue-rotate(0deg);
    }
    50%{
        filter: hue-rotate(30deg);
    }
    100%{
        filter: hue-rotate(0deg);
    }
}
.login .primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.login .missed {
  color: #fff;
  background-color: #b6b6b6;
  border-color: #9b9b9b;
}
.login .label {
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.login input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  line-height: 40px;
  margin-bottom: 20px;
  width: 70%;
  outline: none;
}

</style>
