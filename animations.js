(() => {
  'use strict';

  /*
   * Exercise visuals now come from Workout Guide by Bryl Lim.
   * Visual assets: CC BY-SA 4.0.
   * Source: https://github.com/bryllim/workout-guide
   * We intentionally do NOT substitute a merely similar exercise when an
   * exact/equivalent visual is not available.
   */

  const VERSION = '1.0.0';
  const CDN = `https://cdn.jsdelivr.net/npm/@bryllim/workout-guide@${VERSION}/assets`;
  const GALLERY = 'https://bryllim.github.io/workout-guide/exercises';
  const LICENSE = 'https://creativecommons.org/licenses/by-sa/4.0/';
  const PROJECT = 'https://github.com/bryllim/workout-guide';

  // Only exact or genuinely equivalent movements are mapped here.
  // Anything not mapped gets no picture rather than an inaccurate substitute.
  const VISUALS = {
    'arm-circles': { slug: 'arm-circles', label: 'Arm Circles' },
    'cat-cow': { slug: 'cat-cow-stretch', label: 'Cat-Cow Stretch' },
    'jumping-jacks': { slug: 'jumping-jack', label: 'Jumping Jack' },
    'wall-push': { slug: 'wall-push-up', label: 'Wall Push-up' },
    'incline-push': { slug: 'incline-push-up', label: 'Incline Push-up' },
    'glute-bridge': { slug: 'glute-bridge', label: 'Glute Bridge' },
    'bird-dog': { slug: 'bird-dog', label: 'Bird Dog' },
    'dead-bug': { slug: 'dead-bug', label: 'Dead Bug' },
    'plank': { slug: 'plank', label: 'Plank' },
    'wall-sit': { slug: 'wall-sit', label: 'Wall Sit' },
    'goblet-squat': { slug: 'goblet-squat', label: 'Goblet Squat' },
    'db-press': { slug: 'dumbbell-bench-press', label: 'Dumbbell Bench Press' },
    'bar-hang': { slug: 'dead-hang', label: 'Dead Hang' },
    'bench-dip': { slug: 'bench-dip', label: 'Bench Dip' },
    'mountain-climber': { slug: 'mountain-climber', label: 'Mountain Climber' },
    'high-knees': { slug: 'high-knees', label: 'High Knees' },
    'child-pose': { slug: 'childs-pose', label: "Child's Pose" },
    'pushup': { slug: 'push-up', label: 'Push-up' }
  };

  const style = document.createElement('style');
  style.textContent = `
    .wg-visual{
      margin:24px 0;
      padding:20px;
      border:1px solid #dfe6ef;
      border-radius:22px;
      background:linear-gradient(180deg,#f8fbff 0%,#f4f7fb 100%);
    }
    .wg-visual__head{
      display:flex;
      align-items:flex-start;
      justify-content:space-between;
      gap:18px;
      margin-bottom:16px;
    }
    .wg-visual__head h3{margin:0 0 6px;font-size:18px;color:#142033}
    .wg-visual__head p{margin:0;color:#68778d;font-size:13px;line-height:1.55;max-width:700px}
    .wg-visual__badge{
      flex:0 0 auto;
      padding:7px 10px;
      border-radius:999px;
      background:#e9f1ff;
      color:#2f6fed;
      font-size:11px;
      font-weight:800;
      letter-spacing:.03em;
      text-transform:uppercase;
    }
    .wg-frames{
      display:grid;
      grid-template-columns:repeat(3,minmax(0,1fr));
      gap:12px;
    }
    .wg-frame{
      overflow:hidden;
      margin:0;
      border:1px solid #dbe3ee;
      border-radius:18px;
      background:#0f172a;
    }
    .wg-frame__media{
      position:relative;
      display:grid;
      place-items:center;
      min-height:220px;
      padding:14px;
      background:
        radial-gradient(circle at 50% 48%,rgba(59,130,246,.18),transparent 52%),
        #0f172a;
    }
    .wg-frame img{
      display:block;
      width:100%;
      height:230px;
      object-fit:contain;
      object-position:center;
    }
    .wg-frame figcaption{
      padding:10px 12px 12px;
      background:#fff;
      color:#4d5d73;
      font-size:12px;
      font-weight:700;
      text-align:center;
    }
    .wg-visual__note{
      margin:14px 0 0;
      padding:12px 14px;
      border-radius:14px;
      background:#fff;
      color:#58677b;
      font-size:12.5px;
      line-height:1.55;
    }
    .wg-credit{
      display:flex;
      flex-wrap:wrap;
      gap:6px 12px;
      margin-top:13px;
      color:#748196;
      font-size:11px;
      line-height:1.5;
    }
    .wg-credit a{color:#2f6fed;text-decoration:underline;text-underline-offset:2px}
    .wg-no-visual{
      margin:24px 0;
      padding:16px 18px;
      border:1px solid #e4e8ef;
      border-left:4px solid #8b98aa;
      border-radius:16px;
      background:#f8fafc;
      color:#59687b;
      font-size:13px;
      line-height:1.6;
    }
    .wg-no-visual strong{display:block;margin-bottom:4px;color:#243247}
    .wg-load-error{
      display:none;
      color:#c04b4b;
      font-size:12px;
      text-align:center;
      padding:14px;
    }
    .site-visual-credit{margin-top:6px!important;font-size:11px!important;color:#7c899b!important}
    .site-visual-credit a{color:inherit;text-decoration:underline;text-underline-offset:2px}
    @media(max-width:760px){
      .wg-visual{padding:14px}
      .wg-visual__head{display:block}
      .wg-visual__badge{display:inline-block;margin-top:9px}
      .wg-frames{grid-template-columns:1fr}
      .wg-frame img{height:260px}
    }
  `;
  document.head.appendChild(style);

  function frameUrl(slug, index) {
    return `${CDN}/${slug}/frame-${index}.svg`;
  }

  function galleryUrl(slug) {
    return `${GALLERY}/${slug}/`;
  }

  function removeOldVisuals(content) {
    content.querySelectorAll('.tech-visual-v2,.exercise-animation-block,.exercise-visual,.wg-visual,.wg-no-visual').forEach(el => el.remove());
  }

  function createFallback() {
    const block = document.createElement('div');
    block.className = 'wg-no-visual';
    block.innerHTML = `
      <strong>Визуал для этого варианта пока не подключён</strong>
      Чтобы не показывать неточную позу или другое упражнение под тем же названием, здесь оставлена только текстовая инструкция. Визуал появится только после нахождения точного открытого источника.
    `;
    return block;
  }

  function createVisual(exerciseId, entry) {
    const block = document.createElement('section');
    block.className = 'wg-visual';
    block.dataset.exerciseVisual = exerciseId;
    block.innerHTML = `
      <div class="wg-visual__head">
        <div>
          <h3>Готовые иллюстрации техники</h3>
          <p>Три исходных кадра <strong>${entry.label}</strong> из открытой библиотеки Workout Guide. Мы не перерисовываем суставы и не генерируем позу самостоятельно.</p>
        </div>
        <span class="wg-visual__badge">исходные SVG</span>
      </div>
      <div class="wg-frames">
        ${[1,2,3].map(index => `
          <figure class="wg-frame">
            <div class="wg-frame__media">
              <img
                src="${frameUrl(entry.slug,index)}"
                alt="${entry.label}: исходный кадр ${index} из Workout Guide"
                loading="eager"
                decoding="async"
                data-wg-frame="${index}"
              />
              <div class="wg-load-error">Не удалось загрузить этот кадр.</div>
            </div>
            <figcaption>Кадр ${index}</figcaption>
          </figure>
        `).join('')}
      </div>
      <p class="wg-visual__note">
        Кадры показаны как последовательность положений из исходной библиотеки, без нашей дорисовки. Сверяй их с текстом «Как выполнять» ниже: изображение помогает увидеть форму, а текст уточняет технику конкретного варианта на этом сайте.
      </p>
      <div class="wg-credit">
        <span>Иллюстрации: Workout Guide — Bryl Lim / Everkinetic.</span>
        <a href="${galleryUrl(entry.slug)}" target="_blank" rel="noopener noreferrer">страница упражнения</a>
        <a href="${PROJECT}" target="_blank" rel="noopener noreferrer">исходный проект</a>
        <a href="${LICENSE}" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>
      </div>
    `;

    const images = [...block.querySelectorAll('img')];
    let failed = 0;
    images.forEach(img => {
      img.addEventListener('error', () => {
        failed += 1;
        img.style.display = 'none';
        const error = img.parentElement.querySelector('.wg-load-error');
        if (error) error.style.display = 'block';

        // If the external source cannot be loaded at all, do not leave a broken visual block.
        if (failed === images.length) {
          block.replaceWith(createFallback());
        }
      }, { once:true });
    });

    return block;
  }

  function injectVisual(exerciseId) {
    const content = document.getElementById('exerciseModalContent');
    if (!content) return;

    removeOldVisuals(content);
    const intro = content.querySelector('.modal-intro');
    const anchor = intro || content.querySelector('.modal-tags') || content.querySelector('h2');
    if (!anchor) return;

    const entry = VISUALS[exerciseId];
    anchor.insertAdjacentElement('afterend', entry ? createVisual(exerciseId, entry) : createFallback());
  }

  function addGlobalCredit() {
    const footer = document.querySelector('.footer > div');
    if (!footer || footer.querySelector('.site-visual-credit')) return;
    const credit = document.createElement('p');
    credit.className = 'site-visual-credit';
    credit.innerHTML = `Иллюстрации упражнений: <a href="${PROJECT}" target="_blank" rel="noopener noreferrer">Workout Guide</a>, <a href="${LICENSE}" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.`;
    footer.appendChild(credit);
  }

  document.addEventListener('click', event => {
    const trigger = event.target.closest('[data-exercise-id]');
    if (!trigger) return;
    // app.js opens/populates the modal first; run immediately after that handler.
    queueMicrotask(() => injectVisual(trigger.dataset.exerciseId));
  });

  addGlobalCredit();
})();
