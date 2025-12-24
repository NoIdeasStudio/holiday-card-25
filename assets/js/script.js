/* ================================
   GLOBAL STATE
================================ */
let introDone = false;
let startEnabled = false;
let step = 0;
let level = 1;
let flashing = false; // prevent repeated flashes

/* ================================
   KEY REFERENCES
================================ */
const KO = {};
const TO = {};
const KON = {};

for (let i = 1; i <= 26; i++) {
  KO[`KO_${i}`]   = document.querySelector(`.KO-${i}`);
  KO[`KO_${i}_2`] = document.querySelector(`.KO-${i}-2`);
  KO[`KO_${i}_3`] = document.querySelector(`.KO-${i}-3`);

  TO[`TO_${i}`]   = document.querySelector(`.TO-${i}`);
  TO[`TO_${i}_2`] = document.querySelector(`.TO-${i}-2`);
  TO[`TO_${i}_3`] = document.querySelector(`.TO-${i}-3`);

  KON[`KON_${i}`]   = document.querySelector(`.KO-N-${i}`);
  KON[`KON_${i}_2`] = document.querySelector(`.KO-N-${i}-2`);
  KON[`KON_${i}_3`] = document.querySelector(`.KO-N-${i}-3`);
}

/* ================================
   HELPERS
================================ */
function resetNumbers(suffix = '') {
  for (let i = 1; i <= 26; i++) {
    const ko = KO[`KO_${i}${suffix}`];
    const kon = KON[`KON_${i}${suffix}`];

    if (ko) {
      ko.style.color = '#B5B5B5';
      ko.querySelectorAll('em').forEach(em => em.style.color = '#B5B5B5');
    }

    if (kon) {
      kon.style.opacity = '1';
      kon.style.color = '#B5B5B5';
      kon.querySelectorAll('em').forEach(em => em.style.color = '#B5B5B5');
    }
  }
}

function highlightNext(koKey, konKey) {
  if (KO[koKey]) {
    KO[koKey].style.color = '#3C2570';
    KO[koKey].querySelectorAll('em').forEach(em => em.style.color = '#B5B5B5');
  }
  if (KON[konKey]) {
    KON[konKey].style.color = '#3C2570';
    KON[konKey].querySelectorAll('em').forEach(em => em.style.color = '#3C2570');
  }
}

function resetLetters(suffix = '') {
  for (let i = 1; i <= 26; i++) {
    const ko = KO[`KO_${i}${suffix}`];
    if (!ko) continue;

    ko.classList.add('hidden-letter');
    ko.style.color = '#B5B5B5';

    ko.querySelectorAll('.selected').forEach(el =>
      el.classList.remove('selected')
    );
  }
}

/* ================================
   INTRO / HOVER ANIMATION
================================ */
const keyContainers = document.querySelectorAll('.key--letter-number');

keyContainers.forEach(container => {
  const letters = container.querySelectorAll('.key--letter');

  function animate() {
    letters.forEach((letter, i) => {
      letter.style.animationDelay = `${i * 0.12}s`;
      letter.classList.add(i === letters.length - 1 ? 'hold' : 'fade');
      letter.addEventListener(
        'animationend',
        () => letter.classList.remove('fade', 'hold'),
        { once: true }
      );
    });
    introDone = true;
    startEnabled = true;
  }

  animate();

  container.addEventListener('mouseover', () => {
    if (!introDone) return;
    animate();
  });
});

/* ================================
   START BUTTON
================================ */
document.getElementById('start')?.addEventListener('click', () => {
  if (!startEnabled) return;

  step = 1;
  level = 1;

  document.querySelector('.level')?.classList.remove('hidden');

  resetLetters();
  resetNumbers();
  for (let i = 1; i <= 26; i++) {
    if (TO[`TO_${i}`]) TO[`TO_${i}`].style.opacity = '0';
  }

  // Highlight first KON number immediately
  highlightNext(null, `KON_1`);
});

