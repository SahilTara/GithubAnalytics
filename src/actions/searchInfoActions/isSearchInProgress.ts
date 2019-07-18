import { SEARCH_INFO_TYPE_KEYS } from "./typeKeys";

export interface ISetSearchInProgressStatusActionType {
  type: SEARCH_INFO_TYPE_KEYS.SET_SEARCH_IN_PROGRESS_STATUS;
  payload: boolean;
}

export const setSearchInProgressStatusAction = (
  isSearching: boolean
): ISetSearchInProgressStatusActionType => {
  return {
    payload: isSearching,
    type: SEARCH_INFO_TYPE_KEYS.SET_SEARCH_IN_PROGRESS_STATUS
  };
};
