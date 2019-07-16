import DashboardInfoActionType from "./dashboardInfoActions/dashboardInfoActionTypes";
import RepositoryInfoActionType from "./repositoryInfoActions/repositoryInfoActionTypes";
import EnvironmentInfoActionType from "./environmentInfoActions/environmentInfoActionTypes";

type RootAction =
  | DashboardInfoActionType
  | RepositoryInfoActionType
  | EnvironmentInfoActionType;

export default RootAction;
