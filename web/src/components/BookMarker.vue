<template>
    <GlassBox :fit-content="false" class="talet">
        <n-flex style="width: 100%" :vertical="true">

            <n-flex style="width: 100%;" align="center" justify="space-between">
                <n-scrollbar style="flex: 1;" :x-scrollable="true">
                    <n-breadcrumb>
                        <n-breadcrumb-item style="font-size: 18px;" v-for="(value, index) in markStore.markerPath"
                            :clickable="markStore.markerPath.length - 1 > index"
                            @click="markStore.backMarkerPath(index)">
                            {{ value.tagName === '/' ? '..' : value.tagName }}
                        </n-breadcrumb-item>
                    </n-breadcrumb>
                </n-scrollbar>
                <n-dropdown trigger="click" :options="setOption" @select="handleSelect">
                    <n-button quaternary circle :loading="isImporting">
                        <n-icon color="#ffffff79">
                            <EllipsisV></EllipsisV>
                        </n-icon>
                    </n-button>
                </n-dropdown>
            </n-flex>
            <n-divider style="padding:  0 12px 0 12px;margin: 0 0 0 0; color: #ffffff79;"></n-divider>
            <BookMarkerTree ref="mbTree" />
        </n-flex>


        <n-modal v-model:show="openDialog">
            <GlassBox>
                <n-flex>
                    <input ref="inputHtml" type="file" accept=".html" style="display:none;" @change="handleInputHtml">
                    <n-button type="info" @click="inputHtml?.click()">从html导入</n-button>

                    <n-button @click="openDialog = false" type="error">关闭</n-button>
                </n-flex>
            </GlassBox>
        </n-modal>
    </GlassBox>
</template>
<script lang="ts" setup>
import GlassBox from './GlassBox.vue';
import {
    NFlex, NDivider, NIcon, NButton, NDropdown, type DropdownOption, NModal, NScrollbar,
    NBreadcrumb,
    NBreadcrumbItem
} from 'naive-ui';
import { EllipsisV } from '@vicons/fa'
import { ref } from 'vue';
import BookMarkerTree from './BookMarkerTree.vue'
import { useBookMarkStore } from '@/store/book_marker_stroe.js';
import { useRouter } from 'vue-router';
const markStore = useBookMarkStore()
const inputHtml = ref<HTMLInputElement>()

const openDialog = ref(false)
const setOption: DropdownOption[] = [
    {
        label: "导入",
        key: "import",
    },
    {
        label: "清空",
        key: "clear"
    },
    {
        label: "设置",
        key: "setting"
    }
]
const isImporting = ref(false)
function handleInputHtml(event: Event) {
    const target = event.target as HTMLInputElement
    var file = target.files?.[0];
    if (!file) {
        return
    }
    isImporting.value = true
    markStore.importFormHtml(file).then(() => {

        openDialog.value = false
        isImporting.value = false
    }).catch(() => {
        isImporting.value = false
        openDialog.value = false

    })
}
const r=useRouter()
function handleSelect(key: string) {


    if (key === "import") {
        openDialog.value = true
    }

    if (key === 'clear') {
        markStore.clearAll()
    }
    if (key === 'setting'){
r.push('/setting')
    }
}

</script>

<style scoped>
.talet {
    width: 90%;
}
</style>