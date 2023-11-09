export const GitUserService = {
  getGituser(userName: string) {
    return fetch(`https://api.github.com/users/${userName}`, {})
      .then((res) => res.json())
      .then((d) => d.data)
  },
}
