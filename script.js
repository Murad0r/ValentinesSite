// script.js

document.addEventListener('DOMContentLoaded', () => {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const landing = document.getElementById('landing');
  const invitation = document.getElementById('invitation');
  const bgMusic = document.getElementById('bgMusic');
  let moved = false;

  // Helper to move the No button to a random off-center spot
  function moveNoButton() {
    const btnRect = noBtn.getBoundingClientRect();
    const container = document.body;

    // Compute a random position within the viewport bounds, avoiding overlap with Yes button
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    // Define safe margins
    const margin = 60;
    const maxX = Math.max(60, viewportW - btnRect.width - margin);
    const maxY = Math.max(120, viewportH - btnRect.height - margin);

    // Random target
    const targetX = Math.floor(Math.random() * (maxX - margin)) + margin;
    const targetY = Math.floor(Math.random() * (maxY - margin)) + margin;

    // Apply transform to move No button
    noBtn.style.position = 'absolute';
    noBtn.style.left = targetX + 'px';
    noBtn.style.top = targetY + 'px';
  }

  // Increase Yes button size slightly
  function enlargeYes() {
    yesBtn.style.transform = 'scale(1.25)';
  }

  // Reset Yes button if needed
  function resetYes() {
    yesBtn.style.transform = 'scale(1)';
  }

  // Yes button click: go to invitation screen and play music
  yesBtn.addEventListener('click', () => {
    // Transition
    landing.classList.remove('active');
    invitation.classList.add('active');
    // Start music (user interaction already happened)
    if (bgMusic && bgMusic.paused) {
      const playPromise = bgMusic.play();
      // In case of browser restrictions, catch and ignore
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay blocked; instruct user to click a Play button if desired
          // For simplicity, we won't show UI here; music will start when possible
        });
      }
    }
  });

  // No button click: trigger playful motion
  noBtn.addEventListener('click', () => {
    if (!moved) {
      enlargeYes();
      moveNoButton();
      moved = true;
      // Optional: after some time, move again if user keeps clicking
      // setTimeout(moveNoButton, 1500);
    } else {
      // If clicked again, still move and enlarge
      moveNoButton();
      enlargeYes();
    }
  });

  // Optional: click on Yes or No anywhere else to reset (kept simple here)
  // Ensure Yes button initial scale is 1
  yesBtn.style.transform = 'scale(1)';

  // Ensure the page is ready: reveal landing screen
  // (The CSS already shows the landing screen by default)
});
