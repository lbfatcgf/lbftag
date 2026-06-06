import { useDialog } from 'naive-ui';
import { FolderRegular, Link } from '@vicons/fa';
import { BookMarkerStore } from '../store/book_marker_stroe';
import BookMarkerEdit from './BookMarkerEdit.vue';
import { h, onMounted, ref } from 'vue';
const dialog = useDialog();
const props = defineProps();
const markerRef = ref(null);
const canShowIcon = ref(true);
onMounted(() => {
    const el = markerRef.value;
    if (el !== null) {
        el.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            openEditDialog();
        });
        el.addEventListener('touchstart', () => {
            isTouching = true;
            longPressTimer = setTimeout(() => {
                if (isTouching) {
                    openEditDialog();
                    isTouching = false;
                }
            }, 1000);
        });
        el.addEventListener('touchmove', () => {
            isTouching = false;
            if (longPressTimer) {
                clearTimeout(longPressTimer);
            }
        });
    }
});
let isTouching = false;
let longPressTimer = null;
function openEditDialog() {
    BookMarkerStore.editMarkerIndex = props.bmIndex;
    dialog.create({
        title: '编辑标签',
        content() {
            return h(BookMarkerEdit);
        },
        onMaskClick() {
            console.log('close dialog');
            BookMarkerStore.editMarkerIndex = null;
        },
        onClose() {
            console.log('close dialog');
            BookMarkerStore.editMarkerIndex = null;
        },
    });
}
function handleClick() {
    if (props.bm.type === 'dir')
        BookMarkerStore.clickMarker(props.bm, props.bmIndex);
    else
        window.open(props.bm.href, "_blank");
}
function realIcon() {
    if (props.bm.icon) {
        if (props.bm.icon.startsWith('http')) {
            return props.bm.icon;
        }
        else {
            return 'https://' + props.bm.icon;
        }
    }
    return '';
}
function isEmpty(params) {
    return params === "" || params === null || params === undefined;
}
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['marke_item']} */ ;
/** @type {__VLS_StyleScopedClasses['marke_item']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ onClick: (__VLS_ctx.handleClick) },
    ref: "markerRef",
    ...{ class: "marke_item no_glass_box" },
});
/** @type {__VLS_StyleScopedClasses['marke_item']} */ ;
/** @type {__VLS_StyleScopedClasses['no_glass_box']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.nFlex | typeof __VLS_components.NFlex | typeof __VLS_components['n-flex'] | typeof __VLS_components.nFlex | typeof __VLS_components.NFlex | typeof __VLS_components['n-flex']} */
nFlex;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    justify: "start",
    align: "center",
    wrap: (false),
}));
const __VLS_2 = __VLS_1({
    justify: "start",
    align: "center",
    wrap: (false),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
if (__VLS_ctx.bm.type === 'dir') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "icon_box" },
    });
    /** @type {__VLS_StyleScopedClasses['icon_box']} */ ;
    if (__VLS_ctx.canShowIcon && !__VLS_ctx.isEmpty(__VLS_ctx.bm.icon)) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
            ...{ onError: (...[$event]) => {
                    if (!(__VLS_ctx.bm.type === 'dir'))
                        return;
                    if (!(__VLS_ctx.canShowIcon && !__VLS_ctx.isEmpty(__VLS_ctx.bm.icon)))
                        return;
                    __VLS_ctx.canShowIcon = false;
                    // @ts-ignore
                    [handleClick, bm, bm, canShowIcon, canShowIcon, isEmpty,];
                } },
            ...{ onLoad: (...[$event]) => {
                    if (!(__VLS_ctx.bm.type === 'dir'))
                        return;
                    if (!(__VLS_ctx.canShowIcon && !__VLS_ctx.isEmpty(__VLS_ctx.bm.icon)))
                        return;
                    __VLS_ctx.canShowIcon = true;
                    // @ts-ignore
                    [canShowIcon,];
                } },
            width: "32",
            height: "32",
            ...{ class: "tag_icon" },
            src: (__VLS_ctx.realIcon()),
            alt: "",
        });
        /** @type {__VLS_StyleScopedClasses['tag_icon']} */ ;
    }
    else {
        let __VLS_6;
        /** @ts-ignore @type { | typeof __VLS_components.nIcon | typeof __VLS_components.NIcon | typeof __VLS_components['n-icon'] | typeof __VLS_components.nIcon | typeof __VLS_components.NIcon | typeof __VLS_components['n-icon']} */
        nIcon;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
            size: "32",
            color: "#666666",
        }));
        const __VLS_8 = __VLS_7({
            size: "32",
            color: "#666666",
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        const { default: __VLS_11 } = __VLS_9.slots;
        let __VLS_12;
        /** @ts-ignore @type { | typeof __VLS_components.FolderRegular | typeof __VLS_components.FolderRegular} */
        FolderRegular;
        // @ts-ignore
        const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({}));
        const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
        // @ts-ignore
        [realIcon,];
        var __VLS_9;
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "icon_box" },
        ...{ style: {} },
    });
    /** @type {__VLS_StyleScopedClasses['icon_box']} */ ;
    if (__VLS_ctx.canShowIcon) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.img)({
            ...{ onError: (...[$event]) => {
                    if (!!(__VLS_ctx.bm.type === 'dir'))
                        return;
                    if (!(__VLS_ctx.canShowIcon))
                        return;
                    __VLS_ctx.canShowIcon = false;
                    // @ts-ignore
                    [canShowIcon, canShowIcon,];
                } },
            ...{ onLoad: (...[$event]) => {
                    if (!!(__VLS_ctx.bm.type === 'dir'))
                        return;
                    if (!(__VLS_ctx.canShowIcon))
                        return;
                    __VLS_ctx.canShowIcon = true;
                    // @ts-ignore
                    [canShowIcon,];
                } },
            width: "32",
            height: "32",
            ...{ class: "tag_icon" },
            src: (__VLS_ctx.realIcon()),
            alt: "",
        });
        /** @type {__VLS_StyleScopedClasses['tag_icon']} */ ;
    }
    else {
        let __VLS_17;
        /** @ts-ignore @type { | typeof __VLS_components.nIcon | typeof __VLS_components.NIcon | typeof __VLS_components['n-icon'] | typeof __VLS_components.nIcon | typeof __VLS_components.NIcon | typeof __VLS_components['n-icon']} */
        nIcon;
        // @ts-ignore
        const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
            size: "32",
            color: "#666666",
        }));
        const __VLS_19 = __VLS_18({
            size: "32",
            color: "#666666",
        }, ...__VLS_functionalComponentArgsRest(__VLS_18));
        const { default: __VLS_22 } = __VLS_20.slots;
        let __VLS_23;
        /** @ts-ignore @type { | typeof __VLS_components.Link | typeof __VLS_components.Link} */
        Link;
        // @ts-ignore
        const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({}));
        const __VLS_25 = __VLS_24({}, ...__VLS_functionalComponentArgsRest(__VLS_24));
        // @ts-ignore
        [realIcon,];
        var __VLS_20;
    }
}
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "tag_name" },
});
/** @type {__VLS_StyleScopedClasses['tag_name']} */ ;
(__VLS_ctx.bm.tagName);
// @ts-ignore
[bm,];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeProps: {},
});
export default {};
