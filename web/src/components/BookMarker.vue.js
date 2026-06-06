import GlassBox from './GlassBox.vue';
import { EllipsisV } from '@vicons/fa';
import { ref } from 'vue';
import BookMarkerTree from './BookMarkerTree.vue';
import { BookMarkerStore } from '../store/book_marker_stroe.js';
const inputHtml = ref();
const inputLbftagJson = ref();
const openDialog = ref(false);
const setOption = [
    {
        label: "导入",
        key: "import",
    },
    {
        label: "导出",
        key: "export",
    },
    {
        label: "清空",
        key: "clear"
    }
];
function handleInputHtml(event) {
    const target = event.target;
    var file = target.files?.[0];
    if (!file) {
        return;
    }
    // mbTree.value?.inputFile(file)
    BookMarkerStore.importFormHtml(file);
    openDialog.value = false;
}
function handleInputJson(event) {
    const target = event.target;
    var file = target.files?.[0];
    if (!file) {
        return;
    }
    // mbTree.value?.inputFile(file)
    BookMarkerStore.importFormJson(file);
    openDialog.value = false;
}
function handleSelect(key) {
    if (key === "import") {
        openDialog.value = true;
    }
    if (key === "export") {
        BookMarkerStore.exportFile();
    }
    if (key === 'clear') {
        BookMarkerStore.clearAll();
    }
}
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
const __VLS_0 = GlassBox || GlassBox;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    fitContent: (false),
    ...{ class: "talet" },
}));
const __VLS_2 = __VLS_1({
    fitContent: (false),
    ...{ class: "talet" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5 = {};
/** @type {__VLS_StyleScopedClasses['talet']} */ ;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.nFlex | typeof __VLS_components.NFlex | typeof __VLS_components['n-flex'] | typeof __VLS_components.nFlex | typeof __VLS_components.NFlex | typeof __VLS_components['n-flex']} */
nFlex;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    ...{ style: {} },
    vertical: (true),
}));
const __VLS_9 = __VLS_8({
    ...{ style: {} },
    vertical: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.nFlex | typeof __VLS_components.NFlex | typeof __VLS_components['n-flex'] | typeof __VLS_components.nFlex | typeof __VLS_components.NFlex | typeof __VLS_components['n-flex']} */
nFlex;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({
    ...{ style: {} },
    align: "center",
    justify: "space-between",
}));
const __VLS_15 = __VLS_14({
    ...{ style: {} },
    align: "center",
    justify: "space-between",
}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const { default: __VLS_18 } = __VLS_16.slots;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.nScrollbar | typeof __VLS_components.NScrollbar | typeof __VLS_components['n-scrollbar'] | typeof __VLS_components.nScrollbar | typeof __VLS_components.NScrollbar | typeof __VLS_components['n-scrollbar']} */
nScrollbar;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    ...{ style: {} },
    xScrollable: (true),
}));
const __VLS_21 = __VLS_20({
    ...{ style: {} },
    xScrollable: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_24 } = __VLS_22.slots;
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.nBreadcrumb | typeof __VLS_components.NBreadcrumb | typeof __VLS_components['n-breadcrumb'] | typeof __VLS_components.nBreadcrumb | typeof __VLS_components.NBreadcrumb | typeof __VLS_components['n-breadcrumb']} */
nBreadcrumb;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({}));
const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
const { default: __VLS_30 } = __VLS_28.slots;
for (const [value, index] of __VLS_vFor((__VLS_ctx.BookMarkerStore.markerPath))) {
    let __VLS_31;
    /** @ts-ignore @type { | typeof __VLS_components.nBreadcrumbItem | typeof __VLS_components.NBreadcrumbItem | typeof __VLS_components['n-breadcrumb-item'] | typeof __VLS_components.nBreadcrumbItem | typeof __VLS_components.NBreadcrumbItem | typeof __VLS_components['n-breadcrumb-item']} */
    nBreadcrumbItem;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
        ...{ 'onClick': {} },
        ...{ style: {} },
        clickable: (__VLS_ctx.BookMarkerStore.markerPath.length - 1 > index),
    }));
    const __VLS_33 = __VLS_32({
        ...{ 'onClick': {} },
        ...{ style: {} },
        clickable: (__VLS_ctx.BookMarkerStore.markerPath.length - 1 > index),
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    let __VLS_36;
    const __VLS_37 = ({ click: {} },
        { onClick: (...[$event]) => {
                __VLS_ctx.BookMarkerStore.backMarkerPath(index);
                // @ts-ignore
                [BookMarkerStore, BookMarkerStore, BookMarkerStore,];
            } });
    const { default: __VLS_38 } = __VLS_34.slots;
    (value.tagName === '/' ? '..' : value.tagName);
    // @ts-ignore
    [];
    var __VLS_34;
    var __VLS_35;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_28;
// @ts-ignore
[];
var __VLS_22;
let __VLS_39;
/** @ts-ignore @type { | typeof __VLS_components.nDropdown | typeof __VLS_components.NDropdown | typeof __VLS_components['n-dropdown'] | typeof __VLS_components.nDropdown | typeof __VLS_components.NDropdown | typeof __VLS_components['n-dropdown']} */
nDropdown;
// @ts-ignore
const __VLS_40 = __VLS_asFunctionalComponent1(__VLS_39, new __VLS_39({
    ...{ 'onSelect': {} },
    trigger: "click",
    options: (__VLS_ctx.setOption),
}));
const __VLS_41 = __VLS_40({
    ...{ 'onSelect': {} },
    trigger: "click",
    options: (__VLS_ctx.setOption),
}, ...__VLS_functionalComponentArgsRest(__VLS_40));
let __VLS_44;
const __VLS_45 = ({ select: {} },
    { onSelect: (__VLS_ctx.handleSelect) });
const { default: __VLS_46 } = __VLS_42.slots;
let __VLS_47;
/** @ts-ignore @type { | typeof __VLS_components.nButton | typeof __VLS_components.NButton | typeof __VLS_components['n-button'] | typeof __VLS_components.nButton | typeof __VLS_components.NButton | typeof __VLS_components['n-button']} */
nButton;
// @ts-ignore
const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
    quaternary: true,
    circle: true,
}));
const __VLS_49 = __VLS_48({
    quaternary: true,
    circle: true,
}, ...__VLS_functionalComponentArgsRest(__VLS_48));
const { default: __VLS_52 } = __VLS_50.slots;
let __VLS_53;
/** @ts-ignore @type { | typeof __VLS_components.nIcon | typeof __VLS_components.NIcon | typeof __VLS_components['n-icon'] | typeof __VLS_components.nIcon | typeof __VLS_components.NIcon | typeof __VLS_components['n-icon']} */
nIcon;
// @ts-ignore
const __VLS_54 = __VLS_asFunctionalComponent1(__VLS_53, new __VLS_53({
    color: "#ffffff79",
}));
const __VLS_55 = __VLS_54({
    color: "#ffffff79",
}, ...__VLS_functionalComponentArgsRest(__VLS_54));
const { default: __VLS_58 } = __VLS_56.slots;
let __VLS_59;
/** @ts-ignore @type { | typeof __VLS_components.EllipsisV | typeof __VLS_components.EllipsisV} */
EllipsisV;
// @ts-ignore
const __VLS_60 = __VLS_asFunctionalComponent1(__VLS_59, new __VLS_59({}));
const __VLS_61 = __VLS_60({}, ...__VLS_functionalComponentArgsRest(__VLS_60));
// @ts-ignore
[setOption, handleSelect,];
var __VLS_56;
// @ts-ignore
[];
var __VLS_50;
// @ts-ignore
[];
var __VLS_42;
var __VLS_43;
// @ts-ignore
[];
var __VLS_16;
let __VLS_64;
/** @ts-ignore @type { | typeof __VLS_components.nDivider | typeof __VLS_components.NDivider | typeof __VLS_components['n-divider'] | typeof __VLS_components.nDivider | typeof __VLS_components.NDivider | typeof __VLS_components['n-divider']} */
nDivider;
// @ts-ignore
const __VLS_65 = __VLS_asFunctionalComponent1(__VLS_64, new __VLS_64({
    ...{ style: {} },
}));
const __VLS_66 = __VLS_65({
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_65));
const __VLS_69 = BookMarkerTree;
// @ts-ignore
const __VLS_70 = __VLS_asFunctionalComponent1(__VLS_69, new __VLS_69({
    ref: "mbTree",
}));
const __VLS_71 = __VLS_70({
    ref: "mbTree",
}, ...__VLS_functionalComponentArgsRest(__VLS_70));
var __VLS_74 = {};
var __VLS_72;
// @ts-ignore
[];
var __VLS_10;
let __VLS_76;
/** @ts-ignore @type { | typeof __VLS_components.nModal | typeof __VLS_components.NModal | typeof __VLS_components['n-modal'] | typeof __VLS_components.nModal | typeof __VLS_components.NModal | typeof __VLS_components['n-modal']} */
nModal;
// @ts-ignore
const __VLS_77 = __VLS_asFunctionalComponent1(__VLS_76, new __VLS_76({
    show: (__VLS_ctx.openDialog),
}));
const __VLS_78 = __VLS_77({
    show: (__VLS_ctx.openDialog),
}, ...__VLS_functionalComponentArgsRest(__VLS_77));
const { default: __VLS_81 } = __VLS_79.slots;
const __VLS_82 = GlassBox || GlassBox;
// @ts-ignore
const __VLS_83 = __VLS_asFunctionalComponent1(__VLS_82, new __VLS_82({}));
const __VLS_84 = __VLS_83({}, ...__VLS_functionalComponentArgsRest(__VLS_83));
const { default: __VLS_87 } = __VLS_85.slots;
let __VLS_88;
/** @ts-ignore @type { | typeof __VLS_components.nFlex | typeof __VLS_components.NFlex | typeof __VLS_components['n-flex'] | typeof __VLS_components.nFlex | typeof __VLS_components.NFlex | typeof __VLS_components['n-flex']} */
nFlex;
// @ts-ignore
const __VLS_89 = __VLS_asFunctionalComponent1(__VLS_88, new __VLS_88({}));
const __VLS_90 = __VLS_89({}, ...__VLS_functionalComponentArgsRest(__VLS_89));
const { default: __VLS_93 } = __VLS_91.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.input, __VLS_intrinsics.input)({
    ...{ onChange: (__VLS_ctx.handleInputHtml) },
    ref: "inputHtml",
    type: "file",
    accept: ".html",
    ...{ style: {} },
});
let __VLS_94;
/** @ts-ignore @type { | typeof __VLS_components.nButton | typeof __VLS_components.NButton | typeof __VLS_components['n-button'] | typeof __VLS_components.nButton | typeof __VLS_components.NButton | typeof __VLS_components['n-button']} */
nButton;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent1(__VLS_94, new __VLS_94({
    ...{ 'onClick': {} },
    type: "info",
}));
const __VLS_96 = __VLS_95({
    ...{ 'onClick': {} },
    type: "info",
}, ...__VLS_functionalComponentArgsRest(__VLS_95));
let __VLS_99;
const __VLS_100 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.inputHtml?.click();
            // @ts-ignore
            [openDialog, handleInputHtml, inputHtml,];
        } });
