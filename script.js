// ============================================================
//  DETECTIVE CONAN MULTI-SUBJECT LEARNING APP
//  Subjects: 10 subjects (Grade 5 - 2024 Curriculum)
// ============================================================

// ======================== HELPER FUNCTIONS ========================
function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }
function round(num, decimals) { return Number(Math.round(num + 'e' + decimals) + 'e-' + decimals); }
function normalizeAnswer(str) { return str.toLowerCase().replace(/[.,!?]/g, '').replace(/\s+/g, ' ').trim(); }

// ======================== GENERATORS ========================

// 1. ENGLISH KET
function generateEnglish() {
    const c = pick(["Conan","Ran","Kogoro","Haibara","Heiji","Sonoko","Agasa","Megure"]);
    const p = pick(["library","school","park","museum","hospital","station","restaurant","supermarket"]);
    const o = pick(["book","watch","glasses","bag","phone","key","letter","map"]);
    
    const s = pick([
        `Yesterday ${c} went to the ${p}`, `${c} found a strange ${o} on the table`,
        `The suspect is hiding in the ${p}`, `${c} is the best detective in town`,
        `They are playing soccer in the park`, `I bought a new ${o} yesterday`
    ]);
    const words = s.split(' ');
    let scrambled = [...words];
    for (let i = scrambled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]];
    }

    const T = [
        {type:"Quá khứ đơn",title:"Vụ Án Hôm Qua",dialogue:`Yesterday, ${c} ______ to the ${p}.`,correct:"went",explanation:`"Yesterday" → quá khứ. "go" → "went".`,visual:"🕵️"},
        {type:"Quá khứ đơn",title:"Manh Mối",dialogue:`I ______ a strange ${o} last night.`,correct:"found",explanation:`"last night" → quá khứ. "find" → "found".`,visual:"🔎"},
        {type:"Hiện tại tiếp diễn",title:"Theo Dõi",dialogue:`Look! The suspect ______ running!`,correct:"is",explanation:`"The suspect" (số ít) + "is" + V-ing.`,visual:"🏃"},
        {type:"Mạo từ",title:"Phát Hiện",dialogue:`${c} found ______ old ${o}.`,correct:"an",explanation:`"old" bắt đầu bằng nguyên âm → "an".`,visual:"📦"},
        {
            type: "Sắp xếp câu", title: "Giải Mã Thông Điệp",
            dialogue: `Sắp xếp các từ sau thành câu hoàn chỉnh:\n[ ${scrambled.join(' / ')} ]`,
            correct: s, explanation: `Thứ tự đúng: ${s}`, visual: "🧩"
        }
    ];
    return {...(Math.random() > 0.5 ? T[T.length - 1] : pick(T.slice(0, T.length - 1))), emoji: "🔤", subject: "english"};
}

// 2. CHINESE
function generateChinese(){
  const v=pick([
    {hanzi:"你好",pinyin:"ni hao",meaning:"Xin chào",visual:"👋"}, {hanzi:"谢谢",pinyin:"xie xie",meaning:"Cảm ơn",visual:"🙏"},
    {hanzi:"一",pinyin:"yi",meaning:"Một (1)",visual:"1️⃣"}, {hanzi:"妈妈",pinyin:"ma ma",meaning:"Mẹ",visual:"👩"},
    {hanzi:"猫",pinyin:"mao",meaning:"Con mèo",visual:"🐱"}, {hanzi:"狗",pinyin:"gou",meaning:"Con chó",visual:"🐶"}
  ]);
  return {
    type:"Từ vựng Tiếng Trung", title:v.meaning, dialogue:`${v.visual} "${v.meaning}" viết bằng Pinyin là: ______`,
    correct:v.pinyin, explanation:`"${v.meaning}" = ${v.hanzi} (${v.pinyin})`, visual:v.visual,
    hanzi:v.hanzi, pinyinDisplay:v.pinyin, emoji:"🀄", subject:"chinese"
  };
}