/* ================================
   SEQUENCES
================================ */
const keySequence1 = [
  { key: 'b', selected: 'U' }, { key: 'l', selected: 'L' },
  { key: 'o', selected: 'U' }, { key: 'w', selected: 'L' },
  { key: 'z', selected: 'U' }, { key: 'y', selected: 'L' },
  { key: 'n', selected: 'U' }, { key: 'i', selected: 'L' },
  { key: 'g', selected: 'U' }, { key: 'h', selected: 'L' },
  { key: 't', selected: 'U' }, { key: 'f', selected: 'L' },
  { key: 'r', selected: 'U' }, { key: 'u', selected: 'L' },
  { key: 'm', selected: 'U' }, { key: 'p', selected: 'L' },
  { key: 's', selected: 'U' }, { key: 'v', selected: 'L' },
  { key: 'e', selected: 'U' }, { key: 'x', selected: 'L' },
  { key: 'd', selected: 'U' }, { key: 'j', selected: 'L' },
  { key: 'a', selected: 'U' }, { key: 'c', selected: 'L' },
  { key: 'k', selected: 'U' }, { key: 'q', selected: 'L' }
];

const keySequence2 = [
  { key: 'c', selected: 'U' }, { key: 'w', selected: 'L' },
  { key: 'm', selected: 'U' }, { key: 'f', selected: 'L' },
  { key: 'j', selected: 'U' }, { key: 'o', selected: 'L' },
  { key: 'r', selected: 'U' }, { key: 'd', selected: 'L' },
  { key: 'b', selected: 'U' }, { key: 'a', selected: 'L' },
  { key: 'n', selected: 'U' }, { key: 'k', selected: 'L' },
  { key: 'g', selected: 'U' }, { key: 'l', selected: 'L' },
  { key: 'y', selected: 'U' }, { key: 'p', selected: 'L' },
  { key: 'h', selected: 'U' }, { key: 's', selected: 'L' },
  { key: 'v', selected: 'U' }, { key: 'e', selected: 'L' },
  { key: 'x', selected: 'U' }, { key: 't', selected: 'L' },
  { key: 'q', selected: 'U' }, { key: 'u', selected: 'L' },
  { key: 'i', selected: 'U' }, { key: 'z', selected: 'L' }
];

const keySequence3 = [
  { key: 'm', selected: 'U' }, { key: 'r', selected: 'L' },
  { key: 'j', selected: 'U' }, { key: 'o', selected: 'L' },
  { key: 'c', selected: 'U' }, { key: 'k', selected: 'L' },
  { key: 't', selected: 'U' }, { key: 'v', selected: 'L' },
  { key: 'q', selected: 'U' }, { key: 'u', selected: 'L' },
  { key: 'i', selected: 'U' }, { key: 'z', selected: 'L' },
  { key: 'p', selected: 'U' }, { key: 'h', selected: 'L' },
  { key: 'd', selected: 'U' }, { key: 'b', selected: 'L' },
  { key: 'a', selected: 'U' }, { key: 'g', selected: 'L' },
  { key: 's', selected: 'U' }, { key: 'f', selected: 'L' },
  { key: 'e', selected: 'U' }, { key: 'w', selected: 'L' },
  { key: 'l', selected: 'U' }, { key: 'y', selected: 'L' },
  { key: 'n', selected: 'U' }, { key: 'x', selected: 'L' }
];

const sequences = {
  1: { keys: keySequence1, suffix: '' },
  2: { keys: keySequence2, suffix: '_2' },
  3: { keys: keySequence3, suffix: '_3' }
};

/* ================================
   INPUT
================================ */
document.addEventListener('keydown', e => {
  const seq = sequences[level];
  if (!seq) return;

  const stepData = seq.keys[step - 1];
  if (!stepData) {
    advanceLevel();
    return;
  }

  if (e.key.toLowerCase() === stepData.key) {
    const suffix = seq.suffix;
    const koKey = `KO_${step}${suffix}`;
    const konKey = `KON_${step}${suffix}`;
    const toKey = `TO_${step}${suffix}`;

    // Show TO letter
    if (e.key.toLowerCase() === stepData.key) {
      const suffix = seq.suffix;
      const koKey = `KO_${step}${suffix}`;
      const konKey = `KON_${step}${suffix}`;
      const toKey = `TO_${step}${suffix}`;
    
      // Show TO letter
      if (TO[toKey]) TO[toKey].style.opacity = '1';
    
      // Handle KO element
      const koEl = KO[koKey];
      if (koEl) {
        koEl.classList.remove('hidden-letter');
    
        // Remove previous selected class from both U and L
        koEl.querySelectorAll('.U, .L').forEach(el => el.classList.remove('selected'));
    
        const selectedEl = koEl.querySelector(`.${stepData.selected}`);
        const otherEl = koEl.querySelector(`.${stepData.selected === 'U' ? 'L' : 'U'}`);
    
        if (selectedEl) selectedEl.classList.add('selected');
        if (otherEl) otherEl.style.color = '#B5B5B5';
      }
    
      // Highlight the KON number
      if (KON[konKey]) KON[konKey].style.color = '#3C2570';
    
      step++;
    
      // Highlight next KON number (pre-keypress)
      if (step <= 26) {
        highlightNext(null, `KON_${step}${suffix}`);
      } else {
        advanceLevel();
      }
    }
    
  } else {
    flashLightbox();
  }
});

