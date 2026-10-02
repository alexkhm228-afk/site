(() => {
  'use strict';

  const NS = 'http://www.w3.org/2000/svg';
  const COLORS = {
    ink: '#152238',
    body: '#DDE8F7',
    body2: '#BFD1EA',
    joint: '#FFFFFF',
    accent: '#2F6FED',
    good: '#2E9B73',
    bad: '#D14B4B',
    muted: '#8291A7',
    prop: '#A8B3C3',
    grid: '#E7EDF5'
  };

  const style = document.createElement('style');
  style.textContent = `
    .tech-visual-v2{margin:24px 0 28px;padding:20px;border:1px solid #dfe6ef;border-radius:22px;background:linear-gradient(180deg,#f9fbfe,#f3f7fc)}
    .tech-visual-v2__head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:16px}
    .tech-visual-v2__head h3{margin:0 0 6px;font-size:18px;color:#152238}
    .tech-visual-v2__head p{margin:0;color:#68778d;font-size:13px;line-height:1.55;max-width:680px}
    .tech-visual-v2__badge{flex:0 0 auto;padding:7px 10px;border-radius:999px;background:#e7efff;color:#2f6fed;font-size:11px;font-weight:800;letter-spacing:.02em}
    .tech-visual-v2__frames{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
    .tech-frame{position:relative;overflow:hidden;border:1px solid #dde5ef;border-radius:18px;background:#fff}
    .tech-frame--bad{border-color:#efc7c7;background:#fffafa}
    .tech-frame__label{display:flex;align-items:center;gap:8px;padding:10px 12px 0;font-size:12px;font-weight:800;color:#34445a}
    .tech-frame__dot{width:8px;height:8px;border-radius:50%;background:#2e9b73}
    .tech-frame--bad .tech-frame__dot{background:#d14b4b}
    .tech-frame svg{display:block;width:100%;aspect-ratio:6/5}
    .tech-frame__cue{min-height:56px;padding:0 12px 12px;color:#66758a;font-size:11.5px;line-height:1.45}
    .tech-visual-v2__legend{display:flex;gap:14px;flex-wrap:wrap;margin-top:14px;color:#66758a;font-size:11px}
    .tech-legend-item{display:inline-flex;align-items:center;gap:6px}
    .tech-legend-line{width:24px;height:0;border-top:3px solid #2f6fed;border-radius:2px}
    .tech-legend-line--bad{border-color:#d14b4b;border-top-style:dashed}
    @media(max-width:760px){.tech-visual-v2{padding:14px}.tech-visual-v2__head{display:block}.tech-visual-v2__badge{display:inline-block;margin-top:8px}.tech-visual-v2__frames{grid-template-columns:1fr}.tech-frame svg{aspect-ratio:16/10}}
  `;
  document.head.appendChild(style);

  function pose(p) {
    return {
      head: [150, 38],
      shoulderL: [137, 66], shoulderR: [163, 66],
      elbowL: [132, 98], elbowR: [168, 98],
      wristL: [130, 130], wristR: [170, 130],
      hipL: [140, 118], hipR: [160, 118],
      kneeL: [138, 168], kneeR: [162, 168],
      ankleL: [136, 218], ankleR: [164, 218],
      ...p
    };
  }

  function frame(label, cue, p, extras = {}) { return { label, cue, pose: p, ...extras }; }

  const guides = {
    'chair-squat': {
      note: 'Вид сбоку: важны нейтральная спина, движение таза назад и колени по линии стоп.',
      frames: [
        frame('1 · Старт', 'Стопы устойчивы. Стул позади, корпус собран.', pose({
          head:[128,38], shoulderL:[123,66], shoulderR:[136,68], elbowL:[116,96], elbowR:[140,98], wristL:[112,126], wristR:[144,128], hipL:[126,118], hipR:[138,120], kneeL:[128,168], kneeR:[140,170], ankleL:[126,218], ankleR:[144,218]
        }), {prop:'chair'}),
        frame('2 · Нижняя фаза', 'Таз назад к стулу. Пятки не отрываются, колено не заваливается внутрь.', pose({
          head:[112,52], shoulderL:[112,78], shoulderR:[126,80], elbowL:[130,98], elbowR:[142,102], wristL:[150,114], wristR:[158,118], hipL:[134,120], hipR:[146,122], kneeL:[118,165], kneeR:[134,168], ankleL:[106,218], ankleR:[142,218]
        }), {prop:'chair', arrow:{from:[140,103],to:[155,136]}}),
        frame('Не делай', 'Не округляй поясницу и не уводи колени резко вперёд.', pose({
          head:[112,64], shoulderL:[115,88], shoulderR:[128,92], elbowL:[134,108], elbowR:[146,112], wristL:[154,122], wristR:[164,126], hipL:[142,120], hipR:[152,122], kneeL:[158,160], kneeR:[170,162], ankleL:[128,218], ankleR:[150,218]
        }), {prop:'chair', bad:true, warningLine:[[105,72],[150,126]]})
      ]
    },
    'wall-push': {
      note: 'Вид сбоку: тело остаётся одной линией от головы до пяток, локти сгибаются под контролем.',
      frames: [
        frame('1 · Старт', 'Ладони на стене чуть шире плеч. Корпус прямой.', pose({
          head:[102,58], shoulderL:[112,78], shoulderR:[121,82], elbowL:[140,84], elbowR:[145,94], wristL:[176,84], wristR:[176,98], hipL:[92,112], hipR:[102,116], kneeL:[72,157], kneeR:[82,160], ankleL:[54,208], ankleR:[64,212]
        }), {prop:'wall-right'}),
        frame('2 · К стене', 'Согни локти и веди грудь к стене, не ломая линию корпуса.', pose({
          head:[126,58], shoulderL:[134,78], shoulderR:[144,82], elbowL:[154,88], elbowR:[160,100], wristL:[176,84], wristR:[176,98], hipL:[104,112], hipR:[114,116], kneeL:[82,157], kneeR:[92,160], ankleL:[62,208], ankleR:[72,212]
        }), {prop:'wall-right', arrow:{from:[112,90],to:[142,90]}}),
        frame('Не делай', 'Не провисай поясницей и не поднимай плечи к ушам.', pose({
          head:[126,70], shoulderL:[138,88], shoulderR:[148,92], elbowL:[156,96], elbowR:[162,106], wristL:[176,84], wristR:[176,98], hipL:[106,126], hipR:[116,130], kneeL:[82,160], kneeR:[92,164], ankleL:[62,208], ankleR:[72,212]
        }), {prop:'wall-right', bad:true, warningLine:[[126,72],[108,132]]})
      ]
    },
    'incline-push': {
      note: 'Вид сбоку: опора должна быть устойчивой; голова, таз и пятки держатся на одной линии.',
      frames: [
        frame('1 · Старт', 'Руки прямые, корпус собран, таз не провисает.', pose({
          head:[70,78], shoulderL:[86,92], shoulderR:[96,95], elbowL:[116,98], elbowR:[122,104], wristL:[152,102], wristR:[154,112], hipL:[128,116], hipR:[138,120], kneeL:[164,154], kneeR:[172,158], ankleL:[198,188], ankleR:[204,194]
        }), {prop:'box-right'}),
        frame('2 · Опускание', 'Грудь движется к опоре, локти назад под умеренным углом.', pose({
          head:[96,88], shoulderL:[108,98], shoulderR:[118,102], elbowL:[128,106], elbowR:[136,116], wristL:[152,102], wristR:[154,112], hipL:[140,122], hipR:[150,126], kneeL:[172,158], kneeR:[180,162], ankleL:[202,190], ankleR:[208,196]
        }), {prop:'box-right', arrow:{from:[100,95],to:[132,108]}}),
        frame('Не делай', 'Не опускай таз ниже линии плеч и пяток.', pose({
          head:[90,78], shoulderL:[106,92], shoulderR:[116,96], elbowL:[128,100], elbowR:[136,110], wristL:[152,102], wristR:[154,112], hipL:[140,140], hipR:[150,144], kneeL:[174,164], kneeR:[182,168], ankleL:[202,190], ankleR:[208,196]
        }), {prop:'box-right', bad:true, warningLine:[[88,86],[150,144]]})
      ]
    },
    'glute-bridge': {
      note: 'Вид сбоку: подъём идёт за счёт ягодиц; верхняя точка — прямая линия плечо–таз–колено.',
      frames: [
        frame('1 · Старт', 'Стопы под коленями, поясница нейтральна.', pose({
          head:[52,154], shoulderL:[72,150], shoulderR:[82,154], elbowL:[62,170], elbowR:[72,174], wristL:[48,180], wristR:[58,184], hipL:[120,154], hipR:[130,158], kneeL:[158,132], kneeR:[166,140], ankleL:[196,160], ankleR:[202,168]
        })),
        frame('2 · Верх', 'Сожми ягодицы. Не переразгибай поясницу.', pose({
          head:[52,154], shoulderL:[72,150], shoulderR:[82,154], elbowL:[62,170], elbowR:[72,174], wristL:[48,180], wristR:[58,184], hipL:[122,116], hipR:[132,120], kneeL:[158,132], kneeR:[166,140], ankleL:[196,160], ankleR:[202,168]
        }), {arrow:{from:[126,150],to:[126,118]}}),
        frame('Не делай', 'Не «ломай» поясницу, выталкивая рёбра вверх.', pose({
          head:[52,154], shoulderL:[72,150], shoulderR:[82,154], elbowL:[62,170], elbowR:[72,174], wristL:[48,180], wristR:[58,184], hipL:[122,102], hipR:[132,106], kneeL:[158,132], kneeR:[166,140], ankleL:[196,160], ankleR:[202,168]
        }), {bad:true, warningLine:[[78,150],[126,104]]})
      ]
    },
    'knee-plank': {
      note: 'Вид сбоку: от головы до колен — одна линия, локти под плечами.',
      frames: [
        frame('Правильно', 'Живот и ягодицы слегка напряжены, шея продолжает линию спины.', pose({
          head:[58,105], shoulderL:[78,108], shoulderR:[88,110], elbowL:[72,134], elbowR:[82,136], wristL:[58,142], wristR:[68,144], hipL:[126,116], hipR:[136,120], kneeL:[170,138], kneeR:[178,142], ankleL:[190,154], ankleR:[198,158]
        }), {guideLine:[[56,104],[176,140]]}),
        frame('Контроль', 'Отталкивай пол локтями и не проваливайся между плечами.', pose({
          head:[58,105], shoulderL:[78,108], shoulderR:[88,110], elbowL:[72,134], elbowR:[82,136], wristL:[58,142], wristR:[68,144], hipL:[126,116], hipR:[136,120], kneeL:[170,138], kneeR:[178,142], ankleL:[190,154], ankleR:[198,158]
        }), {arrow:{from:[78,126],to:[78,108]}}),
        frame('Не делай', 'Не провисай в пояснице и не задирай подбородок.', pose({
          head:[64,92], shoulderL:[80,108], shoulderR:[90,110], elbowL:[72,134], elbowR:[82,136], wristL:[58,142], wristR:[68,144], hipL:[126,134], hipR:[136,138], kneeL:[170,138], kneeR:[178,142], ankleL:[190,154], ankleR:[198,158]
        }), {bad:true, warningLine:[[64,96],[134,138]]})
      ]
    },
    'plank': {
      note: 'Вид сбоку: голова, грудная клетка, таз и пятки образуют одну линию.',
      frames: [
        frame('Правильно', 'Локти под плечами. Таз не выше и не ниже линии корпуса.', pose({
          head:[50,104], shoulderL:[72,108], shoulderR:[82,110], elbowL:[68,132], elbowR:[78,134], wristL:[54,142], wristR:[64,144], hipL:[124,116], hipR:[134,120], kneeL:[164,126], kneeR:[174,130], ankleL:[204,136], ankleR:[214,140]
        }), {guideLine:[[48,104],[208,138]]}),
        frame('Контроль', 'Слегка подтяни рёбра к тазу и напряги ягодицы.', pose({
          head:[50,104], shoulderL:[72,108], shoulderR:[82,110], elbowL:[68,132], elbowR:[78,134], wristL:[54,142], wristR:[64,144], hipL:[124,116], hipR:[134,120], kneeL:[164,126], kneeR:[174,130], ankleL:[204,136], ankleR:[214,140]
        }), {arrow:{from:[128,136],to:[128,116]}}),
        frame('Не делай', 'Не проваливай таз и не выгибай поясницу.', pose({
          head:[50,104], shoulderL:[72,108], shoulderR:[82,110], elbowL:[68,132], elbowR:[78,134], wristL:[54,142], wristR:[64,144], hipL:[124,140], hipR:[134,144], kneeL:[164,132], kneeR:[174,136], ankleL:[204,136], ankleR:[214,140]
        }), {bad:true, warningLine:[[72,108],[134,144]]})
      ]
    },
    'reverse-lunge': {
      note: 'Вид сбоку: шаг назад достаточно длинный; передняя стопа полностью на полу.',
      frames: [
        frame('1 · Старт', 'Стой ровно, стопы примерно на ширине таза.', pose({head:[130,38], shoulderL:[124,66], shoulderR:[138,68], hipL:[128,118], hipR:[140,120], kneeL:[128,168], kneeR:[142,170], ankleL:[126,218], ankleR:[146,218]})),
        frame('2 · Нижняя фаза', 'Опускайся вниз. Переднее колено остаётся над стопой.', pose({head:[124,52], shoulderL:[120,80], shoulderR:[134,82], hipL:[126,122], hipR:[140,124], kneeL:[114,166], kneeR:[160,174], ankleL:[106,218], ankleR:[190,218]}), {arrow:{from:[132,100],to:[132,140]}}),
        frame('Не делай', 'Не заваливайся вперёд и не позволяй переднему колену уходить внутрь.', pose({head:[108,68], shoulderL:[110,92], shoulderR:[124,94], hipL:[130,124], hipR:[142,126], kneeL:[126,164], kneeR:[160,174], ankleL:[106,218], ankleR:[190,218]}), {bad:true, warningLine:[[110,70],[132,128]]})
      ]
    },
    'bird-dog': {
      note: 'Вид сбоку: противоположные рука и нога вытягиваются, а таз остаётся ровным.',
      frames: [
        frame('1 · Старт', 'Ладони под плечами, колени под тазом.', pose({head:[70,104], shoulderL:[90,108], shoulderR:[100,110], elbowL:[82,136], elbowR:[112,136], wristL:[70,160], wristR:[120,160], hipL:[138,112], hipR:[148,116], kneeL:[136,156], kneeR:[166,156], ankleL:[136,180], ankleR:[166,180]})),
        frame('2 · Вытяжение', 'Рука вперёд, противоположная нога назад. Таз не разворачивается.', pose({head:[70,104], shoulderL:[90,108], shoulderR:[100,110], elbowL:[68,106], elbowR:[112,136], wristL:[42,104], wristR:[120,160], hipL:[138,112], hipR:[148,116], kneeL:[136,156], kneeR:[170,116], ankleL:[136,180], ankleR:[208,112]}), {arrow:{from:[70,106],to:[42,104]}}),
        frame('Не делай', 'Не поднимай ногу слишком высоко и не прогибай поясницу.', pose({head:[70,104], shoulderL:[90,108], shoulderR:[100,110], elbowL:[68,106], elbowR:[112,136], wristL:[42,104], wristR:[120,160], hipL:[138,126], hipR:[148,130], kneeL:[136,156], kneeR:[174,92], ankleL:[136,180], ankleR:[210,82]}), {bad:true, warningLine:[[96,112],[150,130]]})
      ]
    },
    'dead-bug': {
      note: 'Вид сбоку/сверху условный: поясница остаётся стабильной, движение выполняют противоположные рука и нога.',
      frames: [
        frame('1 · Старт', 'Руки вверх, бедра над тазом, колени согнуты.', pose({head:[54,146], shoulderL:[76,144], shoulderR:[86,148], elbowL:[78,112], elbowR:[88,114], wristL:[80,82], wristR:[92,84], hipL:[126,146], hipR:[136,150], kneeL:[150,114], kneeR:[160,118], ankleL:[174,88], ankleR:[184,92]})),
        frame('2 · Диагональ', 'Медленно опускай противоположные руку и ногу, не отрывая поясницу.', pose({head:[54,146], shoulderL:[76,144], shoulderR:[86,148], elbowL:[62,124], elbowR:[98,116], wristL:[42,104], wristR:[108,86], hipL:[126,146], hipR:[136,150], kneeL:[150,114], kneeR:[166,156], ankleL:[174,88], ankleR:[204,170]}), {arrow:{from:[90,112],to:[108,86]}}),
        frame('Не делай', 'Не позволяй пояснице отрываться от пола при увеличении амплитуды.', pose({head:[54,146], shoulderL:[76,144], shoulderR:[86,148], elbowL:[62,124], elbowR:[98,116], wristL:[42,104], wristR:[108,86], hipL:[126,130], hipR:[136,134], kneeL:[150,114], kneeR:[166,156], ankleL:[174,88], ankleR:[204,170]}), {bad:true, warningLine:[[82,150],[136,134]]})
      ]
    },
    'bar-hang': {
      note: 'Вид спереди: руки прямые, корпус спокойный, плечи не «вдавливаются» в уши.',
      frames: [
        frame('Правильно', 'Хват устойчивый. Шея длинная, рёбра собраны.', pose({head:[150,74], shoulderL:[132,98], shoulderR:[168,98], elbowL:[126,72], elbowR:[174,72], wristL:[120,42], wristR:[180,42], hipL:[140,140], hipR:[160,140], kneeL:[140,180], kneeR:[160,180], ankleL:[140,218], ankleR:[160,218]}), {prop:'bar'}),
        frame('Активный вис', 'Слегка опусти плечи от ушей, не сгибая локти.', pose({head:[150,68], shoulderL:[132,92], shoulderR:[168,92], elbowL:[126,68], elbowR:[174,68], wristL:[120,42], wristR:[180,42], hipL:[140,134], hipR:[160,134], kneeL:[140,176], kneeR:[160,176], ankleL:[140,216], ankleR:[160,216]}), {prop:'bar', arrow:{from:[132,104],to:[132,92]}}),
        frame('Не делай', 'Не «висни» пассивно, если плечо чувствует нестабильность или боль.', pose({head:[150,82], shoulderL:[132,110], shoulderR:[168,110], elbowL:[126,78], elbowR:[174,78], wristL:[120,42], wristR:[180,42], hipL:[140,150], hipR:[160,150], kneeL:[140,186], kneeR:[160,186], ankleL:[140,218], ankleR:[160,218]}), {prop:'bar', bad:true, warningLine:[[128,106],[172,106]]})
      ]
    },
    'scap-pull': {
      note: 'Вид спереди: локти всё время прямые; движение происходит за счёт лопаток и положения плеч.',
      frames: [
        frame('1 · Нижняя фаза', 'Руки прямые, тело спокойно.', pose({head:[150,82], shoulderL:[132,108], shoulderR:[168,108], elbowL:[126,78], elbowR:[174,78], wristL:[120,42], wristR:[180,42], hipL:[140,150], hipR:[160,150], kneeL:[140,186], kneeR:[160,186], ankleL:[140,218], ankleR:[160,218]}), {prop:'bar'}),
        frame('2 · Лопатки вниз', 'Опусти плечи от ушей и слегка подними тело без сгибания локтей.', pose({head:[150,70], shoulderL:[132,94], shoulderR:[168,94], elbowL:[126,70], elbowR:[174,70], wristL:[120,42], wristR:[180,42], hipL:[140,138], hipR:[160,138], kneeL:[140,180], kneeR:[160,180], ankleL:[140,216], ankleR:[160,216]}), {prop:'bar', arrow:{from:[150,116],to:[150,92]}}),
        frame('Не делай', 'Не превращай движение в обычное подтягивание и не сгибай локти.', pose({head:[150,64], shoulderL:[132,90], shoulderR:[168,90], elbowL:[136,68], elbowR:[164,68], wristL:[120,42], wristR:[180,42], hipL:[140,132], hipR:[160,132], kneeL:[140,176], kneeR:[160,176], ankleL:[140,214], ankleR:[160,214]}), {prop:'bar', bad:true, warningLine:[[126,72],[138,66]]})
      ]
    },
    'assisted-pull': {
      note: 'Вид спереди: помощь снижает нагрузку, но траектория остаётся как у обычного подтягивания.',
      frames: [
        frame('1 · Старт', 'Активный вис. Корпус собран, помощь ногой/резиной умеренная.', pose({head:[150,78], shoulderL:[132,104], shoulderR:[168,104], elbowL:[126,74], elbowR:[174,74], wristL:[120,42], wristR:[180,42], hipL:[140,146], hipR:[160,146], kneeL:[138,184], kneeR:[164,178], ankleL:[138,218], ankleR:[178,202]}), {prop:'bar-support'}),
        frame('2 · Подъём', 'Тяни грудь к перекладине, локти вниз и назад.', pose({head:[150,52], shoulderL:[132,78], shoulderR:[168,78], elbowL:[126,92], elbowR:[174,92], wristL:[120,42], wristR:[180,42], hipL:[140,122], hipR:[160,122], kneeL:[138,164], kneeR:[164,158], ankleL:[138,202], ankleR:[178,184]}), {prop:'bar-support', arrow:{from:[150,128],to:[150,84]}}),
        frame('Не делай', 'Не отталкивайся ногами рывком и не запрокидывай голову к перекладине.', pose({head:[150,42], shoulderL:[132,78], shoulderR:[168,78], elbowL:[126,92], elbowR:[174,92], wristL:[120,42], wristR:[180,42], hipL:[140,126], hipR:[160,126], kneeL:[132,154], kneeR:[170,154], ankleL:[120,174], ankleR:[190,174]}), {prop:'bar-support', bad:true, warningLine:[[145,44],[166,54]]})
      ]
    }
  };

  guides['bench-squat'] = guides['chair-squat'];

  function propSvg(type) {
    if (type === 'chair') return `<g stroke="${COLORS.prop}" stroke-width="6" fill="none" stroke-linecap="round"><line x1="175" y1="122" x2="225" y2="122"/><line x1="180" y1="122" x2="180" y2="216"/><line x1="218" y1="122" x2="218" y2="216"/><line x1="222" y1="72" x2="222" y2="122"/></g>`;
    if (type === 'wall-right') return `<line x1="224" y1="28" x2="224" y2="220" stroke="${COLORS.prop}" stroke-width="8" stroke-linecap="round"/>`;
    if (type === 'box-right') return `<rect x="172" y="102" width="58" height="112" rx="8" fill="#eef2f7" stroke="${COLORS.prop}" stroke-width="5"/>`;
    if (type === 'bar') return `<line x1="82" y1="34" x2="218" y2="34" stroke="${COLORS.prop}" stroke-width="8" stroke-linecap="round"/>`;
    if (type === 'bar-support') return `<line x1="82" y1="34" x2="218" y2="34" stroke="${COLORS.prop}" stroke-width="8" stroke-linecap="round"/><rect x="110" y="205" width="80" height="12" rx="6" fill="#dbe4ef"/>`;
    return '';
  }

  function personSvg(p, isBad) {
    const stroke = isBad ? '#243247' : COLORS.ink;
    const limb = (a,b,back=false) => `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${back ? COLORS.muted : stroke}" stroke-width="10" stroke-linecap="round" opacity="${back?0.58:1}"/>`;
    const joint = pt => `<circle cx="${pt[0]}" cy="${pt[1]}" r="5.5" fill="${COLORS.joint}" stroke="${stroke}" stroke-width="3"/>`;
    const torso = `<path d="M ${p.shoulderL[0]} ${p.shoulderL[1]} L ${p.shoulderR[0]} ${p.shoulderR[1]} L ${p.hipR[0]} ${p.hipR[1]} L ${p.hipL[0]} ${p.hipL[1]} Z" fill="${COLORS.body}" stroke="${stroke}" stroke-width="4" stroke-linejoin="round"/>`;
    return [
      limb(p.shoulderR,p.elbowR,true), limb(p.elbowR,p.wristR,true),
      limb(p.hipR,p.kneeR,true), limb(p.kneeR,p.ankleR,true),
      torso,
      limb(p.shoulderL,p.elbowL), limb(p.elbowL,p.wristL),
      limb(p.hipL,p.kneeL), limb(p.kneeL,p.ankleL),
      `<line x1="${(p.shoulderL[0]+p.shoulderR[0])/2}" y1="${(p.shoulderL[1]+p.shoulderR[1])/2}" x2="${p.head[0]}" y2="${p.head[1]+15}" stroke="${stroke}" stroke-width="8" stroke-linecap="round"/>`,
      `<circle cx="${p.head[0]}" cy="${p.head[1]}" r="17" fill="#F5F8FC" stroke="${stroke}" stroke-width="4"/>`,
      joint(p.elbowL), joint(p.elbowR), joint(p.kneeL), joint(p.kneeR)
    ].join('');
  }

  function arrowSvg(a) {
    if (!a) return '';
    const [x1,y1] = a.from, [x2,y2] = a.to;
    const ang = Math.atan2(y2-y1,x2-x1), s=10;
    const p2=[x2-s*Math.cos(ang-Math.PI/6),y2-s*Math.sin(ang-Math.PI/6)];
    const p3=[x2-s*Math.cos(ang+Math.PI/6),y2-s*Math.sin(ang+Math.PI/6)];
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${COLORS.accent}" stroke-width="5" stroke-linecap="round"/><polygon points="${x2},${y2} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}" fill="${COLORS.accent}"/>`;
  }

  function lineSvg(line, bad=false) {
    if (!line) return '';
    return `<line x1="${line[0][0]}" y1="${line[0][1]}" x2="${line[1][0]}" y2="${line[1][1]}" stroke="${bad?COLORS.bad:COLORS.good}" stroke-width="4" stroke-dasharray="8 7" stroke-linecap="round"/>`;
  }

  function svgFrame(f) {
    return `<svg viewBox="0 0 300 250" aria-hidden="true">
      <rect x="1" y="1" width="298" height="248" rx="16" fill="#fff"/>
      <line x1="26" y1="220" x2="274" y2="220" stroke="${COLORS.grid}" stroke-width="3"/>
      ${propSvg(f.prop)}
      ${f.guideLine ? lineSvg(f.guideLine,false) : ''}
      ${f.warningLine ? lineSvg(f.warningLine,true) : ''}
      ${personSvg(f.pose, f.bad)}
      ${arrowSvg(f.arrow)}
    </svg>`;
  }

  function visualSection(id) {
    const g = guides[id];
    if (!g) return null;
    const section = document.createElement('section');
    section.className = 'tech-visual-v2';
    section.setAttribute('data-tech-visual-v2', id);
    section.innerHTML = `
      <div class="tech-visual-v2__head">
        <div><h3>Визуальная техника</h3><p>${g.note}</p></div>
        <span class="tech-visual-v2__badge">ПОКАДРОВАЯ СХЕМА</span>
      </div>
      <div class="tech-visual-v2__frames">
        ${g.frames.map(f => `<article class="tech-frame ${f.bad?'tech-frame--bad':''}">
          <div class="tech-frame__label"><span class="tech-frame__dot"></span>${f.label}</div>
          ${svgFrame(f)}
          <div class="tech-frame__cue">${f.cue}</div>
        </article>`).join('')}
      </div>
      <div class="tech-visual-v2__legend">
        <span class="tech-legend-item"><span class="tech-legend-line"></span> траектория / ориентир</span>
        <span class="tech-legend-item"><span class="tech-legend-line tech-legend-line--bad"></span> ошибка / нежелательное положение</span>
      </div>`;
    return section;
  }

  function mount(id) {
    const content = document.getElementById('exerciseModalContent');
    if (!content) return;
    content.querySelectorAll('[data-tech-visual-v2]').forEach(el => el.remove());
    const section = visualSection(id);
    if (!section) return;
    const intro = content.querySelector('.modal-intro');
    if (intro) intro.insertAdjacentElement('afterend', section);
    else content.prepend(section);
  }

  const originalOpen = window.openExerciseModal;
  if (typeof originalOpen === 'function') {
    window.openExerciseModal = function(id) {
      originalOpen(id);
      requestAnimationFrame(() => mount(id));
    };
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-exercise-id]');
    if (!trigger) return;
    const id = trigger.dataset.exerciseId;
    requestAnimationFrame(() => mount(id));
  }, true);
})();
