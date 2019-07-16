import { ISetCurrentRepositoryActionType } from "./setCurrentRepository";
import { IGetPullRequestInfoActionType } from "./pullRequestInfo";
import { IGetIssueInfoActionType } from "./issueInfo";
import { IGetCommitInfoActionType } from "./commitInfo";

type RepositoryInfoActionType =
  | ISetCurrentRepositoryActionType
  | IGetPullRequestInfoActionType
  | IGetIssueInfoActionType
  | IGetCommitInfoActionType;

export default RepositoryInfoActionType;
