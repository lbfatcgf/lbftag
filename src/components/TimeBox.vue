<template>
    <n-flex vertical align="center" >
        <n-gradient-text type="info">{{ timeNow }}</n-gradient-text>
        <n-gradient-text type="info">{{ dayNow }}</n-gradient-text>
    </n-flex>
</template>

<script setup  lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {NFlex,NGradientText} from 'naive-ui'
const timeNow = ref<string>('--:--:--');
const dayNow=ref<string>('----/--/--')
let timer:number|null = null;
function changetIime(){
    let now=new Date();
    let hour=now.getHours()<10?'0'+now.getHours():''+now.getHours();
    let minute=now.getMinutes()<10?'0'+now.getMinutes():''+now.getMinutes();
    let second=now.getSeconds()<10?'0'+now.getSeconds():''+now.getSeconds();
    timeNow.value=`${hour}:${minute}:${second}`;

}
function getTody(){
    let now=new Date();
    let year:string|number=now.getFullYear();
    let month:string|number=now.getMonth()+1;
    let day:string|number=now.getDate();
    if(month<10){
        month='0'+month;
    }
    if(day<10){
        day='0'+day;
    }
    dayNow.value=`${year}/${month}/${day}`;
    
}
onMounted(() => {
    timer=setInterval(() => {
        changetIime()
    },1000)
    getTody()
})
onUnmounted(() => {
    if (timer!==null) {
        clearInterval(timer!)
    }
})
</script>

<style  scoped>
.n-gradient-text {
  font-size: 32px;
}
</style>