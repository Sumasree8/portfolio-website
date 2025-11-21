document.addEventListener("DOMContentLoaded", () => {
  const githubUsername = "Sumasree8";
  const projectList = document.getElementById("project-list");

  if (projectList) {
    fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&direction=desc`)

      .then(response => response.json())
      .then(repos => {
        repos.slice(0, 6).forEach(repo => {
          const card = document.createElement("div");
          card.className = "repo-card";
          card.innerHTML = `
            <h3>${repo.name}</h3>
            <p>${repo.description || "No description provided."}</p>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
          `;
          projectList.appendChild(card);
        });
      })
      .catch(err => {
        console.error("Failed to fetch GitHub repos:", err);
        projectList.innerHTML = "<p>⚠️ Unable to load GitHub projects.</p>";
      });
  }
});
