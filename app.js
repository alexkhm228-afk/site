const goalFocusWeights = {
  mobility: { mobility: 8, flexibility: 4, posture: 3, core: 1 },
  strength: { legs: 6, push: 6, pull: 6, core: 4, hinge: 5, posture: 1 },
  posture: { posture: 8, pull: 6, core: 5, mobility: 4, flexibility: 2 },
  flexibility: { flexibility: 9, mobility: 7, posture: 2, recovery: 2 },
  endurance: { cardio: 10, legs: 4, fullbody: 5, core: 2 },
  fullbody: { legs: 5, push: 5, pull: 5, core: 5, cardio: 4, hinge: 4, mobility: 2 }
};

const mainPatterns = {
  mobility: ["mobility","posture","mobility","core","flexibility","mobility","posture","mobility","core"],
  strength: ["legs","push","pull","core","hinge","legs","push","pull","core"],
  posture: ["posture","pull","core","mobility","posture","core","pull","mobility","posture"],
  flexibility: ["mobility","flexibility","mobility","flexibility","posture","mobility","flexibility","core","mobility"],
  endurance: ["cardio","legs","cardio","fullbody","core","cardio","legs","cardio","fullbody"],
  fullbody: ["legs","push","pull","core","cardio","hinge","legs","push","pull"]
};

const warmPatterns = {
  mobility: ["mobility","posture","mobility"], strength: ["mobility","cardio","mobility"],
  posture: ["posture","mobility","posture"], flexibility: ["mobility","flexibility","mobility"],
  endurance: ["cardio","mobility","cardio"], fullbody: ["cardio","mobility","cardio"]
};

const coolPatterns = {
  mobility: ["flexibility","mobility","recovery","flexibility"], strength: ["flexibility","recovery","mobility","flexibility"],
  posture: ["posture","flexibility","recovery","mobility"], flexibility: ["flexibility","mobility","flexibility","recovery"],
  endurance: ["recovery","flexibility","mobility","recovery"], fullbody: ["flexibility","recovery","mobility","flexibility"]
};

let lastSelection = null;
let lastWorkoutIds = new Set();
let variantSeed = 0;

function profileFor(ex) {
  const raw = profileData[ex.id] || [1, "fullbody"];
  return { difficulty: raw[0], focus: raw[1].split(",") };
}

function getSelection() {
  const form = new FormData(document.getElementById("workoutForm"));
  return {
    place: form.get("place"),
    level: form.get("level"),
    goal: form.get("goal"),
    duration: Number(form.get("duration"))
  };
}

function hash01(value) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 4294967295;
}

function phasePlan(sel) {
  const plans = {
    10: { warm: 1, main: 3, cool: 1 },
    20: { warm: 2, main: 5, cool: 1 },
    30: { warm: 2, main: 7, cool: 2 },
    45: { warm: 3, main: 9, cool: 2 }
  };
  const plan = { ...plans[sel.duration] };

  if (sel.goal === "flexibility") {
    plan.main = Math.max(2, plan.main - 1);
    plan.cool += 1;
  } else if (sel.goal === "mobility" && sel.duration >= 20) {
    plan.main = Math.max(3, plan.main - 1);
    plan.cool += 1;
  } else if (sel.goal === "endurance" && sel.duration >= 30) {
    plan.main += 1;
    plan.cool = Math.max(1, plan.cool - 1);
  }
  return plan;
}

function roundsFor(sel) {
  const base = { 10: 1, 20: 2, 30: 2, 45: 3 }[sel.duration];
  if (sel.level === "advanced" && sel.duration >= 30 && (sel.goal === "strength" || sel.goal === "endurance")) {
    return Math.min(3, base + 1);
  }
  return base;
}

function restFor(sel) {
  if (sel.goal === "endurance") return sel.level === "beginner" ? "30–45 сек" : "20–30 сек";
  if (sel.goal === "strength") return sel.level === "advanced" ? "45–75 сек" : "45–60 сек";
  return sel.level === "beginner" ? "30–45 сек" : "20–40 сек";
}

function availableExercises(sel, type) {
  const rank = levelRank[sel.level];
  return exercises.filter(ex => {
    const p = profileFor(ex);
    return ex.type === type && ex.places.includes(sel.place) && p.difficulty <= rank;
  });
}

