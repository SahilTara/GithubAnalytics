import { DASHBOARD_INFO_TYPE_KEYS } from "./typeKeys";
import IRepository from "../../types/IRespository";
import { Dispatch } from "redux";
import DashboardInfoActionType from "./dashboardInfoActionTypes";
import GithubApiService from "../../services/GithubApiService";

export interface IGetUserRepositoriesActionType {
  type: DASHBOARD_INFO_TYPE_KEYS.GET_USER_REPOSITORIES;
  payload: IRepository[];
}

export const getUserRepositoriesAction = () => {
  return async (dispatch: Dispatch<DashboardInfoActionType>) => {
    const api = new GithubApiService();
    try {
      dispatch(getUserRepositoriesSuccess(await api.getUserRepos()));
    } catch (error) {
      // handle here if have time
    }
  };
};

const getUserRepositoriesSuccess = (
  userRepositories: IRepository[]
): IGetUserRepositoriesActionType => {
  return {
    type: DASHBOARD_INFO_TYPE_KEYS.GET_USER_REPOSITORIES,
    payload: userRepositories
  };
};
