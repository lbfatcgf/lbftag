<template>
    <GlassBox :fit-content="false" class="talet">
        <n-flex style="width: 100%;">

            <n-flex style="width: 100%;" justify="space-between">
               <div style="width: 80px;">

                   导航与设置
               </div>
               <div style="width: 80px;">ss</div>
            </n-flex>
            <n-divider></n-divider>
            <n-flex style="width: 100%;min-height: 700px;">
                dd
            </n-flex>
        </n-flex>
    </GlassBox>
</template>
<script lang="ts" setup>
import GlassBox from './GlassBox.vue';
import { NFlex ,NDivider} from 'naive-ui';
</script>

<style  scoped>
.talet {
    width: 80%;
   
}
</style>