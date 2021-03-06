import DashboardInfoActionType from "./dashboardInfoActions/dashboardInfoActionTypes";
import RepositoryInfoActionType from "./repositoryInfoActions/repositoryInfoActionTypes";
import EnvironmentInfoActionType from "./environmentInfoActions/environmentInfoActionTypes";
import SearchInfoActionType from "./searchInfoActions/searchInfoActionTypes";

/**
 * Root Action Type for all actions
 */
type RootAction =
  | DashboardInfoActionType
  | RepositoryInfoActionType
  | EnvironmentInfoActionType
  | SearchInfoActionType;

export default RootAction;
