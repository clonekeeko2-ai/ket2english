// ============================================================
//  DETECTIVE CONAN MULTI-SUBJECT LEARNING APP
//  Subjects: English KET | Math Grade 5 | Chinese (Pinyin)
//  Progress saved in localStorage
// ============================================================

// ======================== HELPER FUNCTIONS ========================
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function round(num, decimals) { return Number(Math.round(num + 'e' + decimals) + 'e-' + decimals); }
// Remove punctuation and extra spaces for English comparison
function normalizeAnswer(str) {
    return str.toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim();
}

// ======================== ENGLISH KET GENERATOR ========================
const EN_CHARS = ["Conan","Ran","Kogoro","Haibara","Heiji","Sonoko","Agasa","Megure"];
const EN_PLACES = ["library","school","park","museum","hospital","station","restaurant","supermarket","airport","cinema"];
const EN_OBJECTS = ["book","watch","glasses","bag","phone","key","letter","map","camera","wallet"];

function generateEnglish() {
    const c = pick(EN_CHARS), p = pick(EN_PLACES), o = pick(EN_OBJECTS);
    
    // 1. SCRAMBLED SENTENCES
    const sentences = [
        `Yesterday ${c} went to the ${p}`,
        `${c} found a strange ${o} on the table`,
        `The suspect is hiding in the ${p}`,
        `${c} is the best detective in town`,
        `They are playing soccer in the park`,
        `I bought a new ${o} yesterday`,
        `She likes reading books in the library`,
        `The thief stole my ${o} last night`
    ];
    
    const s = pick(sentences);
    const words = s.split(' ');
    // Scramble the words
    let scrambled = [...words];
    for (let i = scrambled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]];
    }

    const T = [
        // Grammar Fill-in-the-blank
        {type:"Quá khứ đơn",title:"Vụ Án Hôm Qua",dialogue:`Yesterday, ${c} ______ to the ${p}.`,correct:"went",explanation:`"Yesterday" → quá khứ. "go" → "went".`,visual:"🕵️"},
        {type:"Quá khứ đơn",title:"Manh Mối",dialogue:`I ______ a strange ${o} last night.`,correct:"found",explanation:`"last night" → quá khứ. "find" → "found".`,visual:"🔎"},
        {type:"Hiện tại tiếp diễn",title:"Theo Dõi",dialogue:`Look! The suspect ______ running!`,correct:"is",explanation:`"The suspect" (số ít) + "is" + V-ing.`,visual:"🏃"},
        {type:"Mạo từ",title:"Phát Hiện",dialogue:`${c} found ______ old ${o}.`,correct:"an",explanation:`"old" bắt đầu bằng nguyên âm → "an".`,visual:"📦"},
        {type:"So sánh",title:"Thông Minh",dialogue:`${c} is ______ than the criminal.`,correct:"smarter",explanation:`"smart" + "-er" → "smarter".`,visual:"🧠"},
        {type:"Từ vựng",title:"Thư Viện",dialogue:`Students read books at the ______.`,correct:"library",explanation:`"library" = thư viện.`,visual:"📚"},
        
        // Scrambled Sentence format
        {
            type: "Sắp xếp câu",
            title: "Giải Mã Thông Điệp",
            dialogue: `Sắp xếp các từ sau thành câu hoàn chỉnh:\n[ ${scrambled.join(' / ')} ]`,
            correct: s,
            explanation: `Thứ tự đúng: ${s}`,
            visual: "🧩"
        }
    ];
    
    // Weight towards scrambled sentences slightly
    const t = Math.random() > 0.5 ? T[T.length - 1] : pick(T.slice(0, T.length - 1));
    return {...t, emoji: pick(["🕵️","👩","🧔","👧","👨‍🔬","👮"]), subject: "english"};
}

