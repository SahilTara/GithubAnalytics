import OctoKit, {
  ReposGetResponse,
  PullsGetResponse,
  IssuesGetResponse,
  IssuesListResponse,
  ReposListCommitsResponse,
  ReposGetCommitResponse
} from "@octokit/rest";
import IRepository from "../types/IRespository";
import { IPullRequest } from "../types/IPullRequest";
import { IIssueData } from "../types/IIssueData";
import { ICommitData } from "../types/ICommitData";

OctoKit.plugin(require("@octokit/plugin-throttling"));

const trending_url =
  "https://github-trending-api.now.sh/repositories?since=weekly";

/**
 * Class which encapsulates various Github related api commands.
 *
 * @class GithubApiService
 */
class GithubApiService {
  private static octokit: OctoKit;

  /**
   * Sets the auth token, and creates a new instance of the octokit agent.
   * @static
   * @param {string} token token that is used for auth
   * @memberof GithubApiService
   */
  public static setToken(token: string) {
    GithubApiService.octokit = new OctoKit({
      auth: token,
      userAgent: "GithubAnalytics v0.0.1",
      log: {
        debug: () => {},
        info: () => {},
        warn: console.warn,
        error: console.error
      },
      onRateLimit: (retryAfter: any, options: any) => {
        console.warn(
          `Request quota exhausted for request ${options.method} ${options.url}`
        );

        if (options.request.retryCount === 0) {
          // only retries once
          console.log(`Retrying after ${retryAfter} seconds!`);
          return true;
        }
      },
      onAbuseLimit: (retryAfter: number, options: any) => {
        // does not retry, only logs a warning
        console.warn(
          `Abuse detected for request ${options.method} ${
            options.url
          } retrying after ${retryAfter}`
        );
        return true;
      }
    });
  }

  /**
   * Gets the URL needed for authentication
   *
   * @static
   * @returns {string} auth url
   * @memberof GithubApiService
   */
  public static getAuthUrl(): string {
    const clientId = process.env.REACT_APP_CLIENT_ID || "";
    return `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo`;
  }

  /**
   * Gets a list of trending repositories asynchronously.
   *
   * @param {number} [top=20] Gets the top n trending repositories for the week (default top 20)
   * @returns {Promise<IRepository[]>} A promise containing a list of trending repositories
   * @memberof GithubApiService
   */
  public async getPopularRepositories(
    top: number = 20
  ): Promise<IRepository[]> {
    const response = await fetch(trending_url).then(response =>
      Promise.resolve(response.json())
    );
    const repositories = response as IRepository[];

    return repositories.slice(0, top);
  }

  /**
   * Gets pull request info for a repository asynchronously
   *
   * @param {IRepository} repository repository to get pull request info for.
   * @returns {Promise<IPullRequest[]>} A promise containing pull request info for a repository
   * @memberof GithubApiService
   */
  public async getPullRequests(
    repository: IRepository
  ): Promise<IPullRequest[]> {
    const options = GithubApiService.octokit.pulls.list.endpoint.merge({
      owner: repository.author,
      repo: repository.name,
      state: "all",
      per_page: 100
    });
    return await GithubApiService.octokit
      .paginate(options)
      .then(response => Promise.resolve(response as PullsGetResponse[]))
      .then(pullRequests =>
        pullRequests.map<IPullRequest>(pullRequest => ({
          owner: pullRequest.user.login,
          createdAt: pullRequest.created_at,
          mergedAt: pullRequest.merged_at,
          merged: !!pullRequest.merged_at
        }))
      );
  }

  /**
   * Gets the date one year ago
   *
   * @private
   * @returns {Date} Date one year ago
   * @memberof GithubApiService
   */
  private getOneYearAgo(): Date {
    const now = new Date();
    const oneYearAgo = new Date();

    oneYearAgo.setFullYear(
      now.getFullYear() - 1,
      now.getMonth(),
      now.getDate()
    );

    oneYearAgo.setHours(0, 0, 0, 0);

    return oneYearAgo;
  }

