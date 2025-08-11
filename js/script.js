document.addEventListener('DOMContentLoaded', function() {
  const body = document.body;
  const lightIcon = document.getElementById("lightMode");
  const darkIcon = document.getElementById("darkMode");
  const messengerIcon = document.getElementById("messengerLink");
  const effectToggle = document.getElementById("effectToggle");
  const staticEffect = document.getElementById("staticEffect");
  const dynamicEffect = document.getElementById("dynamicEffect");
  const rulesLink = document.getElementById("rulesLink");
  const nameGeneratorLink = document.getElementById("nameGeneratorLink");
  
  // Effect mode (static by default)
  let dynamicMode = false;
  
  // System theme detection
  const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Apply theme based on system preference
  function applyTheme(isDark) {
    if (isDark) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
    updateIconVisibility(isDark);
  }
  
  function updateIconVisibility(isDark) {
    lightIcon.style.display = isDark ? "block" : "none";
    darkIcon.style.display = isDark ? "none" : "block";
  }
  
  // Initialize with system preference
  applyTheme(colorSchemeQuery.matches);
  
  // Watch for system changes
  colorSchemeQuery.addEventListener('change', (e) => {
    applyTheme(e.matches);
  });
  
  // Manual theme toggles
  lightIcon.addEventListener('click', () => applyTheme(false));
  darkIcon.addEventListener('click', () => applyTheme(true));
  
  // Messenger link (opens in new tab)
  messengerIcon.addEventListener('click', () => {
    window.open("https://m.me/j/AbZMa7nzto1jC3fQ/", "_blank", "noopener,noreferrer");
  });
  
  // Guild Rules and Name Generator links (open in same page)
  rulesLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "https://gr-bloodline.github.io/rules/";
  });
  
  nameGeneratorLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = "https://gr-bloodline.github.io/name-generator/";
  });
  
  // Effect toggle functionality
  effectToggle.addEventListener('click', toggleEffectMode);
  
  function toggleEffectMode() {
    dynamicMode = !dynamicMode;
    
    if (dynamicMode) {
      staticEffect.style.display = "none";
      dynamicEffect.style.display = "block";
      effectToggle.innerHTML = '<i class="fas fa-stop"></i>';
      effectToggle.title = "Switch to Static Effects";
      initBloodEffects();
    } else {
      staticEffect.style.display = "block";
      dynamicEffect.style.display = "none";
      effectToggle.innerHTML = '<i class="fas fa-tint"></i>';
      effectToggle.title = "Switch to Dynamic Effects";
      clearBloodEffects();
    }
  }
  
  // Dynamic blood effects functions
  let bloodIntervals = [];
  
  function createBloodEffect() {
    // Create main drop
    const dropSize = Math.random() * 15 + 10;
    const dropLeft = Math.random() * 100;
    const dropDuration = Math.random() * 5 + 5;
    
    const drop = document.createElement('div');
    drop.className = 'blood-drop';
    drop.style.width = `${dropSize}px`;
    drop.style.height = `${dropSize}px`;
    drop.style.left = `${dropLeft}%`;
    drop.style.animation = `drop-fall ${dropDuration}s linear forwards`;
    drop.style.backgroundColor = body.classList.contains('dark-mode') ? 
      'var(--blood-color-dark)' : 'var(--blood-color-light)';
    
    dynamicEffect.appendChild(drop);
    
    // Create trail
    if (Math.random() > 0.3) {
      const trail = document.createElement('div');
      trail.className = 'blood-trail';
      trail.style.left = `${dropLeft}%`;
      trail.style.top = '-50px';
      trail.style.animation = `trail-extend ${dropDuration}s linear forwards`;
      trail.style.backgroundColor = body.classList.contains('dark-mode') ? 
        'var(--blood-color-dark)' : 'var(--blood-color-light)';
      
      dynamicEffect.appendChild(trail);
      
      setTimeout(() => {
        trail.remove();
      }, dropDuration * 1000);
    }
    
    // Create splash when hitting bottom
    setTimeout(() => {
      if (Math.random() > 0.5) {
        const splash = document.createElement('div');
        splash.className = 'blood-splash';
        splash.style.width = `${dropSize * 2}px`;
        splash.style.height = `${dropSize}px`;
        splash.style.left = `${dropLeft}%`;
        splash.style.top = 'calc(100% - 50px)';
        splash.style.animation = `splash-expand 1s ease-out forwards`;
        splash.style.backgroundColor = body.classList.contains('dark-mode') ? 
          'var(--blood-color-dark)' : 'var(--blood-color-light)';
        
        dynamicEffect.appendChild(splash);
        
        setTimeout(() => {
          splash.remove();
        }, 1000);
      }
      
      // Create secondary droplets
      if (Math.random() > 0.7) {
        for (let i = 0; i < Math.floor(Math.random() * 3) + 1; i++) {
          setTimeout(() => {
            const smallDrop = document.createElement('div');
            smallDrop.className = 'blood-drop';
            smallDrop.style.width = `${dropSize * 0.5}px`;
            smallDrop.style.height = `${dropSize * 0.5}px`;
            smallDrop.style.left = `${dropLeft + (Math.random() * 10 - 5)}%`;
            smallDrop.style.top = 'calc(100% - 60px)';
            smallDrop.style.animation = `drop-fall ${Math.random() * 3 + 1}s linear forwards`;
            smallDrop.style.backgroundColor = body.classList.contains('dark-mode') ? 
              'var(--blood-color-dark)' : 'var(--blood-color-light)';
            
            dynamicEffect.appendChild(smallDrop);
            
            setTimeout(() => {
              smallDrop.remove();
            }, (Math.random() * 3 + 1) * 1000);
          }, Math.random() * 300);
        }
      }
    }, dropDuration * 1000);
    
    setTimeout(() => {
      drop.remove();
    }, dropDuration * 1000 + 1000);
  }
  
  // Initialize multiple blood effects
  function initBloodEffects() {
    // Clear any existing intervals
    clearBloodEffects();
    
    // Create initial drops
    for (let i = 0; i < 5; i++) {
      setTimeout(createBloodEffect, i * 1500);
    }
    
    // Set up intervals for continuous effects
    bloodIntervals.push(setInterval(createBloodEffect, 8000 + Math.random() * 5000));
    bloodIntervals.push(setInterval(createBloodEffect, 10000 + Math.random() * 3000));
  }
  
  // Clear all blood effects and intervals
  function clearBloodEffects() {
    // Clear intervals
    bloodIntervals.forEach(interval => clearInterval(interval));
    bloodIntervals = [];
    
    // Remove all blood elements
    while (dynamicEffect.firstChild) {
      dynamicEffect.removeChild(dynamicEffect.firstChild);
    }
  }
  
  // Disable right-click context menu
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });
  
  // Disable keyboard shortcuts for copy/paste etc.
  document.addEventListener('keydown', function(e) {
    // Disable Ctrl+A, Ctrl+C, Ctrl+X, Ctrl+V
    if (e.ctrlKey && (e.keyCode === 65 || e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 88)) {
      e.preventDefault();
    }
    // Disable F12 (Developer Tools)
    if (e.keyCode === 123) {
      e.preventDefault();
    }
  });
});