// ======================== MATH GRADE 5 GENERATOR ========================
function generateMath(category) {
    let T = [];

    // --- 1. SỐ THẬP PHÂN (Decimals) ---
    if (category === "decimals" || category === "all") {
        for(let i=0; i<3; i++) {
            const a = round(randInt(10, 99) + Math.random(), 1);
            const b = round(randInt(1, 9) + Math.random(), 1);
            T.push({type:"Số thập phân",title:"Phép Cộng",dialogue:`${a} + ${b} = ______`,correct:String(round(a+b, 1)),explanation:`Cộng phần nguyên và phần thập phân: ${a} + ${b} = ${round(a+b, 1)}`,visual:"➕"});
            T.push({type:"Số thập phân",title:"Phép Trừ",dialogue:`${a} - ${b} = ______`,correct:String(round(a-b, 1)),explanation:`Trừ phần nguyên và phần thập phân: ${a} - ${b} = ${round(a-b, 1)}`,visual:"➖"});
        }
        for(let i=0; i<2; i++) {
            const a = round(randInt(2, 10) + (randInt(1,9)/10), 1);
            const b = randInt(2, 5); // multiply by integer for simplicity
            T.push({type:"Số thập phân",title:"Phép Nhân",dialogue:`${a} × ${b} = ______`,correct:String(round(a*b, 1)),explanation:`Nhân như số tự nhiên, đặt dấu phẩy: ${a} × ${b} = ${round(a*b, 1)}`,visual:"✖️"});
        }
    }

    // --- 2. TỈ SỐ PHẦN TRĂM (Percentage) ---
    if (category === "percentage" || category === "all") {
        for(let i=0; i<3; i++) {
            const total = randInt(2, 10) * 100; // 200, 300, 1000...
            const percent = randInt(1, 9) * 10; // 10%, 20%...
            const ans = (total * percent) / 100;
            T.push({type:"Tỉ số phần trăm",title:"Tính %",dialogue:`Tìm ${percent}% của ${total} = ______`,correct:String(ans),explanation:`Lấy ${total} ÷ 100 × ${percent} = ${ans}`,visual:"📊"});
            
            const price = randInt(5, 20) * 10000;
            const discount = randInt(1, 5) * 10;
            const finalPrice = price - (price * discount / 100);
            T.push({type:"Tỉ số phần trăm",title:"Giảm Giá",dialogue:`Quyển sách giá ${price}đ, được giảm giá ${discount}%. Giá sau khi giảm là: ______ đ`,correct:String(finalPrice),explanation:`Số tiền giảm: ${price} × ${discount}% = ${price * discount / 100}đ. Giá sau giảm: ${price} - ${price * discount / 100} = ${finalPrice}đ`,visual:"🏷️"});
        }
    }

    // --- 3. TOÁN CHUYỂN ĐỘNG (Motion: s = v*t) ---
    if (category === "motion" || category === "all") {
        for(let i=0; i<3; i++) {
            const v = randInt(30, 60); // km/h
            const t = randInt(2, 5); // hours
            const s = v * t;
            T.push({type:"Chuyển động",title:"Tính Quãng Đường",dialogue:`Ô tô đi với vận tốc ${v} km/h trong ${t} giờ. Quãng đường đi được là ______ km.`,correct:String(s),explanation:`Công thức: s = v × t. Quãng đường = ${v} × ${t} = ${s} km`,visual:"🚗"});
            T.push({type:"Chuyển động",title:"Tính Vận Tốc",dialogue:`Người đó đi được ${s} km trong ${t} giờ. Vận tốc là ______ km/h.`,correct:String(v),explanation:`Công thức: v = s ÷ t. Vận tốc = ${s} ÷ ${t} = ${v} km/h`,visual:"🏍️"});
        }
    }

    // --- 4. HÌNH HỌC PHẲNG NÂNG CAO (Flat Geometry) ---
    if (category === "geometry_flat" || category === "all") {
        for(let i=0; i<3; i++) {
            const b = randInt(5, 20); // base
            const h = randInt(4, 15); // height
            const a_top = randInt(3, 10); // top base for trapezoid
            
            // Triangle
            const areaTri = (b * h) / 2;
            if (Number.isInteger(areaTri)) {
                T.push({type:"Hình tam giác",title:"Diện Tích",dialogue:`Hình tam giác có độ dài đáy ${b}cm, chiều cao ${h}cm. Diện tích = ______ cm²`,correct:String(areaTri),explanation:`Công thức: S = (đáy × cao) ÷ 2 = (${b} × ${h}) ÷ 2 = ${areaTri} cm²`,visual:"🔺"});
            }
            
            // Trapezoid
            const areaTrap = ((a_top + b) * h) / 2;
            if (Number.isInteger(areaTrap)) {
                T.push({type:"Hình thang",title:"Diện Tích",dialogue:`Hình thang có đáy lớn ${b}cm, đáy bé ${a_top}cm, chiều cao ${h}cm. Diện tích = ______ cm²`,correct:String(areaTrap),explanation:`Công thức: S = (đáy lớn + đáy bé) × cao ÷ 2 = (${b} + ${a_top}) × ${h} ÷ 2 = ${areaTrap} cm²`,visual:"📏"});
            }
            
            // Circle
            const r = randInt(2, 10);
            const areaCir = round(3.14 * r * r, 2);
            T.push({type:"Hình tròn",title:"Diện Tích",dialogue:`Hình tròn có bán kính r = ${r}cm. Diện tích = ______ cm² (Lấy π = 3.14)`,correct:String(areaCir),explanation:`Công thức: S = r × r × 3.14 = ${r} × ${r} × 3.14 = ${areaCir} cm²`,visual:"⭕"});
        }
    }

    // --- 5. HÌNH HỌC KHÔNG GIAN (Space Geometry) ---
    if (category === "geometry_space" || category === "all") {
        for(let i=0; i<3; i++) {
            const a = randInt(2, 10); // edge for cube
            T.push({type:"Hình lập phương",title:"Thể Tích",dialogue:`Hình lập phương có cạnh ${a}cm. Thể tích = ______ cm³`,correct:String(a*a*a),explanation:`Công thức: V = cạnh × cạnh × cạnh = ${a} × ${a} × ${a} = ${a*a*a} cm³`,visual:"🧊"});
            
            const l = randInt(5, 12); // length
            const w = randInt(3, 8);  // width
            const h = randInt(2, 6);  // height
            T.push({type:"Hình hộp chữ nhật",title:"Thể Tích",dialogue:`Hình hộp chữ nhật có chiều dài ${l}cm, chiều rộng ${w}cm, chiều cao ${h}cm. Thể tích = ______ cm³`,correct:String(l*w*h),explanation:`Công thức: V = dài × rộng × cao = ${l} × ${w} × ${h} = ${l*w*h} cm³`,visual:"📦"});
        }
    }

    // Fallback if T is empty (shouldn't happen)
    if(T.length === 0) {
        T.push({type:"Đại số",title:"Phép tính",dialogue:"1 + 1 = ?",correct:"2",explanation:"Cơ bản",visual:"🔢"});
    }

    const t = pick(T);
    return {...t, emoji: pick(["📏","🔢","🧮","📊","📐"]), subject: "math"};
}

