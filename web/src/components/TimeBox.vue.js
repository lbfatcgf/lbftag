import { ref, onMounted, onUnmounted } from 'vue';
import GlassBox from './GlassBox.vue';
const timeNow = ref('00:00:00');
const dayNow = ref('----/--/--');
let timer = null;
function changetIime() {
    let now = new Date();
    let hour = now.getHours() < 10 ? '0' + now.getHours() : '' + now.getHours();
    let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : '' + now.getMinutes();
    let second = now.getSeconds() < 10 ? '0' + now.getSeconds() : '' + now.getSeconds();
    timeNow.value = `${hour}:${minute}:${second}`;
}
function getTody() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    dayNow.value = `${year}/${month}/${day}`;
}
onMounted(() => {
    timer = setInterval(() => {
        changetIime();
    }, 1000);
    getTody();
});
onUnmounted(() => {
    if (timer !== null) {
        clearInterval(timer);
    }
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = GlassBox || GlassBox;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.nFlex | typeof __VLS_components.NFlex | typeof __VLS_components['n-flex'] | typeof __VLS_components.nFlex | typeof __VLS_components.NFlex | typeof __VLS_components['n-flex']} */
nFlex;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    vertical: true,
    align: "center",
}));
const __VLS_9 = __VLS_8({
    vertical: true,
    align: "center",
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "date_font" },
});
/** @type {__VLS_StyleScopedClasses['date_font']} */ ;
(__VLS_ctx.timeNow);
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "date_font" },
});
/** @type {__VLS_StyleScopedClasses['date_font']} */ ;
(__VLS_ctx.dayNow);
// @ts-ignore
[timeNow, dayNow,];
var __VLS_10;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
