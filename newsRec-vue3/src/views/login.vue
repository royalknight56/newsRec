<!--
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-09 10:15:20
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-09 10:51:21
-->
<template>Login</template>

<script setup>
import { inject } from "vue";
import { register } from "../api/api_call";
import {useRouter} from "vue-router"
let userid = localStorage.getItem("userid");
let global_userid = inject("global_userid");
let router = useRouter()
loginFun();
async function loginFun() {
  if (userid) {
    //已经有userid了

    global_userid.value = userid;
  } else {
    let res =await register();
    global_userid.value = res.data;
    localStorage.setItem("userid", res.data);
  }
  router.push('/home')
  console.log(localStorage.getItem("userid"));
}
</script>

<style>
</style>