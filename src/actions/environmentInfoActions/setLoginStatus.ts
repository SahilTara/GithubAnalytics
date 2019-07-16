import { ENVIRONMENT_INFO_TYPE_KEYS } from "./typeKeys";

export interface ISetIsLoggedInActionType {
  type: ENVIRONMENT_INFO_TYPE_KEYS.SET_IS_LOGGED_IN;
  payload: boolean;
}

export const setIsLoggedInAction = (
  status: boolean
): ISetIsLoggedInActionType => {
  return {
    payload: status,
    type: ENVIRONMENT_INFO_TYPE_KEYS.SET_IS_LOGGED_IN
  };
};
