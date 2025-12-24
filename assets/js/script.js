// Global
let introDone = false;
let startEnabled = false;
let step = 0;
let level = 1;
let flashing = false;

// KEY CONSTANTS
const KO = {};
const KOS = {};
const TO = {};
const KON = {};

for (let i = 1; i <= 26; i++) {
  // Key Order
  KO[`KO_${i}`]   = document.querySelector(`.KO-${i}`);
  KO[`KO_${i}_2`] = document.querySelector(`.KO-${i}-2`);
  KO[`KO_${i}_3`] = document.querySelector(`.KO-${i}-3`);
  // Key Order Selected
  KOS[`KOS_${i}`]   = document.querySelector(`.KOS-${i}`);
  KOS[`KOS_${i}_2`] = document.querySelector(`.KOS-${i}-2`);
  KOS[`KOS_${i}_3`] = document.querySelector(`.KOS-${i}-3`);

  // Type Order
  TO[`TO_${i}`]   = document.querySelector(`.TO-${i}`);
  TO[`TO_${i}_2`] = document.querySelector(`.TO-${i}-2`);
  TO[`TO_${i}_3`] = document.querySelector(`.TO-${i}-3`);

  // Key Order Number
  KON[`KON_${i}`]   = document.querySelector(`.KO-N-${i}`);
  KON[`KON_${i}_2`] = document.querySelector(`.KO-N-${i}-2`);
  KON[`KON_${i}_3`] = document.querySelector(`.KO-N-${i}-3`);
}

// SELECTORS
function resetNumbers(suffix = '') {
  for (let i = 1; i <= 26; i++) {
    const ko = KO[`KO_${i}${suffix}`];
    const kon = KON[`KON_${i}${suffix}`];

    if (ko) ko.style.color = '#B5B5B5';
    if (kon) {
      kon.style.opacity = '1';
      kon.style.color = '#B5B5B5';
      kon.querySelectorAll('em').forEach(em => em.style.color = '#B5B5B5');
    }
  }
}

function resetKOSLevel(suffix = '') {
  for (let i = 1; i <= 26; i++) {
    const sel = KOS[`KOS_${i}${suffix}`];
    if (sel) sel.classList.remove('selected');
  }
}

function highlightNext(koKey, konKey) {
  if (KO[koKey]) KO[koKey].style.color = '#3C2570';
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
  }
}

// INTRO HOVER ANIMATION
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

// START BUTTON
document.getElementById('start')?.addEventListener('click', () => {
  if (!startEnabled) return;

  step = 1;
  level = 1;

  document.querySelector('.level')?.classList.remove('hidden');
  ['', '_2', '_3'].forEach(suffix => resetKOSLevel(suffix));
  resetLetters();
  resetNumbers();
  for (let i = 1; i <= 26; i++) {
    if (TO[`TO_${i}`]) TO[`TO_${i}`].style.opacity = '0';
  }

  highlightNext(null, `KON_1`);
  const desc = document.querySelector('#descriptive-text .directions');
  if (desc) desc.innerHTML = "Look at the number above and type the corresponding letter.";
  const resetBtn = document.getElementById('reset');
  if (resetBtn) resetBtn.style.opacity = '1';
  

});


// KEY SEQUENCES
const keySequence1 = [
  { key: 'b' }, { key: 'l' }, { key: 'o' }, { key: 'w' },
  { key: 'z' }, { key: 'y' }, { key: 'n' }, { key: 'i' },
  { key: 'g' }, { key: 'h' }, { key: 't' }, { key: 'f' },
  { key: 'r' }, { key: 'u' }, { key: 'm' }, { key: 'p' },
  { key: 's' }, { key: 'v' }, { key: 'e' }, { key: 'x' },
  { key: 'd' }, { key: 'j' }, { key: 'a' }, { key: 'c' },
  { key: 'k' }, { key: 'q' }
];

const keySequence2 = [
  { key: 'c' }, { key: 'w' }, { key: 'm' }, { key: 'f' },
  { key: 'j' }, { key: 'o' }, { key: 'r' }, { key: 'd' },
  { key: 'b' }, { key: 'a' }, { key: 'n' }, { key: 'k' },
  { key: 'g' }, { key: 'l' }, { key: 'y' }, { key: 'p' },
  { key: 'h' }, { key: 's' }, { key: 'v' }, { key: 'e' },
  { key: 'x' }, { key: 't' }, { key: 'q' }, { key: 'u' },
  { key: 'i' }, { key: 'z' }
];

