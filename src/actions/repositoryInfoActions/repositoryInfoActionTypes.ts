import { ISetCurrentRepositoryActionType } from "./setCurrentRepository";
import { IGetPullRequestInfoActionType } from "./pullRequestInfo";
import { IGetIssueInfoActionType } from "./issueInfo";
import { IGetCommitInfoActionType } from "./commitInfo";
import { ISetTimeSpanActionType } from "./setTimeSpan";
import { ISetPrsLoadingStatusActionType } from "./isPrsLoading";
import { ISetCommitsLoadingStatusActionType } from "./isCommitsLoading";
import { ISetIssuesLoadingStatusActionType } from "./isIssuesLoading";

/**
 * Root Action Type for repository info actions
 */
type RepositoryInfoActionType =
  | ISetCurrentRepositoryActionType
  | IGetPullRequestInfoActionType
  | IGetIssueInfoActionType
  | IGetCommitInfoActionType
  | ISetTimeSpanActionType
  | ISetPrsLoadingStatusActionType
  | ISetCommitsLoadingStatusActionType
  | ISetIssuesLoadingStatusActionType;

export default RepositoryInfoActionType;
