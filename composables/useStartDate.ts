import dayjs from 'dayjs';

export const useStartDate = () => {
  const start_date = dayjs().subtract(8, 'day').format('YYYY-MM-DD');
  return start_date;
}