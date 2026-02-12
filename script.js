document.addEventListener('DOMContentLoaded', () => {
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const landing = document.getElementById('landing');
  const invitation = document.getElementById('invitation');
  const bgMusic = document.getElementById('bgMusic');

  let yesScale = 1; // 🔹 track Yes button size

  function moveNoButton() {
    const btnRect = noBtn.getBoundingClientRect();
    const viewportW = window.innerWidth;
    const viewportH = window.innerHeight;

    const margin = 60;
    const maxX = Math.max(60, viewportW - btnRect.width - margin);
    const maxY = Math.max(120, viewportH - btnRect.height - margin);

    const targetX = Math.floor(Math.random() * (maxX - margin)) + margin;
    const targetY = Math.floor(Math.random() * (maxY - margin)) + margin;

    noBtn.style.position = 'absolute';
    noBtn.style.left = targetX + 'px';
    noBtn.style.top = targetY + 'px';
  }

  // 🔹 Smooth transition once
  yesBtn.style.transition = 'transform 0.3s ease';

  function enlargeYes() {
    yesScale += 0.2; // 🔥 increase size every "No" click
    yesBtn.style.transform = `scale(${yesScale})`;
  }

  // YES button
  yesBtn.addEventListener('click', () => {
    landing.classList.remove('active');
    invitation.classList.add('active');

    if (bgMusic && bgMusic.paused) {
      bgMusic.play().catch(() => {});
    }
  });

  // NO button
  noBtn.addEventListener('click', () => {
    enlargeYes();
    moveNoButton();
  });
});
