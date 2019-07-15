import DashboardInfoActionType from "./dashboardInfoActions/dashboardInfoActionTypes";
import RepositoryInfoActionType from "./repositoryInfoActions/repositoryInfoActionTypes";

type RootAction = DashboardInfoActionType | RepositoryInfoActionType;

export default RootAction;
