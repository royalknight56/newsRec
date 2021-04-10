<!--
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-09 13:07:28
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-09 13:26:02
-->
<template>
  {{global_news.obj.new_content}}
  <button @click="back()">返回</button>
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

<style>

</style>