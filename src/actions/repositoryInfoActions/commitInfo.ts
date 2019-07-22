import { REPOSITORY_INFO_TYPE_KEYS } from "./typeKeys";
import GithubApiService from "../../services/GithubApiService";
import RepositoryInfoActionType from "./repositoryInfoActionTypes";
import { Dispatch } from "redux";
import IRepository from "../../types/IRespository";
import { setCommitsLoadingStatusAction } from "./isCommitsLoading";
import { ICommitData } from "../../types/ICommitData";

export interface IGetCommitInfoActionType {
  type: REPOSITORY_INFO_TYPE_KEYS.GET_COMMIT_INFO;
  payload: ICommitData[];
}

/**
 * Puts commit related info for the specified repository into the redux store.
 * @param repository the repository for which the commit info is needed.
 * @function
 */
export const getCommitInfoAction = (repository: IRepository) => {
  return async (dispatch: Dispatch<RepositoryInfoActionType>) => {
    const api = new GithubApiService();
    try {
      dispatch(getCommitInfoSuccess(await api.getCommits(repository)));
      dispatch(setCommitsLoadingStatusAction(false));
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
