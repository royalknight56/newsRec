<!--
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-09 13:07:28
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-10 14:22:50
-->
<template>
<div class="header">
      <div class="logo header_item">民生MS</div>
      <button class="header_item header_button" @click="back()">返回</button>
      <button class="header_item header_button" @click="refresh()">刷新</button>
  </div>
<div class="new_title">
{{global_news.obj.new_title}}
</div>
<article class="new_content">
  {{global_news.obj.new_content}}</article>
  <!-- <button @click="back()">返回</button> -->
</template>

<script setup>
import { inject } from "vue";
import { useRouter } from "vue-router";

let global_news = inject('global_news')
let router = useRouter();
function back(){
    router.back()
}
console.log(global_news)
</script>

<style scoped>

.new_title{
  width: 100%;
  padding: 40px 0;
  text-align: center;
  font-size: 30px;
}
.new_content{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 80vw;
  /* text-overflow:unset; */
  white-space:pre-wrap;
  font-size: 18px;
  text-indent: 2em;
  line-height: 2em;
}
</style>