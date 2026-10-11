import './style.css';

const state = {
  ageGroup: '18–25',
  search: '',
  category: 'All',
  activeLesson: null,
  completed: new Set(JSON.parse(localStorage.getItem('lifelearn-completed') || '[]')),
  quizChoice: null,
  quizSubmitted: false,
};

const categories = [
  'All', 'Home & Daily Skills', 'Cooking', 'Money & Financial Basics',
  'Health & First Aid', 'Education & Study Skills', 'Career & Workplace Skills',
  'Communication', 'Languages', 'Creative Skills', 'Safety & Emergency Skills',
  'Digital & Cyber Safety'
];

const lessons = [
  {id:'daily-01', title:'Build a simple daily routine', category:'Home & Daily Skills', level:'Beginner', duration:'5 min', icon:'☀️', description:'Create a realistic routine with time for learning, rest, and responsibilities.', steps:['Write down your fixed daily commitments.','Choose three important tasks for tomorrow.','Give each task a realistic time slot.','Review your plan at the end of the day.'], quiz:{q:'What makes a daily routine more useful?', options:['Planning every minute with no breaks','Choosing realistic priorities and reviewing them','Adding as many tasks as possible'], answer:1, explanation:'A realistic routine prioritizes important tasks and leaves room for breaks.'}},
  {id:'cook-01', title:'Kitchen safety basics', category:'Cooking', level:'Beginner', duration:'4 min', icon:'🥗', description:'Learn simple habits that help reduce common kitchen risks.', steps:['Wash hands before handling food.','Keep raw and ready-to-eat foods separate.','Turn pan handles inward and keep flammable items away from heat.','Switch off appliances after use.'], quiz:{q:'What should you do with raw and ready-to-eat foods?', options:['Keep them separate','Use the same unwashed board','Leave both at room temperature all day'], answer:0, explanation:'Separating raw and ready-to-eat foods helps prevent cross-contamination.'}},
  {id:'money-01', title:'Make a basic monthly budget', category:'Money & Financial Basics', level:'Beginner', duration:'6 min', icon:'💰', description:'Understand income, needs, wants, savings, and spending review.', steps:['List your monthly income.','Write down essential expenses.','Set a realistic savings target.','Track spending and adjust your plan monthly.'], quiz:{q:'What is a useful first step when budgeting?', options:['Ignore small expenses','List income and expenses','Borrow to cover every want'], answer:1, explanation:'A budget starts with understanding the money coming in and going out.'}},
  {id:'health-01', title:'Prepare a basic first-aid kit', category:'Health & First Aid', level:'Beginner', duration:'5 min', icon:'🩹', description:'Learn what a simple home first-aid kit can contain and when to seek help.', steps:['Include adhesive bandages and sterile gauze.','Add disposable gloves and medical tape.','Keep essential emergency contacts nearby.','Check expiry dates and follow local health guidance.'], quiz:{q:'What should you do with expired first-aid supplies?', options:['Keep using them indefinitely','Check guidance and replace them safely','Mix them with new supplies'], answer:1, explanation:'Check expiry dates regularly and replace expired items. Seek professional help for serious injuries.'}},
  {id:'study-01', title:'Use a focused study session', category:'Education & Study Skills', level:'Beginner', duration:'4 min', icon:'📚', description:'Break learning into focused sessions with clear goals and short breaks.', steps:['Choose one specific learning goal.','Remove distractions and prepare materials.','Study for a manageable block of time.','Recall the main points without looking at notes.'], quiz:{q:'Which action helps check what you have learned?', options:['Re-read without pausing','Recall the main points from memory','Keep notifications on'], answer:1, explanation:'Active recall helps you check your understanding.'}},
  {id:'career-01', title:'Write a professional email', category:'Career & Workplace Skills', level:'Beginner', duration:'5 min', icon:'✉️', description:'Structure a clear email with a subject, greeting, request, and sign-off.', steps:['Write a short, specific subject line.','Greet the recipient politely.','State the purpose and required action clearly.','Close politely and proofread before sending.'], quiz:{q:'What belongs in a useful email subject line?', options:['A clear summary of the purpose','Only emojis','The entire email body'], answer:0, explanation:'A concise subject line helps the recipient understand the email purpose.'}},
  {id:'comm-01', title:'Practice active listening', category:'Communication', level:'Beginner', duration:'3 min', icon:'💬', description:'Build stronger conversations by paying attention and checking understanding.', steps:['Give the speaker your attention.','Avoid interrupting.','Ask a clarifying question when needed.','Summarize what you heard respectfully.'], quiz:{q:'What is an example of active listening?', options:['Planning your reply while ignoring the speaker','Summarizing the speaker’s point to confirm understanding','Interrupting quickly'], answer:1, explanation:'Reflecting back the message helps confirm understanding.'}},
  {id:'language-01', title:'Learn five useful words', category:'Languages', level:'Beginner', duration:'4 min', icon:'🌍', description:'Use a small daily vocabulary habit to improve language learning.', steps:['Choose five useful words around one topic.','Read their meanings and pronunciation.','Write one sentence for each word.','Review them the next day.'], quiz:{q:'What helps vocabulary stick over time?', options:['Never reviewing it','Using words in sentences and revisiting them','Memorizing a long list once only'], answer:1, explanation:'Using words and reviewing them over time supports retention.'}},
  {id:'creative-01', title:'Start a daily sketch habit', category:'Creative Skills', level:'Beginner', duration:'5 min', icon:'🎨', description:'Use short, low-pressure practice to build a creative habit.', steps:['Choose a simple object nearby.','Observe its basic shapes.','Sketch for five minutes without judging the result.','Save your sketch and notice one thing to improve.'], quiz:{q:'What is a good goal for beginner sketch practice?', options:['Create a perfect drawing immediately','Practice regularly and notice progress','Avoid drawing until you feel ready'], answer:1, explanation:'Regular practice and small improvements are realistic beginner goals.'}},
  {id:'safety-01', title:'Know your emergency plan', category:'Safety & Emergency Skills', level:'Beginner', duration:'5 min', icon:'🧭', description:'Prepare important contacts and a simple plan for emergencies.', steps:['Know your local emergency number.','Keep key contacts accessible.','Agree on a meeting point with household members.','Follow instructions from emergency services.'], quiz:{q:'During a serious emergency, whose instructions should you follow?', options:['Unverified social media posts','Emergency services and official local guidance','Random forwarded messages'], answer:1, explanation:'Use official emergency guidance and verified information.'}},
  {id:'cyber-01', title:'Spot a suspicious link', category:'Digital & Cyber Safety', level:'Beginner', duration:'5 min', icon:'🔐', description:'Recognize common warning signs before opening a link or sharing information.', steps:['Check the sender and the full domain carefully.','Be cautious of urgency, prizes, or threats.','Do not enter passwords from a message link.','Open the official website directly or verify through another channel.'], quiz:{q:'A message asks you to urgently sign in through an unfamiliar link. What is safest?', options:['Click quickly before it expires','Verify the message and open the official site directly','Forward it to everyone'], answer:1, explanation:'Verify unexpected messages and avoid entering credentials through suspicious links.'}}
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function persist() {
  localStorage.setItem('lifelearn-completed', JSON.stringify([...state.completed]));
}
function filteredLessons() {
  return lessons.filter(l =>
    (state.category === 'All' || l.category === state.category) &&
    `${l.title} ${l.category} ${l.description}`.toLowerCase().includes(state.search.toLowerCase())
  );
}
function renderCards() {
  const items = filteredLessons();
  if (!items.length) return `<div class="empty"><div class="empty-icon">🔎</div><h3>No lessons found</h3><p>Try another search or choose a different category.</p></div>`;
  return `<div class="lesson-grid">${items.map(l => `
    <article class="lesson-card">
      <div class="lesson-top"><span class="lesson-icon">${l.icon}</span><span class="tag">${l.duration}</span></div>
      <p class="eyebrow">${escapeHtml(l.category)}</p>
      <h3>${escapeHtml(l.title)}</h3>
      <p class="muted">${escapeHtml(l.description)}</p>
      <div class="card-bottom"><span class="level">${l.level}</span>${state.completed.has(l.id) ? '<span class="done-label">✓ Completed</span>' : ''}</div>
      <button class="btn ${state.completed.has(l.id) ? 'btn-light' : 'btn-primary'} open-lesson" data-id="${l.id}">${state.completed.has(l.id) ? 'Review lesson' : 'Start lesson'} <span>→</span></button>
    </article>`).join('')}</div>`;
}
function renderLesson() {
  const l = lessons.find(x => x.id === state.activeLesson);
  if (!l) return '';
  return `<div class="modal-backdrop" id="lesson-backdrop">
    <section class="lesson-modal" role="dialog" aria-modal="true" aria-labelledby="lesson-title">
      <button class="modal-close" id="close-lesson" aria-label="Close lesson">×</button>
      <div class="modal-heading"><span class="lesson-icon large">${l.icon}</span><div><p class="eyebrow">${escapeHtml(l.category)} · ${l.duration}</p><h2 id="lesson-title">${escapeHtml(l.title)}</h2></div></div>
      <p class="modal-desc">${escapeHtml(l.description)}</p>
      <h3 class="section-label">Your step-by-step guide</h3>
      <ol class="steps">${l.steps.map(step=>`<li>${escapeHtml(step)}</li>`).join('')}</ol>
      <div class="quiz-box">
        <p class="eyebrow">QUICK CHECK</p><h3>${escapeHtml(l.quiz.q)}</h3>
        ${l.quiz.options.map((o,i)=>`<label class="quiz-option"><input type="radio" name="quiz" value="${i}" ${state.quizChoice===i?'checked':''}/> <span>${escapeHtml(o)}</span></label>`).join('')}
        ${state.quizSubmitted ? `<div class="quiz-feedback ${state.quizChoice===l.quiz.answer?'correct':'incorrect'}">${state.quizChoice===l.quiz.answer?'Correct!':'Not quite.'} ${escapeHtml(l.quiz.explanation)}</div>` : ''}
        <button class="btn btn-light" id="check-answer">Check answer</button>
      </div>
      <button class="btn btn-primary complete-lesson" id="complete-lesson">${state.completed.has(l.id) ? 'Completed ✓' : 'Mark lesson complete'}</button>
    </section></div>`;
}
function render() {
  const completeCount = state.completed.size;
  const progress = Math.round((completeCount / lessons.length) * 100);
  document.querySelector('#app').innerHTML = `
    <header class="site-header"><a href="#" class="brand" id="home-link"><span class="brand-mark">L</span><span>LifeLearn<span class="brand-dot">.</span><small>EVERYDAY SKILLS, MADE SIMPLE</small></span></a>
      <nav><a href="#learn" class="nav-link active">Explore skills</a><a href="#progress" class="nav-link">My progress</a></nav>
      <div class="header-user"><span class="avatar">LL</span><span class="user-label">Learning profile</span></div>
    </header>
    <main>
      <section class="hero">
        <div class="hero-copy"><span class="hero-kicker"><span class="spark">✦</span> YOUR EVERYDAY LEARNING COMPANION</span>
          <h1>Small skills.<br/><span>Big life changes.</span></h1>
          <p>Build confidence one practical skill at a time. Learn something useful today, practice it in real life, and track your progress.</p>
          <a href="#learn" class="btn btn-white">Explore lessons <span>↓</span></a>
          <div class="hero-proof"><span class="proof-avatars">● ● ●</span><span>Learning for real life, at your pace</span></div>
        </div>
        <div class="hero-art"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="art-card art-main"><span class="art-emoji">🌱</span><strong>Grow every day</strong><small>One lesson at a time</small><div class="art-progress"><span style="width:${progress}%"></span></div><small>${completeCount} of ${lessons.length} skills completed</small></div><div class="floating-note note-top">✦ Learn</div><div class="floating-note note-bottom">✓ Practice</div><div class="art-spark">✳</div></div>
      </section>
      <section class="stats-row" id="progress">
        <div class="stat"><span class="stat-icon">📘</span><div><strong>${lessons.length}</strong><span>Starter lessons</span></div></div>
        <div class="stat"><span class="stat-icon">✓</span><div><strong>${completeCount}</strong><span>Skills completed</span></div></div>
        <div class="stat"><span class="stat-icon">↗</span><div><strong>${progress}%</strong><span>Learning progress</span></div></div>
        <div class="stat profile-stat"><div><span class="eyebrow">LEARNING FOR</span><strong>${escapeHtml(state.ageGroup)} years</strong></div><select id="age-select" aria-label="Choose age group"><option ${state.ageGroup==='Under 13'?'selected':''}>Under 13</option><option ${state.ageGroup==='13–17'?'selected':''}>13–17</option><option ${state.ageGroup==='18–25'?'selected':''}>18–25</option><option ${state.ageGroup==='26–59'?'selected':''}>26–59</option><option ${state.ageGroup==='60+'?'selected':''}>60+</option></select></div>
      </section>
      <section class="learning-section" id="learn">
        <div class="section-heading"><div><p class="eyebrow">YOUR LEARNING PATH</p><h2>What would you like to learn?</h2><p class="muted">Explore practical lessons designed for everyday life.</p></div><div class="search-wrap"><span>⌕</span><input id="search" placeholder="Search skills..." value="${escapeHtml(state.search)}" aria-label="Search lessons"/></div></div>
        <div class="category-row">${categories.map(c=>`<button class="category-chip ${state.category===c?'selected':''}" data-category="${escapeHtml(c)}">${escapeHtml(c)}</button>`).join('')}</div>
        <div id="lesson-list">${renderCards()}</div>
      </section>
      <section class="daily-banner"><div class="daily-icon">💡</div><div><p class="eyebrow">A LITTLE PROGRESS ADDS UP</p><h2>Make learning part of your day.</h2><p>Choose one lesson, try one new thing, and celebrate the progress you make.</p></div><a href="#learn" class="btn btn-primary">Choose a lesson →</a></section>
    </main>
    <footer><a href="#" class="brand footer-brand"><span class="brand-mark">L</span><span>LifeLearn<span class="brand-dot">.</span></span></a><span>Learn · Practice · Grow</span><span>Open-source student prototype</span></footer>
    ${renderLesson()}`;
  bindEvents();
}
function bindEvents() {
  document.querySelector('#search').addEventListener('input', e => { state.search=e.target.value; const pos=e.target.selectionStart; document.querySelector('#lesson-list').innerHTML=renderCards(); bindCardEvents(); e.target.focus(); e.target.setSelectionRange(pos,pos); });
  document.querySelector('#age-select').addEventListener('change', e=>{state.ageGroup=e.target.value; render();});
  document.querySelectorAll('.category-chip').forEach(b=>b.addEventListener('click',()=>{state.category=b.dataset.category; render();}));
  bindCardEvents();
  document.querySelector('#close-lesson')?.addEventListener('click',()=>{state.activeLesson=null;state.quizChoice=null;state.quizSubmitted=false;render();});
  document.querySelector('#lesson-backdrop')?.addEventListener('click',e=>{if(e.target.id==='lesson-backdrop'){state.activeLesson=null;state.quizChoice=null;state.quizSubmitted=false;render();}});
  document.querySelectorAll('input[name="quiz"]').forEach(r=>r.addEventListener('change',e=>{state.quizChoice=Number(e.target.value);state.quizSubmitted=false;}));
  document.querySelector('#check-answer')?.addEventListener('click',()=>{if(state.quizChoice===null){alert('Please choose an answer first.');return;}state.quizSubmitted=true;render();});
  document.querySelector('#complete-lesson')?.addEventListener('click',()=>{
    if(state.activeLesson && !state.completed.has(state.activeLesson)){state.completed.add(state.activeLesson);persist();}
    state.activeLesson=null;state.quizChoice=null;state.quizSubmitted=false;render();
  });
  document.querySelector('#home-link')?.addEventListener('click',e=>{e.preventDefault();state.search='';state.category='All';render();window.scrollTo({top:0,behavior:'smooth'});});
}
function bindCardEvents() {
  document.querySelectorAll('.open-lesson').forEach(b=>b.addEventListener('click',()=>{state.activeLesson=b.dataset.id;state.quizChoice=null;state.quizSubmitted=false;render();}));
}
render();
