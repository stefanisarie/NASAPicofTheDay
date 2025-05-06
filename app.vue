<script setup lang="ts">
import { Analytics } from "@vercel/analytics/nuxt";
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <Analytics />
  </UApp>
</template>
