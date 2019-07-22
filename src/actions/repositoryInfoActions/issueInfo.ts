import { REPOSITORY_INFO_TYPE_KEYS } from "./typeKeys";
import GithubApiService from "../../services/GithubApiService";
import RepositoryInfoActionType from "./repositoryInfoActionTypes";
import { Dispatch } from "redux";
import IRepository from "../../types/IRespository";
import { IIssueData } from "../../types/IIssueData";
import { setIssuesLoadingStatusAction } from "./isIssuesLoading";

export interface IGetIssueInfoActionType {
  type: REPOSITORY_INFO_TYPE_KEYS.GET_ISSUE_INFO;
  payload: IIssueData[];
}

/**
 * Puts issue related info for the specified repository into the redux store.
 * @param repository the repository for which the issue info is needed.
 * @function
 */
export const getIssueInfoAction = (repository: IRepository) => {
  return async (dispatch: Dispatch<RepositoryInfoActionType>) => {
    const api = new GithubApiService();
    try {
      dispatch(getIssueInfoSuccess(await api.getIssues(repository)));
      dispatch(setIssuesLoadingStatusAction(false));
    } catch (error) {
      // handle here if have time
      console.error(error);
    }
  };
};

const getIssueInfoSuccess = (issues: IIssueData[]): IGetIssueInfoActionType => {
  return {
    type: REPOSITORY_INFO_TYPE_KEYS.GET_ISSUE_INFO,
    payload: issues
  };
};
