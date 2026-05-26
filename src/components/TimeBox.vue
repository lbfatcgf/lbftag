<template>
    <n-flex vertical align="center" >
        <div class="date_font">{{ timeNow }}</div>
        <div class="date_font">{{ dayNow }}</div>
    </n-flex>
</template>

<script setup  lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {NFlex} from 'naive-ui'
const timeNow = ref<string>('00:00:00');
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
.date_font {
  font-size: 32px;
  font-weight: bold;
  background: linear-gradient(120deg,
    red, orange, yellow, green, cyan, blue, purple, red);
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: rainbowMove 2s linear infinite;
  
  /* 模糊发光效果：三个不同半径的白色阴影叠加 */
  text-shadow:
    0 0 10px rgba(255, 255, 255, 0.6),
    0 0 20px rgba(255, 255, 255, 0.4),
    0 0 40px rgba(255, 255, 255, 0.2);
}

@keyframes rainbowMove {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
</style>