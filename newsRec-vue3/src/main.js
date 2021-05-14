/*
 * @Descripttion: 
 * @version: 
 * @Author: RoyalKnight
 * @Date: 2021-04-09 09:06:28
 * @LastEditors: RoyalKnight
 * @LastEditTime: 2021-05-12 21:42:41
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './route/index'

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

 createApp(App).use(router).use(ElementPlus).mount('#app')
