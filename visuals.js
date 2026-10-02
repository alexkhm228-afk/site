const VISUAL_CDN = 'https://cdn.jsdelivr.net/npm/@bryllim/workout-guide@1.0.0/assets';

function wg(slug, options = {}) {
  const frames = options.frames || [1,2,3];
  return {
    kind: 'workout-guide', slug, frames,
    animate: options.animate !== false && frames.length > 1,
    exact: options.exact !== false,
    note: options.note || '',
    urls: frames.map(n => `${VISUAL_CDN}/${slug}/frame-${n}.svg`),
    sourceUrl: `https://bryllim.github.io/workout-guide/exercises/${slug}/`,
    credit: 'Workout Guide · Bryl Lim · CC BY-SA 4.0'
  };
}

function commons(url, sourceUrl, credit, options = {}) {
  return {
    kind: 'commons', urls: [url], frames: [1],
    animate: !!options.nativeAnimation,
    nativeAnimation: !!options.nativeAnimation,
    exact: options.exact !== false,
    note: options.note || '', sourceUrl, credit
  };
}

const exerciseVisuals = {
  march: wg('running', { exact:false, note:'Исходный «шаг на месте» заменён на «лёгкий бег на месте»: близкая кардио-разминка с готовым корректным визуалом.' }),
  joints: wg('inchworm', { exact:false, note:'Общая суставная разминка заменена на Inchworm — динамическую разминку всего тела с готовыми кадрами.' }),
  'arm-circles': wg('arm-circles'),
  'cat-cow': wg('cat-cow-stretch'),
  'hip-openers': wg('fire-hydrant', { exact:false, note:'«Раскрытие тазобедренных» заменено на Fire Hydrant — близкое упражнение на контролируемое отведение бедра.' }),
  'jumping-jacks': wg('jumping-jack'),

  'chair-squat': commons(
    'https://commons.wikimedia.org/wiki/Special:FilePath/Exercise_Chair_Squat.png?width=1024',
    'https://commons.wikimedia.org/wiki/File:Exercise_Chair_Squat.png',
    'BruceBlaus · Wikimedia Commons · CC BY-SA 4.0',
    { note:'Точная иллюстрация приседания к стулу. Поскольку источник содержит один учебный рисунок, ложная анимация не создаётся.' }
  ),
  'wall-push': wg('wall-push-up'),
  'incline-push': wg('incline-push-up'),
  'glute-bridge': wg('glute-bridge'),
  'bird-dog': wg('bird-dog'),
  'dead-bug': wg('dead-bug'),
  'knee-plank': wg('incline-push-up', { frames:[1], animate:false, exact:false, note:'«Планка с колен» заменена на «планку на высокой опоре» — близкую регрессию планки для новичка с точной картинкой стартовой позиции incline push-up.' }),
  plank: wg('plank', { frames:[2], animate:false }),
  'reverse-lunge': wg('reverse-lunge'),
  'calf-raise': wg('calf-raise'),
  'wall-sit': wg('wall-sit', { frames:[2], animate:false }),

  'goblet-squat': wg('goblet-squat'),
  'db-row': wg('one-arm-dumbbell-row'),
  'db-press': wg('dumbbell-bench-press'),
  'step-up': wg('step-up', { note:'На визуале может использоваться дополнительный вес; сама траектория зашагивания соответствует упражнению.' }),
  'cable-row': wg('seated-row'),
  bike: wg('assault-bike', { exact:false, note:'Велотренажёр заменён на эйрбайк: тот же циклический кардио-паттерн на стационарном велосипеде, но с готовыми кадрами.' }),

  'bench-squat': commons(
    'https://commons.wikimedia.org/wiki/Special:FilePath/Exercise_Chair_Squat.png?width=1024',
    'https://commons.wikimedia.org/wiki/File:Exercise_Chair_Squat.png',
    'BruceBlaus · Wikimedia Commons · CC BY-SA 4.0',
    { exact:false, note:'Для приседа к скамье используется точная по механике схема приседа к опоре; отличается только сама опора.' }
  ),
  'bar-hang': wg('dead-hang', { frames:[2], animate:false }),
  'scap-pull': wg('scapular-pull-up'),
  'assisted-pull': wg('assisted-pull-up', { exact:false, note:'Визуал показывает вариант подтягивания с помощью. Способ ассистирования может отличаться от резины/опоры на площадке, но основная траектория подтягивания совпадает.' }),
  'bench-dip': wg('bench-dip'),
  'mountain-climber': wg('mountain-climber'),
  'high-knees': wg('high-knees'),

  'chest-open': wg('band-pull-apart', { exact:false, note:'Упражнение заменено на разведение резинки — близкое движение для раскрытия плечевого пояса и работы над осанкой.' }),
  'thoracic-rot': wg('torso-twist-stretch'),
  'world-stretch': wg('worlds-greatest-stretch'),
  'hamstring-fold': wg('hamstring-stretch', { frames:[2], animate:false }),
  'quad-stretch': wg('standing-quad-stretch', { frames:[2], animate:false }),
  'child-pose': wg('childs-pose', { frames:[2], animate:false }),
  breathing: commons(
    'https://commons.wikimedia.org/wiki/Special:FilePath/Diaphragmatic_breathing.gif',
    'https://commons.wikimedia.org/wiki/File:Diaphragmatic_breathing.gif',
    'John Pierce · Wikimedia Commons · CC0',
    { nativeAnimation:true, note:'Это готовая исходная анимация диафрагмального дыхания, а не синтетическая интерполяция.' }
  ),
  'pec-stretch': wg('doorway-chest-stretch', { frames:[2], animate:false }),

  'step-jacks': wg('lateral-shuffle', { exact:false, note:'Step-jacks заменены на боковые шаги в темпе — близкую низкоинтенсивную кардио-разминку без необходимости придумывать несуществующие кадры.' }),
  'ankle-rocks': wg('wall-calf-stretch', { exact:false, note:'Используется близкий голеностопный паттерн у стены: движение голени вперёд при сохранении пятки на опоре.' }),
  'brisk-walk': wg('running', { exact:false, note:'Быстрый шаг заменён на лёгкий бег — близкую циклическую кардио-нагрузку с корректными готовыми кадрами.' }),
  'bodyweight-squat': wg('bodyweight-squat'),
  'single-leg-bridge': wg('single-leg-glute-bridge'),
  'side-plank-knees': commons(
    'https://commons.wikimedia.org/wiki/Special:FilePath/Modifiedsideplank.jpg?width=1200',
    'https://commons.wikimedia.org/wiki/File:Modifiedsideplank.jpg',
    'U.S. Army · Wikimedia Commons · CC BY 2.0',
    { note:'Статическая модифицированная боковая планка показывается одной фотографией.' }
  ),
  'shadow-boxing': commons(
    'https://commons.wikimedia.org/wiki/Special:FilePath/Photos_taken_at_Zebra_Boxing_Club_on_20th_September_2025_15.jpg?width=1200',
    'https://commons.wikimedia.org/wiki/File:Photos_taken_at_Zebra_Boxing_Club_on_20th_September_2025_15.jpg',
    'Wikimedia Commons · CC BY-SA 4.0',
    { note:'Используется реальная фотография shadow boxing. Анимация из выдуманных промежуточных поз не создаётся.' }
  ),
  'heel-taps': wg('heel-tap'),
  'lat-pulldown': wg('lat-pulldown'),
  'face-pull': wg('face-pull'),
  'leg-press': wg('leg-press'),
  'db-rdl': wg('dumbbell-romanian-deadlift'),
  'pallof-press': wg('pallof-press'),
  'incline-walk': wg('treadmill-incline-walk'),
  'inverted-row': wg('inverted-row'),
  'walking-lunge': wg('walking-lunge', { note:'На визуале может использоваться дополнительный вес; траектория шага и выпада соответствует упражнению.' }),
  'jog-intervals': wg('running'),
  'hip-90-90': wg('butterfly-stretch', { exact:false, note:'Переходы 90/90 заменены на «Бабочку» — близкую по цели мобилизацию тазобедренных суставов для того же уровня подготовки.' }),
  'ankle-mobility': wg('wall-calf-stretch', { exact:false, note:'Используется близкое движение для мобильности голеностопа у стены.' }),
  'deep-squat-hold': wg('bodyweight-squat', { frames:[2], animate:false, exact:false, note:'Для статического глубокого приседа используется нижняя позиция bodyweight squat; анимация намеренно отключена.' }),
  'knee-drive': wg('high-knees', { exact:false, note:'Подъём колена показан через тот же паттерн high knees; упражнение выполняется в более спокойном темпе.' }),
  'hip-flexor-stretch': wg('kneeling-hip-flexor-stretch', { frames:[2], animate:false }),
  'calf-stretch': wg('wall-calf-stretch', { frames:[2], animate:false })
};

