const request = new XMLHttpRequest();

request.addEventListener("load", ({ target }) => {
  const repos = JSON.parse(target.response);
  const data = repos
    .map((repo) => {
      return {
        name: repo.name,
        url: repo["html_url"],
        stars: repo["stargazers_count"],
      };
    })
    .filter((repo) => repo.stars > 0)
    .map(
      (repo) =>
        `<li><a href="${repo.url}" target="_blank">${repo.name} (${repo.stars} star)</a></li>`
    )
    .join("");

  const list = document.createElement("ol");
  list.innerHTML = data;
  document.body.insertAdjacentElement("afterbegin", list);
});

request.open(
  "get",
  "https://api.github.com/users/alexandracaulea/repos"
);
request.send();