function scoreExercise(ex, sel, targetFocus, seed, avoidIds, focusCounts) {
  const p = profileFor(ex);
  const rank = levelRank[sel.level];
  let score = 0;

  score += ex.goals.includes(sel.goal) ? 18 : -5;
  if (p.focus.includes(targetFocus)) score += 16;

  const weights = goalFocusWeights[sel.goal] || {};
  p.focus.forEach(f => { score += (weights[f] || 0) * 0.9; });

  // Место занятия должно реально менять подбор: специфичные упражнения получают приоритет.
  score += ex.places.length === 1 ? 9 : ex.places.length === 2 ? 5 : 1;

  // Уровень тоже влияет: на среднем/продвинутом приоритет у более сложных вариантов.
  if (p.difficulty === rank) score += 10;
  else score -= (rank - p.difficulty) * 2.5;

  if (avoidIds.has(ex.id)) score -= 12;
  const overuse = Math.max(...p.focus.map(f => focusCounts[f] || 0), 0);
  score -= overuse * 3.5;

  score += hash01(`${ex.id}|${sel.place}|${sel.level}|${sel.goal}|${sel.duration}|${seed}|${targetFocus}`) * 11;
  return score;
}

function choosePhase(pool, pattern, count, sel, seed, avoidIds) {
  const chosen = [];
  const used = new Set();
  const focusCounts = {};

  for (let i = 0; i < count; i++) {
    const target = pattern[i % pattern.length];
    let candidates = pool.filter(ex => !used.has(ex.id));
    if (!candidates.length) break;

    candidates = candidates
      .map(ex => ({ ex, score: scoreExercise(ex, sel, target, seed + i * 17, avoidIds, focusCounts) }))
      .sort((a, b) => b.score - a.score);

    const pick = candidates[0].ex;
    chosen.push(pick);
    used.add(pick.id);
    profileFor(pick).focus.forEach(f => { focusCounts[f] = (focusCounts[f] || 0) + 1; });
  }

  return chosen;
}

function buildWorkout(sel, seed = 0, avoidIds = new Set()) {
  const plan = phasePlan(sel);
  const warm = choosePhase(availableExercises(sel, "warmup"), warmPatterns[sel.goal], plan.warm, sel, seed + 101, avoidIds);
  const main = choosePhase(availableExercises(sel, "main"), mainPatterns[sel.goal], plan.main, sel, seed + 211, avoidIds);
  const cool = choosePhase(availableExercises(sel, "cooldown"), coolPatterns[sel.goal], plan.cool, sel, seed + 307, avoidIds);

  return {
    items: [...warm, ...main, ...cool],
    rounds: roundsFor(sel),
    rest: restFor(sel),
    plan
  };
}

function renderWorkout(sel, seed = 0, avoidIds = new Set()) {
  const result = document.getElementById("result");
  const list = document.getElementById("workoutList");
  const title = document.getElementById("resultTitle");
  const meta = document.getElementById("resultMeta");
  const workout = buildWorkout(sel, seed, avoidIds);

  title.textContent = `${labels.place[sel.place]} · ${labels.goal[sel.goal]}`;
  meta.textContent = `${labels.level[sel.level]} · ${sel.duration} минут · основная часть ${workout.rounds} ${workout.rounds === 1 ? "круг" : "круга"} · отдых ${workout.rest}`;

  list.innerHTML = workout.items.map((ex, index) => {
    const phase = labels.type[ex.type];
    const difficulty = levelNamesShort[profileFor(ex).difficulty];
    return `
      <button class="workout-item" type="button" data-exercise-id="${ex.id}" aria-label="Открыть инструкцию: ${ex.name}">
        <div class="workout-number">${String(index + 1).padStart(2,"0")}</div>
        <div>
          <strong>${ex.name}</strong>
          <small>${phase} · ${difficulty} · ${ex.desc}</small>
          <span class="instruction-link">Инструкция →</span>
        </div>
        <div class="workout-dose">${ex.dose}</div>
      </button>`;
  }).join("");

  lastWorkoutIds = new Set(workout.items.map(ex => ex.id));
  result.classList.remove("hidden");
  result.scrollIntoView({ behavior:"smooth", block:"start" });
}

