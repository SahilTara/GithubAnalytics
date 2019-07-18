import { TIME_SPAN } from "../types/TimeSpan";

export const getTimeSpanStartDate = (timeSpan: TIME_SPAN) => {
  const now = new Date();
  let timeSpanStartDate: Date = new Date();
  switch (timeSpan) {
    case TIME_SPAN.LAST_7_DAYS:
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);
      sevenDaysAgo.setHours(0, 0, 0, 0);
      timeSpanStartDate = sevenDaysAgo;
      break;
    case TIME_SPAN.LAST_MONTH:
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(now.getMonth() - 1, now.getDate());
      oneMonthAgo.setHours(0, 0, 0, 0);
      timeSpanStartDate = oneMonthAgo;
      break;
    case TIME_SPAN.LAST_YEAR:
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(
        now.getFullYear() - 1,
        now.getMonth(),
        now.getDate()
      );
      oneYearAgo.setHours(0, 0, 0, 0);
      timeSpanStartDate = oneYearAgo;
      break;
  }
  return timeSpanStartDate;
};