const { default: __VLS_101 } = __VLS_97.slots;
// @ts-ignore
[];
var __VLS_97;
var __VLS_98;
__VLS_asFunctionalElement1(__VLS_intrinsics.input, __VLS_intrinsics.input)({
    ...{ onChange: (__VLS_ctx.handleInputJson) },
    ref: "inputLbftagJson",
    type: "file",
    accept: ".lbftag.json",
    ...{ style: {} },
});
let __VLS_102;
/** @ts-ignore @type { | typeof __VLS_components.nButton | typeof __VLS_components.NButton | typeof __VLS_components['n-button'] | typeof __VLS_components.nButton | typeof __VLS_components.NButton | typeof __VLS_components['n-button']} */
nButton;
// @ts-ignore
const __VLS_103 = __VLS_asFunctionalComponent1(__VLS_102, new __VLS_102({
    ...{ 'onClick': {} },
    type: "info",
}));
const __VLS_104 = __VLS_103({
    ...{ 'onClick': {} },
    type: "info",
}, ...__VLS_functionalComponentArgsRest(__VLS_103));
let __VLS_107;
const __VLS_108 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.inputLbftagJson?.click();
            // @ts-ignore
            [handleInputJson, inputLbftagJson,];
        } });
const { default: __VLS_109 } = __VLS_105.slots;
// @ts-ignore
[];
var __VLS_105;
var __VLS_106;
let __VLS_110;
/** @ts-ignore @type { | typeof __VLS_components.nButton | typeof __VLS_components.NButton | typeof __VLS_components['n-button'] | typeof __VLS_components.nButton | typeof __VLS_components.NButton | typeof __VLS_components['n-button']} */
nButton;
// @ts-ignore
const __VLS_111 = __VLS_asFunctionalComponent1(__VLS_110, new __VLS_110({
    ...{ 'onClick': {} },
    type: "error",
}));
const __VLS_112 = __VLS_111({
    ...{ 'onClick': {} },
    type: "error",
}, ...__VLS_functionalComponentArgsRest(__VLS_111));
let __VLS_115;
const __VLS_116 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.openDialog = false;
            // @ts-ignore
            [openDialog,];
        } });
const { default: __VLS_117 } = __VLS_113.slots;
// @ts-ignore
[];
var __VLS_113;
var __VLS_114;
// @ts-ignore
[];
var __VLS_91;
// @ts-ignore
[];
var __VLS_85;
// @ts-ignore
[];
var __VLS_79;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_75 = __VLS_74;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
