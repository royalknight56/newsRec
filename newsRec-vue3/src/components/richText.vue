<!--
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-12 10:45:36
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-04-13 22:36:47
 
-->
<template>
  <div class="outer" @keyup="editing()">
    <div class="button_group">
      <button class="ctrl_button" @click="execCommand('bold')">T</button>
      <button class="ctrl_button" @click="execCommand('insertHorizontalRule')">T</button>
    </div>
    <div
      type="text"
      ref="textedit"
      class="input_item input_content"
      contenteditable="true"
      :value="modelValue"
    />
  </div>
</template>

<script setup>
import { defineEmit, defineProps, ref } from "vue";
let props = defineProps(["modelValue"]);
let emit = defineEmit({
  ["update:modelValue"]: () => {
    return true;
  },
});
let textedit = ref(null);
function editing() {
  // console.dir(textedit.value.innerHTML);
  emit("update:modelValue", textedit.value.innerHTML);
  // console.log(emit)
  // $emit('update:modelValue', $event.target.value)
}
function execCommand(name, args = null) {
  console.log(name)
  // document.execCommand('bold', false, null);
  document.execCommand(name, false, args);
}
</script>

<style scoped>
.outer {
  display: flex;
  flex-direction: column;
}
.button_group {
  display: flex;
  width: 100%;
  justify-content: flex-start;
}
.ctrl_button {
  cursor: pointer;
  width: 20px;
  height: 20px;
  background-color: rgb(209, 209, 209);
  border: 1px solid rgb(151, 151, 151);
  border-radius: 0;
  text-align: center;
}
.ctrl_button:hover {
  /* color: aliceblue; */
  background-color: rgb(224, 224, 224);
}
.input_content {
  width: 100%;
  height: 100%;
  font-size: 18px;
  resize: none;
  outline: none;
  border: 1px solid rgb(163, 163, 163);
}
</style>