// 3. MATH GRADE 5
function generateMath(category) {
    let T = [];
    if (category === "decimals" || category === "all") {
        const a = round(randInt(10, 99) + Math.random(), 1), b = round(randInt(1, 9) + Math.random(), 1);
        T.push({type:"Số thập phân",title:"Phép Cộng",dialogue:`${a} + ${b} = ______`,correct:String(round(a+b, 1)),explanation:`${a} + ${b} = ${round(a+b, 1)}`,visual:"➕"});
    }
    if (category === "fractions" || category === "all") {
        T.push({type:"Phân số",title:"Rút gọn",dialogue:`Rút gọn phân số 15/20 thành tối giản (ví dụ: 3/4):`,correct:"3/4",explanation:`Chia cả tử và mẫu cho 5 ta được 3/4`,visual:"🍕"});
        T.push({type:"Hỗn số",title:"Chuyển đổi",dialogue:`Chuyển hỗn số 2 1/3 thành phân số (ví dụ: 7/3):`,correct:"7/3",explanation:`Lấy phần nguyên nhân mẫu cộng tử: (2×3+1)/3 = 7/3`,visual:"🍕"});
    }
    if (category === "geometry_flat" || category === "all") {
        const b = randInt(5, 20), h = randInt(4, 15);
        const areaTri = (b * h) / 2;
        if (Number.isInteger(areaTri)) T.push({type:"Hình tam giác",title:"Diện Tích",dialogue:`Tam giác đáy ${b}cm, cao ${h}cm. Diện tích = ______ cm²`,correct:String(areaTri),explanation:`(${b} × ${h}) ÷ 2 = ${areaTri} cm²`,visual:"🔺"});
    }
    if (category === "units" || category === "all") {
        const m = randInt(2, 15);
        T.push({type:"Đổi Đơn Vị",title:"Độ Dài",dialogue:`${m} m = ______ cm`,correct:String(m*100),explanation:`1m = 100cm. Vậy ${m}m = ${m*100}cm`,visual:"📏"});
        const m2 = randInt(3, 20);
        T.push({type:"Đổi Đơn Vị",title:"Diện Tích",dialogue:`${m2} m² = ______ dm²`,correct:String(m2*100),explanation:`1m² = 100dm². Vậy ${m2}m² = ${m2*100}dm²`,visual:"🟩"});
    }
    if(T.length === 0) T.push({type:"Đại số",title:"Phép tính",dialogue:"1 + 1 = ?",correct:"2",explanation:"Cơ bản",visual:"🔢"});
    return {...pick(T), emoji: "🔢", subject: "math"};
}

// 4. VIETNAMESE
function generateVietnamese() {
    const T = [
        {type:"Chính tả", title:"Tìm lỗi sai", dialogue:"Từ nào viết ĐÚNG chính tả?", options:["Xất sắc","Xuất sắc","Xuyết sắc","Xuất xắc"], correct:"Xuất sắc", explanation:"Xuất sắc có nghĩa là nổi bật lên, giỏi hơn mức bình thường.", visual:"✍️"},
        {type:"Từ đồng nghĩa", title:"Luyện từ", dialogue:"Từ nào đồng nghĩa với từ 'Nhân hậu'?", options:["Hiền lành","Hung dữ","Dũng cảm","Nhanh nhẹn"], correct:"Hiền lành", explanation:"Nhân hậu và hiền lành đều chỉ lòng thương người, tính tình tốt.", visual:"❤️"},
        {type:"Quan hệ từ", title:"Điền từ", dialogue:"______ trời mưa to ______ chúng em vẫn đi học đúng giờ.", options:["Vì ... nên","Tuy ... nhưng","Nếu ... thì","Không những ... mà còn"], correct:"Tuy ... nhưng", explanation:"Trời mưa to và đi học đúng giờ là 2 vế tương phản.", visual:"🔗"},
        {type:"Thành ngữ", title:"Sắp xếp", dialogue:"Sắp xếp các từ thành câu tục ngữ đúng:\n[ người / mười / Một / bằng / của / mặt ]", correct:"Một mặt người bằng mười mặt của", explanation:"Câu tục ngữ đề cao giá trị của con người so với của cải.", visual:"🧩"}
    ];
    return {...pick(T), emoji:"📝", subject:"vietnamese"};
}

