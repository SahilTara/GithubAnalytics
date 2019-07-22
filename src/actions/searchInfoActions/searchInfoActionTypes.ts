import { IGetRepositoriesFromSearchActionType } from "./searchQueryRepositories";
import { ISetSearchInProgressStatusActionType } from "./isSearchInProgress";
import { ISetLastQueryTextActionType } from "./lastQueryText";

/**
 * Root Action Type for search info actions
 */
type SearchInfoActionType =
  | IGetRepositoriesFromSearchActionType
  | ISetSearchInProgressStatusActionType
  | ISetLastQueryTextActionType;

export default SearchInfoActionType;
