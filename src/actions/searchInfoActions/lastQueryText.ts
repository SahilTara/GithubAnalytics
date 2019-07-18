import { SEARCH_INFO_TYPE_KEYS } from "./typeKeys";

export interface ISetLastQueryTextActionType {
  type: SEARCH_INFO_TYPE_KEYS.SET_LAST_QUERY_TEXT;
  payload: string;
}

export const setQueryTextAction = (
  lastQuery: string
): ISetLastQueryTextActionType => {
  return {
    payload: lastQuery,
    type: SEARCH_INFO_TYPE_KEYS.SET_LAST_QUERY_TEXT
  };
};
