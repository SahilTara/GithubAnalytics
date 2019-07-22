import { ENVIRONMENT_INFO_TYPE_KEYS } from "./typeKeys";

export interface ISetIsLoggedInActionType {
  type: ENVIRONMENT_INFO_TYPE_KEYS.SET_IS_LOGGED_IN;
  payload: boolean;
}
/**
 * Action to set the login status inside the redux store
 * @param status the login status to set inside the redux store.
 * @function
 */
export const setIsLoggedInAction = (
  status: boolean
): ISetIsLoggedInActionType => {
  return {
    payload: status,
    type: ENVIRONMENT_INFO_TYPE_KEYS.SET_IS_LOGGED_IN
  };
};
