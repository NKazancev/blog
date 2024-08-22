import { useMemo } from 'react';

const useDate = (date: string) => {
  const result = useMemo(() => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const dateString = new Date(date);

    const month = months[dateString.getMonth()];
    const day = dateString.getDate();
    const year = dateString.getFullYear();

    return [month, day, year];
  }, [date]);

  return result;
};

export default useDate;