  /**
   * Gets commit info for a repository asynchronously
   *
   * @param {IRepository} repository repository to get commit info for.
   * @returns {Promise<ICommitData[]>} A promise containing commit info for a repository
   * @memberof GithubApiService
   */
  public async getCommits(repository: IRepository): Promise<ICommitData[]> {
    const oneYearAgo = this.getOneYearAgo();

    const options = GithubApiService.octokit.repos.listCommits.endpoint.merge({
      owner: repository.author,
      repo: repository.name,
      since: oneYearAgo.toISOString(),
      per_page: 100
    });

    return await GithubApiService.octokit
      .paginate(options)
      .then(response => Promise.resolve(response as ReposListCommitsResponse))
      .then(commits =>
        commits.map<Promise<ICommitData>>(async commit => {
          // not scalable, we get additional info for each issue, so we get the actor.
          return await GithubApiService.octokit.repos
            .getCommit({
              owner: repository.author,
              repo: repository.name,
              ref: commit.sha
            })
            .then(response =>
              Promise.resolve(response.data as ReposGetCommitResponse)
            )
            .then(commit =>
              Promise.resolve({
                author: commit.committer.login,
                createdAt: commit.commit.committer.date,
                additions: commit.stats.additions,
                deletions: commit.stats.deletions,
                totalChanges: commit.stats.total // is additions + deletions!
              })
            );
        })
      )
      .then(promises => Promise.all(promises));
  }

  /**
   * Gets a list of repositories related to a query asynchronously
   *
   * @param {string} query a query string to find repositories for.
   * @returns {Promise<IRepository[]>} A list of repositories related to the query
   * @memberof GithubApiService
   */
  public async search(query: string): Promise<IRepository[]> {
    return await GithubApiService.octokit.search
      .repos({ q: query, per_page: 30 })
      .then(response =>
        Promise.resolve(response.data.items as ReposGetResponse[])
      )
      .then(repositories =>
        repositories.map<IRepository>(repositoryGithubType => {
          return {
            author: repositoryGithubType.owner.login,
            avatar: repositoryGithubType.owner.avatar_url,
            name: repositoryGithubType.name,
            description: repositoryGithubType.description || "",
            forks: repositoryGithubType.forks_count,
            stars: repositoryGithubType.stargazers_count
          };
        })
      );
  }

  /**
   * Gets issue info for a repository asynchronously
   *
   * @param {IRepository} repository repository to get issue info for.
   * @returns {Promise<IIssueData[]>} A promise containing issue info for a repository
   * @memberof GithubApiService
   */
  public async getIssues(repository: IRepository): Promise<IIssueData[]> {
    const oneYearAgo = this.getOneYearAgo();

    const options = GithubApiService.octokit.issues.listForRepo.endpoint.merge({
      owner: repository.author,
      repo: repository.name,
      state: "all",
      since: oneYearAgo.toISOString(),
      per_page: 100
    });

    return await GithubApiService.octokit
      .paginate(options)
      .then(response => Promise.resolve(response as IssuesListResponse))
      .then(issues =>
        issues.map<Promise<IIssueData>>(async issue => {
          // not scalable, we get additional info for each issue, so we get the actor.
          if (issue.closed_at && !issue.pull_request) {
            // issue is closed so we need additional info
            return await GithubApiService.octokit.issues
              .get({
                owner: repository.author,
                repo: repository.name,
                issue_number: issue.number
              })
              .then(response =>
                Promise.resolve(response.data as IssuesGetResponse)
              )
              .then(issue =>
                Promise.resolve({
                  createdBy: issue.user.login,
                  createdAt: issue.created_at,
                  closedBy: issue.closed_by ? issue.closed_by.login : "",
                  closedAt: issue.closed_at || "",
                  closed: !!issue.closed_at
                })
              );
          } else {
            // no need to call api for additional info since issue isn't closed.
            return {
              createdBy: issue.user.login,
              createdAt: issue.created_at,
              closedBy: "",
              closedAt: "",
              closed: false
            };
          }
        })
      )
      .then(async promises => await Promise.all(promises));
  }
  /**
   * Gets a list of up to 100 of the authenticated user's repositories asynchronously
   *
   * @returns {Promise<IRepository[]>} A promise containing a list of up to 100 of the user's repositories
   * @memberof GithubApiService
   */
  public async getUserRepos(): Promise<IRepository[]> {
    return await GithubApiService.octokit.repos
      .list({ per_page: 100 })
      .then(response => Promise.resolve(response.data as ReposGetResponse[]))
      .then(repositories =>
        repositories.map<IRepository>(repositoryGithubType => {
          return {
            author: repositoryGithubType.owner.login,
            avatar: repositoryGithubType.owner.avatar_url,
            name: repositoryGithubType.name,
            description: repositoryGithubType.description || "",
            forks: repositoryGithubType.forks_count,
            stars: repositoryGithubType.stargazers_count
          };
        })
      );
  }
}

export default GithubApiService;
