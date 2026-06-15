<template>
    <div :class="`glass ${fitContent ? 'glassBox' : ''}`">

        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    fitContent?: boolean
}>(), {
    fitContent: true
})
</script>
<style scoped>
.glassBox {

    /* background-color: #d7d7d7; */
    width: fit-content;
    height: fit-content;
}
</style>
