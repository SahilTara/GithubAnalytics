import { IGetPopularRepositoriesActionType } from "./getPopularRepositories";
import { IGetUserRepositoriesActionType } from "./getUserRepositories";

type DashboardInfoActionType =
  | IGetPopularRepositoriesActionType
  | IGetUserRepositoriesActionType;

export default DashboardInfoActionType;
