import { SEARCH_INFO_TYPE_KEYS } from "./typeKeys";
import IRepository from "../../types/IRespository";
import { Dispatch } from "redux";
import DashboardInfoActionType from "./searchInfoActionTypes";
import GithubApiService from "../../services/GithubApiService";
import { setSearchInProgressStatusAction } from "./isSearchInProgress";

export interface IGetRepositoriesFromSearchActionType {
  type: SEARCH_INFO_TYPE_KEYS.GET_REPOSITORIES_FROM_SEARCH;
  payload: IRepository[];
}

export const getRepositoriesFromSearchAction = (query: string) => {
  return async (dispatch: Dispatch<DashboardInfoActionType>) => {
    const api = new GithubApiService();
    try {
      dispatch(getRepositoriesFromSearchSuccess(await api.search(query)));
      dispatch(setSearchInProgressStatusAction(false));
    } catch (error) {
      // handle here if have time
    }
  };
};

const getRepositoriesFromSearchSuccess = (
  queryResult: IRepository[]
): IGetRepositoriesFromSearchActionType => {
  return {
    type: SEARCH_INFO_TYPE_KEYS.GET_REPOSITORIES_FROM_SEARCH,
    payload: queryResult
  };
};
