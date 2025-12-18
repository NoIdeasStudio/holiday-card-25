const keyContainers = document.querySelectorAll('.key--letter-number');

keyContainers.forEach(container => {
  const letters = container.querySelectorAll('.key--letter');

  container.addEventListener('mouseover', () => {
    letters.forEach((letter, index) => {
      letter.style.animationDelay = `${index * 0.12}s`;

      if (index === letters.length - 1) {
        letter.classList.add('hold');
      } else {
        letter.classList.add('fade');
      }

      // Reset animation to allow re-hovering
      letter.addEventListener('animationend', () => {
        letter.classList.remove('fade', 'hold');
      }, { once: true });
    });
  });
});