function renderCatalog() {
  const place = document.getElementById("catalogPlace").value;
  const type = document.getElementById("catalogType").value;
  const grid = document.getElementById("catalogGrid");

  const filtered = exercises.filter(ex =>
    (place === "all" || ex.places.includes(place)) &&
    (type === "all" || ex.type === type)
  );

  grid.innerHTML = filtered.map(ex => `
    <button class="exercise-card" type="button" data-exercise-id="${ex.id}" aria-label="Открыть инструкцию: ${ex.name}">
      <div class="exercise-card-top">
        <div>
          <h3>${ex.name}</h3>
          <div class="tags">
            <span class="tag">${labels.type[ex.type]}</span>
            ${ex.places.map(p => `<span class="tag">${labels.place[p]}</span>`).join("")}
          </div>
        </div>
        <span class="level-dot" aria-hidden="true"></span>
      </div>
      <p>${ex.desc}</p>
      <div class="tags">
        <span class="tag">${ex.dose}</span>
        <span class="tag">${levelNamesShort[profileFor(ex).difficulty]}</span>
        ${ex.goals.slice(0,2).map(g => `<span class="tag">${labels.goal[g]}</span>`).join("")}
      </div>
      <span class="card-action">Открыть инструкцию →</span>
    </button>`).join("");
}

function ensureExerciseModal() {
  if (document.getElementById("exerciseModal")) return;
  const modal = document.createElement("div");
  modal.id = "exerciseModal";
  modal.className = "exercise-modal hidden";
  modal.innerHTML = `
    <div class="exercise-modal-backdrop" data-close-modal></div>
    <section class="exercise-dialog" role="dialog" aria-modal="true" aria-labelledby="exerciseModalTitle">
      <button class="modal-close" type="button" data-close-modal aria-label="Закрыть инструкцию">×</button>
      <div id="exerciseModalContent"></div>
    </section>`;
  document.body.appendChild(modal);

  modal.addEventListener("click", e => {
    if (e.target.closest("[data-close-modal]")) closeExerciseModal();
  });
}

function openExerciseModal(id) {
  const ex = exercises.find(item => item.id === id);
  if (!ex) return;
  ensureExerciseModal();
  const modal = document.getElementById("exerciseModal");
  const content = document.getElementById("exerciseModalContent");
  const guide = exerciseGuides[id] || g(`${ex.desc}|Выполняй движение медленно и под контролем.|Остановись, если появляется боль.`, "Сохраняй свободное дыхание.", "Не увеличивай амплитуду ценой техники.");
  const p = profileFor(ex);

  content.innerHTML = `
    <p class="eyebrow">Инструкция к упражнению</p>
    <h2 id="exerciseModalTitle">${ex.name}</h2>
    <div class="modal-tags tags">
      <span class="tag">${labels.type[ex.type]}</span>
      <span class="tag">${levelNamesShort[p.difficulty]}</span>
      <span class="tag">${ex.dose}</span>
      ${ex.places.map(place => `<span class="tag">${labels.place[place]}</span>`).join("")}
    </div>
    <p class="modal-intro">${ex.desc}</p>
    <div class="instruction-grid">
      <div class="instruction-main">
        <h3>Как выполнять</h3>
        <ol class="steps-list">
          ${guide.steps.map(step => `<li>${step}</li>`).join("")}
        </ol>
      </div>
      <aside class="instruction-side">
        <div class="instruction-note good">
          <strong>Ориентир по технике</strong>
          <p>${guide.tip}</p>
        </div>
        <div class="instruction-note warning">
          <strong>Частая ошибка</strong>
          <p>${guide.mistake}</p>
        </div>
      </aside>
    </div>
    <div class="modal-safety"><strong>Безопасность:</strong> движение не должно вызывать острую боль, выраженное головокружение или необычную одышку. При таких симптомах прекрати упражнение.</div>`;

  modal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}

function closeExerciseModal() {
  const modal = document.getElementById("exerciseModal");
  if (!modal) return;
  modal.classList.add("hidden");
  document.body.classList.remove("modal-open");
}

document.getElementById("workoutForm").addEventListener("submit", (e) => {
  e.preventDefault();
  lastSelection = getSelection();
  variantSeed = 0;
  lastWorkoutIds = new Set();
  renderWorkout(lastSelection, variantSeed, lastWorkoutIds);
});

document.getElementById("shuffleButton").addEventListener("click", () => {
  if (!lastSelection) lastSelection = getSelection();
  variantSeed += 1;
  const previousIds = new Set(lastWorkoutIds);
  renderWorkout(lastSelection, variantSeed, previousIds);
});

document.getElementById("catalogPlace").addEventListener("change", renderCatalog);
document.getElementById("catalogType").addEventListener("change", renderCatalog);

document.addEventListener("click", e => {
  const target = e.target.closest("[data-exercise-id]");
  if (target) openExerciseModal(target.dataset.exerciseId);
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeExerciseModal();
});

renderCatalog();