/* ================================
   LEVEL ADVANCE
================================ */
function advanceLevel() {
  const levelText = document.getElementById('level-text');
  const levelNumber = document.getElementById('level-number');

  levelText.style.color = '#1E4BE0';
  levelNumber.style.color = '#3C2570';

  setTimeout(() => {
    level++;
    step = 1;

    if (level > 3) {
      endGame();
      return;
    }

    levelText.style.color = '#B5B5B5';
    levelNumber.style.color = '#B5B5B5';
    levelNumber.textContent = level;

    document.getElementById(`pangram-${level}`)?.style.setProperty('display','block');

    const suffix = sequences[level]?.suffix || '';
    resetLetters(suffix);
    resetNumbers(suffix);

    // Reset TO letters
    for (let i = 1; i <= 26; i++) {
      if (TO[`TO_${i}${suffix}`]) TO[`TO_${i}${suffix}`].style.opacity = '0';
    }

    // Highlight first KON number immediately
    highlightNext(null, `KON_1${suffix}`);
  }, 1000);
}

/* ================================
   END GAME
================================ */
function endGame() {
  const fadeOutEls = [
    document.getElementById('key'),
    document.getElementById('pangrams'),
    document.querySelector('#descriptive-text'),
    document.querySelector('.level')
  ];

  fadeOutEls.forEach(el => {
    if (!el) return;
    el.style.display = 'none';
  });

  const endEl = document.getElementById('end');
  if (endEl) {
    endEl.style.display = 'block';
    endEl.style.opacity = '0';
    endEl.style.transition = 'opacity 1s ease';
    requestAnimationFrame(() => endEl.style.opacity = '1');
  }
}

/* ================================
   WRONG KEY LIGHTBOX + SHAKE
================================ */
const flashBox = document.createElement('div');
flashBox.style.position = 'fixed';
flashBox.style.top = '0';
flashBox.style.left = '0';
flashBox.style.width = '100vw';
flashBox.style.height = '100vh';
flashBox.style.backgroundColor = '#1E4BE0';
flashBox.style.opacity = '0';
flashBox.style.pointerEvents = 'none';
flashBox.style.zIndex = '9999';
flashBox.style.transition = 'opacity 0.25s ease-in-out, transform 0.25s ease-in-out';
flashBox.style.margin = '0';
flashBox.style.padding = '0';
flashBox.style.boxSizing = 'border-box';
document.body.style.overflowX = 'hidden';
document.body.appendChild(flashBox);

function flashLightbox() {
  if (flashing) return;
  flashing = true;

  flashBox.style.opacity = '0.5';
  flashBox.style.transform = 'translateX(2px)';

  setTimeout(() => {
    flashBox.style.opacity = '0';
    flashBox.style.transform = 'translateX(0)';
    flashing = false;
  }, 250);
}

/* ================================
   RESET GAME
================================ */
document.getElementById('reset')?.addEventListener('click', () => {
  step = 1;
  level = 1;
  introDone = false;
  startEnabled = true;

  document.querySelectorAll('[id^="pangram-"]').forEach(p => {
    p.style.display = p.id === 'pangram-1' ? 'block' : 'none';
  });

  ['','_2','_3'].forEach(suffix => {
    resetLetters(suffix);
    resetNumbers(suffix);
    for (let i = 1; i <= 26; i++) {
      if (TO[`TO_${i}${suffix}`]) TO[`TO_${i}${suffix}`].style.opacity = '0';
    }
  });

  highlightNext(null, 'KON_1');
  flashBox.style.opacity = '0';

  // Reset main UI display
  ['key','pangrams'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'block';
  });
  const desc = document.querySelector('#descriptive-text');
  if (desc) desc.style.display = 'block';
  const lvl = document.querySelector('.level');
  if (lvl) lvl.style.display = 'block';

  // Hide end screen
  const endEl = document.getElementById('end');
  if (endEl) endEl.style.display = 'none';
});
