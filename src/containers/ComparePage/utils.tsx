import { ICommitData } from "../../types/ICommitData";

import IBarGraphData from "../../types/IGraphData/IBarGraphData";
import ITextBarGraphData from "../../types/IGraphData/ITextBarGraphData";
import { IIssueData } from "../../types/IIssueData";
import IUserColor from "../../types/IUserColor";
import { IPullRequest } from "../../types/IPullRequest";

/**
 * Gets users from various data sources, for use in legend, and graphs.
 * @param commits the commit data to get users from
 * @param prs the pr data to get users from
 * @param issues the issue data to get users from
 * @param dateToCompare minimum date that must have passed for data to be considered.
 */
const getUsers = (
  commits: ICommitData[],
  prs: IPullRequest[],
  issues: IIssueData[],
  dateToCompare: Date
): IUserColor[] => {
  const users: Set<string> = new Set();
  const userData: IUserColor[] = [];

  // add all users who have a commit in the main branch of the repository
  commits.forEach(commit => {
    const { author, createdAt } = commit;
    const date = new Date(createdAt);
    date.setHours(0, 0, 0, 0);
    if (date >= dateToCompare && !users.has(author)) {
      users.add(author);
    }
  });

  // add all users who created a pr
  prs.forEach(pullRequest => {
    const { owner, createdAt } = pullRequest;
    const date = new Date(createdAt);
    date.setHours(0, 0, 0, 0);
    if (date >= dateToCompare && !users.has(owner)) {
      users.add(owner);
    }
  });

  // only count those users that closed issues
  issues.forEach(issue => {
    const { closedAt, closedBy, closed } = issue;
    const date = new Date(closedAt);
    date.setHours(0, 0, 0, 0);

    if (closed && date >= dateToCompare && !users.has(closedBy)) {
      users.add(closedBy);
    }
  });
  users.forEach(key => {
    userData.push({
      title: key,
      color: "#" + Math.floor(Math.random() * 16777215).toString(16),
      disabled: false
    });
  });

  return userData;
};

/**
 * Gets data for commits as total graph.
 * @param commits commit data to get commits as total data for
 * @param dateToCompare minimum date that must have passed for data to be considered.
 * @function
 */
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

/**
 * Gets data for commits over time graph.
 * @param commits commit data to get commits over time data for
 * @param dateToCompare minimum date that must have passed for data to be considered.
 * @function
 */
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

/**
 * Gets data for issues as total graph.
 * @param issues issue data to get issues as total data for
 * @param dateToCompare minimum date that must have passed for data to be considered.
 * @function
 */
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

/**
 * Gets data for issues over time graph.
 * @param issues issues data to get issues over time data for
 * @param dateToCompare minimum date that must have passed for data to be considered.
 * @function
 */
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

/**
 * Gets data for PRs as total graph.
 * @param prs PR data to get PRs as total data for
 * @param dateToCompare minimum date that must have passed for data to be considered.
 * @function
 */
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

/**
 * Gets data for PRs over time graph.
 * @param prs PR data to get PRs over time data for
 * @param dateToCompare minimum date that must have passed for data to be considered.
 * @function
 */
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
