/**
 * Enum listing all repository info action types.
 * @export
 * @enum {string}
 */
export enum REPOSITORY_INFO_TYPE_KEYS {
  SET_CURRENT_REPOSITORY = "GA/repositoryInfo/SET_CURRENT_REPOSITORY",
  SET_TIME_SPAN = "GA/repositoryInfo/SET_TIME_SPAN",
  SET_PRS_LOADING_STATUS = "GA/repositoryInfo/SET_PRS_LOADING_STATUS",
  SET_COMMITS_LOADING_STATUS = "GA/repositoryInfo/SET_COMMITS_LOADING_STATUS",
  SET_ISSUES_LOADING_STATUS = "GA/repositoryInfo/SET_ISSUES_LOADING_STATUS",
  GET_PULL_REQUEST_INFO = "GA/repositoryInfo/GET_PULL_REQUEST_INFO",
  GET_ISSUE_INFO = "GA/repositoryInfo/GET_ISSUE_INFO",
  GET_COMMIT_INFO = "GA/repositoryInfo/GET_COMMIT_INFO"
}
