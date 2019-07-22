import { REPOSITORY_INFO_TYPE_KEYS } from "./typeKeys";

export interface ISetCommitsLoadingStatusActionType {
  type: REPOSITORY_INFO_TYPE_KEYS.SET_COMMITS_LOADING_STATUS;
  payload: boolean;
}

/**
 * Sets the Commit loading status within the redux store.
 * @param isLoading  Commit loading status to set inside the redux store.
 * @function
 */
export const setCommitsLoadingStatusAction = (
  isLoading: boolean
): ISetCommitsLoadingStatusActionType => {
  return {
    payload: isLoading,
    type: REPOSITORY_INFO_TYPE_KEYS.SET_COMMITS_LOADING_STATUS
  };
};