const keySequence3 = [
  { key: 'm' }, { key: 'r' }, { key: 'j' }, { key: 'o' },
  { key: 'c' }, { key: 'k' }, { key: 't' }, { key: 'v' },
  { key: 'q' }, { key: 'u' }, { key: 'i' }, { key: 'z' },
  { key: 'p' }, { key: 'h' }, { key: 'd' }, { key: 'b' },
  { key: 'a' }, { key: 'g' }, { key: 's' }, { key: 'f' },
  { key: 'e' }, { key: 'w' }, { key: 'l' }, { key: 'y' },
  { key: 'n' }, { key: 'x' }
];

const sequences = {
  1: { keys: keySequence1, suffix: '' },
  2: { keys: keySequence2, suffix: '_2' },
  3: { keys: keySequence3, suffix: '_3' }
};

// KEYDOWN FUNTIONS
document.addEventListener('keydown', e => {
  if (!startEnabled) return;

  const seq = sequences[level];
  if (!seq) return;

  const stepData = seq.keys[step - 1];

  if (!stepData) return;

  if (e.key.toLowerCase() === stepData.key) {
    const suffix = seq.suffix;
    const koKey = `KO_${step}${suffix}`;
    const konKey = `KON_${step}${suffix}`;
    const toKey = `TO_${step}${suffix}`;
    const kosKey = `KOS_${step}${suffix}`;

    if (TO[toKey]) TO[toKey].style.opacity = '1';
    if (KO[koKey]) KO[koKey].classList.remove('hidden-letter');
    if (KOS[kosKey]) KOS[kosKey].classList.add('selected');
    if (KON[konKey]) KON[konKey].style.color = '#3C2570';

    step++;

    if (step <= 26) highlightNext(null, `KON_${step}${suffix}`);
    else advanceLevel(); 
  } else {
    flashLightbox();
  }
});


// NEXT LEVEL
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

    ['', '_2', '_3'].forEach(suffix => resetKOSLevel(suffix));

    const suffix = sequences[level]?.suffix || '';
    resetLetters(suffix);
    resetNumbers(suffix);

    for (let i = 1; i <= 26; i++) {
      if (TO[`TO_${i}${suffix}`]) TO[`TO_${i}${suffix}`].style.opacity = '0';
    }

    highlightNext(null, `KON_1${suffix}`);
  }, 1000);
}

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


  const homeLink = document.querySelector('a.menu--home[href="./index.html"]');
  if (homeLink) homeLink.innerHTML = "click to start again";
}


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

// RESET GAME

document.getElementById('reset')?.addEventListener('click', () => {
  step = 1;
  level = 1;
  introDone = false;
  startEnabled = true;

  const levelNumber = document.getElementById('level-number');
  if (levelNumber) levelNumber.textContent = level;

  document.querySelectorAll('[id^="pangram-"]').forEach(p => {
    p.style.display = p.id === 'pangram-1' ? 'block' : 'none';
  });

  ['', '_2', '_3'].forEach(suffix => {
    resetLetters(suffix);
    resetNumbers(suffix);
    resetKOSLevel(suffix);
    for (let i = 1; i <= 26; i++) {
      if (TO[`TO_${i}${suffix}`]) TO[`TO_${i}${suffix}`].style.opacity = '0';
    }
  });

  highlightNext(null, 'KON_1');

  flashBox.style.opacity = '0';

  ['key','pangrams'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === 'pangrams') el.style.display = 'flex'; 
      else el.style.display = 'block';
    }
  });

  const desc = document.querySelector('#descriptive-text');
  if (desc) desc.style.display = 'flex';

  const lvl = document.querySelector('.level');
  if (lvl) lvl.style.display = 'block';

  const endEl = document.getElementById('end');
  if (endEl) endEl.style.display = 'none';


  const resetBtn = document.getElementById('reset');
  if (resetBtn) resetBtn.style.opacity = '1';
});


function animateLetters(container) {
  const letters = container.querySelectorAll('.key--letter');
  letters.forEach((letter, i) => {
    letter.style.animationDelay = `${i * 0.12}s`;
    letter.classList.add(i === letters.length - 1 ? 'hold' : 'fade');
    letter.addEventListener(
      'animationend',
      () => letter.classList.remove('fade', 'hold'),
      { once: true }
    );
  });
}

// MOBILE
keyContainers.forEach(container => {
  container.addEventListener('mouseover', () => {
    if (!introDone) return;
    animateLetters(container);
  });
});

keyContainers.forEach(container => {
  container.addEventListener('touchmove', e => {
    e.preventDefault();
    animateLetters(container);
  });
});

// ABOUT
document.querySelector('.menu--about')?.addEventListener('click', () => {
  const aboutEl = document.getElementById('about');
  if (!aboutEl) return;

  if (aboutEl.style.display === 'block') {
    aboutEl.style.display = 'none';
  } else {
    aboutEl.style.display = 'block';
  }
});
