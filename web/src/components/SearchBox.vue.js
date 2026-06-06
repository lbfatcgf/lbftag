import { onMounted, ref } from 'vue';
import { Search } from '@vicons/fa';
import { SearchEnginsStore } from '../store/search_engins_stroe';
const searchContext = ref('');
const enginesOptions = ref(new Array());
function finish(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        search();
    }
}
function search() {
    window.open(SearchEnginsStore.getEnginesLink(SearchEnginsStore.currentEngine) + searchContext.value, '_blank');
}
function updateEngine(_, option) {
    SearchEnginsStore.changeCurrentEngines(option.label ?? "bing");
}
onMounted(() => {
    SearchEnginsStore.loadEngines();
    enginesOptions.value = SearchEnginsStore.enginesOptions();
    // console.log(SearchEnginsStore.enginesOptions());
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['searchBox']} */ ;
/** @type {__VLS_StyleScopedClasses['searchBox']} */ ;
/** @type {__VLS_StyleScopedClasses['searchBox']} */ ;
/** @type {__VLS_StyleScopedClasses['searchBox']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "glass searchBox" },
});
/** @type {__VLS_StyleScopedClasses['glass']} */ ;
/** @type {__VLS_StyleScopedClasses['searchBox']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.nDropdown | typeof __VLS_components.NDropdown | typeof __VLS_components['n-dropdown'] | typeof __VLS_components.nDropdown | typeof __VLS_components.NDropdown | typeof __VLS_components['n-dropdown']} */
nDropdown;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    ...{ 'onSelect': {} },
    options: (__VLS_ctx.SearchEnginsStore.enginesOptions()),
}));
const __VLS_2 = __VLS_1({
    ...{ 'onSelect': {} },
    options: (__VLS_ctx.SearchEnginsStore.enginesOptions()),
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
let __VLS_5;
const __VLS_6 = ({ select: {} },
    { onSelect: (__VLS_ctx.updateEngine) });
const { default: __VLS_7 } = __VLS_3.slots;
let __VLS_8;
/** @ts-ignore @type { | typeof __VLS_components.nButton | typeof __VLS_components.NButton | typeof __VLS_components['n-button'] | typeof __VLS_components.nButton | typeof __VLS_components.NButton | typeof __VLS_components['n-button']} */
nButton;
// @ts-ignore
const __VLS_9 = __VLS_asFunctionalComponent1(__VLS_8, new __VLS_8({
    quaternary: true,
    size: "large",
    ...{ style: {} },
}));
const __VLS_10 = __VLS_9({
    quaternary: true,
    size: "large",
    ...{ style: {} },
}, ...__VLS_functionalComponentArgsRest(__VLS_9));
const { default: __VLS_13 } = __VLS_11.slots;
(__VLS_ctx.SearchEnginsStore.currentEngine);
// @ts-ignore
[SearchEnginsStore, SearchEnginsStore, updateEngine,];
var __VLS_11;
// @ts-ignore
[];
var __VLS_3;
var __VLS_4;
let __VLS_14;
/** @ts-ignore @type { | typeof __VLS_components.nInput | typeof __VLS_components.NInput | typeof __VLS_components['n-input'] | typeof __VLS_components.nInput | typeof __VLS_components.NInput | typeof __VLS_components['n-input']} */
nInput;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
    ...{ 'onKeydown': {} },
    ...{ style: {} },
    value: (__VLS_ctx.searchContext),
    type: "text",
    placeholder: "",
}));
const __VLS_16 = __VLS_15({
    ...{ 'onKeydown': {} },
    ...{ style: {} },
    value: (__VLS_ctx.searchContext),
    type: "text",
    placeholder: "",
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
let __VLS_19;
const __VLS_20 = ({ keydown: {} },
    { onKeydown: (__VLS_ctx.finish) });
const { default: __VLS_21 } = __VLS_17.slots;
{
    const { suffix: __VLS_22 } = __VLS_17.slots;
    let __VLS_23;
    /** @ts-ignore @type { | typeof __VLS_components.nButton | typeof __VLS_components.NButton | typeof __VLS_components['n-button'] | typeof __VLS_components.nButton | typeof __VLS_components.NButton | typeof __VLS_components['n-button']} */
    nButton;
    // @ts-ignore
    const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
        ...{ 'onClick': {} },
        quaternary: true,
    }));
    const __VLS_25 = __VLS_24({
        ...{ 'onClick': {} },
        quaternary: true,
    }, ...__VLS_functionalComponentArgsRest(__VLS_24));
    let __VLS_28;
    const __VLS_29 = ({ click: {} },
        { onClick: (__VLS_ctx.search) });
    const { default: __VLS_30 } = __VLS_26.slots;
    let __VLS_31;
    /** @ts-ignore @type { | typeof __VLS_components.nIcon | typeof __VLS_components.NIcon | typeof __VLS_components['n-icon'] | typeof __VLS_components.nIcon | typeof __VLS_components.NIcon | typeof __VLS_components['n-icon']} */
    nIcon;
    // @ts-ignore
    const __VLS_32 = __VLS_asFunctionalComponent1(__VLS_31, new __VLS_31({
        size: "24",
    }));
    const __VLS_33 = __VLS_32({
        size: "24",
    }, ...__VLS_functionalComponentArgsRest(__VLS_32));
    const { default: __VLS_36 } = __VLS_34.slots;
    let __VLS_37;
    /** @ts-ignore @type { | typeof __VLS_components.Search | typeof __VLS_components.Search} */
    Search;
    // @ts-ignore
    const __VLS_38 = __VLS_asFunctionalComponent1(__VLS_37, new __VLS_37({}));
    const __VLS_39 = __VLS_38({}, ...__VLS_functionalComponentArgsRest(__VLS_38));
    // @ts-ignore
    [searchContext, finish, search,];
    var __VLS_34;
    // @ts-ignore
    [];
    var __VLS_26;
    var __VLS_27;
    // @ts-ignore
    [];
}
// @ts-ignore
[];
var __VLS_17;
var __VLS_18;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