// 5. STATIC THEORY DATABASES (Science, History, Ethics, Informatics)
const DB_THEORY = {
    science: [
        {type:"Sinh Học", title:"Sự sinh sản", dialogue:"Động vật nào sau đây đẻ trứng?", options:["Chó","Mèo","Gà","Bò"], correct:"Gà", explanation:"Gà đẻ trứng, các loài kia đẻ con.", visual:"🥚"},
        {type:"Vật Chất", title:"Trạng thái", dialogue:"Nước ở nhiệt độ dưới 0°C tồn tại ở thể gì?", options:["Thể lỏng","Thể khí","Thể rắn","Không xác định"], correct:"Thể rắn", explanation:"Dưới 0°C nước đóng băng thành đá (thể rắn).", visual:"🧊"},
        {type:"Môi trường", title:"Tái chế", dialogue:"Loại rác nào sau đây có thể tái chế?", options:["Túi nilon rách","Vỏ hộp sữa giấy","Đồ gốm vỡ","Khẩu trang y tế"], correct:"Vỏ hộp sữa giấy", explanation:"Vỏ hộp giấy có thể tái chế.", visual:"♻️"}
    ],
    history: [
        {type:"Lịch Sử VN", title:"Quốc khánh", dialogue:"Bác Hồ đọc Tuyên ngôn Độc lập vào năm nào?", options:["1930","1945","1954","1975"], correct:"1945", explanation:"Ngày 2/9/1945 tại Quảng trường Ba Đình.", visual:"🇻🇳"},
        {type:"Lịch Sử VN", title:"Chiến thắng", dialogue:"Chiến dịch Điện Biên Phủ kết thúc vào năm nào?", correct:"1954", explanation:"Chiến thắng ĐBP chấn động địa cầu năm 1954.", visual:"⚔️"},
        {type:"Địa Lí", title:"Châu lục", dialogue:"Đất nước Việt Nam nằm ở châu lục nào?", options:["Châu Âu","Châu Úc","Châu Á","Châu Phi"], correct:"Châu Á", explanation:"VN nằm ở Châu Á.", visual:"🌏"}
    ],
    ethics: [
        {type:"Giao Tiếp", title:"Ứng xử", dialogue:"Khi gặp người lớn tuổi, em nên làm gì?", options:["Làm ngơ đi qua","Gật đầu nhẹ","Khoanh tay chào hỏi","Trốn đi chỗ khác"], correct:"Khoanh tay chào hỏi", explanation:"Khoanh tay chào hỏi thể hiện sự lễ phép.", visual:"🤝"},
        {type:"Môi Trường", title:"Bảo vệ", dialogue:"Hành động nào bảo vệ môi trường?", options:["Vứt rác xuống sông","Tái sử dụng túi nilon","Đốt nilon","Hái hoa công viên"], correct:"Tái sử dụng túi nilon", explanation:"Tái sử dụng giúp giảm thiểu lượng rác.", visual:"🌱"}
    ],
    informatics: [
        {type:"Phần cứng", title:"Thiết bị", dialogue:"Thiết bị nào dùng để nhập chữ vào máy tính?", options:["Màn hình","Chuột","Bàn phím","Loa"], correct:"Bàn phím", explanation:"Bàn phím (Keyboard) dùng để gõ chữ.", visual:"⌨️"},
        {type:"An toàn mạng", title:"Bảo mật", dialogue:"Mật khẩu nào sau đây an toàn nhất?", options:["123456","password","Abc@2024!","hoang123"], correct:"Abc@2024!", explanation:"Mật khẩu an toàn cần có chữ hoa, chữ thường, số và ký tự đặc biệt.", visual:"🔒"}
    ]
};

function generateTheory(subj) {
    const emojis = {science:"🔬", history:"🗺️", ethics:"🤝", informatics:"💻"};
    const q = pick(DB_THEORY[subj]);
    return {...q, emoji: emojis[subj], subject: subj};
}

// ======================== APP STATE ========================
const TARGET_BADGES = 50;
const POINTS_PER_CORRECT = 10;
const CORRECT_PER_BADGE = 20;

let currentSubject = null; 
let currentMathCategory = "all";
let currentCase = null;
let hintLevel = 0;
let isSubmitted = false;
let currentMCQButtons = [];

