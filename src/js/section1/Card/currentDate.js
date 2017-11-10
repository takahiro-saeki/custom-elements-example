const month = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December'
};

const currentDate = () => {
  const date = new Date();
  const currentMonth = month[date.getMonth()];
  const currentDate = date.getDate();
  const today = `${currentMonth} ${currentDate}`;
  return today;
};

export default currentDate;
