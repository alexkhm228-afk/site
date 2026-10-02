const VISUAL_CDN = 'https://raw.githubusercontent.com/bryllim/workout-guide/aac599224bb9780305239607ef98540b7e0ce389/packages/workout-guide/assets';

function wg(slug, options = {}) {
  const frames = options.frames || [1,2,3];
  return {
    kind: 'workout-guide', slug, frames,
    animate: options.animate !== false && frames.length > 1,
    exact: options.exact !== false,
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
    sourceUrl, credit
  };
}

const exerciseVisuals = {
  march: wg('running', { exact:false }),
  joints: wg('inchworm', { exact:false }),
  'arm-circles': wg('arm-circles'),
  'cat-cow': wg('cat-cow-stretch'),
  'hip-openers': wg('fire-hydrant', { exact:false }),
  'jumping-jacks': wg('jumping-jack'),
  'chair-squat': commons(
    'https://commons.wikimedia.org/wiki/Special:FilePath/Exercise_Chair_Squat.png?width=1024',
    'https://commons.wikimedia.org/wiki/File:Exercise_Chair_Squat.png',
    'BruceBlaus · Wikimedia Commons · CC BY-SA 4.0'
  ),
  'wall-push': wg('wall-push-up'),
  'incline-push': wg('incline-push-up'),
  'glute-bridge': wg('glute-bridge'),
  'bird-dog': wg('bird-dog'),
  'dead-bug': wg('dead-bug'),
  'knee-plank': wg('incline-push-up', { frames:[1], animate:false, exact:false }),
  plank: wg('plank', { frames:[2], animate:false }),
  'reverse-lunge': wg('reverse-lunge'),
  'calf-raise': wg('calf-raise'),
  'wall-sit': wg('wall-sit', { frames:[2], animate:false }),
  'goblet-squat': wg('goblet-squat'),
  'db-row': wg('one-arm-dumbbell-row'),
  'db-press': wg('dumbbell-bench-press'),
  'step-up': wg('step-up'),
  'cable-row': wg('seated-row'),
  bike: wg('assault-bike', { exact:false }),
  'bench-squat': commons(
    'https://commons.wikimedia.org/wiki/Special:FilePath/Exercise_Chair_Squat.png?width=1024',
    'https://commons.wikimedia.org/wiki/File:Exercise_Chair_Squat.png',
    'BruceBlaus · Wikimedia Commons · CC BY-SA 4.0',
    { exact:false }
  ),
  'bar-hang': wg('dead-hang', { frames:[2], animate:false }),
  'scap-pull': wg('scapular-pull-up'),
  'assisted-pull': wg('assisted-pull-up', { exact:false }),
  'bench-dip': wg('bench-dip'),
  'mountain-climber': wg('mountain-climber'),
  'high-knees': wg('high-knees'),
  'chest-open': wg('band-pull-apart', { exact:false }),
  'thoracic-rot': wg('torso-twist-stretch'),
  'world-stretch': wg('worlds-greatest-stretch'),
  'hamstring-fold': wg('hamstring-stretch', { frames:[2], animate:false }),
  'quad-stretch': wg('standing-quad-stretch', { frames:[2], animate:false }),
  'child-pose': wg('childs-pose', { frames:[2], animate:false }),
  breathing: commons(
    'https://commons.wikimedia.org/wiki/Special:FilePath/Diaphragmatic_breathing.gif',
    'https://commons.wikimedia.org/wiki/File:Diaphragmatic_breathing.gif',
    'John Pierce · Wikimedia Commons · CC0',
    { nativeAnimation:true }
  ),
  'pec-stretch': wg('doorway-chest-stretch', { frames:[2], animate:false }),
  'step-jacks': wg('lateral-shuffle', { exact:false }),
  'ankle-rocks': wg('wall-calf-stretch', { exact:false }),
  'brisk-walk': wg('running', { exact:false }),
  'bodyweight-squat': wg('bodyweight-squat'),
  'single-leg-bridge': wg('single-leg-glute-bridge'),
  'side-plank-knees': wg('side-plank', { frames:[2], animate:false, exact:false }),
  'shadow-boxing': commons(
    'https://commons.wikimedia.org/wiki/Special:FilePath/Photos_taken_at_Zebra_Boxing_Club_on_20th_September_2025_15.jpg?width=1200',
    'https://commons.wikimedia.org/wiki/File:Photos_taken_at_Zebra_Boxing_Club_on_20th_September_2025_15.jpg',
    'Wikimedia Commons · CC BY-SA 4.0'
  ),
  'heel-taps': wg('heel-tap'),
  'lat-pulldown': wg('lat-pulldown'),
  'face-pull': wg('face-pull'),
  'leg-press': wg('leg-press'),
  'db-rdl': wg('dumbbell-romanian-deadlift'),
  'pallof-press': wg('pallof-press'),
  'incline-walk': wg('treadmill-incline-walk'),
  'inverted-row': wg('inverted-row'),
  'walking-lunge': wg('walking-lunge'),
  'jog-intervals': wg('running'),
  'hip-90-90': wg('butterfly-stretch', { exact:false }),
  'ankle-mobility': wg('wall-calf-stretch', { exact:false }),
  'deep-squat-hold': wg('bodyweight-squat', { frames:[2], animate:false, exact:false }),
  'knee-drive': wg('high-knees', { exact:false }),
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
    guide:{steps:['Отрегулируй седло так, чтобы нога в нижней точке оставалась слегка согнутой.','Начни педалировать и синхронно двигать рукояти.','Держи корпус устойчивым и плечи расслабленными.','Поддерживай ровную интенсивность заданное время.'],tip:'Не начинай слишком резко — сначала найди ровный ритм.',mistake:'Избыточное раскачивание корпуса и слишком тяжёлое сопротивление.'}
  },
  'chest-open': {
    name:'Разведение резинки перед собой', desc:'Упражнение для задней поверхности плеч и контроля лопаток.', dose:'12–15 раз',
    guide:{steps:['Возьми резинку перед собой прямыми руками на уровне груди.','Слегка опусти плечи и держи рёбра собранными.','Разведи руки в стороны, мягко сводя лопатки.','Под контролем вернись в исходное положение.'],tip:'Движение должно происходить в плечах и лопатках, без прогиба поясницы.',mistake:'Плечи поднимаются к ушам или корпус отклоняется назад.'}
  },
  'step-jacks': {
    name:'Боковые шаги в темпе', desc:'Низкоинтенсивная кардио-разминка с быстрыми шагами вправо и влево.', dose:'45–60 сек',
    guide:{steps:['Встань в лёгкую спортивную стойку.','Сделай несколько быстрых коротких шагов вправо.','Сразу смени направление и вернись влево.','Держи колени мягкими и корпус устойчивым.'],tip:'Шаги короткие и лёгкие; не скрещивай ноги.',mistake:'Слишком высокий прыжок вместо контролируемых боковых шагов.'}
  },
  'ankle-rocks': {
    name:'Мобилизация голеностопа у стены', desc:'Мягкое движение колена вперёд над стопой при сохранении пятки на полу.', dose:'8–12/сторону',
    guide:{steps:['Поставь стопу перед стеной, пятка остаётся на полу.','Мягко направь колено вперёд к стене по линии второго-третьего пальца стопы.','Остановись до отрыва пятки.','Вернись назад и повтори.'],tip:'Пятка всё время прижата к полу.',mistake:'Колено заваливается внутрь или пятка отрывается.'}
  },
  'brisk-walk': {
    name:'Лёгкий бег', desc:'Спокойная циклическая кардио-нагрузка с контролируемым темпом.', dose:'3–5 мин',
    guide:{steps:['Начни с очень лёгкого темпа.','Делай короткий естественный шаг и мягко приземляйся.','Работай руками без лишнего напряжения.','Держи темп, при котором можешь произнести короткую фразу.'],tip:'Плечи расслаблены, шаг тихий и лёгкий.',mistake:'Слишком длинный шаг и жёсткое приземление.'}
  },
  'side-plank-knees': {
    name:'Боковая планка', desc:'Статическое упражнение на боковую линию корпуса и стабильность плеча.', dose:'20–30 сек/сторону',
    guide:{steps:['Ляг на бок и поставь локоть точно под плечом.','Выпрями ноги и поставь стопы друг на друга или одну перед другой.','Подними таз и выстрой тело в прямую линию.','Удерживай положение и затем смени сторону.'],tip:'Не проваливай плечо и держи таз высоко.',mistake:'Таз опускается к полу или корпус разворачивается вперёд.'}
  },
  'hip-90-90': {
    name:'Растяжка «Бабочка»', desc:'Мягкая мобилизация тазобедренных суставов в положении сидя.', dose:'40–60 сек',
    guide:{steps:['Сядь и соедини подошвы стоп перед собой.','Подтяни стопы на комфортное расстояние к тазу.','Выпрями спину и позволь коленям мягко опуститься в стороны.','Удерживай положение без пружинящих движений.'],tip:'Сохраняй длинную спину и расслабляй бёдра на выдохе.',mistake:'Сильное давление руками на колени и округление спины.'}
  }
};

function applyExerciseReplacements() {
  for (const [id, replacement] of Object.entries(exerciseReplacements)) {
    const ex = exercises.find(item => item.id === id);
    if (!ex) continue;
    ex.name = replacement.name;
    ex.desc = replacement.desc;
    ex.dose = replacement.dose;
  }
}
