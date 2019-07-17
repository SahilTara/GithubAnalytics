import IRepository from "../../types/IRespository";
import DashboardInfoActionType from "../../actions/dashboardInfoActions/dashboardInfoActionTypes";
import { DASHBOARD_INFO_TYPE_KEYS } from "../../actions/dashboardInfoActions/typeKeys";

/* State Shape
{
  userRepos: []
}
*/

const userRepos = (
  state: IRepository[] = [],
  action: DashboardInfoActionType
) => {
  switch (action.type) {
    case DASHBOARD_INFO_TYPE_KEYS.GET_USER_REPOSITORIES:
      return action.payload;
    default:
      return state;
  }
};

export default userRepos;