// ======================== CHINESE GENERATOR ========================
const ZH_VOCAB = [
  {hanzi:"你好",pinyin:"ni hao",meaning:"Xin chào",visual:"👋"},
  {hanzi:"谢谢",pinyin:"xie xie",meaning:"Cảm ơn",visual:"🙏"},
  {hanzi:"一",pinyin:"yi",meaning:"Một (1)",visual:"1️⃣"},
  {hanzi:"二",pinyin:"er",meaning:"Hai (2)",visual:"2️⃣"},
  {hanzi:"三",pinyin:"san",meaning:"Ba (3)",visual:"3️⃣"},
  {hanzi:"妈妈",pinyin:"ma ma",meaning:"Mẹ",visual:"👩"},
  {hanzi:"爸爸",pinyin:"ba ba",meaning:"Bố",visual:"👨"},
  {hanzi:"猫",pinyin:"mao",meaning:"Con mèo",visual:"🐱"},
  {hanzi:"狗",pinyin:"gou",meaning:"Con chó",visual:"🐶"},
  {hanzi:"红色",pinyin:"hong se",meaning:"Màu đỏ",visual:"🔴"},
  {hanzi:"水",pinyin:"shui",meaning:"Nước",visual:"💧"},
  {hanzi:"苹果",pinyin:"ping guo",meaning:"Quả táo",visual:"🍎"},
  {hanzi:"书",pinyin:"shu",meaning:"Sách",visual:"📖"},
  {hanzi:"桌子",pinyin:"zhuo zi",meaning:"Cái bàn",visual:"🪑"}
];

