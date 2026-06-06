import { ref } from 'vue';
import { useDialog } from 'naive-ui';
import { BookMarkerStore } from '../store/book_marker_stroe';
const f = ref({
    tagName: '',
    href: '',
    iconHref: '',
    type: 'link'
});
const dialog = useDialog();
function add() {
    BookMarkerStore.addMarker(f.value);
    dialog.destroyAll();
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
    value: (__VLS_ctx.f.tagName),
}));
const __VLS_9 = __VLS_8({
    value: (__VLS_ctx.f.tagName),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
{
    const { prefix: __VLS_13 } = __VLS_10.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: {} },
    });
    // @ts-ignore
    [f,];
}
// @ts-ignore
[];
var __VLS_10;
let __VLS_14;
/** @ts-ignore @type { | typeof __VLS_components.nRadioGroup | typeof __VLS_components.NRadioGroup | typeof __VLS_components['n-radio-group'] | typeof __VLS_components.nRadioGroup | typeof __VLS_components.NRadioGroup | typeof __VLS_components['n-radio-group']} */
nRadioGroup;
// @ts-ignore
const __VLS_15 = __VLS_asFunctionalComponent1(__VLS_14, new __VLS_14({
    value: (__VLS_ctx.f.type),
}));
const __VLS_16 = __VLS_15({
    value: (__VLS_ctx.f.type),
}, ...__VLS_functionalComponentArgsRest(__VLS_15));
const { default: __VLS_19 } = __VLS_17.slots;
let __VLS_20;
/** @ts-ignore @type { | typeof __VLS_components.nSpace | typeof __VLS_components.NSpace | typeof __VLS_components['n-space'] | typeof __VLS_components.nSpace | typeof __VLS_components.NSpace | typeof __VLS_components['n-space']} */
nSpace;
// @ts-ignore
const __VLS_21 = __VLS_asFunctionalComponent1(__VLS_20, new __VLS_20({}));
const __VLS_22 = __VLS_21({}, ...__VLS_functionalComponentArgsRest(__VLS_21));
const { default: __VLS_25 } = __VLS_23.slots;
let __VLS_26;
/** @ts-ignore @type { | typeof __VLS_components.nRadio | typeof __VLS_components.NRadio | typeof __VLS_components['n-radio'] | typeof __VLS_components.nRadio | typeof __VLS_components.NRadio | typeof __VLS_components['n-radio']} */
nRadio;
// @ts-ignore
const __VLS_27 = __VLS_asFunctionalComponent1(__VLS_26, new __VLS_26({
    key: "link",
    value: "link",
}));
const __VLS_28 = __VLS_27({
    key: "link",
    value: "link",
}, ...__VLS_functionalComponentArgsRest(__VLS_27));
const { default: __VLS_31 } = __VLS_29.slots;
// @ts-ignore
[f,];
var __VLS_29;
let __VLS_32;
/** @ts-ignore @type { | typeof __VLS_components.nRadio | typeof __VLS_components.NRadio | typeof __VLS_components['n-radio'] | typeof __VLS_components.nRadio | typeof __VLS_components.NRadio | typeof __VLS_components['n-radio']} */
nRadio;
// @ts-ignore
const __VLS_33 = __VLS_asFunctionalComponent1(__VLS_32, new __VLS_32({
    key: "dir",
    value: "dir",
}));
const __VLS_34 = __VLS_33({
    key: "dir",
    value: "dir",
}, ...__VLS_functionalComponentArgsRest(__VLS_33));
const { default: __VLS_37 } = __VLS_35.slots;
// @ts-ignore
[];
var __VLS_35;
// @ts-ignore
[];
var __VLS_23;
// @ts-ignore
[];
var __VLS_17;
if (__VLS_ctx.f.type === 'link') {
    let __VLS_38;
    /** @ts-ignore @type { | typeof __VLS_components.nInput | typeof __VLS_components.NInput | typeof __VLS_components['n-input'] | typeof __VLS_components.nInput | typeof __VLS_components.NInput | typeof __VLS_components['n-input']} */
    nInput;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent1(__VLS_38, new __VLS_38({
        value: (__VLS_ctx.f.href),
    }));
    const __VLS_40 = __VLS_39({
        value: (__VLS_ctx.f.href),
    }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    const { default: __VLS_43 } = __VLS_41.slots;
    {
        const { prefix: __VLS_44 } = __VLS_41.slots;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ style: {} },
        });
        // @ts-ignore
        [f, f,];
    }
    // @ts-ignore
    [];
    var __VLS_41;
}
let __VLS_45;
/** @ts-ignore @type { | typeof __VLS_components.nInput | typeof __VLS_components.NInput | typeof __VLS_components['n-input'] | typeof __VLS_components.nInput | typeof __VLS_components.NInput | typeof __VLS_components['n-input']} */
nInput;
// @ts-ignore
const __VLS_46 = __VLS_asFunctionalComponent1(__VLS_45, new __VLS_45({
    value: (__VLS_ctx.f.iconHref),
}));
const __VLS_47 = __VLS_46({
    value: (__VLS_ctx.f.iconHref),
}, ...__VLS_functionalComponentArgsRest(__VLS_46));
const { default: __VLS_50 } = __VLS_48.slots;
{
    const { prefix: __VLS_51 } = __VLS_48.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ style: {} },
    });
    // @ts-ignore
    [f,];
}
// @ts-ignore
[];
var __VLS_48;
let __VLS_52;
/** @ts-ignore @type { | typeof __VLS_components.nButton | typeof __VLS_components.NButton | typeof __VLS_components['n-button'] | typeof __VLS_components.nButton | typeof __VLS_components.NButton | typeof __VLS_components['n-button']} */
nButton;
// @ts-ignore
const __VLS_53 = __VLS_asFunctionalComponent1(__VLS_52, new __VLS_52({
    ...{ 'onClick': {} },
    type: "primary",
}));
const __VLS_54 = __VLS_53({
    ...{ 'onClick': {} },
    type: "primary",
}, ...__VLS_functionalComponentArgsRest(__VLS_53));
let __VLS_57;
const __VLS_58 = ({ click: {} },
    { onClick: (__VLS_ctx.add) });
const { default: __VLS_59 } = __VLS_55.slots;
// @ts-ignore
[add,];
var __VLS_55;
var __VLS_56;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
