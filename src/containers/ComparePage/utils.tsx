import { ICommitData } from "../../types/ICommitData";

import IDonutGraphData from "../../types/IGraphData/IDonutGraphData";

import IBarGraphData from "../../types/IGraphData/IBarGraphData";
import ITextBarGraphData from "../../types/IGraphData/ITextBarGraphData";
import { IIssueData } from "../../types/IIssueData";
import { array } from "prop-types";
import IUserColor from "../../types/IUserColor";
import { IPullRequest } from "../../types/IPullRequest";

const getUsers = (
  commits: ICommitData[],
  prs: IPullRequest[],
  issues: IIssueData[],
  dateToCompare: Date
): IUserColor[] => {
  const leaderboardProcessedData: Map<string, number> = new Map();
  const userData: IUserColor[] = [];
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
  issues.forEach(issue => {
    const { closedAt, closedBy, closed } = issue;
    const date = new Date(closedAt);
    date.setHours(0, 0, 0, 0);
    if (date >= dateToCompare) {
      const leaderboardCommitCount:
        | number
        | undefined = leaderboardProcessedData.get(closedBy);
      if (leaderboardCommitCount !== undefined) {
        leaderboardProcessedData.set(closedBy, leaderboardCommitCount + 1);
      } else {
        leaderboardProcessedData.set(closedBy, 1);
      }
    }
  });
  leaderboardProcessedData.forEach((value, key) => {
    userData.push({
      title: key,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      disabled: false
    });
  });

  return userData;
};

const getCommitsTotalData = (
  commits: ICommitData[],
  dateToCompare: Date
): ITextBarGraphData[] => {
  const leaderboardProcessedData: Map<string, number> = new Map();
  const leaderboardGraphData: ITextBarGraphData[] = [];
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
    leaderboardGraphData.push({ x: key, y: value });
  });

  return leaderboardGraphData;
};

const getCommitsOverTimeData = (
  commits: ICommitData[],
  dateToCompare: Date
): IBarGraphData[][] => {
  const commitsOverTimeProcessedData: Map<
    string,
    Map<number, number>
  > = new Map();
  const commitsOverTimeGraphData: IBarGraphData[][] = [];
  commits.forEach(commit => {
    const { author, createdAt } = commit;
    const date = new Date(createdAt);
    date.setHours(0, 0, 0, 0);
    if (date >= dateToCompare) {
      const time = date.getTime();
      let commitMapForUser:
        | Map<number, number>
        | undefined = commitsOverTimeProcessedData.get(author);
      if (commitMapForUser === undefined) {
        commitMapForUser = new Map();
        commitsOverTimeProcessedData.set(author, commitMapForUser);
      }
      const commitCountForDate: number | undefined = commitMapForUser.get(time);
      if (commitCountForDate !== undefined) {
        commitMapForUser.set(time, commitCountForDate + 1);
      } else {
        commitMapForUser.set(time, 1);
      }
    }
  });
  commitsOverTimeProcessedData.forEach((value, key) => {
    const arr: IBarGraphData[] = [];
    value.forEach((v, k) => {
      arr.push({ x: k, y: v });
    });
    commitsOverTimeGraphData.push(arr);
  });

  return commitsOverTimeGraphData;
};

const getIssuesTotalData = (
  issues: IIssueData[],
  dateToCompare: Date
): ITextBarGraphData[] => {
  const leaderboardProcessedData: Map<string, number> = new Map();
  const leaderboardGraphData: ITextBarGraphData[] = [];
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
    leaderboardGraphData.push({ x: key, y: value });
  });

  return leaderboardGraphData;
};

const getIssuesOverTimeData = (
  issues: IIssueData[],
  dateToCompare: Date
): IBarGraphData[][] => {
  const issuesOverTimeProcessedData: Map<
    string,
    Map<number, number>
  > = new Map();
  const issuesOverTimeGraphData: IBarGraphData[][] = [];
  issues.forEach(issues => {
    const { closedAt, closedBy, closed } = issues;
    if (closed) {
      const date = new Date(closedAt);
      date.setHours(0, 0, 0, 0);
      if (date >= dateToCompare) {
        const time = date.getTime();
        let issueMapForUser:
          | Map<number, number>
          | undefined = issuesOverTimeProcessedData.get(closedBy);
        if (issueMapForUser === undefined) {
          issueMapForUser = new Map();
          issuesOverTimeProcessedData.set(closedBy, issueMapForUser);
        }
        const issueCountForDate: number | undefined = issueMapForUser.get(time);
        if (issueCountForDate !== undefined) {
          issueMapForUser.set(time, issueCountForDate + 1);
        } else {
          issueMapForUser.set(time, 1);
        }
      }
    }
  });
  issuesOverTimeProcessedData.forEach((value, key) => {
    const arr: IBarGraphData[] = [];
    value.forEach((v, k) => {
      arr.push({ x: k, y: v });
    });
    issuesOverTimeGraphData.push(arr);
  });

  return issuesOverTimeGraphData;
};

const getPRsTotalData = (
  prs: IPullRequest[],
  dateToCompare: Date
): ITextBarGraphData[] => {
  const leaderboardProcessedData: Map<string, number> = new Map();
  const leaderboardGraphData: ITextBarGraphData[] = [];
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
    leaderboardGraphData.push({ x: key, y: value });
  });

  return leaderboardGraphData;
};

const getPRsOverTimeData = (
  prs: IPullRequest[],
  dateToCompare: Date
): IBarGraphData[][] => {
  const prsOverTimeProcessedData: Map<string, Map<number, number>> = new Map();
  const prsOverTimeGraphData: IBarGraphData[][] = [];
  prs.forEach(pr => {
    const { owner, createdAt } = pr;
    const date = new Date(createdAt);
    date.setHours(0, 0, 0, 0);
    if (date >= dateToCompare) {
      const time = date.getTime();
      let prMapForUser:
        | Map<number, number>
        | undefined = prsOverTimeProcessedData.get(owner);
      if (prMapForUser === undefined) {
        prMapForUser = new Map();
        prsOverTimeProcessedData.set(createdAt, prMapForUser);
      }
      const issueCountForDate: number | undefined = prMapForUser.get(time);
      if (issueCountForDate !== undefined) {
        prMapForUser.set(time, issueCountForDate + 1);
      } else {
        prMapForUser.set(time, 1);
      }
    }
  });
  prsOverTimeProcessedData.forEach((value, key) => {
    const arr: IBarGraphData[] = [];
    value.forEach((v, k) => {
      arr.push({ x: k, y: v });
    });
    prsOverTimeGraphData.push(arr);
  });

  return prsOverTimeGraphData;
};

export {
  getUsers,
  getCommitsTotalData,
  getCommitsOverTimeData,
  getIssuesTotalData,
  getIssuesOverTimeData,
  getPRsTotalData,
  getPRsOverTimeData
};
