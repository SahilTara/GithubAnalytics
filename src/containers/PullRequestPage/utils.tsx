import IDonutGraphData from "../../types/IGraphData/IDonutGraphData";

import IBarGraphData from "../../types/IGraphData/IBarGraphData";
import { IPullRequest } from "../../types/IPullRequest";

const getOpenedPrsLeaderboardData = (
  prs: IPullRequest[],
  dateToCompare: Date
): IDonutGraphData[] => {
  const leaderboardProcessedData: Map<string, number> = new Map();
  const leaderboardGraphData: IDonutGraphData[] = [];
  prs.forEach(pr => {
    const { owner, createdAt } = pr;
    const date = new Date(createdAt);
    date.setHours(0, 0, 0, 0);
    if (date >= dateToCompare) {
      const leaderboardOpenPrCount:
        | number
        | undefined = leaderboardProcessedData.get(owner);
      if (leaderboardOpenPrCount !== undefined) {
        leaderboardProcessedData.set(owner, leaderboardOpenPrCount + 1);
      } else {
        leaderboardProcessedData.set(owner, 1);
      }
    }
  });

  leaderboardProcessedData.forEach((value, key) => {
    leaderboardGraphData.push({ label: key, value: value });
  });

  return leaderboardGraphData;
};

const getMergedPrsLeaderboardData = (
  prs: IPullRequest[],
  dateToCompare: Date
): IDonutGraphData[] => {
  const leaderboardProcessedData: Map<string, number> = new Map();
  const leaderboardGraphData: IDonutGraphData[] = [];

  prs.forEach(pr => {
    const { owner, mergedAt, merged } = pr;
    if (merged) {
      const date = new Date(mergedAt);
      date.setHours(0, 0, 0, 0);

      if (date >= dateToCompare) {
        const leaderboardMergedPrCount:
          | number
          | undefined = leaderboardProcessedData.get(owner);
        if (leaderboardMergedPrCount !== undefined) {
          leaderboardProcessedData.set(owner, leaderboardMergedPrCount + 1);
        } else {
          leaderboardProcessedData.set(owner, 1);
        }
      }
    }
  });

  leaderboardProcessedData.forEach((value, key) => {
    leaderboardGraphData.push({ label: key, value: value });
  });

  return leaderboardGraphData;
};

const getOpenedPrsOverTimeData = (
  prs: IPullRequest[],
  dateToCompare: Date
): IBarGraphData[] => {
  const openedPrsOverTimeProcessedData: Map<number, number> = new Map();
  const openedPrsOverTimeGraphData: IBarGraphData[] = [];
  prs.forEach(pr => {
    const { createdAt } = pr;
    const date = new Date(createdAt);
    date.setHours(0, 0, 0, 0);
    if (date >= dateToCompare) {
      const time = date.getTime();
      const openedPrCountForDate:
        | number
        | undefined = openedPrsOverTimeProcessedData.get(time);
      if (openedPrCountForDate !== undefined) {
        openedPrsOverTimeProcessedData.set(time, openedPrCountForDate + 1);
      } else {
        openedPrsOverTimeProcessedData.set(time, 1);
      }
    }
  });
  openedPrsOverTimeProcessedData.forEach((value, key) => {
    openedPrsOverTimeGraphData.push({ x: key, y: value });
  });

  return openedPrsOverTimeGraphData;
};

const getAverageTimeToMergePrsDataRaw = (
  prs: IPullRequest[],
  dateToCompare: Date
): IBarGraphData[] => {
  const dayToTotalTimeTakenToMergePrsWithFrequency: Map<
    number,
    [number, number]
  > = new Map();
  const averageTimeToMergePrsGraphData: IBarGraphData[] = [];
  prs.forEach(pr => {
    const { createdAt, mergedAt, merged } = pr;
    if (merged) {
      const createdDate = new Date(createdAt);
      const createdTime = createdDate.getTime();
      const mergeTime = new Date(mergedAt).getTime();
      const timeTaken = mergeTime - createdTime;

      createdDate.setHours(0, 0, 0, 0);

      if (createdDate >= dateToCompare) {
        const createdDayAsTime = createdDate.getTime();

        const totalTimeTakenToMergePrsOnDayWithFrequency:
          | [number, number]
          | undefined = dayToTotalTimeTakenToMergePrsWithFrequency.get(
          createdDayAsTime
        );

        if (totalTimeTakenToMergePrsOnDayWithFrequency !== undefined) {
          const [
            totalTimeTakenToMergePrsOnDay,
            prsCreatedOnDayFrequency
          ] = totalTimeTakenToMergePrsOnDayWithFrequency;

          dayToTotalTimeTakenToMergePrsWithFrequency.set(createdDayAsTime, [
            totalTimeTakenToMergePrsOnDay + timeTaken,
            prsCreatedOnDayFrequency + 1
          ]);
        } else {
          dayToTotalTimeTakenToMergePrsWithFrequency.set(createdDayAsTime, [
            timeTaken,
            1
          ]);
        }
      }
    }
  });
  dayToTotalTimeTakenToMergePrsWithFrequency.forEach((value, key) => {
    const [totalTimeTakenToMergePrsOnDay, prsCreatedOnDayFrequency] = value;

    const averageTimeTakenToMergePrsOnDay =
      totalTimeTakenToMergePrsOnDay / prsCreatedOnDayFrequency;

    averageTimeToMergePrsGraphData.push({
      x: key,
      y: averageTimeTakenToMergePrsOnDay
    });
  });

  return averageTimeToMergePrsGraphData;
};

const getAverageTimeToMergePrsAsHoursData = (
  prs: IPullRequest[],
  dateToCompare: Date
): IBarGraphData[] => {
  const rawData = getAverageTimeToMergePrsDataRaw(prs, dateToCompare);
  const oneHour = 3600000;
  return rawData.map((item: { x: number; y: number }) => ({
    x: item.x,
    y: Math.floor(Math.round(item.y / oneHour)) // nearest hour
  }));
};

export {
  getAverageTimeToMergePrsAsHoursData,
  getOpenedPrsOverTimeData,
  getOpenedPrsLeaderboardData,
  getMergedPrsLeaderboardData
};
