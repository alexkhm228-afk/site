(() => {
  const kindById = {
    march:'march',joints:'mobility','arm-circles':'arms','cat-cow':'catcow','hip-openers':'hip','jumping-jacks':'jack','ninety-ninety':'mobility','ankle-roll':'calf',
    'chair-squat':'squat','bench-squat':'squat','goblet-squat':'squat','leg-press':'legpress','step-up':'step','reverse-lunge':'lunge','wall-sit':'wallsit','calf-raise':'calf','single-leg-balance':'balance',
    'wall-push':'wallpush','incline-push':'inclinepush','knee-push':'pushup',pushup:'pushup','bench-dip':'dip','db-press':'benchpress','overhead-press':'overhead',
    'db-row':'row','cable-row':'seatedrow','lat-pulldown':'pulldown','bar-hang':'hang','scap-pull':'scappull','assisted-pull':'pullup','inverted-row':'invertedrow',
    'glute-bridge':'bridge',rdl:'hinge','good-morning':'hinge','bird-dog':'birddog','dead-bug':'deadbug','knee-plank':'kneelplank',plank:'plank',pallof:'pallof','mountain-climber':'climber',
    'shadow-box':'box','high-knees':'highknees','easy-run':'run',bike:'bike','chest-open':'chestopen','thoracic-rot':'rotation','world-stretch':'world','hamstring-fold':'hamfold','quad-stretch':'quad','child-pose':'child','pec-stretch':'pec',breathing:'breathing'
  };

  const captions = {
    squat:'Таз уходит назад и вниз; колени направлены по линии носков.',
    lunge:'Опускайся вертикально; переднее колено остаётся над стопой.',
    step:'Ставь всю стопу на опору и поднимайся без резкого толчка второй ногой.',
    wallsit:'Спина прижата к стене, колени направлены по линии стоп.',
    calf:'Поднимайся вертикально на носки и опускайся под контролем.',
    balance:'Таз остаётся ровным, опорное колено мягкое.',
    wallpush:'Корпус движется одной линией к стене и обратно.',
    inclinepush:'Корпус остаётся прямой линией; опора должна быть устойчивой.',
    pushup:'Не провисай в пояснице; грудь опускается между кистями.',
    dip:'Плечи опущены, локти идут назад; не опускайся чрезмерно глубоко.',
    benchpress:'Лопатки собраны, гантели движутся над грудью.',
    overhead:'Рёбра собраны; не переразгибай поясницу при жиме вверх.',
    row:'Локоть идёт назад к тазу, корпус не вращается.',
    seatedrow:'Грудь раскрыта; рукоять идёт к нижним рёбрам.',
    pulldown:'Локти движутся вниз; рукоять опускается к верхней части груди.',
    hang:'Руки прямые, плечи под контролем, шея длинная.',
    scappull:'Движение небольшое и выполняется без сгибания локтей.',
    pullup:'Грудь тянется к перекладине, локти идут вниз и назад.',
    invertedrow:'Корпус остаётся прямым; тяни грудь к перекладине.',
    bridge:'Таз поднимается ягодицами, а не за счёт прогиба поясницы.',
    hinge:'Таз уходит назад, спина сохраняет длину и нейтральное положение.',
    birddog:'Таз не разворачивается; рука и противоположная нога вытягиваются в линию.',
    deadbug:'Поясница стабильна; конечности опускаются только до сохранения контроля.',
    plank:'Макушка тянется вперёд, пятки назад; таз не провисает.',
    kneelplank:'Прямая линия от головы до колен; локти находятся под плечами.',
    pallof:'Руки уходят вперёд, а корпус сопротивляется вращению.',
    climber:'Сохраняй форму планки, пока колени поочерёдно идут к груди.',
    march:'Шагай мягко, сохраняя вертикальный корпус и естественную работу рук.',
    highknees:'Корпус высокий, приземление мягкое и короткое.',
    run:'Стопа приземляется близко под центром тела; не делай чрезмерно длинный шаг.',
    jack:'Руки и ноги разводятся синхронно; приземление мягкое.',
    box:'Удар сопровождается небольшим разворотом корпуса; локоть не выщёлкивай.',
    bike:'Колени движутся по линии стоп, корпус остаётся устойчивым.',
    mobility:'Двигай суставами мягко и без рывков, постепенно увеличивая амплитуду.',
    arms:'Плечи не поднимай к ушам; движение начинается в плечевых суставах.',
    catcow:'Чередуй округление и раскрытие всей спины без резкого прогиба поясницы.',
    hip:'Корпус остаётся ровным; движение происходит в тазобедренном суставе.',
    chestopen:'Раскрывай грудной отдел, не компенсируя сильным прогибом поясницы.',
    rotation:'Таз остаётся стабильным; вращается грудная клетка.',
    world:'Переднее колено стабильно; поворот выполняется из грудного отдела.',
    hamfold:'Наклон начинается от таза; не округляй спину ради глубины.',
    quad:'Колени рядом, таз слегка подкручен; не прогибай поясницу.',
    child:'Таз тянется к пяткам, спина мягко удлиняется.',
    pec:'Плечо опущено; поворачивай корпус мягко и без боли.',
    breathing:'Плечи расслаблены; выдох можно сделать немного длиннее вдоха.',
    legpress:'Поясница прижата к спинке; колени не блокируются в верхней точке.'
  };

  const phases = {
    squat:['Старт','Низ'],lunge:['Старт','Низ'],step:['Старт','Наверх'],wallsit:['Удержание','Удержание'],calf:['Низ','Верх'],balance:['Баланс','Баланс'],
    wallpush:['Старт','К стене'],inclinepush:['Старт','Низ'],pushup:['Верх','Низ'],dip:['Верх','Низ'],benchpress:['Низ','Верх'],overhead:['У плеч','Вверх'],
    row:['Старт','Тяга'],seatedrow:['Старт','Тяга'],pulldown:['Верх','К груди'],hang:['Вис','Вис'],scappull:['Вис','Лопатки вниз'],pullup:['Низ','Вверх'],invertedrow:['Низ','К перекладине'],
    bridge:['Низ','Верх'],hinge:['Старт','Наклон'],birddog:['Старт','Диагональ'],deadbug:['Старт','Диагональ'],plank:['Удержание','Удержание'],kneelplank:['Удержание','Удержание'],
    pallof:['У груди','Выжим'],climber:['Нога 1','Нога 2'],march:['Правая','Левая'],highknees:['Правая','Левая'],run:['Фаза 1','Фаза 2'],jack:['Старт','Развод'],box:['Стойка','Удар'],bike:['Педаль 1','Педаль 2'],
    mobility:['Плавно','Плавно'],arms:['В стороны','Круг'],catcow:['Округление','Раскрытие'],hip:['Колено вверх','Отведение'],chestopen:['Нейтрально','Раскрытие'],rotation:['Центр','Поворот'],world:['Выпад','Поворот'],hamfold:['Старт','Наклон'],quad:['Растяжка','Растяжка'],child:['Поза','Поза'],pec:['Старт','Растяжка'],breathing:['Вдох','Выдох'],legpress:['Согнуто','Жим']
  };

  function line(x1,y1,x2,y2,c='body'){ return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="ga-${c}"/>`; }
  function head(x,y){ return `<circle cx="${x}" cy="${y}" r="11" class="ga-head"/>`; }
  function arrow(x1,y1,x2,y2){ return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="ga-arrow"/><polygon points="${x2},${y2} ${x2-7},${y2-4} ${x2-7},${y2+4}" class="ga-arrowhead"/>`; }
  function figure(p, extra=''){
    return `${head(p.h[0],p.h[1])}${line(...p.n,...p.h)}${line(...p.n,...p.c)}${line(...p.c,...p.s1)}${line(...p.c,...p.s2)}${line(...p.s1,...p.e1)}${line(...p.e1,...p.w1)}${line(...p.s2,...p.e2)}${line(...p.e2,...p.w2)}${line(...p.c,...p.p)}${line(...p.p,...p.k1)}${line(...p.k1,...p.a1)}${line(...p.p,...p.k2)}${line(...p.k2,...p.a2)}${extra}`;
  }
  function P(h=[100,32],n=[100,46],c=[100,66],p=[100,104],s1=[88,66],s2=[112,66],e1=[86,88],e2=[114,88],w1=[86,112],w2=[114,112],k1=[92,144],k2=[108,144],a1=[92,178],a2=[108,178]){ return {h,n,c,p,s1,s2,e1,e2,w1,w2,k1,k2,a1,a2}; }
  const stand=()=>P();

  function scene(kind, phase){
    let p=stand(), extra='';
    if(kind==='squat' && phase){p=P([100,48],[100,61],[100,80],[100,116],[88,80],[112,80],[82,100],[118,100],[78,120],[122,120],[82,146],[118,146],[76,178],[124,178]);extra=`<rect x="132" y="118" width="34" height="7" rx="3" class="ga-prop"/>${arrow(100,96,100,128)}`;}
    else if(kind==='squat'){extra='<rect x="132" y="118" width="34" height="7" rx="3" class="ga-prop"/>';}
    else if(kind==='lunge'){p=P([100,36],[100,50],[100,70],[100,106],[88,70],[112,70],[86,94],[114,94],[86,116],[114,116],phase?[88,146]:[92,136],phase?[132,146]:[128,138],[86,178],[154,178]);if(phase)extra=arrow(100,96,100,128);}
    else if(kind==='step'){extra='<rect x="125" y="135" width="50" height="10" rx="4" class="ga-prop"/>';if(phase)p=P([102,22],[102,36],[102,55],[102,88],[90,55],[114,55],[88,78],[116,78],[88,100],[116,100],[120,115],[106,130],[142,135],[104,165]);else p=P(undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,undefined,[112,136],[108,144],[136,135],[108,178]);}
    else if(kind==='wallsit'){p=P([68,42],[68,56],[68,76],[68,112],[56,76],[80,76],[54,98],[82,98],[54,120],[82,120],[108,112],[108,122],[108,178],[108,178]);extra='<line x1="42" y1="20" x2="42" y2="184" class="ga-prop"/>';}
    else if(kind==='calf'){if(phase){p.a1=[92,170];p.a2=[108,170];extra=arrow(100,176,100,150);}}
    else if(kind==='balance'){p.k2=[128,132];p.a2=[140,158];extra='<circle cx="100" cy="104" r="12" class="ga-core"/>';}
    else if(kind==='wallpush'){p=P([124,52],[112,62],[98,74],[76,96],[94,72],[102,78],phase?[126,72]:[114,80],phase?[138,78]:[124,88],[158,68],[158,82],[58,126],[66,132],[38,170],[46,176]);extra='<line x1="170" y1="22" x2="170" y2="184" class="ga-prop"/>';}
    else if(kind==='inclinepush'){p=P([60,62],[74,68],[92,76],[120,92],[88,76],[98,80],phase?[118,86]:[106,84],phase?[128,92]:[116,90],[145,88],[145,100],[145,122],[154,128],[176,154],[184,158]);extra='<rect x="144" y="78" width="38" height="55" rx="5" class="ga-prop"/>';}
    else if(kind==='pushup'||kind==='plank'||kind==='kneelplank'||kind==='climber'){p=P([50,92],[64,92],[82,94],[120,98],[80,94],[90,96],[68,101],[98,101],[54,108],[108,108],kind==='kneelplank'?[150,112]:(kind==='climber'&&phase?[148,118]:[154,108]),kind==='kneelplank'?[158,118]:(kind==='climber'&&!phase?[148,118]:[162,112]),kind==='kneelplank'?[164,130]:[190,120],kind==='kneelplank'?[172,132]:[198,122]);if(kind==='pushup'&&phase){p.c=[86,106];p.p=[122,108];p.e1=[76,112];p.e2=[104,112];} if(kind==='plank'||kind==='kneelplank')extra='<circle cx="116" cy="99" r="14" class="ga-core"/>';}
    else if(kind==='dip'){p=P([100,40],[100,54],[100,74],[100,108],[88,74],[112,74],phase?[80,98]:[86,92],phase?[120,98]:[114,92],[68,112],[132,112],[132,118],[144,122],[166,126],[178,130]);extra='<rect x="50" y="111" width="28" height="8" rx="3" class="ga-prop"/>';}
    else if(kind==='benchpress'){p=P([52,122],[66,122],[86,122],[116,122],[84,114],[84,130],phase?[106,102]:[106,112],phase?[106,142]:[106,132],phase?[130,92]:[130,108],phase?[130,152]:[130,136],[148,112],[148,132],[176,108],[176,136]);extra='<rect x="72" y="130" width="86" height="9" rx="4" class="ga-prop"/>';}
    else if(kind==='overhead'){if(phase){p.e1=[86,52];p.e2=[114,52];p.w1=[86,28];p.w2=[114,28];}else{p.e1=[84,72];p.e2=[116,72];p.w1=[86,56];p.w2=[114,56];}}
    else if(kind==='row'){p=P([78,52],[90,60],[108,70],[132,88],[104,70],[114,74],phase?[124,72]:[122,88],[116,90],phase?[138,66]:[134,106],[126,104],[148,128],[160,132],[166,174],[180,178]);extra='<rect x="130" y="88" width="26" height="7" rx="3" class="ga-prop"/>';}
    else if(kind==='seatedrow'){p=P([70,66],[70,80],[82,92],[104,116],[78,92],[88,96],phase?[102,88]:[90,102],phase?[108,98]:[96,108],phase?[118,90]:[138,100],phase?[118,100]:[138,112],[140,122],[140,132],[170,126],[170,140]);extra='<line x1="164" y1="40" x2="164" y2="172" class="ga-prop"/>';}
    else if(kind==='pulldown'){p=P();extra='<line x1="55" y1="24" x2="145" y2="24" class="ga-prop"/>';if(phase){p.e1=[86,96];p.e2=[114,96];p.w1=[86,78];p.w2=[114,78];}else{p.e1=[78,58];p.e2=[122,58];p.w1=[70,34];p.w2=[130,34];}}
    else if(kind==='hang'||kind==='scappull'||kind==='pullup'){p=P([100,68],[100,82],[100,100],[100,130],[88,100],[112,100],[88,78],[112,78],[88,48],[112,48],[92,158],[108,158],[92,188],[108,188]);extra='<line x1="45" y1="40" x2="155" y2="40" class="ga-prop"/>';if((kind==='scappull'&&phase)||kind==='pullup'&&phase){p.h=[100,54];p.n=[100,68];p.c=[100,86];p.p=[100,116];p.k1=[92,148];p.k2=[108,148];p.a1=[92,180];p.a2=[108,180];}}
    else if(kind==='invertedrow'){p=P([54,122],[68,122],[90,122],[128,122],[88,116],[88,128],[82,110],[82,134],[78,102],[78,142],[158,116],[158,130],[190,114],[190,132]);extra='<line x1="76" y1="96" x2="145" y2="96" class="ga-prop"/>';if(phase){p.h=[72,110];p.n=[86,110];p.c=[104,110];}}
    else if(kind==='bridge'){p=P([48,140],[62,140],[82,140],phase?[120,104]:[120,140],[80,132],[80,148],[68,140],[68,152],[56,148],[56,156],[148,126],[148,138],[178,138],[178,146]);if(phase)extra=arrow(120,136,120,106);}
    else if(kind==='hinge'){if(phase)p=P([82,52],[94,60],[112,70],[138,88],[108,70],[118,74],[116,94],[126,98],[126,118],[136,122],[148,130],[162,134],[150,176],[172,178]);}
    else if(kind==='birddog'){p=P([56,80],[70,82],[92,86],[132,92],[90,86],[100,90],[72,86],phase?[100,90]:[114,94],[52,86],phase?[126,94]:[136,98],[132,110],phase?[158,92]:[158,110],[132,132],phase?[190,88]:[158,132]);if(phase){p.e1=[52,86];p.w1=[30,86];extra=arrow(150,92,190,92);}}
    else if(kind==='deadbug'){p=P([48,110],[62,110],[84,110],[116,110],[82,102],[82,118],[66,86],phase?[98,138]:[66,134],[50,68],phase?[116,156]:[50,152],phase?[150,88]:[144,86],phase?[150,142]:[144,138],phase?[180,68]:[170,64],phase?[180,160]:[170,158]);}
    else if(kind==='pallof'){extra='<line x1="36" y1="42" x2="36" y2="178" class="ga-prop"/>';p.w1=phase?[132,88]:[108,88];p.w2=phase?[132,98]:[108,98];p.e1=phase?[118,86]:[96,86];p.e2=phase?[118,100]:[96,100];}
    else if(kind==='march'||kind==='highknees'||kind==='run'){p.k1=phase?[130,134]:[92,146];p.a1=phase?[146,166]:[84,178];p.k2=phase?[92,146]:[130,134];p.a2=phase?[84,178]:[146,166];p.e1=phase?[116,92]:[84,92];p.w1=phase?[130,112]:[72,112];p.e2=phase?[84,92]:[116,92];p.w2=phase?[72,112]:[130,112];if(kind==='highknees'){p.k1=phase?[140,118]:[90,146];p.k2=phase?[90,146]:[140,118];}}
    else if(kind==='jack'&&phase){p.e1=[72,52];p.e2=[128,52];p.w1=[58,30];p.w2=[142,30];p.k1=[76,148];p.k2=[124,148];p.a1=[58,178];p.a2=[142,178];}
    else if(kind==='box'){p.e1=[84,82];p.w1=[92,62];if(phase){p.e2=[124,74];p.w2=[156,74];extra=arrow(122,74,158,74);}else{p.e2=[116,82];p.w2=[108,62];}}
    else if(kind==='bike'){p=P([70,62],[82,68],[100,76],[120,96],[96,76],[106,80],[122,86],[134,88],[148,86],[158,90],phase?[146,118]:[146,142],phase?[146,142]:[146,118],phase?[172,134]:[164,160],phase?[164,160]:[172,134]);extra='<circle cx="132" cy="150" r="17" class="ga-prop"/><circle cx="176" cy="150" r="17" class="ga-prop"/><line x1="132" y1="150" x2="154" y2="116" class="ga-prop"/><line x1="154" y1="116" x2="176" y2="150" class="ga-prop"/>';}
    else if(kind==='arms'){if(phase){p.e1=[72,66];p.w1=[52,66];p.e2=[128,66];p.w2=[148,66];extra='<circle cx="60" cy="66" r="14" class="ga-motion"/><circle cx="140" cy="66" r="14" class="ga-motion"/>';}}
    else if(kind==='catcow'){p=P([54,90],[70,92],[92,94],phase?[136,88]:[136,108],[90,94],[100,98],[72,94],[116,100],[50,94],[136,106],[136,122],[164,122],[136,142],[164,142]);extra=phase?'<path d="M86 100 Q112 76 140 92" class="ga-spine"/>':'<path d="M86 92 Q112 118 140 108" class="ga-spine"/>';}
    else if(kind==='hip'){if(phase){p.k1=[76,128];p.a1=[68,158];}else{p.k1=[94,126];p.a1=[94,156];}}
    else if(kind==='chestopen'&&phase){p.e1=[70,68];p.w1=[52,62];p.e2=[130,68];p.w2=[148,62];extra=arrow(100,76,142,64);}
    else if(kind==='rotation'&&phase){p.s1=[92,66];p.s2=[126,58];p.e2=[146,58];p.w2=[160,58];extra=arrow(112,68,154,58);}
    else if(kind==='world'){p=lunge(true);if(phase){p.e2=[136,64];p.w2=[154,42];extra=arrow(126,74,156,46);}}
    else if(kind==='hamfold'&&phase){p=P([82,56],[94,64],[112,72],[136,90],[108,72],[118,76],[118,98],[128,102],[128,122],[138,126],[146,134],[164,138],[146,178],[166,178]);}
    else if(kind==='quad'){p.k2=[132,140];p.a2=[116,132];p.w2=[116,132];}
    else if(kind==='child'){p=P([70,126],[84,126],[104,126],[136,130],[102,120],[110,126],[80,122],[68,122],[54,122],[42,122],[140,146],[150,150],[122,158],[132,160]);}
    else if(kind==='pec'){extra='<line x1="164" y1="28" x2="164" y2="182" class="ga-prop"/>';if(phase){p.e2=[140,72];p.w2=[162,74];p.c=[94,68];p.p=[92,104];}}
    else if(kind==='breathing'){extra=phase?'<ellipse cx="100" cy="82" rx="24" ry="18" class="ga-breath"/>':'<ellipse cx="100" cy="82" rx="18" ry="13" class="ga-breath"/>';}
    else if(kind==='legpress'){p=P([48,120],[62,120],[82,120],[110,118],[80,112],[80,128],[66,116],[66,132],[54,122],[54,138],phase?[144,112]:[138,102],phase?[144,132]:[138,142],phase?[184,110]:[166,88],phase?[184,136]:[166,156]);extra='<polyline points="190,72 205,72 205,166 190,166" class="ga-prop"/>';}
    else if(kind==='mobility'){extra='<circle cx="86" cy="70" r="13" class="ga-motion"/><circle cx="114" cy="70" r="13" class="ga-motion"/>';}
    return `<svg viewBox="0 0 200 200" aria-hidden="true"><line x1="24" y1="182" x2="176" y2="182" class="ga-ground"/>${figure(p,extra)}</svg>`;
  }

  function injectStyle(){
    if(document.getElementById('gymAnimStyle')) return;
    const s=document.createElement('style');s.id='gymAnimStyle';s.textContent=`
      .ga-wrap{margin:22px 0 4px;padding:18px;border:1px solid var(--line);border-radius:20px;background:linear-gradient(180deg,#fbfdff,#f1f6ff)}
      .ga-headrow{display:flex;justify-content:space-between;gap:12px;align-items:center;margin-bottom:12px}.ga-title{font-weight:800}.ga-badge{font-size:11px;font-weight:800;padding:6px 9px;border-radius:999px;background:#e7efff;color:#2451a8}
      .ga-stage{display:grid;grid-template-columns:1fr 1fr;gap:12px}.ga-frame{position:relative;min-height:210px;border:1px solid #dfe6f2;border-radius:16px;background:#fff;padding:8px}.ga-frame.active{box-shadow:0 0 0 2px rgba(52,99,230,.15) inset}.ga-phase{position:absolute;left:12px;top:10px;z-index:2;font-size:11px;font-weight:800;color:#52627a;background:#f3f6fb;padding:5px 8px;border-radius:999px}.ga-frame svg{width:100%;height:210px;display:block}.ga-body{stroke:#152033;stroke-width:5;stroke-linecap:round;stroke-linejoin:round}.ga-head{fill:#fff;stroke:#152033;stroke-width:4}.ga-prop{fill:none;stroke:#9aa9bc;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}.ga-ground{stroke:#d8e0ea;stroke-width:3}.ga-core{fill:rgba(52,99,230,.12);stroke:#3463e6;stroke-width:2}.ga-arrow{stroke:#3463e6;stroke-width:3;stroke-dasharray:7 6}.ga-arrowhead{fill:#3463e6}.ga-motion{fill:none;stroke:#14a38b;stroke-width:3;stroke-dasharray:6 5}.ga-spine{fill:none;stroke:#14a38b;stroke-width:4;stroke-linecap:round}.ga-breath{fill:rgba(20,163,139,.12);stroke:#14a38b;stroke-width:2}.ga-caption{margin:12px 2px 0;color:var(--muted);font-size:13px;line-height:1.55}.ga-note{margin-top:10px;font-size:11px;color:var(--muted)}
      @media(max-width:640px){.ga-stage{grid-template-columns:1fr}.ga-frame{min-height:190px}.ga-frame svg{height:190px}.ga-badge{display:none}}
    `;document.head.appendChild(s);
  }

  function addAnimation(){
    const content=document.getElementById('exerciseModalContent');
    if(!content || content.querySelector('.ga-wrap')) return;
    const title=content.querySelector('h2')?.textContent||'';
    const trigger=document.querySelector('.exercise-modal:not(.hidden) [data-current-exercise]');
    let id=window.__lastExerciseId;
    if(!id){
      const ex=(window.exercises||[]).find(x=>x.name===title); id=ex?.id;
    }
    if(!id) return;
    const kind=kindById[id]||'mobility', ps=phases[kind]||['Старт','Конец'];
    const intro=content.querySelector('.modal-intro');
    const block=document.createElement('div');block.className='ga-wrap';block.innerHTML=`<div class="ga-headrow"><div class="ga-title">Схема правильного выполнения</div><span class="ga-badge">покадровая анимация</span></div><div class="ga-stage"><div class="ga-frame active"><span class="ga-phase">${ps[0]}</span>${scene(kind,0)}</div><div class="ga-frame"><span class="ga-phase">${ps[1]}</span>${scene(kind,1)}</div></div><p class="ga-caption">${captions[kind]||'Сохраняй контроль движения и нейтральное положение корпуса.'}</p><div class="ga-note">Схема намеренно упрощена: важны положение суставов и траектория, а не реалистичная внешность.</div>`;
    intro?.insertAdjacentElement('afterend',block);
    const frames=block.querySelectorAll('.ga-frame');let i=0;
    const timer=setInterval(()=>{if(!document.body.contains(block)||document.getElementById('exerciseModal')?.classList.contains('hidden')){clearInterval(timer);return;}frames.forEach((f,j)=>f.classList.toggle('active',j===i));i=1-i;},850);
  }

  injectStyle();
  document.addEventListener('click',e=>{const t=e.target.closest('[data-exercise-id]');if(t){window.__lastExerciseId=t.dataset.exerciseId;setTimeout(addAnimation,0);setTimeout(addAnimation,80);}});
  const obs=new MutationObserver(()=>{if(!document.getElementById('exerciseModal')?.classList.contains('hidden')) addAnimation();});
  obs.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class']});
})();
