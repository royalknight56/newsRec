<!--
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-09 10:51:38
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-14 12:05:05
-->
<template>
  <div class="header">
    <div class="logo_text header_item">民生MS</div>
    <button class="header_item header_button" @click="admin()">后台</button>
    <button class="header_item header_button" @click="refresh()">刷新</button>
  </div>

  <div class="news_outer">
    <div class="rec_news_outer">
      <div class="news_uper">为你推荐</div>
      <div
        v-for="item in global_news.rec"
        :key="item"
        class="new_title"
        @click="viewNews(item.id)"
        :title='item.title'
      >
        {{ item.title }}
      </div>
    </div>

    <div class="rand_news_outer">
      <div class="news_uper">热度新闻</div>
      <div
        v-for="item in global_news.rand"
        :key="item"
        class="new_title"
        @click="viewNews(item.id)"
        :title='item.title'
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, reactive } from "vue";
import { useRouter } from "vue-router";
import {
  getRandomNews,
  getRecNews,
  getNewsContent,
  testCall,
  browserNews,
} from "../api/api_call";

let router = useRouter();
let global_userid = inject("global_userid");
let global_news = inject("global_news");

function init() {
  if (global_userid.value != 0) {
    getNews();
  } else {
    router.push("login");
  }
}

async function getNews() {
  // console.log('id' +global_userid.value)
  // let res = await testCall()
  if (global_news.rec.length > 0) {
  } else {
    let res = await getRecNews({
      userid: global_userid.value,
      curPage: 1,
      pageSize: 20,
    });

    global_news.rec = [];
    global_news.rec.push(...res.data);
  }

  if (global_news.rand.length > 0) {
  } else {
    let res2 = await getRandomNews({
      pageSize: 20,
    });
    global_news.rand = [];
    global_news.rand.push(...res2.data);
  }
}

async function refresh() {
  let res = await getRecNews({
    userid: global_userid.value,
    curPage: 1,
    pageSize: 20,
  });

  global_news.rec = [];
  global_news.rec.push(...res.data);

  let res2 = await getRandomNews({
    pageSize: 20,
  });
  global_news.rand = [];
  global_news.rand.push(...res2.data);
}
async function viewNews(id) {
  let res = await getNewsContent({ id });
  let ves = await browserNews({
    userid: global_userid.value,
    newsid: id,
  });
  global_news.obj = { ...res.data };
  router.push("/news");
}
function admin() {
  router.push("/admin");
}

init();
</script>
<style>
.header {
  display: flex;
  height: 80px;
  padding: 0 40px;
  background-image: url("../assets/header1.webp");
  background-position-x: 100px;
  background-color: rgb(113, 210, 255);
}
.logo_text {
  color: aliceblue;
  line-height: 60px;
  font-weight:200;
  font-size: 32px;
  width: 180px;   
  transform: skewX(-10deg);
}
.header_button {
  cursor: pointer;
  width: 200px;
  outline: none;
  border: none;
  color: rgb(0, 140, 255);
  font-weight: 600;
  background-color: rgba(240, 248, 255, 0.151);
  transition: all 0.2s;
}
.header_button:hover {
  background-color: rgba(0, 0, 0, 0.123);
  color: aliceblue;
}
</style>
<style scoped>
.news_uper {
  text-align: left;
  font-size: 20px;
}
.news_uper::before{
  content: "〓";
}
.news_outer {
  position: absolute;
  top: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
}
.rec_news_outer {
  width: 40vw;
}
.rand_news_outer {
  width: 40vw;
}
.new_title {
  width: fit-content;
  max-width: 100%;
  text-align: center;

  cursor: pointer;
  padding: 10px;
  white-space: nowrap;
  text-overflow:ellipsis;
  overflow: hidden;
}
.new_title::before{
  content: "■";
  color: rgba(0, 0, 0, 0.315);
}
.new_title:hover {
  /* background-color: aqua; */

  /* text-decoration: underline; */
  /* text-underline-offset: 2px; */
}
.new_title:hover::before {
  color: rgba(0, 0, 0, 0.753);
}
</style>