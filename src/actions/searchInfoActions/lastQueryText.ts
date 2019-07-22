import { SEARCH_INFO_TYPE_KEYS } from "./typeKeys";

export interface ISetLastQueryTextActionType {
  type: SEARCH_INFO_TYPE_KEYS.SET_LAST_QUERY_TEXT;
  payload: string;
}

/**
 * Sets the last queried string in the redux store
 * @param lastQuery the query string to set inside the redux store.
 * @function
 */
export const setQueryTextAction = (
  lastQuery: string
): ISetLastQueryTextActionType => {
  return {
    payload: lastQuery,
    type: SEARCH_INFO_TYPE_KEYS.SET_LAST_QUERY_TEXT
  };
};
