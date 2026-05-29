<template>
    <GlassBox>
        <n-flex vertical align="center" >
            <div class="date_font">{{ timeNow }}</div>
            <div class="date_font">{{ dayNow }}</div>
        </n-flex>
    </GlassBox>
</template>

<script setup  lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import {NFlex} from 'naive-ui'
import GlassBox from './GlassBox.vue';
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
  font-size: 18px;
  font-weight: bold;
  background: #000000b0;
  background-size: 200% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}


</style>