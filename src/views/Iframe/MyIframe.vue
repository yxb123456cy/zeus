<script setup lang="ts">
const route = useRoute();
const iframeUrl = computed(() => `${route.params.id}`)
const getIframeUrl = () => computed(() => `https://${iframeUrl.value}`);
</script>

<template>
  <div class="iframe-container">
    <iframe
        :src="getIframeUrl().value"
        frameborder="0"
        width="100%"
        height="100%"
    ></iframe>
  </div>
</template>

<style scoped>
.iframe-container {
  width: 100%;
  height: 100vh; /* 可根据实际需要调整高度 */
  overflow: hidden;
}
</style>