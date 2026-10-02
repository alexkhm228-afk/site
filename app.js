const goalFocusWeights = {
  mobility:{mobility:8,flexibility:4,posture:3,core:1}, strength:{legs:6,push:6,pull:6,core:4,hinge:5,posture:1},
  posture:{posture:8,pull:6,core:5,mobility:4,flexibility:2}, flexibility:{flexibility:9,mobility:7,posture:2,recovery:2},
  endurance:{cardio:10,legs:4,fullbody:5,core:2}, fullbody:{legs:5,push:5,pull:5,core:5,cardio:4,hinge:4,mobility:2}
};
const mainPatterns={
  mobility:['mobility','posture','mobility','core','flexibility','mobility','posture','mobility','core'],
  strength:['legs','push','pull','core','hinge','legs','push','pull','core'],
  posture:['posture','pull','core','mobility','posture','core','pull','mobility','posture'],
  flexibility:['mobility','flexibility','mobility','flexibility','posture','mobility','flexibility','core','mobility'],
  endurance:['cardio','legs','cardio','fullbody','core','cardio','legs','cardio','fullbody'],
  fullbody:['legs','push','pull','core','cardio','hinge','legs','push','pull']
};
const warmPatterns={mobility:['mobility','posture','mobility'],strength:['mobility','cardio','mobility'],posture:['posture','mobility','posture'],flexibility:['mobility','flexibility','mobility'],endurance:['cardio','mobility','cardio'],fullbody:['cardio','mobility','cardio']};
const coolPatterns={mobility:['flexibility','mobility','recovery','flexibility'],strength:['flexibility','recovery','mobility','flexibility'],posture:['posture','flexibility','recovery','mobility'],flexibility:['flexibility','mobility','flexibility','recovery'],endurance:['recovery','flexibility','mobility','recovery'],fullbody:['flexibility','recovery','mobility','flexibility']};

let lastSelection=null,lastWorkoutIds=new Set(),variantSeed=0,visualTimer=null;
applyExerciseReplacements();

function profileFor(ex){const raw=profileData[ex.id]||[1,'fullbody'];return{difficulty:raw[0],focus:raw[1].split(',')}}
function getSelection(){const f=new FormData(document.getElementById('workoutForm'));return{place:f.get('place'),level:f.get('level'),goal:f.get('goal'),duration:Number(f.get('duration'))}}
function hash01(v){let h=2166136261;for(let i=0;i<v.length;i++){h^=v.charCodeAt(i);h=Math.imul(h,16777619)}return(h>>>0)/4294967295}
function phasePlan(sel){const plans={10:{warm:1,main:3,cool:1},20:{warm:2,main:5,cool:1},30:{warm:2,main:7,cool:2},45:{warm:3,main:9,cool:2}};const p={...plans[sel.duration]};if(sel.goal==='flexibility'){p.main=Math.max(2,p.main-1);p.cool++}else if(sel.goal==='mobility'&&sel.duration>=20){p.main=Math.max(3,p.main-1);p.cool++}else if(sel.goal==='endurance'&&sel.duration>=30){p.main++;p.cool=Math.max(1,p.cool-1)}return p}
function roundsFor(sel){const base={10:1,20:2,30:2,45:3}[sel.duration];return sel.level==='advanced'&&sel.duration>=30&&['strength','endurance'].includes(sel.goal)?Math.min(3,base+1):base}
function restFor(sel){if(sel.goal==='endurance')return sel.level==='beginner'?'30–45 сек':'20–30 сек';if(sel.goal==='strength')return sel.level==='advanced'?'45–75 сек':'45–60 сек';return sel.level==='beginner'?'30–45 сек':'20–40 сек'}
function availableExercises(sel,type){const rank=levelRank[sel.level];return exercises.filter(ex=>ex.type===type&&ex.places.includes(sel.place)&&profileFor(ex).difficulty<=rank)}
function scoreExercise(ex,sel,target,seed,avoid,counts){const p=profileFor(ex),rank=levelRank[sel.level];let s=ex.goals.includes(sel.goal)?18:-5;if(p.focus.includes(target))s+=16;const w=goalFocusWeights[sel.goal]||{};p.focus.forEach(f=>s+=(w[f]||0)*.9);s+=ex.places.length===1?9:ex.places.length===2?5:1;s+=p.difficulty===rank?10:-(rank-p.difficulty)*2.5;if(avoid.has(ex.id))s-=12;s-=Math.max(...p.focus.map(f=>counts[f]||0),0)*3.5;s+=hash01(`${ex.id}|${sel.place}|${sel.level}|${sel.goal}|${sel.duration}|${seed}|${target}`)*11;return s}
function choosePhase(pool,pattern,count,sel,seed,avoid){const chosen=[],used=new Set(),counts={};for(let i=0;i<count;i++){const target=pattern[i%pattern.length],c=pool.filter(ex=>!used.has(ex.id)).map(ex=>({ex,score:scoreExercise(ex,sel,target,seed+i*17,avoid,counts)})).sort((a,b)=>b.score-a.score);if(!c.length)break;const pick=c[0].ex;chosen.push(pick);used.add(pick.id);profileFor(pick).focus.forEach(f=>counts[f]=(counts[f]||0)+1)}return chosen}
function buildWorkout(sel,seed=0,avoid=new Set()){const p=phasePlan(sel);return{items:[...choosePhase(availableExercises(sel,'warmup'),warmPatterns[sel.goal],p.warm,sel,seed+101,avoid),...choosePhase(availableExercises(sel,'main'),mainPatterns[sel.goal],p.main,sel,seed+211,avoid),...choosePhase(availableExercises(sel,'cooldown'),coolPatterns[sel.goal],p.cool,sel,seed+307,avoid)],rounds:roundsFor(sel),rest:restFor(sel)}}

