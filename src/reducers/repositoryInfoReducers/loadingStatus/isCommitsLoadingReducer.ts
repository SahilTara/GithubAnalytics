import { REPOSITORY_INFO_TYPE_KEYS } from "../../../actions/repositoryInfoActions/typeKeys";
import RepositoryInfoActionType from "../../../actions/repositoryInfoActions/repositoryInfoActionTypes";

/* State Shape
  isCommitsLoading: boolean
*/

const isCommitsLoading = (
  state: boolean = false,
  action: RepositoryInfoActionType
) => {
  switch (action.type) {
    case REPOSITORY_INFO_TYPE_KEYS.SET_COMMITS_LOADING_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default isCommitsLoading;
