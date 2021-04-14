<!--
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-09 13:53:31
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-13 19:13:37
-->
<template>
  <div class="admin_outer">
    <div class="input_outer">
      <div class="input_item">
        <!-- <div class="input_title_header">标题</div> -->
        <input class="input_title" v-model="title" placeholder="在此输入标题" />
      </div>

      <!-- <textarea type="text" class="input_item input_content" v-model="content" /> -->
      <richText class="input_item rich_content" v-model="content"></richText>
      <div class="input_item input_button_group">
        <button
          class="input_item input_button input_button_upload"
          @click="upload()"
        >
          上传
        </button>
        <button
          class="input_item input_button input_button_upload"
          @click="test()"
        >
          测试
        </button>

        <button
          class="input_item input_button input_button_back"
          @click="back()"
        >
          返回
        </button>
      </div>
    </div>
    <div class="recuser_outer">
      <div class="recuser_header">推荐的用户</div>
      <div class="recuser_list">
        <div class="recuser_item" v-for="item in user_list" :key="item">
          {{ item.id }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, reactive, ref } from "vue";
import { uploadNews } from "../api/api_call";
import { useRouter } from "vue-router";
import richText from "../components/richText.vue";
let router = useRouter();

let global_userid = inject("global_userid");
let content = ref("");
let title = ref("");
let user_list = reactive([]);

async function upload() {
  let res = await uploadNews({
    id: global_userid.value,
    title: title.value,
    content: content.value,
  });
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
    user_list.push(...res.data);
  }
}
function test() {
  console.log(content);
}
function back() {
  router.back();
}
</script>

<style scoped>
.admin_outer {
  display: flex;
  height: 100vh;
}
.input_outer {
  display: flex;
  height: 100vh;
  width: 100vw;
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
.input_button_group{
  display: flex;
}
.input_button {
  cursor: pointer;
  width: 200px;
  height: 40px;
  border: none;
  background-color: rgb(247, 247, 247);
  border: 1px solid rgb(75, 75, 75);
}
.input_button:hover {
  color: aliceblue;
  background-color: rgb(28, 103, 133);
}
.recuser_outer {
  position: relative;
  width: 200px;
  height: 100%;
  /* border: 1px solid black; */
  border-left: 1px solid black;
}
.recuser_header {
  font-weight: 600;
  text-align: center;
  margin: 20px;
}
</style>
<style>
</style>