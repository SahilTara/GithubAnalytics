import IRepository from "../../types/IRespository";
import SearchInfoActionType from "../../actions/searchInfoActions/searchInfoActionTypes";
import { SEARCH_INFO_TYPE_KEYS } from "../../actions/searchInfoActions/typeKeys";

/* State Shape
{
  searchQueryRepositories: []
}
*/

const searchQueryRepositories = (
  state: IRepository[] = [],
  action: SearchInfoActionType
) => {
  switch (action.type) {
    case SEARCH_INFO_TYPE_KEYS.GET_REPOSITORIES_FROM_SEARCH:
      return action.payload;
    default:
      return state;
  }
};

export default searchQueryRepositories;
