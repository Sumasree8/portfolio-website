document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for internal section links
  const links = document.querySelectorAll(".nav-links a");
  links.forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (!href.includes(".html")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // Project filter buttons (optional, used on project pages)
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-card");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-filter");

      projects.forEach(project => {
        if (category === "all" || project.dataset.category === category) {
          project.style.display = "block";
        } else {
          project.style.display = "none";
        }
      });
    });
  });
});

// Theme toggle
const themeToggle = document.getElementById("theme-toggle");
if (themeToggle) {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
  });
}