function visualFor(ex){return exerciseVisuals[ex.id]}
function visualThumb(ex){const v=visualFor(ex);return v?.urls?.[0]||''}
function visualBadge(ex){const v=visualFor(ex);if(!v)return'';return `<span class="visual-badge ${v.exact?'exact':'equivalent'}">${v.exact?'точный визуал':'заменено/эквивалент'}</span>`}

function renderWorkout(sel,seed=0,avoid=new Set()){
  const w=buildWorkout(sel,seed,avoid),result=document.getElementById('result');
  document.getElementById('resultTitle').textContent=`${labels.place[sel.place]} · ${labels.goal[sel.goal]}`;
  document.getElementById('resultMeta').textContent=`${labels.level[sel.level]} · ${sel.duration} минут · ${w.rounds} ${w.rounds===1?'круг':'круга'} · отдых ${w.rest}`;
  document.getElementById('workoutList').innerHTML=w.items.map((ex,i)=>`<button class="workout-item" type="button" data-exercise-id="${ex.id}"><img class="workout-thumb" src="${visualThumb(ex)}" alt="" loading="lazy"><div class="workout-copy"><div class="workout-title-row"><strong>${ex.name}</strong>${visualBadge(ex)}</div><small>${labels.type[ex.type]} · ${levelNamesShort[profileFor(ex).difficulty]} · ${ex.desc}</small><span class="instruction-link">Инструкция и визуал →</span></div><div class="workout-dose">${ex.dose}</div></button>`).join('');
  lastWorkoutIds=new Set(w.items.map(x=>x.id));result.classList.remove('hidden');result.scrollIntoView({behavior:'smooth',block:'start'});
}

function renderCatalog(){
  const place=document.getElementById('catalogPlace').value,type=document.getElementById('catalogType').value,grid=document.getElementById('catalogGrid');
  const filtered=exercises.filter(ex=>(place==='all'||ex.places.includes(place))&&(type==='all'||ex.type===type));
  grid.innerHTML=filtered.map(ex=>`<button class="exercise-card" type="button" data-exercise-id="${ex.id}"><div class="catalog-visual"><img src="${visualThumb(ex)}" alt="${ex.name}" loading="lazy"></div><div class="exercise-card-body"><div class="exercise-card-top"><h3>${ex.name}</h3>${visualBadge(ex)}</div><p>${ex.desc}</p><div class="tags"><span class="tag">${labels.type[ex.type]}</span><span class="tag">${ex.dose}</span>${ex.places.map(p=>`<span class="tag">${labels.place[p]}</span>`).join('')}</div><span class="card-action">Открыть инструкцию →</span></div></button>`).join('');
  const count=document.getElementById('catalogCount');if(count)count.textContent=`${filtered.length} из ${exercises.length} упражнений`;
}

