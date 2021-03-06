import { REPOSITORY_INFO_TYPE_KEYS } from "./typeKeys";

export interface ISetPrsLoadingStatusActionType {
  type: REPOSITORY_INFO_TYPE_KEYS.SET_PRS_LOADING_STATUS;
  payload: boolean;
}

/**
 * Sets the  PR loading status within the redux store.
 * @param isLoading  PR loading status to set inside the redux store.
 * @function
 */
export const setPrsLoadingStatusAction = (
  isLoading: boolean
): ISetPrsLoadingStatusActionType => {
  return {
    payload: isLoading,
    type: REPOSITORY_INFO_TYPE_KEYS.SET_PRS_LOADING_STATUS
  };
};
