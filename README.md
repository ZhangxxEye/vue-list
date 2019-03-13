# vue-search
tab标签页
## install
NPM
```
npm install @nat/vue-list
```
## 用法
```
<template lang="html">
     <list @load="onLoad" v-model="loading" :finished="finished" loading-text="加载中..." finished-text="没有更多了" :error.sync="error" error-text="加载失败,点击重新加载">
         <ul>
             <li v-for="item in list">{{item}}</li>
         </ul>
     </list>
</template>
```
```
<script>
  import list from '@nat/vue-list';
  import axois from 'axios';
 export default {
     name: 'ProjectFeatures',
     data() {
         return {
             list: [],
             loading: false,
             finished: false,
             error: false
         };
     },
     components: {
         list,
     },
     mounted () {
     },
     methods: {
       
         getLists () {
             axois.get('http://172.16.0.45:7300/mock/5c88c2241d2cb328eddca711/components/api/list').then(r => {
                 this.list.push(...r.data.data);
                 if (this.list.length >= 90) {
                     this.finished = true;
                 }
             }).catch(e => {
                 this.error = true;
             }).finally(() => {
                 this.loading = false;
             });
         },
         onLoad() {
             this.getLists();
         }
     }
 };
 </script>
```
## API
#### props
##### tabs
属性 | 说明 | 类型 | 默认值
---|---|---|---
loading | 是否处于加载状态，加载过程中不触发load事件 | Boolean | false
finished | 是否加载完成 | Boolean | false
offset | 滚动条与底部距离小于 offset 时触发load事件 | Number | 100  
error | 是否加载失败，加载失败后,点击错误提示可以重新触发load事件，必须使用sync修饰符 | Boolean | false 
loadingText | 加载过程中的提示文案 | String | 加载中...  
finishedText | 加载完成后的提示文案 | String |   
errorText | 加载失败后的提示文案 | String |   

#### event
名称 | 说明 | 参数值
---|---|---
load | 滚动条与底部距离小于 offset 时触发 |  

## 启动
```
npm run dev
```
## 编译
```
npm run build-lib
```