function loadProgress(subj){
  try{ const d=JSON.parse(localStorage.getItem("conan_"+subj)); return d||{points:0,correctCount:0}; }catch(e){return{points:0,correctCount:0};}
}
function saveProgress(subj,data){
  try{localStorage.setItem("conan_"+subj,JSON.stringify(data));}catch(e){}
}
function getProgress(subj){return loadProgress(subj);}

// ======================== DOM ========================
const $=id=>document.getElementById(id);

const welcomeScreen=$('welcomeScreen'), subjectScreen=$('subjectScreen'), mathCategoryScreen=$('mathCategoryScreen'), exerciseScreen=$('exerciseScreen'), rewardScreen=$('rewardScreen');
const pointsDisplay=$('pointsDisplay'), badgesDisplay=$('badgesDisplay'), rankDisplay=$('rankDisplay'), progressBar=$('progressBar'), progressPercent=$('progressPercent');
const exVisual=$('exVisual'), exVisualEmoji=$('exVisualEmoji'), exAvatar=$('exAvatar'), caseType=$('caseType'), caseTitle=$('caseTitle'), caseDialogue=$('caseDialogue'), speechBtn=$('speechBtn');
const hanziBox=$('hanziBox'), hanziChar=$('hanziChar'), hanziPinyin=$('hanziPinyin');
const answerForm=$('answerForm'), answerInput=$('answerInput'), submitBtn=$('submitBtn'), answerLabel=$('answerLabel'), hintBtn=$('hintBtn'), hintDisplay=$('hintDisplay');
const mcqContainer=$('mcqContainer'), mcqGrid=$('mcqGrid');
const feedbackBox=$('feedbackBox'), feedbackText=$('feedbackText'), explanationBox=$('explanationBox'), caseExplanation=$('caseExplanation'), nextActionBox=$('nextActionBox'), nextCaseBtn=$('nextCaseBtn'), currentSubjectBadge=$('currentSubjectBadge');

// ======================== NAVIGATION ========================
function showScreen(screen){
  [welcomeScreen,subjectScreen,mathCategoryScreen,exerciseScreen,rewardScreen].forEach(s=>s&&s.classList.add('hidden'));
  if(screen) screen.classList.remove('hidden');
}

function updateSubjectProgress(){
  document.querySelectorAll('.subject-card').forEach(card => {
     // Optional: could display badges on cards again if UI is modified to fit
  });
}

$('startBtn').addEventListener('click',()=>{ updateSubjectProgress(); showScreen(subjectScreen); });
$('backToWelcome').addEventListener('click',()=>showScreen(welcomeScreen));

document.querySelectorAll('.subject-screen:not(#mathCategoryScreen) .subject-card').forEach(card=>{
  card.addEventListener('click',()=>{
    currentSubject=card.dataset.subject;
    if(currentSubject === "math") showScreen(mathCategoryScreen);
    else startExercise();
  });
});

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

$('backToSubjects').addEventListener('click',()=>{ updateSubjectProgress(); showScreen(subjectScreen); });
$('resetSubjectBtn').addEventListener('click',()=>{ saveProgress(currentSubject,{points:0,correctCount:0}); startExercise(); });
$('backToMenuBtn').addEventListener('click',()=>{ updateSubjectProgress(); showScreen(subjectScreen); });

// ======================== EXERCISE ========================
function startExercise(){
  const labels={
      vietnamese:"📝 Tiếng Việt", math:"🔢 Toán Lớp 5", science:"🔬 Khoa Học", 
      history:"🗺️ Lịch Sử - Địa Lí", ethics:"🤝 Đạo Đức", informatics:"💻 Tin Học", 
      english:"🔤 Tiếng Anh", chinese:"🀄 Tiếng Trung"
  };
  currentSubjectBadge.textContent=labels[currentSubject] || "📚 Trại Huấn Luyện";
  currentSubjectBadge.className="ex-subject-badge badge-"+currentSubject;
  speechBtn.style.display=(currentSubject==="english")?"flex":"none";
  showScreen(exerciseScreen);
  loadNewCase();
}

