(()=>{'use strict';
const $=id=>document.getElementById(id), lessons=[...document.querySelectorAll('.lesson')], key='kai-morning-videos-2026';
const search=$('search'), filters=[...document.querySelectorAll('.filters input')], theme=$('theme');let watched={},storageOK=true;
function read(){try{const v=JSON.parse(localStorage.getItem(key)||'{}');watched=v&&typeof v==='object'&&!Array.isArray(v)?v:{};}catch{watched={};storageOK=false;}}
function notice(){ $('notice').textContent=storageOK?'Progress stays in this browser. Reset filters keeps your watched progress.':'Browser storage is unavailable. Your progress works for this visit but may not survive a reload.'; }
function save(){try{localStorage.setItem(key,JSON.stringify(watched));}catch{storageOK=false;}notice();}
function tokyoDate(){const p={};new Intl.DateTimeFormat('en-US',{timeZone:'Asia/Tokyo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date()).forEach(x=>p[x.type]=x.value);return `${p.year}-${p.month}-${p.day}`;}
const norm=s=>s.normalize('NFKC').toLowerCase().replace(/lesson\s*(\d+)/g,'l$1').replace(/\s+/g,' ').trim();
function update(){const today=tokyoDate(),query=norm(search.value),terms=query.split(' ').filter(Boolean);let shown=0,done=0;
lessons.forEach(card=>{const checked=watched[card.dataset.date]===true;card.querySelector('input').checked=checked;done+=checked?1:0;const hay=norm(card.dataset.search);const match=terms.every(t=>hay.includes(t));const allowed=filters.every(f=>!f.checked||(f.value==='upcoming'&&card.dataset.date>=today)||(f.value==='unwatched'&&!checked)||(f.value==='tests'&&card.dataset.test==='1'));card.hidden=!(match&&allowed);shown+=card.hidden?0:1;card.classList.toggle('done',checked);card.classList.toggle('today',card.dataset.date===today);card.querySelector('.today-badge').hidden=card.dataset.date!==today;});
document.querySelectorAll('.month-section').forEach(s=>s.hidden=![...s.querySelectorAll('.lesson')].some(c=>!c.hidden));
$('status').textContent=`${shown} of 40 days shown`;$('progress-text').textContent=`${done} of 40 watched`;$('progress').value=done;$('empty').hidden=shown!==0;
const next=lessons.find(c=>c.dataset.date>=today);$('jst-date').textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Tokyo',weekday:'short',day:'numeric',month:'short',year:'numeric'}).format(new Date())+' · JST';
$('daily-title').textContent=next?(next.dataset.date===today?'Today’s lesson':'Next class · '+next.querySelector('time').textContent):'Term complete';$('daily-topic').textContent=next?next.querySelector('.assignment').textContent:'All 40 class days are here whenever you want to review.';
$('today').textContent=next?(next.dataset.date===today?'Today ↓':'Go to next class ↓'):'Go to last class ↓';notice();}
function reset(){search.value='';filters.forEach(f=>f.checked=false);update();}
read();lessons.forEach(card=>{const input=card.querySelector('input');input.addEventListener('change',()=>{watched[card.dataset.date]=input.checked;save();update();});});
search.addEventListener('input',update);filters.forEach(f=>f.addEventListener('change',update));$('reset').addEventListener('click',reset);
$('today').addEventListener('click',()=>{reset();const t=tokyoDate(),next=lessons.find(c=>c.dataset.date>=t)||lessons.at(-1);next.focus({preventScroll:true});next.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});$('status').textContent+=next.dataset.date===t?' · Today’s class':next.dataset.date>t?' · No class today; showing the next class.':' · Term finished; showing the last class.';});
document.querySelectorAll('.month-nav a').forEach(a=>a.addEventListener('click',reset));
function setTheme(value){theme.value=['system','light','dark'].includes(value)?value:'system';if(theme.value==='system')delete document.documentElement.dataset.theme;else document.documentElement.dataset.theme=theme.value;}
try{setTheme(localStorage.getItem(key+'-theme'));}catch{setTheme('system');}
theme.addEventListener('change',()=>{setTheme(theme.value);try{localStorage.setItem(key+'-theme',theme.value);}catch{storageOK=false;notice();}});
window.addEventListener('storage',e=>{if(e.key===key||e.key===null){read();update();}});document.addEventListener('visibilitychange',()=>{if(!document.hidden)update();});setInterval(update,60000);
update();document.querySelectorAll('[data-enhance]').forEach(c=>c.disabled=false);
})();
