<template>
    <div ref="markerRef" class="marke_item no_glass_box" @click="handleClick">
        <n-flex justify="start" align="center" :wrap="false">
            <div class="icon_box" v-if="bm.type === 'dir'">
                <img v-if="canShowIcon && !isEmpty(bm.icon)" width="32" height="32" class="tag_icon" :src="realIcon()"
                    alt="" @error="canShowIcon = false" @load="canShowIcon = true">
                <n-icon v-else size="32" color="#666666">
                    <FolderRegular></FolderRegular>
                </n-icon>
            </div>
            <div class="icon_box" style="background: linear-gradient(315deg, #ffffff, #009ae6);" v-else>
                <img v-if="canShowIcon" width="32" height="32" class="tag_icon" :src="realIcon()" alt=""
                    @error="canShowIcon = false" @load="canShowIcon = true">
                <n-icon v-else size="32" color="#666666">
                    <Link></Link>
                </n-icon>
            </div>
            <div class="tag_name">{{ bm.tagName }}</div>
        </n-flex>
    </div>
</template>

<script setup lang="ts">
import { NFlex, NIcon, useDialog } from 'naive-ui';
import { FolderRegular, Link } from '@vicons/fa'
import type { BookMarkerNode } from '../models/book_marker';
import { BookMarkerStore } from '../store/book_marker_stroe';
import BookMarkerEdit from './BookMarkerEdit.vue';
import { h, onMounted, ref } from 'vue';
const dialog = useDialog()
const props = defineProps<{
    bm: BookMarkerNode,
    bmIndex: number
}>()
const markerRef = ref<HTMLElement | null>(null)
const canShowIcon = ref(true)
onMounted(() => {
    const el = markerRef.value
    if (el !== null) {
        el.addEventListener('contextmenu', (e: Event) => {
            e.preventDefault();
            openEditDialog();
        })
        el.addEventListener('touchstart', () => {
            isTouching = true
            longPressTimer = setTimeout(() => {
                if (isTouching) {

                    openEditDialog()
                    isTouching = false
                }
            }, 1000)
        })
        el.addEventListener('touchmove', () => {
            isTouching = false
            if (longPressTimer) {
                clearTimeout(longPressTimer)
            }
        })
    }

});
let isTouching = false
let longPressTimer: number | null = null

function openEditDialog() {
    BookMarkerStore.editMarkerIndex = props.bmIndex
    dialog.create(
        {
            title: '编辑标签',
            content() {
                return h(
                    BookMarkerEdit
                )
            },
            onMaskClick() {
                console.log('close dialog');
                BookMarkerStore.editMarkerIndex = null
            },
            onClose() {
                console.log('close dialog');

                BookMarkerStore.editMarkerIndex = null
            },
        }
    )
}
function handleClick() {
    if (props.bm.type === 'dir')
        BookMarkerStore.clickMarker(props.bm, props.bmIndex)
    else
        window.open(props.bm.href!, "_blank")
}
function realIcon(): string {
    if (props.bm.icon) {


        if (props.bm.icon.startsWith('http')) {
            return props.bm.icon
        } else {
            return 'https://' + props.bm.icon
        }
    }
    return ''
}

function isEmpty(params: string | null | undefined): boolean {
    return params === "" || params === null || params === undefined
}
</script>

<style scoped>
.icon_box {
    padding: 12px 12px 12px 12px;
    width: 32px;
    height: 32px;
    border-radius: 12px;
    background: linear-gradient(315deg, #7bff89, #68de73);
    box-shadow: 20px 20px 60px #bebebe,
        -20px -20px 60px #ffffff;

}

.marke_item {
    border-radius: 12px;
    padding: 12px 12px 12px 12px;

}

.marke_item:hover {
    cursor: pointer;
}

.tag_name {
    font-size: 20px;
    display: -webkit-box;
    /* 必须设置为弹性盒子模型 */
    line-clamp: 2;
    /* 限制最多显示 2 行 */
    -webkit-box-orient: vertical;
    /* 设置盒子方向为垂直 */
    overflow: hidden;
    /* 隐藏溢出内容 */
    text-overflow: ellipsis;
    /* 可选，但 line-clamp 通常自带省略号 */
}

/* .glassmorphism { */
    /* 基础背景 */
    /* background: rgba(255, 255, 255, 0.25); */

    /* 背景模糊和滤镜 */
    /* backdrop-filter: blur(10px) saturate(180%) contrast(100%) brightness(100%); */
    /* -webkit-backdrop-filter: blur(10px) saturate(180%) contrast(100%) brightness(100%); */

    /* 边框 */
    /* border: 1px solid rgba(255, 255, 255, 0.18); */
    /* border-radius: 16px; */

    /* 阴影 */
    /* box-shadow: 0px 8px 32px 0px rgba(0, 0, 0, 0.37); */

    /* 文字颜色 */
    /* color: #333333; */

    /* 基础属性 */
    /* position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); */
/* } */

.glassmorphism:hover {
    transform: scale(1.02);
    box-shadow: 0px 12px 42px 2px rgba(0, 0, 0, 0.37);
}

@media only screen and (max-width: 600px) {
    .marke_item {
        width: 100%;
    }


}

/* 小设备 (平板电脑和大型手机，600 像素及以上)
@media only screen and (min-width: 600px) {
  .marke_item {
    width: 100%;
  }
} */
</style>