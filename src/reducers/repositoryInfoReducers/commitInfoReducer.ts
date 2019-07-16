import { IIssueData } from "../../types/IIssueData";
import RepositoryInfoActionType from "../../actions/repositoryInfoActions/repositoryInfoActionTypes";
import { REPOSITORY_INFO_TYPE_KEYS } from "../../actions/repositoryInfoActions/typeKeys";

/* State Shape
  commitInfo: ICommitData[]
*/

const commitInfo = (
  state: ICommitData[] = [],
  action: RepositoryInfoActionType
) => {
  switch (action.type) {
    case REPOSITORY_INFO_TYPE_KEYS.GET_COMMIT_INFO:
      return action.payload;
    default:
      return state;
  }
};

export default commitInfo;
