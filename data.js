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
  // Разминка
  {id:"march", name:"Шаг на месте", type:"warmup", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["mobility","endurance","fullbody"], dose:"60 сек", desc:"Спокойный шаг с активной работой рук и ровным дыханием."},
  {id:"joints", name:"Суставная разминка", type:"warmup", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["mobility","flexibility","posture","fullbody"], dose:"2 мин", desc:"Плавные круговые движения плечами, тазом, коленями и голеностопом."},
  {id:"arm-circles", name:"Круги руками", type:"warmup", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["mobility","posture","fullbody"], dose:"40 сек", desc:"Постепенно увеличивай амплитуду, не поднимай плечи к ушам."},
  {id:"cat-cow", name:"Кошка–корова", type:"warmup", places:["home","gym"], levels:["beginner","intermediate","advanced"], goals:["mobility","posture","flexibility"], dose:"8–10 раз", desc:"Плавно чередуй округление и разгибание позвоночника на четвереньках."},
  {id:"hip-openers", name:"Раскрытие тазобедренных", type:"warmup", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["mobility","flexibility","fullbody"], dose:"8/сторону", desc:"Подними колено и мягко отведи его в сторону, удерживая корпус ровно."},
  {id:"jumping-jacks", name:"Лёгкие джампинг-джэки", type:"warmup", places:["home","gym","outdoor"], levels:["intermediate","advanced"], goals:["endurance","fullbody"], dose:"45 сек", desc:"Пружинистые прыжки с разведением ног и рук. Приземляйся мягко."},

  // Дом
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

  // Зал
  {id:"goblet-squat", name:"Присед с гантелью у груди", type:"main", places:["gym"], levels:["intermediate","advanced"], goals:["strength","fullbody"], dose:"8–12 раз", desc:"Держи гантель близко к груди, сохраняй устойчивую стопу и нейтральную спину."},
  {id:"db-row", name:"Тяга гантели в наклоне", type:"main", places:["gym"], levels:["beginner","intermediate","advanced"], goals:["strength","posture"], dose:"10–12/рука", desc:"Тяни локоть назад, не вращай корпус, шея остаётся продолжением спины."},
  {id:"db-press", name:"Жим гантелей лёжа", type:"main", places:["gym"], levels:["beginner","intermediate","advanced"], goals:["strength","fullbody"], dose:"8–12 раз", desc:"Лопатки собраны, стопы устойчиво стоят на полу, движение контролируемое."},
  {id:"step-up", name:"Зашагивания на платформу", type:"main", places:["gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["strength","endurance","fullbody"], dose:"8–12/нога", desc:"Ставь всю стопу на опору и поднимайся без резкого отталкивания второй ногой."},
  {id:"cable-row", name:"Горизонтальная тяга блока", type:"main", places:["gym"], levels:["beginner","intermediate","advanced"], goals:["strength","posture"], dose:"10–15 раз", desc:"Тяни рукоять к нижним рёбрам, удерживая грудную клетку раскрытой."},
  {id:"bike", name:"Велотренажёр", type:"main", places:["gym"], levels:["beginner","intermediate","advanced"], goals:["endurance","fullbody"], dose:"4–8 мин", desc:"Поддерживай темп, при котором дыхание учащается, но остаётся контролируемым."},

  // Площадка
  {id:"bench-squat", name:"Приседание к скамье", type:"main", places:["outdoor"], levels:["beginner","intermediate","advanced"], goals:["strength","fullbody"], dose:"12–15 раз", desc:"Используй скамью как ориентир глубины, касайся её без полного расслабления."},
  {id:"bar-hang", name:"Вис на перекладине", type:"main", places:["outdoor","gym"], levels:["beginner","intermediate","advanced"], goals:["strength","posture","mobility"], dose:"15–30 сек", desc:"Начни с комфортного хвата. При дискомфорте в плечах сразу прекрати."},
  {id:"scap-pull", name:"Лопаточные подтягивания", type:"main", places:["outdoor","gym"], levels:["intermediate","advanced"], goals:["strength","posture"], dose:"6–10 раз", desc:"Не сгибая локти, мягко опускай плечи от ушей и поднимай тело за счёт лопаток."},
  {id:"assisted-pull", name:"Подтягивания с опорой", type:"main", places:["outdoor","gym"], levels:["intermediate","advanced"], goals:["strength","fullbody"], dose:"5–10 раз", desc:"Используй низкую перекладину или резину для снижения нагрузки."},
  {id:"bench-dip", name:"Отжимания от скамьи", type:"main", places:["outdoor","gym"], levels:["intermediate","advanced"], goals:["strength"], dose:"6–12 раз", desc:"Сохраняй плечи опущенными и работай только в комфортной амплитуде."},
  {id:"mountain-climber", name:"Скалолаз", type:"main", places:["home","gym","outdoor"], levels:["intermediate","advanced"], goals:["endurance","fullbody","strength"], dose:"30–45 сек", desc:"Опирайся ладонями под плечами и поочерёдно подтягивай колени без раскачивания таза."},
  {id:"high-knees", name:"Высокие колени", type:"main", places:["home","gym","outdoor"], levels:["intermediate","advanced"], goals:["endurance","fullbody"], dose:"30–45 сек", desc:"Держи корпус высокий и приземляйся на стопу мягко."},

  // Мобильность/гибкость/заминка
  {id:"chest-open", name:"Раскрытие грудного отдела", type:"main", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["posture","mobility","flexibility"], dose:"8–10 раз", desc:"Сведи руки за спиной или у стены, мягко раскрывая грудную клетку без боли."},
  {id:"thoracic-rot", name:"Повороты грудного отдела", type:"main", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["mobility","posture","flexibility"], dose:"8/сторону", desc:"Поворачивай грудную клетку, сохраняя таз стабильным."},
  {id:"world-stretch", name:"Выпад с ротацией", type:"main", places:["home","gym","outdoor"], levels:["intermediate","advanced"], goals:["mobility","flexibility","fullbody"], dose:"5/сторону", desc:"Из выпада поверни корпус к передней ноге, не торопись и дыши спокойно."},
  {id:"hamstring-fold", name:"Наклон к прямой ноге", type:"cooldown", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["flexibility","mobility","fullbody"], dose:"30 сек/нога", desc:"Наклоняйся от таза с длинной спиной, без пружинящих движений."},
  {id:"quad-stretch", name:"Растяжка передней поверхности бедра", type:"cooldown", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["flexibility","mobility","fullbody"], dose:"30 сек/нога", desc:"Колени рядом, таз слегка подкручен, не тяни стопу через боль."},
  {id:"child-pose", name:"Поза ребёнка", type:"cooldown", places:["home","gym"], levels:["beginner","intermediate","advanced"], goals:["mobility","flexibility","posture","fullbody"], dose:"45 сек", desc:"Опусти таз к пяткам и спокойно вытяни руки вперёд."},
  {id:"breathing", name:"Спокойное дыхание", type:"cooldown", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["mobility","posture","flexibility","endurance","strength","fullbody"], dose:"60 сек", desc:"Сделай несколько медленных вдохов носом и длинных спокойных выдохов."},
  {id:"pec-stretch", name:"Растяжка грудных мышц", type:"cooldown", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["posture","flexibility","mobility"], dose:"30 сек/сторону", desc:"Используй стену или стойку, плечо не поднимай к уху."},

  // Дополнительные упражнения для более разнообразных комплексов
  {id:"step-jacks", name:"Шаги с разведением рук", type:"warmup", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["endurance","fullbody"], dose:"45–60 сек", desc:"Низкоударная альтернатива прыжкам: шагай в сторону и одновременно поднимай руки."},
  {id:"ankle-rocks", name:"Перекаты голеностопа", type:"warmup", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["mobility","flexibility","posture"], dose:"10–12/нога", desc:"Мягко подавай колено вперёд над стопой, не отрывая пятку от пола."},
  {id:"brisk-walk", name:"Быстрая ходьба", type:"warmup", places:["gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["endurance","fullbody"], dose:"2–4 мин", desc:"Разогрейся энергичной ходьбой с активной работой рук."},
  {id:"bodyweight-squat", name:"Приседания с весом тела", type:"main", places:["home","gym","outdoor"], levels:["intermediate","advanced"], goals:["strength","endurance","fullbody"], dose:"10–18 раз", desc:"Сохраняй устойчивую стопу, отводи таз назад и вставай за счёт ног и ягодиц."},
  {id:"single-leg-bridge", name:"Ягодичный мост на одной ноге", type:"main", places:["home","gym"], levels:["intermediate","advanced"], goals:["strength","fullbody"], dose:"8–12/нога", desc:"Поднимай таз, не позволяя ему разворачиваться в сторону опорной ноги."},
  {id:"side-plank-knees", name:"Боковая планка с колен", type:"main", places:["home","gym"], levels:["beginner","intermediate"], goals:["posture","strength","fullbody"], dose:"20–35 сек/сторону", desc:"Опирайся на предплечье и колени, удерживая плечо, таз и колени на одной линии."},
  {id:"shadow-boxing", name:"Бой с тенью", type:"main", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["endurance","fullbody"], dose:"45–90 сек", desc:"Чередуй лёгкие удары руками и шаги, сохраняя свободное дыхание и контроль корпуса."},
  {id:"heel-taps", name:"Касания пяток лёжа", type:"main", places:["home","gym"], levels:["beginner","intermediate"], goals:["posture","strength"], dose:"10–16/сторону", desc:"Лёжа на спине, поочерёдно тянись рукой к пятке без рывков шеей."},
  {id:"lat-pulldown", name:"Тяга верхнего блока", type:"main", places:["gym"], levels:["beginner","intermediate","advanced"], goals:["strength","posture","fullbody"], dose:"8–15 раз", desc:"Тяни рукоять к верхней части груди, направляя локти вниз и не раскачивая корпус."},
  {id:"face-pull", name:"Тяга каната к лицу", type:"main", places:["gym"], levels:["beginner","intermediate","advanced"], goals:["posture","strength"], dose:"12–15 раз", desc:"Тяни канат к уровню глаз, разводя кисти и мягко сводя лопатки."},
  {id:"leg-press", name:"Жим ногами", type:"main", places:["gym"], levels:["beginner","intermediate","advanced"], goals:["strength","fullbody"], dose:"10–15 раз", desc:"Поставь стопы устойчиво и разгибай ноги без жёсткой блокировки коленей."},
  {id:"db-rdl", name:"Румынская тяга с гантелями", type:"main", places:["gym"], levels:["intermediate","advanced"], goals:["strength","fullbody"], dose:"8–12 раз", desc:"Отводи таз назад с нейтральной спиной, ведя гантели близко к ногам."},
  {id:"pallof-press", name:"Жим Палофа", type:"main", places:["gym"], levels:["intermediate","advanced"], goals:["posture","strength","fullbody"], dose:"8–12/сторону", desc:"Удерживай корпус от вращения, выжимая рукоять блока или резину перед собой."},
  {id:"incline-walk", name:"Ходьба под уклоном", type:"main", places:["gym"], levels:["beginner","intermediate","advanced"], goals:["endurance","fullbody"], dose:"4–10 мин", desc:"Иди в бодром темпе на дорожке с умеренным уклоном, не держась постоянно за поручни."},
  {id:"inverted-row", name:"Горизонтальные подтягивания", type:"main", places:["outdoor","gym"], levels:["intermediate","advanced"], goals:["strength","posture","fullbody"], dose:"6–12 раз", desc:"Подтягивай грудь к низкой перекладине, сохраняя тело прямой линией."},
  {id:"walking-lunge", name:"Выпады в движении", type:"main", places:["outdoor","gym"], levels:["intermediate","advanced"], goals:["strength","endurance","fullbody"], dose:"8–12/нога", desc:"Шагай вперёд контролируемо, стабилизируя колено и таз перед следующим шагом."},
  {id:"jog-intervals", name:"Интервалы лёгкого бега", type:"main", places:["outdoor"], levels:["intermediate","advanced"], goals:["endurance","fullbody"], dose:"4–8 мин", desc:"Чередуй короткий лёгкий бег с ходьбой, сохраняя контролируемое дыхание."},
  {id:"hip-90-90", name:"Переходы 90/90 для таза", type:"main", places:["home","gym"], levels:["beginner","intermediate","advanced"], goals:["mobility","flexibility","posture"], dose:"6–10/сторону", desc:"Сидя с согнутыми ногами, плавно переноси колени из стороны в сторону без рывков."},
  {id:"ankle-mobility", name:"Мобилизация голеностопа у опоры", type:"main", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["mobility","flexibility"], dose:"8–12/нога", desc:"Веди колено к опоре над носком, удерживая пятку прижатой к поверхности."},
  {id:"deep-squat-hold", name:"Удержание глубокого приседа", type:"main", places:["home","gym","outdoor"], levels:["intermediate","advanced"], goals:["mobility","flexibility","fullbody"], dose:"20–40 сек", desc:"Опустись в комфортный глубокий присед и удерживай устойчивую стопу и длинную спину."},
  {id:"knee-drive", name:"Шаг с подъёмом колена", type:"main", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["endurance","fullbody"], dose:"45–75 сек", desc:"Чередуй энергичный шаг и подъём колена, работая руками без прыжков."},
  {id:"hip-flexor-stretch", name:"Растяжка сгибателей бедра", type:"cooldown", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["flexibility","mobility","posture"], dose:"30 сек/сторону", desc:"Из полувыпада слегка подкрути таз и мягко смести его вперёд."},
  {id:"calf-stretch", name:"Растяжка икроножных", type:"cooldown", places:["home","gym","outdoor"], levels:["beginner","intermediate","advanced"], goals:["flexibility","mobility","fullbody"], dose:"30 сек/нога", desc:"Упрись в опору и отведи одну ногу назад, сохраняя пятку на поверхности."}
];

const levelRank = { beginner: 1, intermediate: 2, advanced: 3 };
const levelNamesShort = { 1: "Базовый", 2: "Средний", 3: "Сложнее" };

const profileData = {
  "march":[1,"cardio"], "joints":[1,"mobility"], "arm-circles":[1,"mobility,posture"],
  "cat-cow":[1,"mobility,posture"], "hip-openers":[1,"mobility"], "jumping-jacks":[2,"cardio"],
  "chair-squat":[1,"legs"], "wall-push":[1,"push,posture"], "incline-push":[1,"push"],
  "glute-bridge":[1,"legs,core"], "bird-dog":[1,"core,posture"], "dead-bug":[1,"core,posture"],
  "knee-plank":[1,"core"], "plank":[2,"core"], "reverse-lunge":[2,"legs,cardio"],
  "calf-raise":[1,"legs"], "wall-sit":[2,"legs"], "goblet-squat":[2,"legs"],
  "db-row":[1,"pull,posture"], "db-press":[1,"push"], "step-up":[1,"legs,cardio"],
  "cable-row":[1,"pull,posture"], "bike":[1,"cardio"], "bench-squat":[1,"legs"],
  "bar-hang":[1,"pull,posture,mobility"], "scap-pull":[2,"pull,posture"], "assisted-pull":[2,"pull"],
  "bench-dip":[2,"push"], "mountain-climber":[2,"cardio,core"], "high-knees":[2,"cardio"],
  "chest-open":[1,"posture,mobility"], "thoracic-rot":[1,"mobility,posture"], "world-stretch":[2,"mobility,flexibility"],
  "hamstring-fold":[1,"flexibility"], "quad-stretch":[1,"flexibility"], "child-pose":[1,"flexibility,mobility"],
  "breathing":[1,"recovery"], "pec-stretch":[1,"flexibility,posture"],
  "step-jacks":[1,"cardio"], "ankle-rocks":[1,"mobility"], "brisk-walk":[1,"cardio"],
  "bodyweight-squat":[2,"legs"], "single-leg-bridge":[2,"legs,core"], "side-plank-knees":[1,"core,posture"],
  "shadow-boxing":[1,"cardio,fullbody"], "heel-taps":[1,"core"], "lat-pulldown":[1,"pull,posture"],
  "face-pull":[1,"pull,posture"], "leg-press":[1,"legs"], "db-rdl":[2,"legs,hinge"],
  "pallof-press":[2,"core,posture"], "incline-walk":[1,"cardio"], "inverted-row":[2,"pull,posture"],
  "walking-lunge":[2,"legs,cardio"], "jog-intervals":[2,"cardio"], "hip-90-90":[1,"mobility,flexibility"],
  "ankle-mobility":[1,"mobility"], "deep-squat-hold":[2,"mobility,flexibility,legs"], "knee-drive":[1,"cardio,fullbody"],
  "hip-flexor-stretch":[1,"flexibility"], "calf-stretch":[1,"flexibility"]
};
