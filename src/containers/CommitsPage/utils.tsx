import { ICommitData } from "../../types/ICommitData";

import IDonutGraphData from "../../types/IGraphData/IDonutGraphData";

import IBarGraphData from "../../types/IGraphData/IBarGraphData";

/**
 * Gets leaderboard data from commit data.
 * @param commits commit data to get leaderboard data for
 * @param dateToCompare minimum date that must have passed for data to be considered.
 * @function
 */
const getLeaderboardData = (
  commits: ICommitData[],
  dateToCompare: Date
): IDonutGraphData[] => {
  const leaderboardProcessedData: Map<string, number> = new Map();
  const leaderboardGraphData: IDonutGraphData[] = [];
  commits.forEach(commit => {
    const { author, createdAt } = commit;
    const date = new Date(createdAt);
    date.setHours(0, 0, 0, 0);
    if (date >= dateToCompare) {
      const leaderboardCommitCount:
        | number
        | undefined = leaderboardProcessedData.get(author);
      if (leaderboardCommitCount !== undefined) {
        leaderboardProcessedData.set(author, leaderboardCommitCount + 1);
      } else {
        leaderboardProcessedData.set(author, 1);
      }
    }
  });
  leaderboardProcessedData.forEach((value, key) => {
    leaderboardGraphData.push({ label: key, value: value });
  });

  return leaderboardGraphData;
};

/**
 * Gets data for commits over time graph
 * @param commits commit data to get commits over time data for
 * @param dateToCompare minimum date that must have passed for data to be considered.
 * @function
 */
const getCommitsOverTimeData = (
  commits: ICommitData[],
  dateToCompare: Date
): IBarGraphData[] => {
  const commitsOverTimeProcessedData: Map<number, number> = new Map();
  const commitsOverTimeGraphData: IBarGraphData[] = [];
  commits.forEach(commit => {
    const { createdAt } = commit;
    const date = new Date(createdAt);
    date.setHours(0, 0, 0, 0);
    if (date >= dateToCompare) {
      const time = date.getTime();
      const commitCountForDate:
        | number
        | undefined = commitsOverTimeProcessedData.get(time);
      if (commitCountForDate !== undefined) {
        commitsOverTimeProcessedData.set(time, commitCountForDate + 1);
      } else {
        commitsOverTimeProcessedData.set(time, 1);
      }
    }
  });
  commitsOverTimeProcessedData.forEach((value, key) => {
    commitsOverTimeGraphData.push({ x: key, y: value });
  });

  return commitsOverTimeGraphData;
};

/**
 * Gets data for additions and deletions graph
 * @param commits commit data to get addition and deletion data for
 * @param dateToCompare minimum date that must have passed for data to be considered.
 * @function
 */
const getAdditionsAndDeletionsData = (
  commits: ICommitData[],
  dateToCompare: Date
): IBarGraphData[][] => {
  const commitsAdditionDeletionProcessedData: Map<
    number,
    [number, number]
  > = new Map();
  const commitsAdditionGraphData: IBarGraphData[] = [];
  const commitsDeletionGraphData: IBarGraphData[] = [];

  commits.forEach(commit => {
    const { createdAt, additions, deletions } = commit;
    const date = new Date(createdAt);
    date.setHours(0, 0, 0, 0);
    if (date >= dateToCompare) {
      const time = date.getTime();
      const additionsAndDeletionsForDate = commitsAdditionDeletionProcessedData.get(
        time
      );

      if (additionsAndDeletionsForDate !== undefined) {
        commitsAdditionDeletionProcessedData.set(time, [
          additionsAndDeletionsForDate[0] + additions,
          additionsAndDeletionsForDate[1] + deletions
        ]);
      } else {
        commitsAdditionDeletionProcessedData.set(time, [additions, deletions]);
      }
    }
  });

  commitsAdditionDeletionProcessedData.forEach((value, key) => {
    commitsAdditionGraphData.push({ x: key, y: value[0] });
    commitsDeletionGraphData.push({ x: key, y: value[1] });
  });

  return [commitsAdditionGraphData, commitsDeletionGraphData];
};

export {
  getAdditionsAndDeletionsData,
  getCommitsOverTimeData,
  getLeaderboardData
};
