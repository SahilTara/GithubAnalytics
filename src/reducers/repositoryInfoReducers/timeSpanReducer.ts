import { IIssueData } from "../../types/IIssueData";
import RepositoryInfoActionType from "../../actions/repositoryInfoActions/repositoryInfoActionTypes";
import { REPOSITORY_INFO_TYPE_KEYS } from "../../actions/repositoryInfoActions/typeKeys";
import { TIME_SPAN } from "../../types/TimeSpan";

/* State Shape
  timeSpan: TIME_SPAN
*/

const timeSpan = (
  state: TIME_SPAN = TIME_SPAN.LAST_7_DAYS,
  action: RepositoryInfoActionType
) => {
  switch (action.type) {
    case REPOSITORY_INFO_TYPE_KEYS.SET_TIME_SPAN:
      return action.payload;
    default:
      return state;
  }
};

export default timeSpan;
