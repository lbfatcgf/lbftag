import BookMarkerItem from './BookMarkerItem.vue';
import AddMarker from './AddMarker.vue';
import { onMounted } from 'vue';
import { BookMarkerStore } from '../store/book_marker_stroe.js';
const emit = defineEmits();
onMounted(() => {
    BookMarkerStore.loadMarker();
});
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
if (__VLS_ctx.BookMarkerStore.currentMarker.children.length > 0) {
    let __VLS_0;
    /** @ts-ignore @type { | typeof __VLS_components.nFlex | typeof __VLS_components.NFlex | typeof __VLS_components['n-flex'] | typeof __VLS_components.nFlex | typeof __VLS_components.NFlex | typeof __VLS_components['n-flex']} */
    nFlex;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        ...{ style: {} },
    }));
    const __VLS_2 = __VLS_1({
        ...{ style: {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_5 = {};
    const { default: __VLS_6 } = __VLS_3.slots;
    for (const [value, index] of __VLS_vFor((__VLS_ctx.BookMarkerStore.currentMarker.children))) {
        const __VLS_7 = BookMarkerItem || BookMarkerItem;
        // @ts-ignore
        const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
            bmIndex: (index),
            bm: (value),
            key: (value.tagName + index),
        }));
        const __VLS_9 = __VLS_8({
            bmIndex: (index),
            bm: (value),
            key: (value.tagName + index),
        }, ...__VLS_functionalComponentArgsRest(__VLS_8));
        // @ts-ignore
        [BookMarkerStore, BookMarkerStore,];
    }
    const __VLS_12 = AddMarker;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent1(__VLS_12, new __VLS_12({}));
    const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
    // @ts-ignore
    [];
    var __VLS_3;
}
else {
    let __VLS_17;
    /** @ts-ignore @type { | typeof __VLS_components.nFlex | typeof __VLS_components.NFlex | typeof __VLS_components['n-flex'] | typeof __VLS_components.nFlex | typeof __VLS_components.NFlex | typeof __VLS_components['n-flex']} */
    nFlex;
    // @ts-ignore
    const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
        ...{ style: {} },
        justify: "center",
        align: "center",
    }));
    const __VLS_19 = __VLS_18({
        ...{ style: {} },
        justify: "center",
        align: "center",
    }, ...__VLS_functionalComponentArgsRest(__VLS_18));
    var __VLS_22 = {};
    const { default: __VLS_23 } = __VLS_20.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: {} },
    });
    const __VLS_24 = AddMarker;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent1(__VLS_24, new __VLS_24({}));
    const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
    // @ts-ignore
    [];
    var __VLS_20;
}
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
});
export default {};
