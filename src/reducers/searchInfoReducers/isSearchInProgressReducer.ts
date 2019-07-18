import SearchInfoActionType from "../../actions/searchInfoActions/searchInfoActionTypes";
import { SEARCH_INFO_TYPE_KEYS } from "../../actions/searchInfoActions/typeKeys";

/* State Shape
{
  isSearchInProgress: boolean
}
*/

const isSearchInProgress = (
  state: boolean = false,
  action: SearchInfoActionType
) => {
  switch (action.type) {
    case SEARCH_INFO_TYPE_KEYS.SET_SEARCH_IN_PROGRESS_STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default isSearchInProgress;