function loadNewCase(){
  if(currentSubject==="english") currentCase=generateEnglish();
  else if(currentSubject==="math") currentCase=generateMath(currentMathCategory);
  else if(currentSubject==="chinese") currentCase=generateChinese();
  else if(currentSubject==="vietnamese") currentCase=generateVietnamese();
  else currentCase=generateTheory(currentSubject);

  hintLevel=0; isSubmitted=false; currentMCQButtons=[];

  if(currentCase.visual) { exVisual.classList.remove('hidden'); exVisualEmoji.textContent=currentCase.visual; }
  else { exVisual.classList.add('hidden'); }

  exAvatar.textContent=currentCase.emoji||"🕵️";
  caseType.textContent=currentCase.type; caseTitle.textContent=currentCase.title;
  caseDialogue.innerText=currentCase.dialogue; caseExplanation.innerHTML=currentCase.explanation;
  hanziBox.classList.add('hidden'); hintDisplay.textContent='';
  feedbackBox.classList.add('hidden'); feedbackBox.classList.remove('correct','incorrect');
  explanationBox.classList.add('hidden'); nextActionBox.classList.add('hidden');

  // UI Toggle: MCQ vs Text Input
  if(currentCase.options) {
      answerForm.classList.add('hidden'); mcqContainer.classList.remove('hidden');
      mcqGrid.innerHTML = '';
      const letters = ['A','B','C','D'];
      let opts = [...currentCase.options];
      opts.sort(()=>Math.random()-0.5); // Shuffle
      
      opts.forEach((opt, idx) => {
          const btn = document.createElement('button');
          btn.className = 'btn-mcq';
          btn.innerHTML = `<span class="mcq-letter">${letters[idx]}</span><span class="mcq-text">${opt}</span>`;
          btn.onclick = () => handleMCQSubmit(btn, opt);
          mcqGrid.appendChild(btn);
          currentMCQButtons.push({btn, opt});
      });
  } else {
      answerForm.classList.remove('hidden'); mcqContainer.classList.add('hidden');
      answerInput.value=''; answerInput.disabled=false; submitBtn.disabled=false;
      setTimeout(()=>answerInput.focus(),300);
  }

  updateDashboard();
}

// Evaluation
function evaluateAnswer(isCorrect) {
  isSubmitted=true;
  const prog=getProgress(currentSubject);
  feedbackBox.classList.remove('hidden','correct','incorrect');
  
  if(isCorrect){
    if(hintLevel >= 3 || (currentCase.options && hintLevel >= 2)) {
      feedbackBox.classList.add('correct'); feedbackText.textContent='✅ Đúng! Nhưng vì xem gợi ý nên không được cộng điểm nhé.';
    } else {
      prog.points+=POINTS_PER_CORRECT; prog.correctCount+=1;
      feedbackBox.classList.add('correct'); feedbackText.textContent='✅ Xuất sắc! Thám tử quá giỏi!';
    }
  } else {
    feedbackBox.classList.add('incorrect'); feedbackText.textContent='❌ Sai rồi! Đáp án là: '+currentCase.correct;
  }
  
  saveProgress(currentSubject,prog);
  if(currentSubject==="chinese"&&currentCase.hanzi){ hanziChar.textContent=currentCase.hanzi; hanziPinyin.textContent=currentCase.pinyinDisplay; hanziBox.classList.remove('hidden'); }
  explanationBox.classList.remove('hidden'); nextActionBox.classList.remove('hidden');
  updateDashboard();
}

// MCQ Click
function handleMCQSubmit(clickedBtn, selectedOpt) {
    if(isSubmitted) return;
    const isCorrect = (selectedOpt === currentCase.correct);
    
    currentMCQButtons.forEach(b => {
        b.btn.disabled = true;
        if(b.opt === currentCase.correct) b.btn.classList.add('correct');
        else if (b.btn === clickedBtn) b.btn.classList.add('wrong');
        else b.btn.classList.add('faded');
    });
    evaluateAnswer(isCorrect);
}