function generateChinese(){
  const v=pick(ZH_VOCAB);
  return {
    type:"Từ vựng Tiếng Trung",
    title:v.meaning,
    dialogue:`${v.visual} "${v.meaning}" viết bằng Pinyin là: ______`,
    correct:v.pinyin,
    explanation:`"${v.meaning}" = ${v.hanzi} (${v.pinyin})`,
    visual:v.visual,
    hanzi:v.hanzi,
    pinyinDisplay:v.pinyin,
    emoji:"🀄",
    subject:"chinese"
  };
}


// ======================== APP STATE ========================
const TARGET_BADGES = 50;
const POINTS_PER_CORRECT = 10;
const CORRECT_PER_BADGE = 20;

let currentSubject = null; // "english" | "math" | "chinese"
let currentMathCategory = "all"; // for math sub-categories
let currentCase = null;
let hintLevel = 0;
let isSubmitted = false;

// --- localStorage ---
function loadProgress(subj){
  try{
    const d=JSON.parse(localStorage.getItem("conan_"+subj));
    return d||{points:0,correctCount:0};
  }catch(e){return{points:0,correctCount:0};}
}
function saveProgress(subj,data){
  try{localStorage.setItem("conan_"+subj,JSON.stringify(data));}catch(e){}
}
function getProgress(subj){return loadProgress(subj);}

// ======================== DOM ========================
const $=id=>document.getElementById(id);

const welcomeScreen  = $('welcomeScreen');
const subjectScreen  = $('subjectScreen');
const mathCategoryScreen = $('mathCategoryScreen');
const exerciseScreen = $('exerciseScreen');
const rewardScreen   = $('rewardScreen');

const pointsDisplay   = $('pointsDisplay');
const badgesDisplay   = $('badgesDisplay');
const rankDisplay     = $('rankDisplay');
const progressBar     = $('progressBar');
const progressPercent = $('progressPercent');

const exVisual       = $('exVisual');
const exVisualEmoji  = $('exVisualEmoji');
const exAvatar       = $('exAvatar');
const caseType       = $('caseType');
const caseTitle      = $('caseTitle');
const caseDialogue   = $('caseDialogue');
const speechBtn      = $('speechBtn');
const hanziBox       = $('hanziBox');
const hanziChar      = $('hanziChar');
const hanziPinyin    = $('hanziPinyin');
const answerInput    = $('answerInput');
const submitBtn      = $('submitBtn');
const answerLabel    = $('answerLabel');
const hintBtn        = $('hintBtn');
const hintDisplay    = $('hintDisplay');
const answerForm     = $('answerForm');
const feedbackBox    = $('feedbackBox');
const feedbackText   = $('feedbackText');
const explanationBox = $('explanationBox');
const caseExplanation= $('caseExplanation');
const nextActionBox  = $('nextActionBox');
const nextCaseBtn    = $('nextCaseBtn');
const currentSubjectBadge = $('currentSubjectBadge');

// ======================== NAVIGATION ========================
function showScreen(screen){
  [welcomeScreen,subjectScreen,mathCategoryScreen,exerciseScreen,rewardScreen].forEach(s=>{
      if(s) s.classList.add('hidden');
  });
  if(screen) screen.classList.remove('hidden');
}

function updateSubjectProgress(){
  ["english","math","chinese"].forEach(s=>{
    const p=loadProgress(s);
    const badges=Math.floor(p.correctCount/CORRECT_PER_BADGE);
    const el=$("prog-"+s);
    if(el) el.textContent=`${badges} 🏅 · ${p.points} điểm`;
  });
}

// Welcome → Subject
$('startBtn').addEventListener('click',()=>{
  updateSubjectProgress();
  showScreen(subjectScreen);
});

// Subject → Welcome
$('backToWelcome').addEventListener('click',()=>showScreen(welcomeScreen));

// Subject card click
document.querySelectorAll('.subject-screen:not(#mathCategoryScreen) .subject-card').forEach(card=>{
  card.addEventListener('click',()=>{
    currentSubject=card.dataset.subject;
    if(currentSubject === "math") {
        showScreen(mathCategoryScreen);
    } else {
        startExercise();
    }
  });
});

// Math Category click
if($('mathCategoryScreen')) {
    document.querySelectorAll('#mathCategoryScreen .subject-card').forEach(card=>{
      card.addEventListener('click',()=>{
        currentSubject = "math";
        currentMathCategory = card.dataset.mathCat;
        startExercise();
      });
    });
    $('backToSubjectsFromMath').addEventListener('click',()=>showScreen(subjectScreen));
}

