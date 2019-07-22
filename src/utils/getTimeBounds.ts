const oneDay = 86400000;
const sevenDays = oneDay * 7;

export const getTimeBounds = (startDate: Date, endDate: Date): [Date, Date] => {
  const diff = endDate.getTime() - startDate.getTime();
  if (diff >= sevenDays) {
    startDate.setDate(startDate.getDate() - 1);
    endDate.setDate(endDate.getDate() + 1);
  } else {
    const getDaysFromMinDiff = Math.round((sevenDays - diff) / oneDay);
    const growthFactor = Math.round(getDaysFromMinDiff / 2);
    startDate.setDate(startDate.getDate() - growthFactor);
    endDate.setDate(endDate.getDate() + growthFactor);
  }
  return [startDate, endDate];
};