// Text Submit
answerForm.addEventListener('submit',e=>{
  e.preventDefault(); if(isSubmitted)return;
  let userAns=answerInput.value.trim(); if(!userAns)return;
  let isCorrect = false;
  
  if (currentSubject === "math") isCorrect = (userAns.replace(',', '.') === currentCase.correct);
  else if (currentSubject === "english" || currentSubject === "vietnamese") isCorrect = (normalizeAnswer(userAns) === normalizeAnswer(currentCase.correct));
  else isCorrect = (userAns.toLowerCase() === currentCase.correct.toLowerCase());

  answerInput.disabled=true; submitBtn.disabled=true;
  evaluateAnswer(isCorrect);
});

// Hint Logic
hintBtn.addEventListener('click',()=>{
  if(!currentCase||isSubmitted)return;
  hintLevel++;
  
  if(currentCase.options) {
      // MCQ Hint: 50/50 - remove wrong answers
      let wrongBtns = currentMCQButtons.filter(b => b.opt !== currentCase.correct && !b.btn.classList.contains('faded'));
      if(wrongBtns.length > 0) {
          wrongBtns[0].btn.classList.add('faded');
      }
      return;
  }

  const ans=currentCase.correct;
  if(currentSubject === "english" && currentCase.type === "Sắp xếp câu") {
      if(hintLevel === 1) hintDisplay.textContent = '📏 Có ' + ans.split(' ').length + ' từ';
      else if(hintLevel === 2) hintDisplay.textContent = '🔤 Bắt đầu bằng: ' + ans.split(' ')[0];
      else hintDisplay.textContent = '✅ ' + ans;
  } else {
      if(hintLevel===1) hintDisplay.textContent='📏 '+ans.split('').map(c=>c===' '?' ':'_').join(' ');
      else if(hintLevel===2) hintDisplay.textContent='🔤 '+ans[0]+' '+ans.slice(1).split('').map(c=>c===' '?' ':'_').join(' ');
      else hintDisplay.textContent='✅ '+ans;
  }
});

// Utils
function getRank(b){
  if(b<5)return"Thám Tử Nhí";if(b<10)return"Trợ Lý";if(b<20)return"Học Việc";if(b<30)return"Trung Cấp";if(b<40)return"Cao Cấp";if(b<50)return"Lừng Danh";return"🏆 Huyền Thoại";
}
function updateDashboard(){
  const p=getProgress(currentSubject); const badges=Math.floor(p.correctCount/CORRECT_PER_BADGE);
  pointsDisplay.textContent=p.points; badgesDisplay.textContent=`${badges}/${TARGET_BADGES}`; rankDisplay.textContent=getRank(badges);
  const pct=Math.min(100,Math.round((badges/TARGET_BADGES)*100));
  progressBar.style.width=pct+'%'; progressPercent.textContent=pct+'%';
  
  const colors={english:"linear-gradient(90deg,#0a1f44,#e62020)",math:"linear-gradient(90deg,#15803d,#22c55e)",chinese:"linear-gradient(90deg,#c2410c,#f97316)", vietnamese:"linear-gradient(90deg,#6d28d9,#a855f7)", science:"linear-gradient(90deg,#0f766e,#14b8a6)"};
  progressBar.style.background=colors[currentSubject]||colors.english;
  
  if(badges>=TARGET_BADGES){ setTimeout(()=>{ $('rewardSubject').textContent=currentSubjectBadge.textContent; showScreen(rewardScreen); },800); }
}

// Text to Speech
function speakText(text){
  if(!('speechSynthesis' in window))return; window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text); u.lang='en-US';
  const voices=window.speechSynthesis.getVoices();
  const male=voices.find(v=>v.lang.includes('en')&&(v.name.includes('Male')||v.name.includes('David')));
  if(male)u.voice=male;
  speechBtn.classList.add('playing'); u.onend=()=>speechBtn.classList.remove('playing'); u.onerror=()=>speechBtn.classList.remove('playing');
  window.speechSynthesis.speak(u);
}
speechBtn.addEventListener('click',()=>{
    if(currentCase&&currentSubject==="english") speakText(currentCase.dialogue.replace("______","blank").replace(/\[.*?\]/g, ""));
});
if('speechSynthesis' in window){window.speechSynthesis.onvoiceschanged=()=>window.speechSynthesis.getVoices();}
nextCaseBtn.addEventListener('click',loadNewCase);
