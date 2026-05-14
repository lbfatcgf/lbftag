<template>
    <div class="glass">
        
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

</script>
<style scoped>
.glass {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    padding: 10px 10px 10px 10px;
    /* background-color: #d7d7d7; */
    border: solid 1px #ffffff4f;
    width: fit-content;
    height: fit-content;
    border-radius: 20px;
}
</style>
