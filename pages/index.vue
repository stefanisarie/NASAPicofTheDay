<script setup lang="ts">
  // Importing necessary modules and components
  import type { ApodData, ApodsData } from '~/utils/types'
  const img = useImage()
  import { useColorMode } from '@vueuse/core'
  const mode = useColorMode({ initialValue: 'dark' })

  // Make the call to the API
  const { data: apods, error, status } = useAsyncData<ApodsData>('allapods', () => $fetch('/api/apod'), { server: false })

  // Selected APOD for modal
  const selectedApod = ref<ApodData | null>(null);
  const isModalOpen = ref(false);

  // Function to handle click on PictureCard
  const handleCardClick = (apod: ApodData) => {
    selectedApod.value = apod;
    isModalOpen.value = true;
  };

  // Function to close the modal
  const closeModal = () => {
    isModalOpen.value = false;
  };
  
  // Page title
  useHead({
    title: 'NASA Image of the Day',
    meta: [
      {
        name: 'description',
        content: 'A collection of images from NASA\'s Astronomy Picture of the Day API.'
      }
    ]
  })
</script>

<template>
  <UContainer class="max-w-7xl mx-auto py-6 px-3 sm:px-5 md:px-8 xl:px-0">
    <!-- Loading indicator -->
    <UAlert v-if="status === 'idle' || status === 'pending'" color="primary" title="Loading!" description="We're fetching the latest images from NASA." icon="i-line-md-loading-twotone-loop" />

    <!-- Image of the day successfully fetched -->
    <div class="aspect-w-16 aspect-h-9 flex flex-col space-y-6" v-if="status === 'success'">
      <!-- Theme toggle -->
      <div class="flex justify-end">
        <UButton :icon="mode === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'" color="primary" variant="solid" size="xl" @click="mode = mode === 'dark' ? 'light' : 'dark'" />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <PictureCard v-for="(apod, index) in Object.values(apods).filter(item => typeof item === 'object' && item.date)" :key="index" :apod="apod" @click="handleCardClick" />
      </div>

      <p class="opacity-35 text-right text-sm">Last fetch on {{ useFormatDate(apods.timestamp) }}.</p>
    </div>

    <!-- Error grabing the image for NASA API -->
    <UAlert v-if="status === 'error'" color="error" title="Fetch error!" :description="`There is an issue getting the image of the day from NASA. (${error})`" icon="i-ic-baseline-report-gmailerrorred" />

    <!-- Modal for detailed view -->
    <UModal v-model:open="isModalOpen" :title="selectedApod?.title" :description="`NASA Image of the Day Details for ${selectedApod?.date}`" :ui="{
      content: 'max-w-4xl',
      body: '!p-2'
    }">
      <template #body>
        <div v-if="selectedApod" class="p-4">
          <!-- Media content -->
          <div class="mb-6">
            <NuxtImg v-if="selectedApod.media_type === 'image'" :src="selectedApod.url" :alt="selectedApod.title" format="webp" quality="60" loading="lazy" :placeholder="img(selectedApod.hdurl, { h: 10, f: 'png', blur: 6, q: 50 })" class="rounded-lg shadow-lg w-full"></NuxtImg>
            <iframe v-else-if="selectedApod.media_type === 'video'" :src="selectedApod.url" class="w-full h-96 rounded-lg" frameborder="0" allowfullscreen ></iframe>
          </div>
          
          <!-- Description -->
          <p class="mb-4">{{ selectedApod.explanation }} <span class="text-xs opacity-35">(Image published on {{ selectedApod.date }})</span></p>
          
          <!-- Copyright -->
          <p v-if="selectedApod.copyright" class="text-sm italic">
            &copy; {{ selectedApod.copyright }}
          </p>
        </div>
      </template>
      
      <template #footer>
        <div class="flex justify-end">
          <UButton color="secondary" variant="solid" @click="closeModal">Close</UButton>
        </div>
      </template>
    </UModal>
  </UContainer>
</template>