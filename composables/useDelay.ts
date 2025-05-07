// Create a delay utility function
export const useDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));