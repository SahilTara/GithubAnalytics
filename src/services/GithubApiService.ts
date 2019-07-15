import OctoKit, { ReposGetResponse } from "@octokit/rest";
import IRepository from "../types/IRespository";

const octokit = new OctoKit({
  auth: process.env.REACT_APP_GITHUB_API_KEY,
  userAgent: "GithubAnalytics v0.0.1",
  log: {
    debug: () => {},
    info: () => {},
    warn: console.warn,
    error: console.error
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
