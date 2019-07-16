import { REPOSITORY_INFO_TYPE_KEYS } from "./typeKeys";

export interface ISetCommitsLoadingStatusActionType {
  type: REPOSITORY_INFO_TYPE_KEYS.SET_COMMITS_LOADING_STATUS;
  payload: boolean;
}

export const setCommitsLoadingStatusAction = (
  isLoading: boolean
): ISetCommitsLoadingStatusActionType => {
  return {
    payload: isLoading,
    type: REPOSITORY_INFO_TYPE_KEYS.SET_COMMITS_LOADING_STATUS
  };
};
