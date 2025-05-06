<script setup lang="ts">
import { useYoutubeID } from "~/composables/useYoutubeID";
import type { ApodData } from "~/utils/types";
const img = useImage();

const props = defineProps({
  apod: {
    type: Object as () => ApodData,
    required: true,
  },
});

const emit = defineEmits(["click"]);
const handleClick = () => {
  emit("click", props.apod);
};

const youtubePreviewImage = computed(() => {
  const youtubeID = useYoutubeID(props.apod.url);
  return `https://img.youtube.com/vi/${youtubeID}/mqdefault.jpg`;
});
</script>

<template>
  <UCard
    @click="handleClick"
    class="cursor-pointer flex flex-col h-full"
    :ui="{
      body: 'flex h-full mx-auto',
    }"
  >
    <template #header>
      <h1 class="font-bold">{{ apod.title }}</h1>
    </template>

    <div class="flex items-center justify-center flex-grow">
      <NuxtImg
        v-if="apod.media_type === 'image'"
        :src="apod.url"
        :alt="apod.title"
        format="webp"
        quality="60"
        loading="lazy"
        :placeholder="img(apod.url, { h: 10, f: 'png', blur: 6, q: 50 })"
        class="object-fit rounded-lg shadow-lg aspect-auto"
      ></NuxtImg>
      <NuxtImg
        v-else-if="apod.media_type === 'video'"
        :src="youtubePreviewImage"
        :alt="apod.title"
        format="webp"
        quality="60"
        loading="lazy"
        :placeholder="img(youtubePreviewImage, { h: 10, f: 'png', blur: 6, q: 50 })"
        class="object-fit rounded-lg shadow-lg aspect-auto w-96"
      ></NuxtImg>
    </div>

    <template #footer>
      <div class="flex items-end justify-between">
        <span class="opacity-30 text-xs" v-if="apod.copyright"
          >&copy; {{ apod.copyright }}</span
        >
        <span class="opacity-30 text-xs">{{ apod.date }}</span>
      </div>
    </template>
  </UCard>
</template>
