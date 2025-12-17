document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  const lightIcon = document.getElementById("lightMode");
  const darkIcon = document.getElementById("darkMode");
  const messengerIcon = document.getElementById("messengerLink");
  const rulesLink = document.getElementById("rulesLink");
  const nameGeneratorLink = document.getElementById("nameGeneratorLink");
  const copyCreator = document.getElementById("copyCreator");
  const creatorName = document.querySelector(".creator-name");
  
  /* -------------------------
     SUBTITLE TEXT ROTATOR
  ------------------------- */
  const subtitleLines = document.querySelectorAll('.subtitle-line');
  let currentLine = 0;
  let subtitleInterval;
  
  function rotateSubtitles() {
    if (subtitleLines.length === 0) return;
    
    // Remove active class from all lines
    subtitleLines.forEach(line => {
      line.classList.remove('active');
      line.style.opacity = '0';
    });
    
    // Add active class to current line
    subtitleLines[currentLine].classList.add('active');
    subtitleLines[currentLine].style.opacity = '0.85';
    
    // Add a subtle glitch effect during transition
    subtitleLines[currentLine].style.animation = 'none';
    setTimeout(() => {
      subtitleLines[currentLine].style.animation = '';
    }, 10);
    
    // Move to next line
    currentLine = (currentLine + 1) % subtitleLines.length;
  }
  
  function startSubtitleRotation() {
    // Clear any existing interval
    if (subtitleInterval) {
      clearInterval(subtitleInterval);
    }
    
    // Start rotation (every 5 seconds)
    subtitleInterval = setInterval(rotateSubtitles, 5000);
    
    // Initial activation (show first line)
    if (subtitleLines.length > 0) {
      subtitleLines[0].classList.add('active');
      subtitleLines[0].style.opacity = '0.85';
      currentLine = 1; // Set to next line for first rotation
    }
  }
  
  // Pause rotation on hover
  const subtitleContainer = document.querySelector('.subtitle-container');
  if (subtitleContainer) {
    subtitleContainer.addEventListener('mouseenter', () => {
      if (subtitleInterval) {
        clearInterval(subtitleInterval);
      }
    });
    
    subtitleContainer.addEventListener('mouseleave', () => {
      startSubtitleRotation();
    });
  }
  
  /* -------------------------
     COPY CREATOR ID
  ------------------------- */
  creatorName.addEventListener("click", () => {
    navigator.clipboard.writeText("3281874036").then(() => {
      creatorName.style.transform = "scale(1.1)";
      creatorName.style.color = "#a00303"; // Optional: Add visual feedback
      setTimeout(() => {
        creatorName.style.transform = "scale(1)";
        creatorName.style.color = ""; // Reset to default
      }, 150);
    }).catch(err => {
      console.error("Failed to copy: ", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = "3281874036";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
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

  // Apply system theme
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
     INITIALIZE SUBTITLE ROTATOR
  ------------------------- */
  // Start subtitle rotation after a short delay
  setTimeout(() => {
    startSubtitleRotation();
  }, 1000);

  /* -------------------------
     PROTECTION
  ------------------------- */
  document.addEventListener("contextmenu", e => e.preventDefault());

  document.addEventListener("keydown", e => {
    // Prevent Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if (e.ctrlKey && ["A", "C", "V", "X"].includes(e.key.toUpperCase())) {
      e.preventDefault();
    }
    // Prevent F12 (DevTools)
    if (e.key === "F12" || e.keyCode === 123) {
      e.preventDefault();
    }
    // Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key.toUpperCase())) {
      e.preventDefault();
    }
  });
  
  // Additional protection against inspecting element
  document.addEventListener("keydown", (e) => {
    if (e.keyCode === 123 || (e.ctrlKey && e.shiftKey && e.keyCode === 73) || (e.ctrlKey && e.shiftKey && e.keyCode === 74)) {
      e.preventDefault();
      return false;
    }
  });
});