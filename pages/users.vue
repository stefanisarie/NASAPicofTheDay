<script setup lang="ts">
// Use useAsyncData with a 3-second delay
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const { data: users, status, error } = useLazyAsyncData<User[]>(
  "users",
  async () => {
    // Wait for 1 second
    await useDelay(1000);
    // Then fetch the data
    return $fetch<User[]>("https://jsonplaceholder.typicode.com/users");
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <UContainer class="max-w-7xl mx-auto py-6 px-3 sm:px-5 md:px-8 xl:px-0">
    <div class="mb-4 flex items-center space-x-2">
      <UIcon name="i-material-symbols-keyboard-backspace-rounded" class="text-2xl" />
      <NuxtLink class="text-xl font-bold" to="/">Back to Home</NuxtLink>
    </div>
    <div v-if="status === 'pending'" class="flex space-x-2">
      <UIcon
        name="i-line-md-loading-twotone-loop"
        class="text-2xl animate-spin text-gray-500"
      />
      <span>Loading users...</span>
    </div>
    <div v-else-if="status === 'error'">Error: {{ error?.message }}</div>
    <ul v-else>
      <li v-for="user in users" :key="user.id">
        {{ user.name }}
        <NuxtLink
          class="text-green-600 hover:text-green-400 transition duration-150"
          :to="`mailto:${user.email}`"
          >{{ user.email }}</NuxtLink
        >
      </li>
    </ul>
  </UContainer>
</template>
