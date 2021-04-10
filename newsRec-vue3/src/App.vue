<!--
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-09 09:06:28
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-09 14:22:01
-->
<template>
  <router-view></router-view>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import {testCall} from "./api/api_call"
import {kvProvide} from './store/index'
import kv from './store/global'
kvProvide(kv)
// testCall()
// axios.get('/test')
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
</style>