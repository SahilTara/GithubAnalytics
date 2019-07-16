import { REPOSITORY_INFO_TYPE_KEYS } from "./typeKeys";
import { IPullRequest } from "../../types/IPullRequest";
import GithubApiService from "../../services/GithubApiService";
import RepositoryInfoActionType from "./repositoryInfoActionTypes";
import { Dispatch } from "redux";
import IRepository from "../../types/IRespository";
import { setPrsLoadingStatusAction } from "./isPrsLoading";

export interface IGetPullRequestInfoActionType {
  type: REPOSITORY_INFO_TYPE_KEYS.GET_PULL_REQUEST_INFO;
  payload: IPullRequest[];
}

export const getPullRequestInfoAction = (repository: IRepository) => {
  return async (dispatch: Dispatch<RepositoryInfoActionType>) => {
    const api = new GithubApiService();
    try {
      dispatch(
        getPullRequestInfoSuccess(await api.getPullRequests(repository))
      );
      dispatch(setPrsLoadingStatusAction(false));
    } catch (error) {
      // handle here if have time
      console.error(error);
    }
  };
};

const getPullRequestInfoSuccess = (
  pullRequests: IPullRequest[]
): IGetPullRequestInfoActionType => {
  return {
    type: REPOSITORY_INFO_TYPE_KEYS.GET_PULL_REQUEST_INFO,
    payload: pullRequests
  };
};
