import { IGetPopularRepositoriesActionType } from "./getPopularRepositories";
import { IGetUserRepositoriesActionType } from "./getUserRepositories";

/**
 * Root Action Type for Dashboard info actions
 */
type DashboardInfoActionType =
  | IGetPopularRepositoriesActionType
  | IGetUserRepositoriesActionType;

export default DashboardInfoActionType;
