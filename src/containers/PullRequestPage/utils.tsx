import IDonutGraphData from "../../types/IGraphData/IDonutGraphData";

import IBarGraphData from "../../types/IGraphData/IBarGraphData";
import { IPullRequest } from "../../types/IPullRequest";

/**
 * Gets data for Opened PR leaderboard
 * @param prs PR data to get Opened PRs leaderboard data for.
 * @param dateToCompare minimum date that must have passed for data to be considered.
 * @function
 */
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

/**
 * Gets data for Merged PR leaderboard
 * @param prs PR data to get Merged PRs leaderboard data for.
 * @param dateToCompare minimum date that must have passed for data to be considered.
 * @function
 */
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

/**
 * Gets data for Opened PRs over time graph
 * @param prs PR data to get Opened PRs over time data for.
 * @param dateToCompare minimum date that must have passed for data to be considered.
 * @function
 */
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

/**
 * Gets average time to merge PRs raw data
 * @param prs PR data to get average time to merge PRs raw data for.
 * @param dateToCompare minimum date that must have passed for data to be considered.
 * @function
 */
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

/**
 * Gets average time to merge PRs as hours data
 * @param prs PR data to get average time to merge PRs as hours data for.
 * @param dateToCompare minimum date that must have passed for data to be considered.
 * @function
 */
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
