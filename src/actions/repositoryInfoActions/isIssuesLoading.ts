import { REPOSITORY_INFO_TYPE_KEYS } from "./typeKeys";

export interface ISetIssuesLoadingStatusActionType {
  type: REPOSITORY_INFO_TYPE_KEYS.SET_ISSUES_LOADING_STATUS;
  payload: boolean;
}

export const setIssuesLoadingStatusAction = (
  isLoading: boolean
): ISetIssuesLoadingStatusActionType => {
  return {
    payload: isLoading,
    type: REPOSITORY_INFO_TYPE_KEYS.SET_ISSUES_LOADING_STATUS
  };
};
