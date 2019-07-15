import { REPOSITORY_INFO_TYPE_KEYS } from "./typeKeys";
import IRepository from "../../types/IRespository";

export interface ISetCurrentRepositoryActionType {
  type: REPOSITORY_INFO_TYPE_KEYS.SET_CURRENT_REPOSITORY;
  payload: IRepository;
}

export const setCurrentRepositoryAction = (
  repository: IRepository
): ISetCurrentRepositoryActionType => {
  return {
    payload: repository,
    type: REPOSITORY_INFO_TYPE_KEYS.SET_CURRENT_REPOSITORY
  };
};
