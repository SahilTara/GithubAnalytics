import IRepository from "../../types/IRespository";
import SearchInfoActionType from "../../actions/searchInfoActions/searchInfoActionTypes";
import { SEARCH_INFO_TYPE_KEYS } from "../../actions/searchInfoActions/typeKeys";

/* State Shape
{
  lastQueryText: string
}
*/

const lastQueryText = (state: string = "", action: SearchInfoActionType) => {
  switch (action.type) {
    case SEARCH_INFO_TYPE_KEYS.SET_LAST_QUERY_TEXT:
      return action.payload;
    default:
      return state;
  }
};

export default lastQueryText;
