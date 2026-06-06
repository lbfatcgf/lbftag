import { useDialog } from 'naive-ui';
import { Plus } from '@vicons/fa';
import { BookMarkerStore } from '../store/book_marker_stroe';
import { h } from 'vue';
import AddMarkerEdit from './AddMarkerEdit.vue';
const dialog = useDialog();
function add() {
    let p = BookMarkerStore.markerPath.map((item) => (item.tagName === '/' ? '..' : item.tagName)).join('/');
    dialog.create({
        title: `路径:${p} 下新建书签`,
        content() {
            return h(AddMarkerEdit);
        },
    });
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['marke_item']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.nPopover | typeof __VLS_components.NPopover | typeof __VLS_components['n-popover'] | typeof __VLS_components.nPopover | typeof __VLS_components.NPopover | typeof __VLS_components['n-popover']} */
nPopover;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    trigger: "hover",
}));
const __VLS_2 = __VLS_1({
    trigger: "hover",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
{
    const { trigger: __VLS_7 } = __VLS_3.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ onClick: (__VLS_ctx.add) },
        ...{ class: "marke_item no_glass_box" },
    });
    /** @type {__VLS_StyleScopedClasses['marke_item']} */ ;
    /** @type {__VLS_StyleScopedClasses['no_glass_box']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "icon_box" },
    });
    /** @type {__VLS_StyleScopedClasses['icon_box']} */ ;
    let __VLS_8;
    /** @ts-ignore @type { | typeof __VLS_components.nIcon | typeof __VLS_components.NIcon | typeof __VLS_components['n-icon'] | typeof __VLS_components.nIcon | typeof __VLS_components.NIcon | typeof __VLS_components['n-icon']} */
    nIcon;
    // @ts-ignore
    const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
        size: "32",
        color: "#0000007c",
    }));
    const __VLS_10 = __VLS_9({
        size: "32",
        color: "#0000007c",
    }, ...__VLS_functionalComponentArgsRest(__VLS_9));
    const { default: __VLS_13 } = __VLS_11.slots;
    let __VLS_14;
    /** @ts-ignore @type { | typeof __VLS_components.Plus | typeof __VLS_components.Plus} */
    Plus;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({}));
    const __VLS_16 = __VLS_15({}, ...__VLS_functionalComponentArgsRest(__VLS_15));
    // @ts-ignore
    [add,];
    var __VLS_11;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
