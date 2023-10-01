interface GithubUser {
  id: number;
  login: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  created_at: Date;
}

const user0 = Deno.args[0];
const user1 = Deno.args[1];

console.log(`🦦 You want to compare ${user0} & ${user1}`);

async function fetchGithubUserInfo(username: string): Promise<GithubUser> {
  const resp = await fetch(`https://api.github.com/users/${username}`, {
    headers: {
      accept: "application/json",
    },
  });

  const user = await resp.json();

  return createUser(user);
}

// deno-lint-ignore no-explicit-any
function createUser(object: any): GithubUser {
  return {
    id: object.id,
    login: object.login,
    public_repos: object.public_repos,
    public_gists: object.public_gists,
    followers: object.followers,
    created_at: object.created_at,
  };
}

const githubUser0 = await fetchGithubUserInfo(user0);
const githubUser1 = await fetchGithubUserInfo(user1);

function rankUsers(user0: GithubUser, user1: GithubUser): void {
  // followers
  if (user0.followers > user1.followers) {
    isMorePopularThan(user0.login, user1.login, "followers");
  } else if (user0.followers < user1.followers) {
    isMorePopularThan(user1.login, user0.login, "followers");
  } else {
    console.log("Same number of followers");
  }
  // public repos
  if (user0.public_repos > user1.public_repos) {
    isMorePopularThan(user0.login, user1.login, "public repos");
  } else if (user1.public_repos > user0.public_repos) {
    isMorePopularThan(user1.login, user0.login, "public repos");
  } else {
    console.log("Same number of public repos");
  }
  // public gists
  if (user0.public_repos > user1.public_repos) {
    isMorePopularThan(user0.login, user1.login, "public gists");
  } else if (user1.public_repos > user0.public_repos) {
    isMorePopularThan(user1.login, user0.login, "public gists");
  } else {
    console.log("Same number of public gists");
  }
  // creation date
  if (user0.created_at > user1.created_at) {
    console.log(
      `${user0.login} account is older than ${user1.login} by creation date`,
    );
  } else if (user1.created_at > user0.created_at) {
    console.log(
      `${user1.login} account is older than ${user0.login} by creation date`,
    );
  } else {
    console.log("Same creation date");
  }
}

function isMorePopularThan(
  username0: string,
  username1: string,
  key: string,
): void {
  console.log(`${username0} is more popular than ${username1} by ${key}`);
}

console.log("--------------------")
rankUsers(githubUser0, githubUser1);