function stopVisualTimer(){if(visualTimer){clearInterval(visualTimer);visualTimer=null}}
function buildVisualBlock(ex){
  const v=visualFor(ex);if(!v)return'';
  const isNative=v.nativeAnimation, dynamic=v.animate&&!isNative&&v.urls.length>1;
  const frames=v.urls.map((url,i)=>`<figure class="visual-frame"><img src="${url}" alt="${ex.name} — ${v.urls.length>1?`кадр ${i+1}`:'визуал'}" loading="eager"><figcaption>${v.urls.length>1?`Кадр ${i+1}`:'Ключевая поза'}</figcaption></figure>`).join('');
  return `<section class="exercise-visual-section"><div class="visual-head"><div><p class="eyebrow">Визуальная инструкция</p><h3>${dynamic?'Мини-анимация':isNative?'Готовая анимация':'Ключевая поза'}</h3></div>${visualBadge(ex)}</div><div class="motion-preview ${dynamic?'is-animated':''}"><img id="motionPreviewImage" src="${v.urls[0]}" alt="${ex.name}"></div><p class="visual-explain">${v.note|| (dynamic?'Мини-анимация переключает только исходные кадры — промежуточные позы не дорисовываются.':'Статическое упражнение показывается одной корректной позой.')}</p>${v.urls.length>1?`<div class="visual-frames">${frames}</div>`:''}<div class="visual-credit">${v.credit} · <a href="${v.sourceUrl}" target="_blank" rel="noreferrer">источник</a></div></section>`;
}
function startVisual(ex){stopVisualTimer();const v=visualFor(ex);if(!v||v.nativeAnimation||!v.animate||v.urls.length<2)return;const img=document.getElementById('motionPreviewImage');if(!img)return;const seq=v.urls.length===3?[0,1,2,1]:v.urls.map((_,i)=>i);let n=0;visualTimer=setInterval(()=>{n=(n+1)%seq.length;img.src=v.urls[seq[n]]},850)}

function ensureExerciseModal(){if(document.getElementById('exerciseModal'))return;const modal=document.createElement('div');modal.id='exerciseModal';modal.className='exercise-modal hidden';modal.innerHTML=`<div class="exercise-modal-backdrop" data-close-modal></div><section class="exercise-dialog" role="dialog" aria-modal="true" aria-labelledby="exerciseModalTitle"><button class="modal-close" type="button" data-close-modal aria-label="Закрыть">×</button><div id="exerciseModalContent"></div></section>`;document.body.appendChild(modal);modal.addEventListener('click',e=>{if(e.target.closest('[data-close-modal]'))closeExerciseModal()})}
function openExerciseModal(id){
  const ex=exercises.find(x=>x.id===id);if(!ex)return;ensureExerciseModal();const rep=exerciseReplacements[id],guide=rep?.guide||exerciseGuides[id]||g(`${ex.desc}|Выполняй движение медленно и под контролем.|Остановись, если появляется боль.`,'Сохраняй свободное дыхание.','Не увеличивай амплитуду ценой техники.'),p=profileFor(ex);
  document.getElementById('exerciseModalContent').innerHTML=`<p class="eyebrow">Инструкция к упражнению</p><h2 id="exerciseModalTitle">${ex.name}</h2><div class="modal-tags tags"><span class="tag">${labels.type[ex.type]}</span><span class="tag">${levelNamesShort[p.difficulty]}</span><span class="tag">${ex.dose}</span>${ex.places.map(x=>`<span class="tag">${labels.place[x]}</span>`).join('')}</div><p class="modal-intro">${ex.desc}</p>${buildVisualBlock(ex)}<div class="instruction-grid"><div class="instruction-main"><h3>Как выполнять</h3><ol class="steps-list">${guide.steps.map(s=>`<li>${s}</li>`).join('')}</ol></div><aside class="instruction-side"><div class="instruction-note good"><strong>Ориентир по технике</strong><p>${guide.tip}</p></div><div class="instruction-note warning"><strong>Частая ошибка</strong><p>${guide.mistake}</p></div></aside></div><div class="modal-safety"><strong>Безопасность:</strong> прекрати упражнение при острой боли, выраженном головокружении или необычной одышке.</div>`;
  const modal=document.getElementById('exerciseModal');modal.classList.remove('hidden');document.body.classList.add('modal-open');startVisual(ex);modal.querySelector('.modal-close').focus();
}
function closeExerciseModal(){const m=document.getElementById('exerciseModal');if(!m)return;stopVisualTimer();m.classList.add('hidden');document.body.classList.remove('modal-open')}

document.getElementById('workoutForm').addEventListener('submit',e=>{e.preventDefault();lastSelection=getSelection();variantSeed=0;lastWorkoutIds=new Set();renderWorkout(lastSelection,variantSeed,lastWorkoutIds)});
document.getElementById('shuffleButton').addEventListener('click',()=>{if(!lastSelection)lastSelection=getSelection();variantSeed++;renderWorkout(lastSelection,variantSeed,new Set(lastWorkoutIds))});
document.getElementById('catalogPlace').addEventListener('change',renderCatalog);document.getElementById('catalogType').addEventListener('change',renderCatalog);
document.addEventListener('click',e=>{const t=e.target.closest('[data-exercise-id]');if(t)openExerciseModal(t.dataset.exerciseId)});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeExerciseModal()});
renderCatalog();
