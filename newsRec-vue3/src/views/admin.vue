<!--
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-09 13:53:31
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-05-16 15:28:44
-->
<template>
  <div class="admin_outer">
    <div class="input_outer" v-loading="left_loading" element-loading-text="拼命加载中" element-loading-background="rgba(0, 0, 0, 0.8)">
      <div class="input_item">
        <!-- <div class="input_title_header">标题</div> -->
        <input class="input_title" v-model="title" placeholder="在此输入标题" />
      </div>
      <!-- <textarea type="text" class="input_item input_content" v-model="content" /> -->
      <richText class="input_item rich_content" v-model="content"></richText>
      <div class="input_item input_button_group">
        <el-button
          class="input_item input_button input_button_upload"
          @click="upload()"
        >
          上传
        </el-button>
        <!-- <button
          class="input_item input_button input_button_upload"
          @click="test()"
        >
          测试
        </button> -->

        <el-button
          class="input_item input_button input_button_back"
          @click="back()"
        >
          返回
        </el-button>
      </div>
    </div>
    <div class="recuser_outer" v-loading="right_loading" element-loading-text="拼命加载中" element-loading-background="rgba(0, 0, 0, 0.8)">
      <div class="recuser_uper">
        <div class="recuser_header">推荐的用户</div>

        <el-card class="box-card">
          <el-input
            v-model="adduser_account"
            placeholder="请输入内容"
          ></el-input>
          <el-button class="recuser_button" type="primary" @click="add_user()">添加用户</el-button>
        </el-card>
        <el-button class="recuser_button" type="primary" @click="start_push()">开始推送</el-button>
      </div>
      <div class="recuser_list">
        <el-table
          :data="user_list"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="id" label="用户id"> </el-table-column>
        </el-table>

        <!-- <div class="recuser_item" v-for="item in user_list" :key="item">
          {{ item.id }}
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, reactive, ref } from "vue";
import { uploadNews, addPush } from "../api/api_call";
import { useRouter } from "vue-router";
import richText from "../components/richText.vue";
let router = useRouter();

let global_userid = inject("global_userid");
let content = ref("");
let title = ref("");
let user_list = reactive([]);
let left_loading = ref(false);
let right_loading = ref(false);

let adduser_account = ref("");
let push_newsid = ref("");

async function upload() {
  left_loading.value = true;
  let res = await uploadNews({
    id: global_userid.value,
    title: title.value,
    content: content.value,
  });
  left_loading.value = false;
  console.log(res.data);
  if (res.data.code) {
    if (res.data.code == 403) {
      //TODO
      alert("没有权限");
    } else if (res.data.code == 404) {
      //TODO
      alert("参数错误");
    }
  } else {
    push_newsid.value = res.data.newid;
    user_list.push(...res.data.list);
  }
}
function test() {
  console.log(content);
}
function back() {
  router.back();
}

//添加推送目标
function add_user() {
  if (adduser_account.value) {
    user_list.push({
      id: adduser_account.value,
    });
  }
}

//开始推送
async function start_push() {
  let us = JSON.parse(JSON.stringify(user_list));
  right_loading.value = true;
  await addPush({
    userlist: us,
    newsid: push_newsid.value,
  });
  right_loading.value = false;
}
</script>

<style scoped>
@import url("../assets/header.css");
.admin_outer {
  display: flex;
  height: 100vh;
}
.input_outer {
  display: flex;
  height: 100vh;
  width: calc(100vw - 300px);
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input_title_header {
  display: inline;
  padding: 5px;
  font-weight: 600;
}
.input_title {
  padding: 10px;
  width: 400px;
  font-size: 20px;
  background-color: rgb(235, 235, 235);
  transition: all 0.2s;
}
.input_title:focus {
  background-color: rgb(255, 255, 255);
}
.input_item {
  padding: 4px;
  margin: 4px;
}
.rich_content {
  width: 80%;
  height: 400px;
}
.input_button_group {
  display: flex;
}
.input_button {
  /* cursor: pointer; */
  width: 200px;
  /* height: 40px;
  border: none;
  background-color: rgb(247, 247, 247);
  border: 1px solid rgb(75, 75, 75); */
}
.input_button:hover {
  /* color: aliceblue; */
  /* background-color: rgb(28, 103, 133); */
}
.recuser_outer {
  position: relative;
  width: 300px;
  height: 100%;
  /* border: 1px solid black; */
  border-left: 1px solid black;
  background-color: aliceblue;
}
.recuser_header {
  font-weight: 600;
  text-align: center;
  margin: 0px;
}
.recuser_uper {
  height: 200px;
}
.recuser_button{
  text-align: center;
  /* margin: 0 100px; */
  width: 100%;
}
.recuser_list {
  height: calc(100vh - 200px);
  overflow: auto;
}

.recuser_item {
  text-align: center;
}
</style>