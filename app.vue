<script lang="ts" setup>
const { isMobile } = useDevice()

const layout = computed(() => isMobile ? 'mobile' : 'desktop')
</script>
<template>
  <div>
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>


