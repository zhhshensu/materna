export const WorkbenchService = {
  getAppList() {
    return fetch(`https://api.github.com/users/${userName}`, {})
      .then((res) => res.json())
      .then((d) => d.data)
  },
}
