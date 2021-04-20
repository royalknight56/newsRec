<!--
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-09 13:07:28
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-15 10:59:47
-->
<template>
  <div class="header">
    <div class="logo_text header_item">民生MS</div>
    <button class="header_item header_button" @click="back()">主页</button>
    <!-- <button class="header_item header_button" @click="refresh()">刷新</button> -->
  </div>
  <div class="new_title">
    {{ newsobj.obj.new_title }}
  </div>
  <article v-html="newsobj.obj.new_content" class="new_content"></article>
  <!-- <button @click="back()">返回</button> -->
</template>

<script setup>
import { inject, reactive } from "vue";
import { useRouter } from "vue-router";
import { browserNews, getNewsContent } from "../api/api_call";

let router = useRouter();
console.log(router.currentRoute.value.query.id);
function back() {
  router.push("/home");
}

let global_userid = inject("global_userid");
let newsobj = reactive({obj:{}})
async function init() {
  let res = await getNewsContent({ id: router.currentRoute.value.query.id });
  let ves = await browserNews({
    userid: global_userid.value,
    newsid: router.currentRoute.value.query.id,
  });
  newsobj.obj = { ...res.data };
}
init();

// console.log(global_news)
</script>

<style scoped>
@import url("../assets/header.css");
.new_title {
  width: 100%;
  padding: 40px 0;
  text-align: center;
  font-size: 30px;
}
.new_content {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 80vw;
  /* text-overflow:unset; */
  white-space: pre-wrap;
  font-size: 18px;
  text-indent: 2em;
  line-height: 2em;
}
</style>
<style>
p {
  margin: 0;
}
article {
  width: 80%;
}
a {
  text-decoration: none;
  user-select: none;
  pointer-events: none;
  /* display: none; */
}
figure img {
  position: relative;
  /* left: 50%; */
  width: 100%;
  /* transform: translateX(-50%); */
  /* text-align: center; */
}
figure {
  position: relative;
  display: block;
  line-height: 0px;
  text-align: center;
  width: 80%;
  left: 50%;
  transform: translateX(-50%);
  height: fit-content;
  margin: 0;
  padding: 0;
}
figure h2 {
  margin: 0;
}
</style>