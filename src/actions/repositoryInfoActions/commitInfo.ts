import { REPOSITORY_INFO_TYPE_KEYS } from "./typeKeys";
import GithubApiService from "../../services/GithubApiService";
import RepositoryInfoActionType from "./repositoryInfoActionTypes";
import { Dispatch } from "redux";
import IRepository from "../../types/IRespository";

export interface IGetCommitInfoActionType {
  type: REPOSITORY_INFO_TYPE_KEYS.GET_COMMIT_INFO;
  payload: ICommitData[];
}

export const getCommitInfoAction = (repository: IRepository) => {
  return async (dispatch: Dispatch<RepositoryInfoActionType>) => {
    const api = new GithubApiService();
    try {
      dispatch(getCommitInfoSuccess(await api.getCommits(repository)));
    } catch (error) {
      // handle here if have time
      console.error(error);
    }
  };
};

const getCommitInfoSuccess = (
  commits: ICommitData[]
): IGetCommitInfoActionType => {
  return {
    type: REPOSITORY_INFO_TYPE_KEYS.GET_COMMIT_INFO,
    payload: commits
  };
};
