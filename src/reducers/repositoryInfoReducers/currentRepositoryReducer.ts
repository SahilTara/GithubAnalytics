import IRepository from "../../types/IRespository";
import RepositoryInfoActionType from "../../actions/repositoryInfoActions/repositoryInfoActionTypes";
import { REPOSITORY_INFO_TYPE_KEYS } from "../../actions/repositoryInfoActions/typeKeys";

/* State Shape
  currentRepository: IRepository
*/

const initialState: IRepository = {
  author: "",
  name: "",
  avatar: "",
  description: "",
  forks: 0,
  stars: 0
};

const currentRepository = (
  state: IRepository = initialState,
  action: RepositoryInfoActionType
) => {
  switch (action.type) {
    case REPOSITORY_INFO_TYPE_KEYS.SET_CURRENT_REPOSITORY:
      return action.payload;
    default:
      return state;
  }
};

export default currentRepository;
