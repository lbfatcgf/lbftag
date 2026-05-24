<template>
    <GlassBox :fit-content="false" class="talet">
        <n-flex style="width: 100%" :vertical="true">

            <n-flex style="width: 100%;" align="center" justify="space-between">
                <n-scrollbar style="flex: 1;" :x-scrollable="true">
                    <n-breadcrumb>
                        <n-breadcrumb-item v-for="value in cuurentBMDir">
                            {{ value === '/' ? '..' : value }}
                        </n-breadcrumb-item>
                    </n-breadcrumb>
                </n-scrollbar>
                <n-dropdown trigger="click" :options="setOption" @select="handleSelect">
                    <n-button quaternary circle>
                        <n-icon color="#ffffff79">
                            <EllipsisV></EllipsisV>
                        </n-icon>
                    </n-button>
                </n-dropdown>
            </n-flex>
            <n-divider style="padding:  0 12px 0 12px;margin: 0 0 0 0; color: #ffffff79;"></n-divider>
            <BookMarkerTree ref="mbTree" @click-dir="handleChangeDir" />
        </n-flex>


        <n-modal v-model:show="openDialog">
            <GlassBox>
                <n-flex>
                    <input ref="inputHtml" type="file" accept=".html" style="display:none;" @change="handleInputHtml">
                    <n-button type="info" @click="inputHtml?.click()">从html导入</n-button>

                    <input ref="inputLbftagJson" type="file" accept=".lbftag.json" style="display:none;">
                    <n-button type="info" @click="inputLbftagJson?.click()">从lbftag.json导入</n-button>
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
const mbTree = ref<InstanceType<typeof BookMarkerTree>>()
const inputHtml = ref<HTMLInputElement>()
const inputLbftagJson = ref<HTMLInputElement>()
const openDialog = ref(false)
const setOption: DropdownOption[] = [
    {
        label: "导入",
        key: "import",
    },
    {
        label: "导出",
        key: "export",
    }
]
function handleInputHtml(event: Event) {
    const target = event.target as HTMLInputElement
    var file = target.files?.[0];
    if (!file) {
        return
    }
    mbTree.value?.inputFile(file)
}
function handleSelect(key: string) {


    if (key === "import") {
        openDialog.value = true

    }
    if (key === "export") {

    }
}
const cuurentBMDir = ref<Array<string>>(["/"])
function handleChangeDir(coordinates: number[], tagName: string,) {
    if(coordinates.length<cuurentBMDir.value.length){
        cuurentBMDir.value=cuurentBMDir.value.slice(0,coordinates.length-1)
    }
    cuurentBMDir.value.push(tagName)
}
</script>

<style scoped>
.talet {
    width: 80%;

}
</style>