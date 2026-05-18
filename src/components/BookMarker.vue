<template>
    <GlassBox :fit-content="false" class="talet">
        <n-flex style="width: 100%;" :vertical="true">

            <n-flex style="width: 100%;" align="center" justify="space-between">
                <div style="width: 80px;">

                    导航与设置
                </div>
                <n-button quaternary circle>
                    <n-icon color="#ffffff79">
                        <EllipsisV></EllipsisV>
                    </n-icon>
                </n-button>
            </n-flex>
            <n-divider style="margin: 0 12px 0 12px;color: #ffffff79;"></n-divider>
            <n-flex style="width: 100%; flex:1;">
               
            </n-flex>
        </n-flex>
    </GlassBox>
</template>
<script lang="ts" setup>
import GlassBox from './GlassBox.vue';
import { NFlex, NDivider, NIcon, NButton } from 'naive-ui';
import { EllipsisV } from '@vicons/fa'
</script>

<style scoped>
.talet {
    width: 80%;

}
</style>