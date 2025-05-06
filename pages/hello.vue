<script setup>
// Create a delay utility function
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
  
  // Use useAsyncData with a 3-second delay
  const { data, status, error } = await useAsyncData('users', async () => {
    // Wait for 3 seconds
    await delay(3000)
    // Then fetch the data
    return $fetch('https://jsonplaceholder.org/users')
})
</script>

<template>
  <div v-if="status === 'pending'">Loading...</div>
  <div v-else-if="status === 'error'">Error: {{ error.message }}</div>
  <ul v-else>
    <li v-for="user in data" :key="user.id">{{ user.firstname }} {{ user.lastname }}</li>
  </ul>
</template>