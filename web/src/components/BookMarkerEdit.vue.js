import { onMounted, ref } from 'vue';
import { BookMarkerStore } from '../store/book_marker_stroe';
import { useNotification, useDialog } from 'naive-ui';
const markerFrom = ref({
    tagName: '',
    href: '',
    iconHref: ''
});
const dialog = useDialog();
const notification = useNotification();
onMounted(() => {
    markerFrom.value.tagName = BookMarkerStore.currentMarker.children[BookMarkerStore.editMarkerIndex].tagName;
    markerFrom.value.href = BookMarkerStore.currentMarker.children[BookMarkerStore.editMarkerIndex].href ?? '';
    markerFrom.value.iconHref = BookMarkerStore.currentMarker.children[BookMarkerStore.editMarkerIndex].icon ?? '';
});
function markerType() {
    if (BookMarkerStore.editMarkerIndex === null)
        return 'link';
    return BookMarkerStore.currentMarker.children[BookMarkerStore.editMarkerIndex].type;
}
function remove() {
    BookMarkerStore.removeMarker();
    BookMarkerStore.editMarkerIndex = null;
    dialog.destroyAll();
    notification.success({
        content: '移除成功',
        duration: 2000
    });
}
function save() {
    BookMarkerStore.updateMarker(markerFrom.value);
    BookMarkerStore.editMarkerIndex = null;
    dialog.destroyAll();
    notification.success({
        content: '修改成功',
        duration: 2000
    });
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.nFlex | typeof __VLS_components.NFlex | typeof __VLS_components['n-flex'] | typeof __VLS_components.nFlex | typeof __VLS_components.NFlex | typeof __VLS_components['n-flex']} */
nFlex;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.nInput | typeof __VLS_components.NInput | typeof __VLS_components['n-input'] | typeof __VLS_components.nInput | typeof __VLS_components.NInput | typeof __VLS_components['n-input']} */
nInput;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    value: (__VLS_ctx.markerFrom.tagName),
}));
const __VLS_9 = __VLS_8({
    value: (__VLS_ctx.markerFrom.tagName),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
{
    const { prefix: __VLS_13 } = __VLS_10.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "i_tag" },
    });
    /** @type {__VLS_StyleScopedClasses['i_tag']} */ ;
    // @ts-ignore
    [markerFrom,];
}
// @ts-ignore
[];
var __VLS_10;
if (__VLS_ctx.markerType() === 'link') {
    let __VLS_14;
    /** @ts-ignore @type { | typeof __VLS_components.nInput | typeof __VLS_components.NInput | typeof __VLS_components['n-input'] | typeof __VLS_components.nInput | typeof __VLS_components.NInput | typeof __VLS_components['n-input']} */
    nInput;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
        value: (__VLS_ctx.markerFrom.href),
    }));
    const __VLS_16 = __VLS_15({
        value: (__VLS_ctx.markerFrom.href),
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    const { default: __VLS_19 } = __VLS_17.slots;
    {
        const { prefix: __VLS_20 } = __VLS_17.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "i_tag" },
        });
        /** @type {__VLS_StyleScopedClasses['i_tag']} */ ;
        // @ts-ignore
        [markerFrom, markerType,];
    }
    // @ts-ignore
    [];
    var __VLS_17;
}
let __VLS_21;
/** @ts-ignore @type { | typeof __VLS_components.nInput | typeof __VLS_components.NInput | typeof __VLS_components['n-input'] | typeof __VLS_components.nInput | typeof __VLS_components.NInput | typeof __VLS_components['n-input']} */
nInput;
// @ts-ignore
const __VLS_22 = __VLS_asFunctionalComponent1(__VLS_21, new __VLS_21({
    value: (__VLS_ctx.markerFrom.iconHref),
}));
const __VLS_23 = __VLS_22({
    value: (__VLS_ctx.markerFrom.iconHref),
}, ...__VLS_functionalComponentArgsRest(__VLS_22));
const { default: __VLS_26 } = __VLS_24.slots;
{
    const { prefix: __VLS_27 } = __VLS_24.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "i_tag" },
    });
    /** @type {__VLS_StyleScopedClasses['i_tag']} */ ;
    // @ts-ignore
    [markerFrom,];
}
// @ts-ignore
[];
var __VLS_24;
let __VLS_28;
/** @ts-ignore @type { | typeof __VLS_components.nButton | typeof __VLS_components.NButton | typeof __VLS_components['n-button'] | typeof __VLS_components.nButton | typeof __VLS_components.NButton | typeof __VLS_components['n-button']} */
nButton;
// @ts-ignore
const __VLS_29 = __VLS_asFunctionalComponent1(__VLS_28, new __VLS_28({
    ...{ 'onClick': {} },
    type: "warning",
}));
const __VLS_30 = __VLS_29({
    ...{ 'onClick': {} },
    type: "warning",
}, ...__VLS_functionalComponentArgsRest(__VLS_29));
let __VLS_33;
const __VLS_34 = ({ click: {} },
    { onClick: (__VLS_ctx.remove) });
const { default: __VLS_35 } = __VLS_31.slots;
// @ts-ignore
[remove,];
var __VLS_31;
var __VLS_32;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.nButton | typeof __VLS_components.NButton | typeof __VLS_components['n-button'] | typeof __VLS_components.nButton | typeof __VLS_components.NButton | typeof __VLS_components['n-button']} */
nButton;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_38 = __VLS_37({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
let __VLS_41;
const __VLS_42 = ({ click: {} },
    { onClick: (__VLS_ctx.save) });
const { default: __VLS_43 } = __VLS_39.slots;
// @ts-ignore
[save,];
var __VLS_39;
var __VLS_40;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
