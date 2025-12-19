const keyContainers = document.querySelectorAll('.key--letter-number');

keyContainers.forEach(container => {
  const letters = container.querySelectorAll('.key--letter');
  let introDone = false;

  function runAnimation() {
    letters.forEach((letter, index) => {
      letter.style.animationDelay = `${index * 0.12}s`;

      if (index === letters.length - 1) {
        letter.classList.add('hold');

        // 🔹 Listen for the last letter's animation end to trigger blink
        letter.addEventListener(
          'animationend',
          () => {
            letter.classList.remove('hold');
            introDone = true;

            // Start blinking #start automatically
            const start = document.getElementById('start');
            if (start) {
              start.classList.add('blink');
            }
          },
          { once: true } // run only once
        );
      } else {
        letter.classList.add('fade');

        letter.addEventListener(
          'animationend',
          () => {
            letter.classList.remove('fade');
          },
          { once: true }
        );
      }
    });
  }

  // 🔹 Run once on page load
  runAnimation();

  // 🔹 Run on hover (same behavior)
  container.addEventListener('mouseover', () => {
    if (!introDone) return;
    runAnimation();
  });
});

