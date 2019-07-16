import { REPOSITORY_INFO_TYPE_KEYS } from "./typeKeys";
import GithubApiService from "../../services/GithubApiService";
import RepositoryInfoActionType from "./repositoryInfoActionTypes";
import { Dispatch } from "redux";
import IRepository from "../../types/IRespository";
import { IIssueData } from "../../types/IIssueData";

export interface IGetIssueInfoActionType {
  type: REPOSITORY_INFO_TYPE_KEYS.GET_ISSUE_INFO;
  payload: IIssueData[];
}

export const getIssueInfoAction = (repository: IRepository) => {
  return async (dispatch: Dispatch<RepositoryInfoActionType>) => {
    const api = new GithubApiService();
    try {
      dispatch(getIssueInfoSuccess(await api.getIssues(repository)));
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
