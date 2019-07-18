import { IGetRepositoriesFromSearchActionType } from "./searchQueryRepositories";
import { ISetSearchInProgressStatusActionType } from "./isSearchInProgress";
import { ISetLastQueryTextActionType } from "./lastQueryText";

type SearchInfoActionType =
  | IGetRepositoriesFromSearchActionType
  | ISetSearchInProgressStatusActionType
  | ISetLastQueryTextActionType;

export default SearchInfoActionType;
