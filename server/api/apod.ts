import { useStartDate } from "~/composables/useStartDate"
import type { ApodData } from "~/utils/types"

export default defineEventHandler(async (event) => {
  const { NASA_API_KEY } = useRuntimeConfig()
  const timestamp = new Date().toISOString();
  
  const data: ApodData = await $fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&start_date=${useStartDate()}`)

  console.log('New picture of the day from NASA successfully fetched!')
  
  // Reverse the data
  const reversedData = Array.isArray(data) ? [...data].reverse() : data;

  return {
    ...reversedData,
    timestamp,
  };
})