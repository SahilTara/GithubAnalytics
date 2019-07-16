import { REPOSITORY_INFO_TYPE_KEYS } from "./typeKeys";
import { TIME_SPAN } from "../../types/TimeSpan";

export interface ISetTimeSpanActionType {
  type: REPOSITORY_INFO_TYPE_KEYS.SET_TIME_SPAN;
  payload: TIME_SPAN;
}

export const setTimeSpanAction = (
  timeSpan: TIME_SPAN
): ISetTimeSpanActionType => {
  return {
    payload: timeSpan,
    type: REPOSITORY_INFO_TYPE_KEYS.SET_TIME_SPAN
  };
};
