// Format the date in a human readable format
export const useFormatDate = (timestamp: string) => {
  const date = new Date(timestamp)
  return new Intl.DateTimeFormat('en-UK', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date)
}