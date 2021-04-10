<!--
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-09 13:53:31
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-09 14:05:44
-->
<template>
<input v-model="title">
<input v-model="content">

<button @click="upload()">上传</button>
<button @click="back()">返回</button>
<div v-for="item in user_list" :key = item>
    {{item}}
</div>

</template>

<script setup>
import { reactive, ref } from "vue";
import { uploadNews } from "../api/api_call";
import { useRouter } from "vue-router";


let router = useRouter();
let content = ref('');
let title = ref('');
let user_list = reactive([])
async function upload(){
    let res = await uploadNews( {
        title: title.value,
        content: content.value
    })
    console.log(res.data)
    user_list.push(...res.data)
}

function back(){
    router.back()
}
</script>

<style>

</style>