// Exercise → Subject
$('backToSubjects').addEventListener('click',()=>{
  updateSubjectProgress();
  showScreen(subjectScreen);
});

// Reward → Reset subject
$('resetSubjectBtn').addEventListener('click',()=>{
  saveProgress(currentSubject,{points:0,correctCount:0});
  startExercise();
});
$('backToMenuBtn').addEventListener('click',()=>{
  updateSubjectProgress();
  showScreen(subjectScreen);
});

// ======================== START EXERCISE ========================
function startExercise(){
  const labels={english:"🔤 Tiếng Anh",math:"🔢 Toán Lớp 5",chinese:"🀄 Tiếng Trung"};
  const badgeClass={english:"badge-english",math:"badge-math",chinese:"badge-chinese"};
  currentSubjectBadge.textContent=labels[currentSubject];
  currentSubjectBadge.className="ex-subject-badge "+badgeClass[currentSubject];

  // Set answer label
  if(currentSubject==="chinese") answerLabel.textContent="Gõ Pinyin (không dấu):";
  else if(currentSubject==="math") answerLabel.textContent="Gõ đáp án (số):";
  else answerLabel.textContent="Gõ đáp án (có thể là câu dài):";

  // Show/hide speech button
  speechBtn.style.display=(currentSubject==="english")?"flex":"none";

  showScreen(exerciseScreen);
  loadNewCase();
}

// ======================== SPEECH ========================
function speakText(text){
  if(!('speechSynthesis' in window))return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);
  u.lang='en-US';
  const voices=window.speechSynthesis.getVoices();
  const male=voices.find(v=>v.lang.includes('en')&&(v.name.includes('Male')||v.name.includes('David')||v.name.includes('Guy')));
  if(male)u.voice=male;
  speechBtn.classList.add('playing');
  u.onend=()=>speechBtn.classList.remove('playing');
  u.onerror=()=>speechBtn.classList.remove('playing');
  window.speechSynthesis.speak(u);
}
speechBtn.addEventListener('click',()=>{
    if(currentCase&&currentSubject==="english"){
        let txt = currentCase.dialogue.replace("______","blank").replace(/\[.*?\]/g, "");
        speakText(txt);
    }
});
if('speechSynthesis' in window){window.speechSynthesis.onvoiceschanged=()=>window.speechSynthesis.getVoices();}

// ======================== LOGIC ========================
function getRank(b){
  if(b<5)return"Thám Tử Nhí";if(b<10)return"Trợ Lý Thám Tử";
  if(b<20)return"Thám Tử Học Việc";if(b<30)return"Thám Tử Trung Cấp";
  if(b<40)return"Thám Tử Cao Cấp";if(b<50)return"Thám Tử Lừng Danh";
  return"🏆 Huyền Thoại";
}

function updateDashboard(){
  const p=getProgress(currentSubject);
  const badges=Math.floor(p.correctCount/CORRECT_PER_BADGE);
  pointsDisplay.textContent=p.points;
  badgesDisplay.textContent=`${badges}/${TARGET_BADGES}`;
  rankDisplay.textContent=getRank(badges);
  const pct=Math.min(100,Math.round((badges/TARGET_BADGES)*100));
  progressBar.style.width=pct+'%';
  progressPercent.textContent=pct+'%';

  // Color progress bar per subject
  const colors={english:"linear-gradient(90deg,#0a1f44,#e62020)",math:"linear-gradient(90deg,#15803d,#22c55e)",chinese:"linear-gradient(90deg,#c2410c,#f97316)"};
  progressBar.style.background=colors[currentSubject]||colors.english;

  if(badges>=TARGET_BADGES){
    setTimeout(()=>{
      $('rewardSubject').textContent={english:"Tiếng Anh",math:"Toán Lớp 5",chinese:"Tiếng Trung"}[currentSubject];
      showScreen(rewardScreen);
    },800);
  }
}

function scramble(w){const a=w.split('');for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a.join(' ');}

