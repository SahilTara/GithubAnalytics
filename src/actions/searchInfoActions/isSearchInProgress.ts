import { SEARCH_INFO_TYPE_KEYS } from "./typeKeys";

export interface ISetSearchInProgressStatusActionType {
  type: SEARCH_INFO_TYPE_KEYS.SET_SEARCH_IN_PROGRESS_STATUS;
  payload: boolean;
}

/**
 * Sets the Searching status within the redux store.
 * @param isSearching  Searching status to set inside the redux store.
 * @function
 */
export const setSearchInProgressStatusAction = (
  isSearching: boolean
): ISetSearchInProgressStatusActionType => {
  return {
    payload: isSearching,
    type: SEARCH_INFO_TYPE_KEYS.SET_SEARCH_IN_PROGRESS_STATUS
  };
};
