<template>
    <GlassBox :fit-content="false" class="talet">
        <n-flex style="width: 100%" :vertical="true">

            <n-flex style="width: 100%;" align="center" justify="space-between">
                <div style="width: 80px;">

                    导航与设置
                </div>
                <n-dropdown trigger="click" :options="setOption" @select="handleSelect">
                    <n-button quaternary circle>
                        <n-icon color="#ffffff79">
                            <EllipsisV></EllipsisV>
                        </n-icon>
                    </n-button>
                </n-dropdown>
            </n-flex>
            <n-divider style="margin: 0 12px 0 12px;color: #ffffff79;"></n-divider>
            <n-flex style="width: 100%; flex:1;">

            </n-flex>
        </n-flex>


        <n-modal v-model:show="openDialog">
            <GlassBox>
                <n-flex>
                    <input ref="inputHtml" type="file"  accept=".html" style="display:none;">
                    <n-button type="info" @click="inputHtml?.click()">从html导入</n-button>
                    
                    <input ref="inputLbftagJson" type="file"  accept=".lbftag.json" style="display:none;">
                    <n-button type="info" @click="inputLbftagJson?.click()">从lbftag.json导入</n-button>
                    <n-button @click="openDialog = false" type="error">关闭</n-button>
                </n-flex>
            </GlassBox>
        </n-modal>
    </GlassBox>
</template>
<script lang="ts" setup>
import GlassBox from './GlassBox.vue';
import { NFlex, NDivider, NIcon, NButton, NDropdown, type DropdownOption, NModal, NUpload } from 'naive-ui';
import { EllipsisV } from '@vicons/fa'
import { ref } from 'vue';
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

function handleSelect(key: string) {


    if (key === "import") {
        openDialog.value = true

    }
    if (key === "export") {

    }
}
</script>

<style scoped>
.talet {
    width: 80%;

}
</style>