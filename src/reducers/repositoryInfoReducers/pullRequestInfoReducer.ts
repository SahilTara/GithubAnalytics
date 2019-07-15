import RepositoryInfoActionType from "../../actions/repositoryInfoActions/repositoryInfoActionTypes";
import { REPOSITORY_INFO_TYPE_KEYS } from "../../actions/repositoryInfoActions/typeKeys";
import { IPullRequest } from "../../types/IPullRequest";

/* State Shape
  pullRequestInfo: IPullRequest[]
*/

const pullRequestInfo = (
  state: IPullRequest[] = [],
  action: RepositoryInfoActionType
) => {
  switch (action.type) {
    case REPOSITORY_INFO_TYPE_KEYS.GET_PULL_REQUEST_INFO:
      return action.payload;
    default:
      return state;
  }
};

export default pullRequestInfo;
