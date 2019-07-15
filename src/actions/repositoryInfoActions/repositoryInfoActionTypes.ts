import { ISetCurrentRepositoryActionType } from "./setCurrentRepository";
import { IGetPullRequestInfoActionType } from "./pullRequestInfo";

type RepositoryInfoActionType =
  | ISetCurrentRepositoryActionType
  | IGetPullRequestInfoActionType;

export default RepositoryInfoActionType;