const exerciseReplacements = {
  march: {
    name:'Лёгкий бег на месте', desc:'Мягкая кардио-разминка с коротким шагом и спокойным темпом.', dose:'45–60 сек',
    guide:{steps:['Встань ровно и начни лёгкий бег на месте.','Делай короткие мягкие шаги, не выбрасывая стопу далеко вперёд.','Работай руками естественно и держи плечи расслабленными.','Поддерживай темп, в котором можешь спокойно дышать.'],tip:'Приземляйся тихо и держи корпус высоким.',mistake:'Слишком высокий темп и жёсткое приземление на пятку.'}
  },
  joints: {
    name:'Inchworm — динамическая разминка', desc:'Динамическая разминка плеч, корпуса и задней поверхности ног.', dose:'5–8 повторов',
    guide:{steps:['Встань прямо и наклонись, поставив ладони на пол настолько близко, насколько комфортно.','Переставляй ладони вперёд до положения высокой планки.','Коротко стабилизируй корпус.','Шагами рук вернись назад и поднимись.'],tip:'Сохраняй движение плавным и не спеши в планке.',mistake:'Провисание поясницы и слишком резкий наклон.'}
  },
  'hip-openers': {
    name:'Fire Hydrant', desc:'Контролируемое отведение бедра на четвереньках для мобильности и активации ягодичных.', dose:'8–12/сторону',
    guide:{steps:['Встань на четвереньки, ладони под плечами, колени под тазом.','Сохраняя колено согнутым, отведи бедро в сторону.','Остановись до того, как таз начнёт разворачиваться.','Верни колено вниз и повтори.'],tip:'Таз остаётся почти неподвижным; двигается бедро.',mistake:'Разворот корпуса вслед за ногой и прогиб поясницы.'}
  },
  'knee-plank': {
    name:'Планка на высокой опоре', desc:'Облегчённая планка с руками на устойчивой высокой опоре.', dose:'20–40 сек',
    guide:{steps:['Поставь ладони на устойчивую скамью, столешницу или высокую опору.','Отойди ногами назад и выстрой прямую линию от головы до пяток.','Напряги живот и ягодицы.','Удерживай положение, не проваливая поясницу.'],tip:'Чем выше опора, тем легче удержание.',mistake:'Провисание таза и плечи, поднятые к ушам.'}
  },
  bike: {
    name:'Эйрбайк', desc:'Циклическая кардио-работа на стационарном велосипеде с участием рук.', dose:'3–6 мин',
    guide:{steps:['Отрегулируй седло так, чтобы нога в нижней точке оставалась слегка согнутой.','Начни педалировать и синхронно двигать рукояти.','Держи корпус устойчивым и плечи расслабленными.','Поддерживай ровную интенсивность заданное время.'],tip:'Не начинай слишком резко — сначала найди устойчивый ритм.',mistake:'Раскачивание корпуса и чрезмерное давление руками на рукояти.'}
  },
  'chest-open': {
    name:'Разведение резинки перед грудью', desc:'Контролируемое разведение резинки для плечевого пояса и осанки.', dose:'10–15 раз',
    guide:{steps:['Возьми лёгкую резинку двумя руками перед собой.','Подними руки примерно до уровня груди.','Разведи руки в стороны, мягко сводя лопатки.','Под контролем вернись в исходное положение.'],tip:'Плечи остаются опущенными, рёбра не выпячиваются.',mistake:'Сильный прогиб поясницы и движение рывком.'}
  },
  'step-jacks': {
    name:'Боковые шаги в темпе', desc:'Низкоинтенсивная кардио-разминка с быстрыми шагами в стороны.', dose:'45–60 сек',
    guide:{steps:['Встань в лёгкую спортивную стойку.','Сделай несколько быстрых шагов в одну сторону.','Поменяй направление без скрещивания ног.','Сохраняй мягкие колени и ровный ритм.'],tip:'Оставайся невысоко и двигайся легко на стопах.',mistake:'Скрещивание стоп и резкая остановка на прямых коленях.'}
  },
  'brisk-walk': {
    name:'Лёгкий бег', desc:'Спокойный бег в разговорном темпе для кардио-разминки или основной части.', dose:'2–5 мин',
    guide:{steps:['Начни с спокойного темпа.','Делай короткий естественный шаг.','Держи плечи и кисти расслабленными.','Поддерживай темп, в котором дыхание остаётся контролируемым.'],tip:'Лёгкость шага важнее скорости.',mistake:'Слишком длинный шаг и жёсткое приземление далеко впереди корпуса.'}
  },
  'hip-90-90': {
    name:'Бабочка', desc:'Мягкая мобилизация тазобедренных суставов в положении сидя.', dose:'30–45 сек',
    guide:{steps:['Сядь и соедини стопы перед собой.','Позволь коленям мягко опуститься в стороны.','Сохрани спину длинной и таз устойчивым.','Удерживай комфортное натяжение без пружинящих движений.'],tip:'Не дави руками на колени; амплитуда приходит постепенно.',mistake:'Сильное округление спины ради большей глубины.'}
  }
};

function applyExerciseReplacements() {
  Object.entries(exerciseReplacements).forEach(([id, patch]) => {
    const ex = exercises.find(item => item.id === id);
    if (!ex) return;
    if (patch.name) ex.name = patch.name;
    if (patch.desc) ex.desc = patch.desc;
    if (patch.dose) ex.dose = patch.dose;
  });
}
