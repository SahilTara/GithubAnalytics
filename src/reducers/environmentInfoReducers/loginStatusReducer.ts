import IRepository from "../../types/IRespository";
import DashboardInfoActionType from "../../actions/dashboardInfoActions/dashboardInfoActionTypes";
import { DASHBOARD_INFO_TYPE_KEYS } from "../../actions/dashboardInfoActions/typeKeys";
import EnvironmentInfoActionType from "../../actions/environmentInfoActions/environmentInfoActionTypes";
import { ENVIRONMENT_INFO_TYPE_KEYS } from "../../actions/environmentInfoActions/typeKeys";

/* State Shape
{
  isLoggedIn: false
}
*/

const isLoggedIn = (
  state: boolean = false,
  action: EnvironmentInfoActionType
) => {
  switch (action.type) {
    case ENVIRONMENT_INFO_TYPE_KEYS.SET_IS_LOGGED_IN:
      return action.payload;
    default:
      return state;
  }
};

export default isLoggedIn;
