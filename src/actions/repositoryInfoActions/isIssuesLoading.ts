import { REPOSITORY_INFO_TYPE_KEYS } from "./typeKeys";

export interface ISetIssuesLoadingStatusActionType {
  type: REPOSITORY_INFO_TYPE_KEYS.SET_ISSUES_LOADING_STATUS;
  payload: boolean;
}

/**
 * Sets the Issue loading status within the redux store.
 * @param isLoading  Issue loading status to set inside the redux store.
 * @function
 */
export const setIssuesLoadingStatusAction = (
  isLoading: boolean
): ISetIssuesLoadingStatusActionType => {
  return {
    payload: isLoading,
    type: REPOSITORY_INFO_TYPE_KEYS.SET_ISSUES_LOADING_STATUS
  };
};
