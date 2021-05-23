<!--
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-09 10:51:38
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-05-20 20:41:17
-->
<template>
  <div class="header">
    <div class="logo_text header_item">民生MS</div>
    <!-- <button class="header_item header_button" v-if="ifadminTag" @click="admin()">上传</button> -->
    <button class="header_item header_button" v-if="ifadminTag" @click="admin()">上传</button>
    <button class="header_item header_button" @click="refresh()">刷新</button>
    <button class="header_item header_button header_button_change" @click="changeAccount()">
      切换账号
    </button>
    <div class="header_item header_button header_button_id">用户编号：{{ global_userid }}</div>
  </div>

  <div class="news_outer">
    <div class="rec_news_outer">
      <div class="news_uper">为你推荐</div>
      <div
        v-for="item in global_news.rec"
        :key="item"
        class="new_title"
        @click="viewNews(item.id)"
        :title="item.title"
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
        :title="item.title"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onUnmounted, reactive, ref, useContext } from "vue";
import { useRouter } from "vue-router";
import {
  getRandomNews,
  getRecNews,
  getNewsContent,
  testCall,
  browserNews,
  getPush,
  ifadmin,
} from "../api/api_call";
import { ElNotification } from "element-plus";

let router = useRouter();
let global_userid = inject("global_userid");
let global_news = inject("global_news");

let ctx = useContext();

console.log(ctx);

let ifadminTag = ref(false);

async function init() {
  if (global_userid.value != 0) {
    getNews();
    getPushTimer();
    let res = await ifadmin({ id: global_userid.value });
    if(res.data==true){
      ifadminTag.value=true
    }
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
  router.push("/news" + "?id=" + id);
}
function admin() {
  router.push("/admin");
}

function changeAccount() {
  localStorage.setItem("userid", "");
  router.push("/login");
}

function getPushTimer() {
  let timer = setInterval(async () => {
    console.log("获取推送消息");
    let res = await getPush({
      id: global_userid.value,
    });
    console.log(res);
    if (res.data.length > 0) {
      for (let i = 0; i < res.data.length; i++) {
        ElNotification({
          title: "提示",
          message:
            "有新的民生信息推送" + JSON.parse(res.data[i].message).newsid,
          onClick: () => {
            router.push(
              "/news" + "?id=" + JSON.parse(res.data[i].message).newsid
            );
          },
        });
      }
    }
  }, 3000);
  onUnmounted(() => {
    clearInterval(timer);
  });
}

init();
</script>
<style>
</style>
<style scoped>
@import url("../assets/header.css");
.news_uper {
  text-align: left;
  font-size: 20px;
}
.news_uper::before {
  content: "〓";
}
.news_outer {
  position: absolute;
  top: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.rec_news_outer {
  width: 40vw;
  min-width: 300px;
}
.rand_news_outer {
  width: 40vw;
  min-width: 300px;
}

.new_title {
  width: fit-content;
  max-width: 100%;
  text-align: center;

  cursor: pointer;
  padding: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.new_title::before {
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