<template>
    <n-flex align="center" justify="center" :vertical="true">
        <glass-box style="width: 90%;margin-top: 20px;">

            <n-button strong secondary circle type="primary" @click="back">
                <template #icon>
                    <n-icon color="#fff">
                        <ArrowLeft />
                    </n-icon>
                </template>
            </n-button>
        </glass-box>
        <glass-box style="width: 90%;">
            <n-flex align="start" justify="center" :vertical="true" style="gap: 20px;">
                <n-switch v-model:value="s.log">
                    <template #checked>
                        开启日志
                    </template>
                    <template #unchecked>
                        关闭日志
                    </template>
                </n-switch>
                <n-button type="primary" @click="save" :loading="isSaving">
                    保存
                </n-button>
                <n-button type="warning" @click="restart" :loading="isRestarting">
                    重启服务
                </n-button>
            </n-flex>
            <div :class="isLoadind ? 'loading' : 'unloading'" style="border-radius: 12px;">
                <n-spin size="large" style="margin: auto;" />
            </div>

        </glass-box>
    </n-flex>
</template>

<script lang="ts" setup>
import {
    NButton,
    NFlex,
    NIcon,
    NSwitch,
    NSpin,
    useMessage
} from 'naive-ui';
import { ArrowLeft } from '@vicons/fa';
import { useRouter } from 'vue-router';
import GlassBox from '@/components/GlassBox.vue';

import SettingApi from '@/api/setting';
import { onMounted, ref } from 'vue';
import { HotSetting } from '@/models/hot_setting';

const router = useRouter()
const api = new SettingApi()

function back() {
    router.back()
}
const s = ref<HotSetting>({
    log: true, defaultEngin: ''
})
const isLoadind = ref(false)
function loadSetting() {
    isLoadind.value = true
    api.setting().then(res => {
        s.value = res.data ?? { log: true, defaultEngin: '' }
    }).finally(() => {
        isLoadind.value = false
    })
}
const isSaving = ref(false)
function save() {
    isSaving.value = true
    api.update(s.value).then(() => {
        loadSetting()
    }).finally(() => {
        isSaving.value = false
    })
}
const isRestarting = ref(false)
const msg = useMessage()
function restart() {
    isRestarting.value = true
    api.restart().then((res) => {
        if (res.code === "200" && res.data === "reload") {
            msg.success("服务重启中，5s后刷新")
            setTimeout(() => {
                window.location.reload()
            }, 5000);
        }

    }).finally(() => {
        isRestarting.value = false
    })
}
onMounted(() => {
    loadSetting()
})
</script>