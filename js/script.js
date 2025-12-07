document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const lightIcon = document.getElementById("lightMode");
  const darkIcon = document.getElementById("darkMode");
  const messengerIcon = document.getElementById("messengerLink");
  const rulesLink = document.getElementById("rulesLink");
  const nameGeneratorLink = document.getElementById("nameGeneratorLink");
const copyCreator = document.getElementById("copyCreator");
const creatorName = document.querySelector(".creator-name");

creatorName.addEventListener("click", () => {
  navigator.clipboard.writeText("3281874036").then(() => {
    creatorName.style.transform = "scale(1.1)";
    setTimeout(() => creatorName.style.transform = "scale(1)", 150);
  });
});

  /* -------------------------
     THEME SYSTEM
  ------------------------- */

  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(isDark) {
    body.classList.toggle("dark-mode", isDark);
    lightIcon.style.display = isDark ? "block" : "none";
    darkIcon.style.display = isDark ? "none" : "block";
  }

  applyTheme(systemTheme.matches);

  systemTheme.addEventListener("change", e => applyTheme(e.matches));

  lightIcon.addEventListener("click", () => applyTheme(false));
  darkIcon.addEventListener("click", () => applyTheme(true));

  /* -------------------------
     LINKS
  ------------------------- */

  messengerIcon.addEventListener("click", () => {
    window.open("https://m.me/j/AbZMa7nzto1jC3fQ/", "_blank", "noopener,noreferrer");
  });

  rulesLink.addEventListener("click", e => {
    e.preventDefault();
    window.location.href = "https://gr-bloodline.github.io/rules/";
  });

  nameGeneratorLink.addEventListener("click", e => {
    e.preventDefault();
    window.location.href = "https://gr-bloodline.github.io/name-generator/";
  });

  /* -------------------------
     PROTECTION (unchanged)
  ------------------------- */

  document.addEventListener("contextmenu", e => e.preventDefault());

  document.addEventListener("keydown", e => {
    if (e.ctrlKey && ["A", "C", "V", "X"].includes(e.key.toUpperCase())) {
      e.preventDefault();
    }
    if (e.keyCode === 123) {
      e.preventDefault();
    }
  });
});