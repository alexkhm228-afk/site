const labels = {
  place: { home: "Дома", gym: "В зале", outdoor: "На площадке" },
  level: { beginner: "Новичок", intermediate: "Средний", advanced: "Продвинутый" },
  goal: {
    mobility: "Мобильность", strength: "Сила", posture: "Осанка",
    flexibility: "Гибкость", endurance: "Выносливость", fullbody: "Всё тело"
  },
  type: { warmup: "Разминка", main: "Основная часть", cooldown: "Заминка" }
};

const exercises = [
  {id:"march", name:"Шаг на месте", type:"warmup", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["mobility","endurance","fullbody"], dose:"60 сек", desc:"Спокойный шаг с активной работой рук и ровным дыханием."},
  {id:"joints", name:"Суставная разминка", type:"warmup", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["mobility","flexibility","posture","fullbody"], dose:"2 мин", desc:"Плавные круговые движения плечами, тазом, коленями и голеностопом."},
  {id:"arm-circles", name:"Круги руками", type:"warmup", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["mobility","posture","fullbody"], dose:"40 сек", desc:"Постепенно увеличивай амплитуду, не поднимай плечи к ушам."},
  {id:"cat-cow", name:"Кошка–корова", type:"warmup", places:["home","gym"], levels:["beginner","intermediate","advanced"], goals:["mobility","posture","flexibility"], dose:"8–10 раз", desc:"Плавно чередуй округление и разгибание позвоночника на четвереньках."},
  {id:"hip-openers", name:"Раскрытие тазобедренных", type:"warmup", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["mobility","flexibility","fullbody"], dose:"8/сторону", desc:"Подними колено и мягко отведи его в сторону, удерживая корпус ровно."},
  {id:"jumping-jacks", name:"Лёгкие джампинг-джэки", type:"warmup", places:["home","gym","outdoor"], levels:["intermediate","advanced"], goals:["endurance","fullbody"], dose:"45 сек", desc:"Пружинистые прыжки с разведением ног и рук. Приземляйся мягко."},

  {id:"chair-squat", name:"Приседание к стулу", type:"main", places:["home","gym"], levels:["beginner","intermediate","advanced"], goals:["strength","posture","fullbody"], dose:"10–15 раз", desc:"Отводи таз назад, колени направляй по линии стоп, касайся стула легко."},
  {id:"wall-push", name:"Отжимания от стены", type:"main", places:["home","gym"], levels:["beginner","intermediate","advanced"], goals:["strength","posture","fullbody"], dose:"10–15 раз", desc:"Тело держи прямой линией, локти веди назад под комфортным углом."},
  {id:"incline-push", name:"Отжимания от опоры", type:"main", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["strength","fullbody"], dose:"8–15 раз", desc:"Используй устойчивую опору. Чем она ниже, тем выше нагрузка."},
  {id:"glute-bridge", name:"Ягодичный мост", type:"main", places:["home","gym"], levels:["beginner","intermediate","advanced"], goals:["strength","posture","fullbody"], dose:"12–18 раз", desc:"Поднимай таз за счёт ягодиц, сохраняя нейтральное положение поясницы."},
  {id:"bird-dog", name:"Bird-dog", type:"main", places:["home","gym"], levels:["beginner","intermediate","advanced"], goals:["posture","strength","mobility"], dose:"8/сторону", desc:"Вытягивай противоположные руку и ногу, не разворачивая таз."},
  {id:"dead-bug", name:"Dead bug", type:"main", places:["home","gym"], levels:["beginner","intermediate","advanced"], goals:["posture","strength","fullbody"], dose:"8/сторону", desc:"Сохраняй поясницу стабильно при движении противоположных руки и ноги."},
  {id:"knee-plank", name:"Планка с колен", type:"main", places:["home","gym"], levels:["beginner","intermediate"], goals:["strength","posture","fullbody"], dose:"20–35 сек", desc:"Локти под плечами, корпус от колен до головы держи одной линией."},
  {id:"plank", name:"Планка", type:"main", places:["home","gym","outdoor"], levels:["intermediate","advanced"], goals:["strength","posture","fullbody"], dose:"30–60 сек", desc:"Не провисай в пояснице и не задерживай дыхание."},
  {id:"reverse-lunge", name:"Обратные выпады", type:"main", places:["home","gym","outdoor"], levels:["intermediate","advanced"], goals:["strength","fullbody","endurance"], dose:"8–12/нога", desc:"Шагай назад достаточно далеко, чтобы передняя стопа оставалась устойчивой."},
  {id:"calf-raise", name:"Подъёмы на носки", type:"main", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["strength","fullbody"], dose:"15–20 раз", desc:"Поднимайся плавно, контролируй опускание и держись за опору при необходимости."},
  {id:"wall-sit", name:"Стульчик у стены", type:"main", places:["home","gym"], levels:["intermediate","advanced"], goals:["strength","endurance"], dose:"30–45 сек", desc:"Спина прижата к стене, колени направлены по линии носков."},

  {id:"goblet-squat", name:"Присед с гантелью у груди", type:"main", places:["gym"], levels:["intermediate","advanced"], goals:["strength","fullbody"], dose:"8–12 раз", desc:"Держи гантель близко к груди, сохраняй устойчивую стопу и нейтральную спину."},
  {id:"db-row", name:"Тяга гантели в наклоне", type:"main", places:["gym"], levels:["beginner","intermediate","advanced"], goals:["strength","posture"], dose:"10–12/рука", desc:"Тяни локоть назад, не вращай корпус, шея остаётся продолжением спины."},
  {id:"db-press", name:"Жим гантелей лёжа", type:"main", places:["gym"], levels:["beginner","intermediate","advanced"], goals:["strength","fullbody"], dose:"8–12 раз", desc:"Лопатки собраны, стопы устойчиво стоят на полу, движение контролируемое."},
  {id:"step-up", name:"Зашагивания на платформу", type:"main", places:["gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["strength","endurance","fullbody"], dose:"8–12/нога", desc:"Ставь всю стопу на опору и поднимайся без резкого отталкивания второй ногой."},
  {id:"cable-row", name:"Горизонтальная тяга блока", type:"main", places:["gym"], levels:["beginner","intermediate","advanced"], goals:["strength","posture"], dose:"10–15 раз", desc:"Тяни рукоять к нижним рёбрам, удерживая грудную клетку раскрытой."},
  {id:"bike", name:"Велотренажёр", type:"main", places:["gym"], levels:["beginner","intermediate","advanced"], goals:["endurance","fullbody"], dose:"4–8 мин", desc:"Поддерживай темп, при котором дыхание учащается, но остаётся контролируемым."},

  {id:"bench-squat", name:"Приседание к скамье", type:"main", places:["outdoor"], levels:["beginner","intermediate","advanced"], goals:["strength","fullbody"], dose:"12–15 раз", desc:"Используй скамью как ориентир глубины, касайся её без полного расслабления."},
  {id:"bar-hang", name:"Вис на перекладине", type:"main", places:["outdoor","gym"], levels:["beginner","intermediate","advanced"], goals:["strength","posture","mobility"], dose:"15–30 сек", desc:"Начни с комфортного хвата. При дискомфорте в плечах сразу прекрати."},
  {id:"scap-pull", name:"Лопаточные подтягивания", type:"main", places:["outdoor","gym"], levels:["intermediate","advanced"], goals:["strength","posture"], dose:"6–10 раз", desc:"Не сгибая локти, мягко опускай плечи от ушей и поднимай тело за счёт лопаток."},
  {id:"assisted-pull", name:"Подтягивания с опорой", type:"main", places:["outdoor","gym"], levels:["intermediate","advanced"], goals:["strength","fullbody"], dose:"5–10 раз", desc:"Используй низкую перекладину или резину для снижения нагрузки."},
  {id:"bench-dip", name:"Отжимания от скамьи", type:"main", places:["outdoor","gym"], levels:["intermediate","advanced"], goals:["strength"], dose:"6–12 раз", desc:"Сохраняй плечи опущенными и работай только в комфортной амплитуде."},
  {id:"mountain-climber", name:"Скалолаз", type:"main", places:["home","gym","outdoor"], levels:["intermediate","advanced"], goals:["endurance","fullbody","strength"], dose:"30–45 сек", desc:"Опирайся ладонями под плечами и поочерёдно подтягивай колени без раскачивания таза."},
  {id:"high-knees", name:"Высокие колени", type:"main", places:["home","gym","outdoor"], levels:["intermediate","advanced"], goals:["endurance","fullbody"], dose:"30–45 сек", desc:"Держи корпус высокий и приземляйся на стопу мягко."},

  {id:"chest-open", name:"Раскрытие грудного отдела", type:"main", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["posture","mobility","flexibility"], dose:"8–10 раз", desc:"Сведи руки за спиной или у стены, мягко раскрывая грудную клетку без боли."},
  {id:"thoracic-rot", name:"Повороты грудного отдела", type:"main", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["mobility","posture","flexibility"], dose:"8/сторону", desc:"Поворачивай грудную клетку, сохраняя таз стабильным."},
  {id:"world-stretch", name:"Выпад с ротацией", type:"main", places:["home","gym","outdoor"], levels:["intermediate","advanced"], goals:["mobility","flexibility","fullbody"], dose:"5/сторону", desc:"Из выпада поверни корпус к передней ноге, не торопись и дыши спокойно."},
  {id:"hamstring-fold", name:"Наклон к прямой ноге", type:"cooldown", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["flexibility","mobility","fullbody"], dose:"30 сек/нога", desc:"Наклоняйся от таза с длинной спиной, без пружинящих движений."},
  {id:"quad-stretch", name:"Растяжка передней поверхности бедра", type:"cooldown", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["flexibility","mobility","fullbody"], dose:"30 сек/нога", desc:"Колени рядом, таз слегка подкручен, не тяни стопу через боль."},
  {id:"child-pose", name:"Поза ребёнка", type:"cooldown", places:["home","gym"], levels:["beginner","intermediate","advanced"], goals:["mobility","flexibility","posture","fullbody"], dose:"45 сек", desc:"Опусти таз к пяткам и спокойно вытяни руки вперёд."},
  {id:"breathing", name:"Спокойное дыхание", type:"cooldown", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["mobility","posture","flexibility","endurance","strength","fullbody"], dose:"60 сек", desc:"Сделай несколько медленных вдохов носом и длинных спокойных выдохов."},
  {id:"pec-stretch", name:"Растяжка грудных мышц", type:"cooldown", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["posture","flexibility","mobility"], dose:"30 сек/сторону", desc:"Используй стену или стойку, плечо не поднимай к уху."}
];

const levelRank = { beginner: 1, intermediate: 2, advanced: 3 };
let lastSelection = null;
let variantSeed = 0;

function getSelection() {
  const form = new FormData(document.getElementById("workoutForm"));
  return {
    place: form.get("place"),
    level: form.get("level"),
    goal: form.get("goal"),
    duration: Number(form.get("duration"))
  };
}

function supportsLevel(ex, selectedLevel) {
  const allowed = ex.levels.map(l => levelRank[l]);
  return allowed.some(rank => rank <= levelRank[selectedLevel]);
}

function shuffleDeterministic(array, seed) {
  return [...array].sort((a,b) => {
    const av = (a.id.charCodeAt(0) + a.id.length * 17 + seed * 31) % 97;
    const bv = (b.id.charCodeAt(0) + b.id.length * 17 + seed * 31) % 97;
    return av - bv;
  });
}

function buildWorkout(sel, seed=0) {
  const perDuration = {
    10: { warm: 1, main: 3, cool: 1, rounds: 1 },
    20: { warm: 2, main: 5, cool: 1, rounds: 2 },
    30: { warm: 2, main: 6, cool: 2, rounds: 2 },
    45: { warm: 3, main: 8, cool: 2, rounds: 3 }
  }[sel.duration];

  const base = exercises.filter(ex => ex.places.includes(sel.place) && supportsLevel(ex, sel.level));
  const goalMatches = base.filter(ex => ex.goals.includes(sel.goal));

  const warmPool = goalMatches.filter(ex => ex.type === "warmup");
  const mainPool = goalMatches.filter(ex => ex.type === "main");
  const coolPool = goalMatches.filter(ex => ex.type === "cooldown");

  const fallbackWarm = base.filter(ex => ex.type === "warmup");
  const fallbackMain = base.filter(ex => ex.type === "main");
  const fallbackCool = base.filter(ex => ex.type === "cooldown");

  function take(primary, fallback, count, offset) {
    const merged = [...primary, ...fallback.filter(x => !primary.some(p => p.id === x.id))];
    return shuffleDeterministic(merged, seed + offset).slice(0, count);
  }

  const items = [
    ...take(warmPool, fallbackWarm, perDuration.warm, 1),
    ...take(mainPool, fallbackMain, perDuration.main, 2),
    ...take(coolPool, fallbackCool, perDuration.cool, 3)
  ];

  return { items, rounds: perDuration.rounds };
}

function renderWorkout(sel, seed=0) {
  const result = document.getElementById("result");
  const list = document.getElementById("workoutList");
  const title = document.getElementById("resultTitle");
  const meta = document.getElementById("resultMeta");
  const workout = buildWorkout(sel, seed);

  title.textContent = `${labels.place[sel.place]} · ${labels.goal[sel.goal]}`;
  meta.textContent = `${labels.level[sel.level]} · ${sel.duration} минут · ${workout.rounds} ${workout.rounds === 1 ? "круг" : workout.rounds < 5 ? "круга" : "кругов"}`;

  list.innerHTML = workout.items.map((ex, index) => {
    const phase = labels.type[ex.type];
    return `
      <article class="workout-item">
        <div class="workout-number">${String(index + 1).padStart(2,"0")}</div>
        <div>
          <strong>${ex.name}</strong>
          <small>${phase} · ${ex.desc}</small>
        </div>
        <div class="workout-dose">${ex.dose}</div>
      </article>`;
  }).join("");

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
    <article class="exercise-card">
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
        ${ex.goals.slice(0,2).map(g => `<span class="tag">${labels.goal[g]}</span>`).join("")}
      </div>
    </article>`).join("");
}

document.getElementById("workoutForm").addEventListener("submit", (e) => {
  e.preventDefault();
  lastSelection = getSelection();
  variantSeed = 0;
  renderWorkout(lastSelection, variantSeed);
});

document.getElementById("shuffleButton").addEventListener("click", () => {
  if (!lastSelection) lastSelection = getSelection();
  variantSeed += 1;
  renderWorkout(lastSelection, variantSeed);
});

document.getElementById("catalogPlace").addEventListener("change", renderCatalog);
document.getElementById("catalogType").addEventListener("change", renderCatalog);

renderCatalog();
