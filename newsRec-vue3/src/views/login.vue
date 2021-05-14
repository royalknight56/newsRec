<!--
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-09 10:15:20
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-05-12 22:24:09
-->
<template>
  <div>
    <input v-model="inputUserid" />
    <button @click="login()">登录</button>
    <button @click="newUser()">新用户</button>
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

<style>
</style>