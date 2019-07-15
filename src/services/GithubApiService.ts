import OctoKit, { ReposGetResponse, PullsGetResponse } from "@octokit/rest";
import IRepository from "../types/IRespository";
import { IPullRequest } from "../types/IPullRequest";

OctoKit.plugin(require("@octokit/plugin-throttling"));

const octokit = new OctoKit({
  auth: process.env.REACT_APP_GITHUB_API_KEY,
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
    console.warn(`Abuse detected for request ${options.method} ${options.url}`);
  }
});

const trending_url =
  "https://github-trending-api.now.sh/repositories?since=weekly";

class GithubApiService {
  public async getPopularRepositories(
    top: number = 20
  ): Promise<IRepository[]> {
    const response = await fetch(trending_url).then(response =>
      Promise.resolve(response.json())
    );
    const repositories = response as IRepository[];

    return repositories.slice(0, top);
  }

  public async getPullRequests(repository: IRepository) {
    const options = octokit.pulls.list.endpoint.merge({
      owner: repository.author,
      repo: repository.name,
      state: "all"
    });
    return await octokit
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

  public async getUserRepos() {
    return await octokit.repos
      .list()
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
