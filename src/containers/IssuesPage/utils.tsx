import IDonutGraphData from "../../types/IGraphData/IDonutGraphData";

import IBarGraphData from "../../types/IGraphData/IBarGraphData";
import { IIssueData } from "../../types/IIssueData";

const getOpenedIssuesLeaderboardData = (
  issues: IIssueData[],
  dateToCompare: Date
): IDonutGraphData[] => {
  const leaderboardProcessedData: Map<string, number> = new Map();
  const leaderboardGraphData: IDonutGraphData[] = [];
  issues.forEach(issue => {
    const { createdBy, createdAt } = issue;
    const date = new Date(createdAt);
    date.setHours(0, 0, 0, 0);
    if (date >= dateToCompare) {
      const leaderboardOpenIssueCount:
        | number
        | undefined = leaderboardProcessedData.get(createdBy);
      if (leaderboardOpenIssueCount !== undefined) {
        leaderboardProcessedData.set(createdBy, leaderboardOpenIssueCount + 1);
      } else {
        leaderboardProcessedData.set(createdBy, 1);
      }
    }
  });

  leaderboardProcessedData.forEach((value, key) => {
    leaderboardGraphData.push({ label: key, value: value });
  });

  return leaderboardGraphData;
};

const getClosedIssuesLeaderboardData = (
  issues: IIssueData[],
  dateToCompare: Date
): IDonutGraphData[] => {
  const leaderboardProcessedData: Map<string, number> = new Map();
  const leaderboardGraphData: IDonutGraphData[] = [];
  issues.forEach(issue => {
    const { closedAt, closedBy, closed } = issue;
    if (closed) {
      const date = new Date(closedAt);
      date.setHours(0, 0, 0, 0);
      if (date >= dateToCompare) {
        const leaderboardOpenIssueCount:
          | number
          | undefined = leaderboardProcessedData.get(closedBy);
        if (leaderboardOpenIssueCount !== undefined) {
          leaderboardProcessedData.set(closedBy, leaderboardOpenIssueCount + 1);
        } else {
          leaderboardProcessedData.set(closedBy, 1);
        }
      }
    }
  });

  leaderboardProcessedData.forEach((value, key) => {
    leaderboardGraphData.push({ label: key, value: value });
  });

  return leaderboardGraphData;
};

const getOpenedIssuesOverTimeData = (
  issues: IIssueData[],
  dateToCompare: Date
): IBarGraphData[] => {
  const openedIssuesOverTimeProcessedData: Map<number, number> = new Map();
  const openedIssuesOverTimeGraphData: IBarGraphData[] = [];

  issues.forEach(issue => {
    const { createdAt } = issue;
    const date = new Date(createdAt);
    date.setHours(0, 0, 0, 0);
    if (date >= dateToCompare) {
      const time = date.getTime();
      const openedIssueCountForDate:
        | number
        | undefined = openedIssuesOverTimeProcessedData.get(time);
      if (openedIssueCountForDate !== undefined) {
        openedIssuesOverTimeProcessedData.set(
          time,
          openedIssueCountForDate + 1
        );
      } else {
        openedIssuesOverTimeProcessedData.set(time, 1);
      }
    }
  });
  openedIssuesOverTimeProcessedData.forEach((value, key) => {
    openedIssuesOverTimeGraphData.push({ x: key, y: value });
  });

  return openedIssuesOverTimeGraphData;
};

const getAverageTimeToCloseIssuesDataRaw = (
  prs: IIssueData[],
  dateToCompare: Date
): IBarGraphData[] => {
  const dayToTotalTimeTakenToCloseIssuesWithFrequency: Map<
    number,
    [number, number]
  > = new Map();
  const averageTimeToCloseIssuesGraphData: IBarGraphData[] = [];
  prs.forEach(pr => {
    const { createdAt, closedAt, closed } = pr;
    if (closed) {
      const createdDate = new Date(createdAt);
      const createdTime = createdDate.getTime();
      const closeTime = new Date(closedAt).getTime();
      const timeTaken = closeTime - createdTime;

      createdDate.setHours(0, 0, 0, 0);

      if (createdDate >= dateToCompare) {
        const createdDayAsTime = createdDate.getTime();

        const totalTimeTakenToCloseIssuesOnDayWithFrequency:
          | [number, number]
          | undefined = dayToTotalTimeTakenToCloseIssuesWithFrequency.get(
          createdDayAsTime
        );

        if (totalTimeTakenToCloseIssuesOnDayWithFrequency !== undefined) {
          const [
            totalTimeTakenToCloseIssuesOnDay,
            issuesCreatedOnDayFrequency
          ] = totalTimeTakenToCloseIssuesOnDayWithFrequency;

          dayToTotalTimeTakenToCloseIssuesWithFrequency.set(createdDayAsTime, [
            totalTimeTakenToCloseIssuesOnDay + timeTaken,
            issuesCreatedOnDayFrequency + 1
          ]);
        } else {
          dayToTotalTimeTakenToCloseIssuesWithFrequency.set(createdDayAsTime, [
            timeTaken,
            1
          ]);
        }
      }
    }
  });
  dayToTotalTimeTakenToCloseIssuesWithFrequency.forEach((value, key) => {
    const [
      totalTimeTakenToCloseIssuesOnDay,
      issuesCreatedOnDayFrequency
    ] = value;

    const averageTimeTakenToCloseIssuesOnDay =
      totalTimeTakenToCloseIssuesOnDay / issuesCreatedOnDayFrequency;

    averageTimeToCloseIssuesGraphData.push({
      x: key,
      y: averageTimeTakenToCloseIssuesOnDay
    });
  });

  return averageTimeToCloseIssuesGraphData;
};

const getAverageTimeToCloseIssuesAsHoursData = (
  issues: IIssueData[],
  dateToCompare: Date
): IBarGraphData[] => {
  const rawData = getAverageTimeToCloseIssuesDataRaw(issues, dateToCompare);
  const oneHour = 3600000;
  return rawData.map((item: { x: number; y: number }) => ({
    x: item.x,
    y: Math.floor(Math.round(item.y / oneHour)) // nearest hour
  }));
};

export {
  getAverageTimeToCloseIssuesAsHoursData,
  getOpenedIssuesOverTimeData,
  getOpenedIssuesLeaderboardData,
  getClosedIssuesLeaderboardData
};