function loadNewCase(){
  if(currentSubject==="english") currentCase=generateEnglish();
  else if(currentSubject==="math") currentCase=generateMath(currentMathCategory);
  else currentCase=generateChinese();

  hintLevel=0;
  isSubmitted=false;

  // Visual
  if(currentCase.visual){
    exVisual.style.display="block";
    exVisualEmoji.textContent=currentCase.visual;
  }else{
    exVisual.style.display="none";
  }

  exAvatar.textContent=currentCase.emoji||"🕵️";
  caseType.textContent=currentCase.type;
  caseTitle.textContent=currentCase.title;
  caseDialogue.innerText=currentCase.dialogue; // innerText to render newlines for scrambled sentences
  caseExplanation.textContent=currentCase.explanation;

  // Hide hanzi box
  hanziBox.classList.add('hidden');

  answerInput.value='';
  answerInput.disabled=false;
  submitBtn.disabled=false;
  hintDisplay.textContent='';

  feedbackBox.classList.add('hidden');
  feedbackBox.classList.remove('correct','incorrect');
  explanationBox.classList.add('hidden');
  nextActionBox.classList.add('hidden');

  document.querySelector('.exercise-wrap')?.scrollTo?.({top:0,behavior:'smooth'});
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(()=>answerInput.focus(),300);

  updateDashboard();
}

// ======================== EVENTS ========================
hintBtn.addEventListener('click',()=>{
  if(!currentCase||isSubmitted)return;
  const ans=currentCase.correct;
  hintLevel++;
  
  if(currentSubject === "english" && currentCase.type === "Sắp xếp câu") {
      // For sentences, hints are different
      if(hintLevel === 1) hintDisplay.textContent = '📏 Có ' + ans.split(' ').length + ' từ';
      else if(hintLevel === 2) hintDisplay.textContent = '🔤 Bắt đầu bằng: ' + ans.split(' ')[0];
      else hintDisplay.textContent = '✅ ' + ans;
  } else {
      if(hintLevel===1){
        hintDisplay.textContent='📏 '+ans.split('').map(c=>c===' '?' ':'_').join(' ');
      }else if(hintLevel===2){
        hintDisplay.textContent='🔤 '+ans[0]+' '+ans.slice(1).split('').map(c=>c===' '?' ':'_').join(' ');
      }else{
        hintDisplay.textContent='✅ '+ans;
      }
  }
});

answerForm.addEventListener('submit',e=>{
  e.preventDefault();
  if(isSubmitted)return;
  
  let userAns=answerInput.value.trim();
  if(!userAns)return;

  let isCorrect = false;
  
  if (currentSubject === "math") {
      // Accept both dot and comma for decimals in math
      userAns = userAns.replace(',', '.');
      isCorrect = (userAns === currentCase.correct);
  } else if (currentSubject === "english") {
      // Normalize English to ignore punctuation and case
      isCorrect = (normalizeAnswer(userAns) === normalizeAnswer(currentCase.correct));
  } else {
      isCorrect = (userAns.toLowerCase() === currentCase.correct.toLowerCase());
  }

  isSubmitted=true;
  answerInput.disabled=true;
  submitBtn.disabled=true;

  // Update progress
  const prog=getProgress(currentSubject);
  
  feedbackBox.classList.remove('hidden','correct','incorrect');
  if(isCorrect){
    if(hintLevel >= 3) {
      feedbackBox.classList.add('correct');
      feedbackText.textContent='✅ Chính xác! Nhưng vì xem đáp án nên không được cộng điểm nhé.';
    } else {
      prog.points+=POINTS_PER_CORRECT;
      prog.correctCount+=1;
      feedbackBox.classList.add('correct');
      feedbackText.textContent='✅ Chính xác! Giỏi lắm thám tử!';
    }
  }else{
    feedbackBox.classList.add('incorrect');
    feedbackText.textContent='❌ Sai rồi! Đáp án: '+currentCase.correct;
  }
  
  saveProgress(currentSubject,prog);

  // Show hanzi for Chinese
  if(currentSubject==="chinese"&&currentCase.hanzi){
    hanziChar.textContent=currentCase.hanzi;
    hanziPinyin.textContent=currentCase.pinyinDisplay;
    hanziBox.classList.remove('hidden');
  }

  explanationBox.classList.remove('hidden');
  nextActionBox.classList.remove('hidden');
  updateDashboard();
});

nextCaseBtn.addEventListener('click',loadNewCase);
