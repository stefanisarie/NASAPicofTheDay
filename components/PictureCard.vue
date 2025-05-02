<script setup lang="ts">
  import type { ApodData } from '~/utils/types'
  const img = useImage()
  
  const props = defineProps({
    apod: {
      type: Object as () => ApodData,
      required: true
    }
  })

  const emit = defineEmits(['click'])
  const handleClick = () => {
    emit('click', props.apod)
  }
</script>

<template>
  <UCard @click="handleClick" class="cursor-pointer flex flex-col h-full" :ui="{
    body: 'flex h-full mx-auto'
  }">
    <template #header>
      <h1 class="font-bold">{{ apod.title }}</h1>
    </template>
  
    <div class="flex items-center justify-center flex-grow">
      <NuxtImg :src="apod.url" :alt="apod.title" format="webp" quality="60" loading="lazy" :placeholder="img(apod.url, { h: 10, f: 'png', blur: 6, q: 50 })" class="object-fit rounded-lg shadow-lg aspect-auto"></NuxtImg>
    </div>

    <!-- <div class="relative h-64 overflow-hidden -p-6 -m-6">
      <div
        v-if="apod.media_type === 'image'"
        :style="{ backgroundImage: `url(${apod.url})` }"
        class="absolute inset-0 bg-cover bg-center"
      ></div>
    </div> -->
    <template #footer>
      <div class="flex items-end justify-end">
        <span class="opacity-30 text-xs">{{ apod.date }}</span>
      </div>
    </template>
  </UCard>
</template>