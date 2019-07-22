import { DASHBOARD_INFO_TYPE_KEYS } from "./typeKeys";
import IRepository from "../../types/IRespository";
import { Dispatch } from "redux";
import DashboardInfoActionType from "./dashboardInfoActionTypes";
import GithubApiService from "../../services/GithubApiService";

export interface IGetPopularRepositoriesActionType {
  type: DASHBOARD_INFO_TYPE_KEYS.GET_POPULAR_REPOSITORIES;
  payload: IRepository[];
}

/**
 * Action for getting trending's repositories into the redux store.
 * @function
 */
export const getPopularRepositoriesAction = () => {
  return async (dispatch: Dispatch<DashboardInfoActionType>) => {
    const api = new GithubApiService();
    try {
      dispatch(
        getPopularRepositoriesSuccess(await api.getPopularRepositories())
      );
    } catch (error) {
      // handle here if have time
    }
  };
};

const getPopularRepositoriesSuccess = (
  popularRepositories: IRepository[]
): IGetPopularRepositoriesActionType => {
  return {
    type: DASHBOARD_INFO_TYPE_KEYS.GET_POPULAR_REPOSITORIES,
    payload: popularRepositories
  };
};
