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

// 3. MATH GRADE 5 (Advanced)
function generateMath(category) {
    let T = [];
    if (category === "decimals" || category === "all") {
        const x = round(randInt(10, 50) + Math.random(), 2);
        const y = round(randInt(5, 20) + Math.random(), 2);
        const sum = round(x + y, 2);
        T.push({type:"Tìm X",title:"Số thập phân",dialogue:`Tìm X biết: X + ${y} = ${sum}`,correct:String(x),explanation:`X = ${sum} - ${y} = ${x}`,visual:"✖️"});
        
        const a = round(randInt(2, 9) + Math.random(), 1);
        const b = randInt(2, 8);
        const prod = round(a * b, 1);
        T.push({type:"Tìm X",title:"Phép Nhân",dialogue:`Tìm X biết: X × ${b} = ${prod}`,correct:String(a),explanation:`X = ${prod} ÷ ${b} = ${a}`,visual:"✖️"});
    }
    if (category === "fractions" || category === "all") {
        const d1 = pick([2, 3, 4, 5]);
        const d2 = pick([2, 3, 4, 5].filter(v => v !== d1));
        const lcd = d1 * d2;
        const n1 = randInt(1, d1-1);
        const n2 = randInt(1, d2-1);
        const nSum = (n1 * d2) + (n2 * d1);
        T.push({type:"Phân số",title:"Cộng Khác Mẫu",dialogue:`Tính và ghi tử số của kết quả (chưa rút gọn): ${n1}/${d1} + ${n2}/${d2} = ?/${lcd}`,correct:String(nSum),explanation:`Quy đồng mẫu số chung là ${lcd}. Tử số: ${n1}×${d2} + ${n2}×${d1} = ${nSum}`,visual:"🍕"});
        
        const whole = randInt(1, 5);
        const num = randInt(1, 3);
        const den = randInt(4, 7);
        T.push({type:"Hỗn số",title:"Chuyển đổi",dialogue:`Đổi hỗn số ${whole} và ${num}/${den} ra phân số (Ví dụ gõ: 13/4)`,correct:`${whole*den+num}/${den}`,explanation:`Tử số = phần nguyên × mẫu + tử = ${whole}×${den}+${num} = ${whole*den+num}. Mẫu giữ nguyên.`,visual:"🍕"});
    }
    if (category === "geometry_flat" || category === "all") {
        const a = randInt(10, 30);
        const b = randInt(5, a-1);
        const h = randInt(5, 20);
        const areaTrap = ((a + b) * h) / 2;
        if (Number.isInteger(areaTrap)) {
             T.push({type:"Hình thang",title:"Diện Tích",dialogue:`Một mảnh đất hình thang có đáy lớn ${a}m, đáy bé ${b}m, chiều cao ${h}m. Diện tích là ______ m²`,correct:String(areaTrap),explanation:`Diện tích = (đáy lớn + đáy bé) × chiều cao ÷ 2 = (${a} + ${b}) × ${h} ÷ 2 = ${areaTrap} m²`,visual:"📐"});
        }

        const r = pick([1, 2, 3, 4, 5, 10]);
        const areaCircle = round(r * r * 3.14, 2);
        T.push({type:"Hình tròn",title:"Diện Tích",dialogue:`Tính diện tích hình tròn bán kính r = ${r}cm (Lấy số pi = 3.14). Đáp số: ______ cm²`,correct:String(areaCircle),explanation:`Diện tích = r × r × 3.14 = ${r} × ${r} × 3.14 = ${areaCircle} cm²`,visual:"⭕"});
    }
    if (category === "units" || category === "all") {
        const m = randInt(2, 9);
        const cm = randInt(1, 99);
        T.push({type:"Đổi Đơn Vị",title:"Độ Dài Hỗn Hợp",dialogue:`Đổi ${m}m ${cm}cm = ______ cm`,correct:String(m*100 + cm),explanation:`1m = 100cm. ${m}m ${cm}cm = ${m*100} + ${cm} = ${m*100 + cm}cm`,visual:"📏"});
        
        const kg = randInt(1, 9);
        const g = randInt(10, 990);
        T.push({type:"Đổi Đơn Vị",title:"Khối Lượng",dialogue:`Đổi ${kg}kg ${g}g = ______ kg (Viết dạng số thập phân)`,correct:String(kg + g/1000),explanation:`1kg = 1000g. ${g}g = ${g/1000}kg. Tổng: ${kg + g/1000}kg`,visual:"⚖️"});

        const m2 = randInt(1, 15);
        const dm2 = randInt(5, 99);
        T.push({type:"Đổi Đơn Vị",title:"Diện Tích",dialogue:`Đổi ${m2}m² ${dm2}dm² = ______ dm²`,correct:String(m2*100 + dm2),explanation:`1m² = 100dm². Vậy ${m2}m² = ${m2*100}dm². Tổng = ${m2*100 + dm2}dm²`,visual:"🟩"});
    }

    if (category === "motion" || category === "all") {
        const v = randInt(30, 60); // km/h
        const t = pick([2, 3, 4, 1.5, 2.5]); // hours
        const s = v * t;
        T.push({type:"Chuyển động",title:"Quãng đường",dialogue:`Ô tô đi với vận tốc ${v} km/h trong ${t} giờ. Quãng đường đi được là ______ km`,correct:String(s),explanation:`Quãng đường = Vận tốc × Thời gian = ${v} × ${t} = ${s} km`,visual:"🚗"});
        
        const s2 = pick([120, 150, 200, 240]);
        const v2 = pick([40, 50, 60]);
        const t2 = round(s2 / v2, 2);
        if (Number.isInteger(s2/v2) || (s2*10/v2)%5===0) {
            T.push({type:"Chuyển động",title:"Thời gian",dialogue:`Xe máy đi quãng đường ${s2} km với vận tốc ${v2} km/h. Thời gian đi là ______ giờ`,correct:String(t2),explanation:`Thời gian = Quãng đường ÷ Vận tốc = ${s2} ÷ ${v2} = ${t2} giờ`,visual:"🏍️"});
        }
    }

    if (category === "percentage" || category === "all") {
        const total = pick([100, 200, 500, 1000]);
        const pct = pick([10, 15, 20, 25, 50]);
        const val = (total * pct) / 100;
        T.push({type:"Tỉ số phần trăm",title:"Tính phần trăm",dialogue:`Tìm ${pct}% của ${total} kg. Đáp án là ______ kg`,correct:String(val),explanation:`${pct}% của ${total} = ${total} × ${pct} ÷ 100 = ${val}`,visual:"📊"});
        
        const price = pick([100000, 200000, 500000]);
        const discount = pick([10, 20, 50]);
        const finalPrice = price - (price * discount) / 100;
        T.push({type:"Tỉ số phần trăm",title:"Giảm giá",dialogue:`Một món đồ chơi giá ${price} đồng, được giảm giá ${discount}%. Số tiền phải trả là ______ đồng`,correct:String(finalPrice),explanation:`Số tiền được giảm: ${price} × ${discount} ÷ 100 = ${price*discount/100}. Số tiền phải trả: ${price} - ${price*discount/100} = ${finalPrice}`,visual:"🏷️"});
    }

    if (category === "word_problems" || category === "all") {
        const sum = pick([100, 150, 200, 250, 400]);
        const diff = pick([20, 30, 40, 50, 100]);
        if (sum > diff) {
            const big = (sum + diff) / 2;
            const small = (sum - diff) / 2;
            T.push({
                type:"Tổng - Hiệu", title:"Bài toán 2 đáp số", 
                dialogue:`Trường tổ chức trồng cây. Lớp 5A và 5B trồng được tổng cộng ${sum} cây. Lớp 5A trồng nhiều hơn lớp 5B ${diff} cây. Hỏi mỗi lớp trồng được bao nhiêu cây?`,
                options: [`5A: ${big} cây, 5B: ${small} cây`, `5A: ${small} cây, 5B: ${big} cây`, `5A: ${big+10} cây, 5B: ${small-10} cây`, `5A: ${sum} cây, 5B: ${diff} cây`],
                correct:`5A: ${big} cây, 5B: ${small} cây`, 
                explanation:`Số cây 5A (số lớn) = (Tổng + Hiệu) ÷ 2 = (${sum} + ${diff}) ÷ 2 = ${big}. Số cây 5B = ${sum} - ${big} = ${small}.`, 
                visual:"🌳"
            });
        }
        
        const small2 = pick([10, 12, 15, 20]);
        const ratio = pick([3, 4, 5]);
        const big2 = small2 * ratio;
        const diff2 = big2 - small2;
        T.push({
            type:"Hiệu - Tỉ", title:"Tính Tuổi", 
            dialogue:`Hiện nay mẹ hơn con ${diff2} tuổi. Biết rằng tuổi mẹ gấp ${ratio} lần tuổi con. Hỏi hiện nay mẹ và con bao nhiêu tuổi?`,
            options: [`Mẹ: ${big2} tuổi, Con: ${small2} tuổi`, `Mẹ: ${big2-2} tuổi, Con: ${small2+2} tuổi`, `Mẹ: ${big2+5} tuổi, Con: ${small2+5} tuổi`, `Mẹ: ${diff2} tuổi, Con: ${ratio} tuổi`],
            correct:`Mẹ: ${big2} tuổi, Con: ${small2} tuổi`, 
            explanation:`Hiệu số phần bằng nhau là ${ratio} - 1 = ${ratio-1} (phần). Tuổi con = ${diff2} ÷ ${ratio-1} = ${small2} tuổi. Tuổi mẹ = ${small2} × ${ratio} = ${big2} tuổi.`, 
            visual:"👩‍👧"
        });
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

// ======================== APP STATE & FIREBASE ========================
const TARGET_BADGES = 50;
const POINTS_PER_CORRECT = 10;
const CORRECT_PER_BADGE = 20;

// ⚠️ ĐÃ ĐIỀN MÃ FIREBASE THẬT ⚠️
const firebaseConfig = {
    apiKey: "AIzaSyAzuZWkSLCo8hTZrNfqhlDohGL07LQww0A",
    authDomain: "chuongtrinhlop5keeko.firebaseapp.com",
    projectId: "chuongtrinhlop5keeko",
    storageBucket: "chuongtrinhlop5keeko.firebasestorage.app",
    messagingSenderId: "295095284196",
    appId: "1:295095284196:web:1d247f15a235f3cef5d7f1",
    measurementId: "G-CPR5E5ZEL9"
};

let auth = null;
let db = null;
// Nếu chưa có mã, hệ thống tự động chạy chế độ Offline LocalStorage
const isFirebaseReady = firebaseConfig.apiKey !== "DÁN_API_KEY_CỦA_BẠN_VÀO_ĐÂY";
if (isFirebaseReady) {
    firebase.initializeApp(firebaseConfig);
    auth = firebase.auth();
    db = firebase.firestore();
}

let currentUser = null;
let userProgress = {}; // Chứa toàn bộ điểm của tài khoản hiện tại

let currentSubject = null; 
let currentMathCategory = "all";
let currentCase = null;
let hintLevel = 0;
let isSubmitted = false;
let currentMCQButtons = [];

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

// Lấy điểm: Ưu tiên lấy từ biến userProgress (đã được tải từ mây về)
function loadProgress(subj){
  const key = "conan_" + subj + "_" + getTodayStr();
  return userProgress[key] || {points:0, correctCount:0};
}

// Lưu điểm: Lưu vào biến cục bộ, sau đó đồng bộ lên Cloud và LocalStorage dự phòng
function saveProgress(subj,data){
  const key = "conan_" + subj + "_" + getTodayStr();
  userProgress[key] = data;
  
  // Lưu dự phòng cục bộ
  try{localStorage.setItem(key,JSON.stringify(data));}catch(e){}
  
  // Lưu lên Đám mây
  if (isFirebaseReady && currentUser) {
      db.collection("users").doc(currentUser.uid).set({
          [key]: data
      }, {merge: true}).catch(err => console.log("Lỗi lưu mây:", err));
  }
}
function getProgress(subj){return loadProgress(subj);}

// ======================== DOM ========================
const $=id=>document.getElementById(id);

const authScreen=$('authScreen'), authForm=$('authForm'), authEmail=$('authEmail'), authPassword=$('authPassword'), authError=$('authError'), userProfileBadge=$('userProfileBadge');
const welcomeScreen=$('welcomeScreen'), subjectScreen=$('subjectScreen'), mathCategoryScreen=$('mathCategoryScreen'), exerciseScreen=$('exerciseScreen'), rewardScreen=$('rewardScreen');

const pointsDisplay=$('pointsDisplay'), badgesDisplay=$('badgesDisplay'), rankDisplay=$('rankDisplay'), progressBar=$('progressBar'), progressPercent=$('progressPercent');
const exVisual=$('exVisual'), exVisualEmoji=$('exVisualEmoji'), exAvatar=$('exAvatar'), caseType=$('caseType'), caseTitle=$('caseTitle'), caseDialogue=$('caseDialogue'), speechBtn=$('speechBtn');
const hanziBox=$('hanziBox'), hanziChar=$('hanziChar'), hanziPinyin=$('hanziPinyin');
const answerForm=$('answerForm'), answerInput=$('answerInput'), submitBtn=$('submitBtn'), answerLabel=$('answerLabel'), hintBtn=$('hintBtn'), hintDisplay=$('hintDisplay');
const mcqContainer=$('mcqContainer'), mcqGrid=$('mcqGrid');
const feedbackBox=$('feedbackBox'), feedbackText=$('feedbackText'), explanationBox=$('explanationBox'), caseExplanation=$('caseExplanation'), nextActionBox=$('nextActionBox'), nextCaseBtn=$('nextCaseBtn'), currentSubjectBadge=$('currentSubjectBadge');

// ======================== NAVIGATION ========================
function showScreen(screen){
  [authScreen,welcomeScreen,subjectScreen,mathCategoryScreen,exerciseScreen,rewardScreen].forEach(s=>s&&s.classList.add('hidden'));
  if(screen) screen.classList.remove('hidden');
}

// ======================== AUTHENTICATION (FIREBASE) ========================
if (isFirebaseReady) {
    auth.onAuthStateChanged(user => {
        if (user) {
            currentUser = user;
            userProfileBadge.textContent = "Thám tử: " + user.email.split('@')[0];
            // Tải dữ liệu từ mây về
            db.collection("users").doc(user.uid).get().then(doc => {
                if(doc.exists) userProgress = doc.data();
                showScreen(welcomeScreen);
            }).catch(e => showScreen(welcomeScreen));
        } else {
            currentUser = null;
            userProgress = {};
            showScreen(authScreen);
        }
    });

    authForm.addEventListener('submit', e => {
        e.preventDefault();
        const email = authEmail.value;
        const pass = authPassword.value;
        authError.classList.add('hidden');
        
        // Thử đăng nhập, nếu thất bại do chưa có tài khoản thì tạo mới
        auth.signInWithEmailAndPassword(email, pass)
            .catch(error => {
                if (error.code === 'auth/user-not-found') {
                    // Đăng ký mới
                    auth.createUserWithEmailAndPassword(email, pass)
                        .catch(err => { authError.textContent = "Lỗi tạo tài khoản: " + err.message; authError.classList.remove('hidden'); });
                } else {
                    authError.textContent = "Sai mật khẩu hoặc lỗi: " + error.message; authError.classList.remove('hidden');
                }
            });
    });
} else {
    // Chạy Offline Mode nếu chưa có mã Firebase
    showScreen(authScreen);
    authForm.addEventListener('submit', e => {
        e.preventDefault();
        currentUser = { uid: "offline_user", email: authEmail.value };
        userProfileBadge.textContent = "Thám tử: " + authEmail.value.split('@')[0];
        
        // Nạp data từ localStorage cục bộ
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith("conan_")) {
                try { userProgress[key] = JSON.parse(localStorage.getItem(key)); } catch(e){}
            }
        });
        showScreen(welcomeScreen);
    });
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
