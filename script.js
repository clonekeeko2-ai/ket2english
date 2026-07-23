// ============================================================
//  DETECTIVE CONAN MULTI-SUBJECT LEARNING APP
//  Subjects: 10 subjects (Grade 5 - 2024 Curriculum)
// ============================================================

// ======================== METADATA ========================
let subjectMeta = {};

// Cấu hình mặc định nếu Firebase chưa có
const defaultSubjectMeta = {
    vietnamese: { name: "Tiếng Việt", desc: "Chính tả, từ và câu", emoji: "📝", colorClass: "card-vietnamese" },
    science: { name: "Khoa Học", desc: "Tự nhiên, môi trường", emoji: "🔬", colorClass: "card-science" },
    history: { name: "Lịch Sử - Địa Lí", desc: "Việt Nam & Thế giới", emoji: "🗺️", colorClass: "card-history" },
    ethics: { name: "Đạo Đức", desc: "Bài học làm người", emoji: "🤝", colorClass: "card-ethics" },
    informatics: { name: "Tin Học & Công Nghệ", desc: "Máy tính, ứng dụng", emoji: "💻", colorClass: "card-informatics" },
    english: { name: "Tiếng Anh", desc: "Từ vựng, ngữ pháp", emoji: "🔤", colorClass: "card-english" },
    chinese: { name: "Tiếng Trung", desc: "Giao tiếp cơ bản", emoji: "🀄", colorClass: "card-chinese" }
};

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

// 3. MATH GRADE 5 (Advanced Procedural Generator)
function generateMath(category) {
    if (category === "all") {
        const cats = ["fractions", "decimals", "percentage", "motion", "geometry_flat", "units", "word_problems"];
        category = pick(cats);
    }
    
    let q = { visual: "🔢", emoji: "🔢", subject: "math", options: [] };

    switch(category) {
        case "fractions":
            const d1 = pick([2,3,4,5]); const d2 = pick([2,3,4,5].filter(x=>x!==d1));
            const n1 = randInt(1, d1-1); const n2 = randInt(1, d2-1);
            q.type = "Phân Số"; q.title = "Cộng Phân Số";
            q.dialogue = `${n1}/${d1} + ${n2}/${d2} bằng bao nhiêu?`;
            let num = n1*d2 + n2*d1; let den = d1*d2;
            let gcd = (a, b) => b ? gcd(b, a % b) : a;
            let g = gcd(num, den); num /= g; den /= g;
            q.correct = den === 1 ? `${num}` : `${num}/${den}`;
            q.options = [q.correct, `${n1+n2}/${d1+d2}`, `${num+1}/${den}`, `${num}/${den+1}`];
            q.explanation = `Quy đồng: (${n1}×${d2})/${d1*d2} + (${n2}×${d1})/${d1*d2} = ${n1*d2+n2*d1}/${d1*d2}. Rút gọn: ${q.correct}.`;
            q.visual = "🍕";
            q.id = `math_frac_${n1}_${d1}_${n2}_${d2}`;
            break;
        case "decimals":
            const x = randInt(10, 99) / 10; const y = randInt(10, 99) / 10;
            q.type = "Số Thập Phân"; q.title = "Phép Cộng";
            q.dialogue = `${x} + ${y} bằng bao nhiêu?`;
            q.correct = ((x*10 + y*10)/10).toString();
            q.options = [q.correct, ((x*10 + y*10 + 10)/10).toString(), ((x*10 + y*10 - 10)/10).toString(), ((x*10 + y*10 + 1)/10).toString()];
            q.explanation = `${x} + ${y} = ${q.correct}. Nhớ đặt thẳng dấu phẩy!`;
            q.id = `math_dec_${x}_${y}`;
            break;
        case "percentage":
            const price = pick([100, 200, 500]) * 1000;
            const discount = pick([10, 20, 25, 50]);
            q.type = "Tỉ Số Phần Trăm"; q.title = "Giảm Giá";
            q.dialogue = `Đồ chơi giá ${price.toLocaleString('vi-VN')}đ, giảm ${discount}%. Cần trả bao nhiêu?`;
            const finalP = price * (100 - discount) / 100;
            q.correct = `${finalP.toLocaleString('vi-VN')}đ`;
            q.options = [q.correct, `${(price - discount).toLocaleString('vi-VN')}đ`, `${(price * discount / 100).toLocaleString('vi-VN')}đ`, `${(finalP - 10000).toLocaleString('vi-VN')}đ`];
            q.explanation = `Số tiền giảm là ${discount}% của ${price} = ${price * discount / 100}. Số tiền trả = Giá gốc - Tiền giảm = ${q.correct}.`;
            q.visual = "📊";
            q.id = `math_perc_${price}_${discount}`;
            break;
        case "motion":
            const v = randInt(30, 60); const t = pick([2, 3, 4]);
            q.type = "Chuyển Động"; q.title = "Tính Quãng Đường";
            q.dialogue = `Ô tô đi với vận tốc ${v}km/h trong ${t} giờ. Quãng đường dài bao nhiêu?`;
            q.correct = `${v * t}km`;
            q.options = [q.correct, `${v + t}km`, `${v * t + 10}km`, `${v * t - 10}km`];
            q.explanation = `Quãng đường (s) = Vận tốc (v) × Thời gian (t) = ${v} × ${t} = ${q.correct}.`;
            q.visual = "🚗";
            q.id = `math_mot_${v}_${t}`;
            break;
        case "geometry_flat":
            const base = randInt(5, 15); const height = randInt(5, 15);
            q.type = "Hình Học Phẳng"; q.title = "Tam Giác";
            q.dialogue = `Tam giác có đáy ${base}cm, chiều cao ${height}cm. Diện tích là?`;
            const area = (base * height) / 2;
            q.correct = `${area}cm²`;
            q.options = [q.correct, `${base * height}cm²`, `${area + 5}cm²`, `${base + height}cm²`];
            q.explanation = `Diện tích tam giác = (Đáy × Cao) ÷ 2 = (${base} × ${height}) ÷ 2 = ${q.correct}.`;
            q.visual = "📐";
            q.id = `math_geo_${base}_${height}`;
            break;
        case "units":
            const m = randInt(2, 9); const cm = randInt(1, 99);
            q.type = "Đổi Đơn Vị"; q.title = "Độ Dài";
            q.dialogue = `${m}m ${cm}cm = ... cm?`;
            q.correct = `${m * 100 + cm}cm`;
            q.options = [q.correct, `${m * 10 + cm}cm`, `${m + cm}cm`, `${m * 1000 + cm}cm`];
            q.explanation = `1m = 100cm. Nên ${m}m = ${m*100}cm. Tổng = ${m*100} + ${cm} = ${q.correct}.`;
            q.visual = "⚖️";
            q.id = `math_unit_${m}_${cm}`;
            break;
        case "word_problems":
            const sum = randInt(30, 50); const diff = randInt(4, 10);
            const adjSum = (sum + diff) % 2 !== 0 ? sum + 1 : sum; // Ensure even
            const big = (adjSum + diff) / 2; const small = (adjSum - diff) / 2;
            q.type = "Toán Lời Văn"; q.title = "Tổng - Hiệu";
            q.dialogue = `Hai anh em có ${adjSum} viên bi. Anh nhiều hơn em ${diff} viên. Hỏi anh có bao nhiêu viên?`;
            q.correct = `${big} viên`;
            q.options = [q.correct, `${small} viên`, `${big + diff} viên`, `${adjSum} viên`];
            q.explanation = `Số của anh (Số lớn) = (Tổng + Hiệu) ÷ 2 = (${adjSum} + ${diff}) ÷ 2 = ${q.correct}.`;
            q.visual = "📚";
            q.id = `math_wp_${adjSum}_${diff}`;
            break;
    }
    
    // Đảm bảo đáp án là duy nhất, bù thêm nếu trùng
    q.options = Array.from(new Set(q.options));
    while(q.options.length < 4) q.options.push(q.correct + " " + randInt(1,9)); 
    q.options.sort(() => Math.random() - 0.5); // Xáo trộn đáp án
    
    return q;
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
// ======================== STATE MANAGEMENT & THEORY DB ========================
let sessionCompleted = { math: [], science: [], history: [], ethics: [], informatics: [], english: [], chinese: [], vietnamese: [] };
let sessionRetry = { math: [], science: [], history: [], ethics: [], informatics: [], english: [], chinese: [], vietnamese: [] };

// DB_THEORY được khởi tạo rỗng, sẽ tự động thêm môn học mới khi load từ Firebase
let DB_THEORY = {};

function seedTheoryToFirebase() {
    if(!isFirebaseReady || !db) return;
    const initialData = [
        {subject: "science", type:"Sinh Học", title:"Sự sinh sản", dialogue:"Động vật nào sau đây đẻ trứng?", options:["Chó","Mèo","Gà","Bò"], correct:"Gà", explanation:"Gà đẻ trứng, các loài kia đẻ con.", visual:"🥚"},
        {subject: "science", type:"Vật Chất", title:"Trạng thái", dialogue:"Nước ở nhiệt độ dưới 0°C tồn tại ở thể gì?", options:["Thể lỏng","Thể khí","Thể rắn","Không xác định"], correct:"Thể rắn", explanation:"Dưới 0°C nước đóng băng thành đá (thể rắn).", visual:"🧊"},
        {subject: "science", type:"Môi trường", title:"Tái chế", dialogue:"Loại rác nào sau đây có thể tái chế?", options:["Túi nilon rách","Vỏ hộp sữa giấy","Đồ gốm vỡ","Khẩu trang y tế"], correct:"Vỏ hộp sữa giấy", explanation:"Vỏ hộp giấy có thể tái chế.", visual:"♻️"},
        {subject: "history", type:"Lịch Sử VN", title:"Quốc khánh", dialogue:"Bác Hồ đọc Tuyên ngôn Độc lập vào năm nào?", options:["1930","1945","1954","1975"], correct:"1945", explanation:"Ngày 2/9/1945 tại Quảng trường Ba Đình.", visual:"🇻🇳"},
        {subject: "history", type:"Lịch Sử VN", title:"Chiến thắng", dialogue:"Chiến dịch Điện Biên Phủ kết thúc vào năm nào?", options:["1930","1945","1954","1975"], correct:"1954", explanation:"Chiến thắng ĐBP chấn động địa cầu năm 1954.", visual:"⚔️"},
        {subject: "history", type:"Địa Lí", title:"Châu lục", dialogue:"Đất nước Việt Nam nằm ở châu lục nào?", options:["Châu Âu","Châu Úc","Châu Á","Châu Phi"], correct:"Châu Á", explanation:"VN nằm ở Châu Á.", visual:"🌏"},
        {subject: "ethics", type:"Giao Tiếp", title:"Ứng xử", dialogue:"Khi gặp người lớn tuổi, em nên làm gì?", options:["Làm ngơ đi qua","Gật đầu nhẹ","Khoanh tay chào hỏi","Trốn đi chỗ khác"], correct:"Khoanh tay chào hỏi", explanation:"Khoanh tay chào hỏi thể hiện sự lễ phép.", visual:"🤝"},
        {subject: "ethics", type:"Môi Trường", title:"Bảo vệ", dialogue:"Hành động nào bảo vệ môi trường?", options:["Vứt rác xuống sông","Tái sử dụng túi nilon","Đốt nilon","Hái hoa công viên"], correct:"Tái sử dụng túi nilon", explanation:"Tái sử dụng giúp giảm thiểu lượng rác.", visual:"🌱"},
        {subject: "informatics", type:"Phần cứng", title:"Thiết bị", dialogue:"Thiết bị nào dùng để nhập chữ vào máy tính?", options:["Màn hình","Chuột","Bàn phím","Loa"], correct:"Bàn phím", explanation:"Bàn phím (Keyboard) dùng để gõ chữ.", visual:"⌨️"},
        {subject: "informatics", type:"An toàn mạng", title:"Bảo mật", dialogue:"Mật khẩu nào sau đây an toàn nhất?", options:["123456","password","Abc@2024!","hoang123"], correct:"Abc@2024!", explanation:"Mật khẩu an toàn cần có chữ hoa, chữ thường, số và ký tự đặc biệt.", visual:"🔒"}
    ];
    let batch = db.batch();
    initialData.forEach(item => {
        let ref = db.collection("theory_questions").doc();
        batch.set(ref, item);
    });
    batch.commit().then(() => console.log("Seeded theory to Firebase")).catch(e=>console.log(e));
}

function loadTheoryDB() {
    if(!isFirebaseReady || !db) return;
    
    // Tải song song câu hỏi và cấu hình môn học
    Promise.all([
        db.collection("theory_questions").get(),
        db.collection("subject_config").get()
    ]).then(([theorySnap, configSnap]) => {
        // Xử lý Cấu hình môn học
        if (!configSnap.empty) {
            configSnap.forEach(doc => {
                subjectMeta[doc.id] = doc.data();
            });
        } else {
            // Tự động seed dữ liệu mặc định lên DB nếu trống
            subjectMeta = {...defaultSubjectMeta};
            const batch = db.batch();
            Object.keys(defaultSubjectMeta).forEach(key => {
                let ref = db.collection("subject_config").doc(key);
                batch.set(ref, defaultSubjectMeta[key]);
            });
            batch.commit();
        }

        // Xử lý Câu hỏi
        if(theorySnap.empty) {
            console.log("Theory DB rỗng. Vui lòng upload dữ liệu qua admin_upload.html");
            renderDynamicSubjects();
            return;
        }
        
        theorySnap.forEach(doc => {
            let data = doc.data();
            if(data.subject) {
                if(!DB_THEORY[data.subject]) DB_THEORY[data.subject] = [];
                if(!sessionCompleted[data.subject]) sessionCompleted[data.subject] = [];
                if(!sessionRetry[data.subject]) sessionRetry[data.subject] = [];
                data.id = doc.id;
                DB_THEORY[data.subject].push(data);
            }
        });
        
        renderDynamicSubjects();
    });
}

function generateTheory(subj) {
    const defaultEmojis = {science:"🔬", history:"🗺️", ethics:"🤝", informatics:"💻", english:"🔤", chinese:"🀄", vietnamese:"📝"};
    const emojiStr = subjectMeta[subj] ? subjectMeta[subj].emoji : (defaultEmojis[subj] || "📚");
    
    let pool = DB_THEORY[subj];
    if(!pool || pool.length === 0) return {type:"Chưa có dữ liệu", title:"Dữ liệu trống", dialogue:"Bạn cần dùng NotebookLLM tạo câu hỏi và tải lên Firebase cho môn này nhé!", correct:"ok", visual:"⏳", emoji: emojiStr, subject: subj};
    
    // Lọc theo Học kỳ (hỗ trợ tương thích ngược số 1, 2, 0)
    pool = pool.filter(q => {
        let t = q.term;
        if (t === 1) t = "Học Kỳ 1";
        if (t === 2) t = "Học Kỳ 2";
        return (t === undefined || t === null || t === 0 || t === "Cả năm" || t === "Mặc định" || t === currentTerm);
    });

    // Lọc theo chương học
    if (currentTheoryCategory !== "all") {
        const filteredByChapter = pool.filter(q => q.type === currentTheoryCategory);
        if(filteredByChapter.length > 0) {
            pool = filteredByChapter;
        }
        // Nếu không có câu nào khớp (trường hợp cực hiếm), giữ nguyên pool của Học kỳ đó, không nhảy sang Học kỳ khác.
    }

    let available = pool.filter(q => !sessionCompleted[subj].includes(q.id));
    if(available.length === 0) {
        // Chỉ reset trạng thái "Đã làm" của các câu thuộc chương này, giữ nguyên các chương khác
        const poolIds = pool.map(q => q.id);
        sessionCompleted[subj] = sessionCompleted[subj].filter(id => !poolIds.includes(id));
        available = pool;
    }
    const q = pick(available);
    return {...q, emoji: emojiStr, subject: subj};
}

function renderDynamicSubjects() {
    const grid = $('subjectGrid');
    if (!grid) return;
    
    // Giữ lại môn Toán (do sinh câu hỏi tự động)
    const mathBtn = grid.querySelector('.card-math');
    grid.innerHTML = '';
    
    const subjects = Object.keys(DB_THEORY);
    // Sắp xếp môn học (môn có sẵn hiện trước, tùy chỉnh hiện sau)
    subjects.sort((a, b) => {
        const ia = Object.keys(subjectMeta).indexOf(a);
        const ib = Object.keys(subjectMeta).indexOf(b);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
    });

    subjects.forEach(subj => {
        const info = subjectMeta[subj] || { 
            name: subj, 
            desc: "Bài học tùy chọn", 
            emoji: "📚", 
            colorClass: "card-custom" 
        };
        
        const btn = document.createElement('button');
        btn.className = `subject-card ${info.colorClass}`;
        btn.dataset.subject = subj;
        btn.innerHTML = `
            <span class="sc-emoji">${info.emoji}</span>
            <span class="sc-name">${info.name}</span>
            <span class="sc-desc">${info.desc}</span>
        `;
        grid.appendChild(btn);
    });

    if (mathBtn) grid.appendChild(mathBtn);
}

// ======================== APP STATE & FIREBASE ========================
const TARGET_BADGES = 50;
const POINTS_PER_CORRECT = 10;
const CORRECT_PER_BADGE = 20;

// ⚠️ ĐÃ ĐIỀN MÃ FIREBASE THẬT ⚠️
const firebaseConfig = {
    apiKey: "AIzaSyAzuZWkSLCo8hTZrNfqh1DohGLO7LQwwOA",
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
let currentTheoryCategory = "all";
let currentTerm = "Học Kỳ 1"; // Mặc định là string
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
      let updateData = {
          [key]: data,
          email: currentUser.email,
          lastActive: new Date().toISOString()
      };
      if(sessionCompleted[subj]) updateData[`state_${subj}_completed`] = sessionCompleted[subj];
      if(sessionRetry[subj]) updateData[`state_${subj}_retry`] = sessionRetry[subj];

      db.collection("users").doc(currentUser.uid).set(updateData, {merge: true}).catch(err => console.log("Lỗi lưu mây:", err));
  }
}
function getProgress(subj){return loadProgress(subj);}

// ======================== DOM ========================
const $=id=>document.getElementById(id);

const authScreen=$('authScreen'), authForm=$('authForm'), authEmail=$('authEmail'), authPassword=$('authPassword'), authError=$('authError'), userProfileBadge=$('userProfileBadge'), logoutBtn=$('logoutBtn'), guestLeaderboardBtn=$('guestLeaderboardBtn'), forgotPasswordBtn=$('forgotPasswordBtn');
const welcomeScreen=$('welcomeScreen'), subjectScreen=$('subjectScreen'), mathCategoryScreen=$('mathCategoryScreen'), theoryCategoryScreen=$('theoryCategoryScreen'), exerciseScreen=$('exerciseScreen'), rewardScreen=$('rewardScreen'), leaderboardScreen=$('leaderboardScreen');

// ======================== SOUND EFFECTS ========================
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
        osc.start(); osc.stop(audioCtx.currentTime + 0.3);
    } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.setValueAtTime(100, audioCtx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.start(); osc.stop(audioCtx.currentTime + 0.2);
    }
}

const pointsDisplay=$('pointsDisplay'), badgesDisplay=$('badgesDisplay'), rankDisplay=$('rankDisplay'), progressBar=$('progressBar'), progressPercent=$('progressPercent');
const exVisual=$('exVisual'), exVisualEmoji=$('exVisualEmoji'), exAvatar=$('exAvatar'), caseType=$('caseType'), caseTitle=$('caseTitle'), caseDialogue=$('caseDialogue'), speechBtn=$('speechBtn');
const hanziBox=$('hanziBox'), hanziChar=$('hanziChar'), hanziPinyin=$('hanziPinyin');
const answerForm=$('answerForm'), answerInput=$('answerInput'), submitBtn=$('submitBtn'), answerLabel=$('answerLabel'), hintBtn=$('hintBtn'), hintDisplay=$('hintDisplay');
const mcqContainer=$('mcqContainer'), mcqGrid=$('mcqGrid');
const feedbackBox=$('feedbackBox'), feedbackText=$('feedbackText'), explanationBox=$('explanationBox'), caseExplanation=$('caseExplanation'), feedbackModal=$('feedbackModal'), nextCaseBtn=$('nextCaseBtn'), currentSubjectBadge=$('currentSubjectBadge');

// ======================== NAVIGATION ========================
function showScreen(screen){
  [authScreen,welcomeScreen,subjectScreen,mathCategoryScreen,theoryCategoryScreen,exerciseScreen,rewardScreen,leaderboardScreen].forEach(s=>s&&s.classList.add('hidden'));
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
                if(doc.exists) {
                    userProgress = doc.data();
                    ["math", "science", "history", "ethics", "informatics", "english", "chinese", "vietnamese"].forEach(s => {
                        if(userProgress[`state_${s}_completed`]) sessionCompleted[s] = userProgress[`state_${s}_completed`];
                        if(userProgress[`state_${s}_retry`]) sessionRetry[s] = userProgress[`state_${s}_retry`];
                    });
                }
                loadTheoryDB();
                showScreen(welcomeScreen);
            }).catch(e => { loadTheoryDB(); showScreen(welcomeScreen); });
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
        
        // Thử đăng nhập
        auth.signInWithEmailAndPassword(email, pass)
            .catch(error => {
                auth.createUserWithEmailAndPassword(email, pass)
                    .catch(err => {
                        if (err.code === 'auth/email-already-in-use') {
                            authError.textContent = "Sai mật khẩu. Vui lòng nhập lại!";
                        } else {
                            authError.textContent = "Lỗi hệ thống: " + err.message;
                        }
                        authError.classList.remove('hidden');
                    });
            });
    });
    
    if(forgotPasswordBtn) {
        forgotPasswordBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = authEmail.value.trim();
            if(!email) {
                authError.textContent = "Vui lòng nhập Email vào ô trên để lấy lại mật khẩu!";
                authError.classList.remove('hidden');
                return;
            }
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    authError.textContent = "Đã gửi email khôi phục. Vui lòng kiểm tra hộp thư!";
                    authError.style.color = "var(--green)";
                    authError.classList.remove('hidden');
                })
                .catch((error) => {
                    authError.textContent = "Lỗi: " + error.message;
                    authError.style.color = "var(--red)";
                    authError.classList.remove('hidden');
                });
        });
    }
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

if(logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        if(isFirebaseReady && auth) {
            auth.signOut();
        } else {
            currentUser = null;
            userProgress = {};
            showScreen(authScreen);
        }
    });
}

const leaderboardBtn = $('leaderboardBtn');
const leaderboardList = $('leaderboardList');
const backFromLeaderboard = $('backFromLeaderboard');

if (leaderboardBtn) {
    leaderboardBtn.addEventListener('click', () => {
        showScreen(leaderboardScreen);
        renderLeaderboard();
    });
}
if (guestLeaderboardBtn) {
    guestLeaderboardBtn.addEventListener('click', () => {
        showScreen(leaderboardScreen);
        renderLeaderboard();
    });
}
if (backFromLeaderboard) {
    backFromLeaderboard.addEventListener('click', () => {
        if (currentUser) showScreen(welcomeScreen);
        else showScreen(authScreen);
    });
}

function renderLeaderboard() {
    if (!isFirebaseReady) {
        leaderboardList.innerHTML = `<div style="text-align:center; padding: 20px;">Tính năng này yêu cầu tải ứng dụng lên Firebase.</div>`;
        return;
    }
    leaderboardList.innerHTML = `<div style="text-align:center; padding: 20px;">Đang tải dữ liệu đám mây... ⏳</div>`;
    
    db.collection("users").get().then(snapshot => {
        let players = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            if (!data.email) return;
            
            // Tính tổng điểm tất cả các môn của bé này
            let totalPts = 0;
            Object.keys(data).forEach(k => {
                if (k.startsWith('conan_') && data[k].points) {
                    totalPts += data[k].points;
                }
            });
            
            players.push({
                email: data.email.split('@')[0],
                score: totalPts
            });
        });
        
        // Sắp xếp điểm giảm dần
        players.sort((a,b) => b.score - a.score);
        
        if (players.length === 0) {
            leaderboardList.innerHTML = `<div style="text-align:center; padding: 20px;">Chưa có dữ liệu thám tử nào.</div>`;
            return;
        }
        
        leaderboardList.innerHTML = players.map((p, index) => {
            let rankHtml = `<div class="lb-rank">${index + 1}</div>`;
            if(index === 0) rankHtml = `<div class="lb-rank" style="background: #fbbf24;">🥇</div>`;
            if(index === 1) rankHtml = `<div class="lb-rank" style="background: #9ca3af;">🥈</div>`;
            if(index === 2) rankHtml = `<div class="lb-rank" style="background: #b45309;">🥉</div>`;
            
            return `
            <div class="lb-item">
                ${rankHtml}
                <div class="lb-name">${p.email}</div>
                <div class="lb-score">${p.score} 💰</div>
            </div>
            `;
        }).join('');
    }).catch(err => {
        leaderboardList.innerHTML = `<div style="text-align:center; color: red; padding: 20px;">Lỗi tải dữ liệu!</div>`;
    });
}

function updateSubjectProgress(){
  document.querySelectorAll('.subject-card').forEach(card => {
     // Optional: could display badges on cards again if UI is modified to fit
  });
}

$('startBtn').addEventListener('click',()=>{ updateSubjectProgress(); showScreen(subjectScreen); });
$('backToWelcome').addEventListener('click',()=>showScreen(welcomeScreen));

$('subjectGrid').addEventListener('click', (e) => {
    const card = e.target.closest('.subject-card');
    if (!card) return;
    currentSubject = card.dataset.subject;
    if(currentSubject === "math") showScreen(mathCategoryScreen);
    else {
        buildTheoryCategoryScreen(currentSubject);
        showScreen(theoryCategoryScreen);
    }
});

function buildTheoryCategoryScreen(subj) {
    const grid = $('theoryCategoryGrid');
    grid.innerHTML = '';
    
    let termDisplay = currentTerm.includes("Học Kỳ") ? " " + currentTerm : (currentTerm === "Mặc định" || currentTerm === "Cả năm" ? "" : " " + currentTerm);
    
    // Nút "Tất cả các chương"
    const allBtn = document.createElement('button');
    allBtn.className = `subject-card card-${subj}`;
    allBtn.innerHTML = `
        <span class="sc-emoji">📚</span>
        <div class="card-content">
            <span class="sc-name">Tổng Hợp${termDisplay}</span>
            <span class="sc-desc">Ôn tập tất cả</span>
        </div>
    `;
    allBtn.onclick = () => { currentTheoryCategory = "all"; startExercise(); };
    grid.appendChild(allBtn);

    // Render động các chương từ DB theo currentTerm
    const rawPool = DB_THEORY[subj] || [];
    
    // Render Term Tabs (Học kỳ)
    const uniqueTerms = new Set();
    rawPool.forEach(q => {
        let t = q.term;
        if (t === 1) t = "Học Kỳ 1";
        if (t === 2) t = "Học Kỳ 2";
        if (t !== 0 && t !== null && t !== undefined && t !== "Cả năm" && t !== "Mặc định") {
            uniqueTerms.add(t.toString());
        }
    });
    
    const termsArray = [...uniqueTerms].sort((a,b) => a.localeCompare(b));
    const termTabsContainer = $('termTabsContainer');
    if (termTabsContainer) {
        termTabsContainer.innerHTML = '';
        if (termsArray.length > 0) {
            termTabsContainer.style.display = 'flex';
            if (!termsArray.includes(currentTerm)) currentTerm = termsArray[0];
            
            termsArray.forEach(termStr => {
                const btn = document.createElement('button');
                btn.className = `term-tab ${currentTerm === termStr ? 'active' : ''}`;
                btn.textContent = termStr;
                btn.onclick = () => {
                    currentTerm = termStr;
                    buildTheoryCategoryScreen(subj);
                };
                termTabsContainer.appendChild(btn);
            });
        } else {
            termTabsContainer.style.display = 'none';
            currentTerm = "Cả năm";
        }
    }

    // Lọc pool theo currentTerm hiện tại
    const pool = rawPool.filter(q => {
        let t = q.term;
        if (t === 1) t = "Học Kỳ 1";
        if (t === 2) t = "Học Kỳ 2";
        return (t === undefined || t === null || t === 0 || t === "Cả năm" || t === "Mặc định" || t === currentTerm);
    });

    let types = [...new Set(pool.map(q => q.type))].filter(t => t);
    
    // Thuật toán sắp xếp thông minh (Natural Sort & Ưu tiên Ôn tập xếp cuối)
    types.sort((a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        const isReviewA = aLower.includes("ôn tập") || aLower.includes("đánh giá");
        const isReviewB = bLower.includes("ôn tập") || bLower.includes("đánh giá");
        
        if (isReviewA && !isReviewB) return 1; 
        if (!isReviewA && isReviewB) return -1; 
        return a.localeCompare(b, 'vi', { numeric: true, sensitivity: 'base' });
    });
    
    types.forEach(t => {
        const btn = document.createElement('button');
        btn.className = `subject-card card-${subj}`;
        btn.innerHTML = `
            <span class="sc-emoji">📖</span>
            <div class="card-content">
                <span class="sc-name">${t}</span>
                <span class="sc-desc">Luyện tập</span>
            </div>
        `;
        btn.onclick = () => { currentTheoryCategory = t; startExercise(); };
        grid.appendChild(btn);
    });
}

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

if($('backToSubjectsFromTheory')) {
    $('backToSubjectsFromTheory').addEventListener('click',()=>showScreen(subjectScreen));
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
  currentCase = null;
  // Hàng đợi Spaced Repetition (Tỉ lệ 30% gặp lại câu sai)
  if(sessionRetry[currentSubject] && sessionRetry[currentSubject].length > 0 && Math.random() < 0.3) {
      if (currentSubject !== "math") { // Toán học sinh động nên bỏ qua
          // Lọc tìm câu sai CHỈ thuộc về chương và học kỳ hiện tại
          let validRetries = sessionRetry[currentSubject].filter(id => {
              let q = DB_THEORY[currentSubject] && DB_THEORY[currentSubject].find(x => x.id === id);
              if (!q) return false;
              if (currentTheoryCategory !== "all" && q.type !== currentTheoryCategory) return false;
              // Fallback currentTerm nếu term cũ đang là số 1, 2
              let t = q.term;
              if (t === 1) t = "Học Kỳ 1";
              if (t === 2) t = "Học Kỳ 2";
              if (t !== undefined && t !== null && t !== 0 && t !== "Cả năm" && t !== "Mặc định" && t !== currentTerm) return false;
              return true;
          });

          if (validRetries.length > 0) {
              let retryId = validRetries[0];
              // Loại bỏ câu này khỏi hàng đợi
              sessionRetry[currentSubject] = sessionRetry[currentSubject].filter(id => id !== retryId);
              let found = DB_THEORY[currentSubject].find(x => x.id === retryId);
              if(found) currentCase = {...found, emoji: "🔄", subject: currentSubject, isRetry: true};
          }
      }
  }

  if(!currentCase || !currentCase.isRetry) {
      if(currentSubject==="math") {
          let maxTries = 50;
          do {
              currentCase = generateMath(currentMathCategory);
              maxTries--;
          } while(sessionCompleted["math"].includes(currentCase.id) && maxTries > 0);
      }
      else {
          currentCase = generateTheory(currentSubject);
      }
  }

  hintLevel=0; isSubmitted=false; currentMCQButtons=[];

  if(currentCase.visual) { exVisual.classList.remove('hidden'); exVisualEmoji.textContent=currentCase.visual; }
  else { exVisual.classList.add('hidden'); }

  exAvatar.textContent=currentCase.emoji||"🕵️";
  caseType.textContent=currentCase.type; caseTitle.textContent=currentCase.title;
  caseDialogue.innerText=currentCase.dialogue; caseExplanation.innerHTML=currentCase.explanation;
  hanziBox.classList.add('hidden'); hintDisplay.textContent='';
  feedbackModal.style.display = 'none';
  feedbackBox.classList.remove('correct','incorrect');
  explanationBox.classList.add('hidden');

  // UI Toggle: MCQ vs Text Input
  const isTextInput = currentCase.questionFormat === 'text_input' || !currentCase.options;
  
  if(!isTextInput) {
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
  feedbackBox.classList.remove('correct','incorrect');
  
  if(isCorrect){
    playSound('correct');
    if (typeof confetti === 'function') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#22c55e', '#fbbf24', '#3b82f6'] });
    }
    if(hintLevel >= 3 || (currentCase.options && hintLevel >= 2)) {
      feedbackBox.classList.add('correct'); feedbackText.textContent='✅ Đúng! Nhưng vì xem gợi ý nên không được cộng điểm nhé.';
      if(currentCase.id && !sessionRetry[currentSubject].includes(currentCase.id)) sessionRetry[currentSubject].push(currentCase.id);
    } else {
      prog.points+=POINTS_PER_CORRECT; prog.correctCount+=1;
      feedbackBox.classList.add('correct'); feedbackText.textContent='✅ Xuất sắc! Thám tử quá giỏi!';
      if(currentCase.id && !sessionCompleted[currentSubject].includes(currentCase.id)) sessionCompleted[currentSubject].push(currentCase.id);
    }
  } else {
    playSound('wrong');
    feedbackBox.classList.add('incorrect'); feedbackText.textContent='❌ Sai rồi! Đáp án là: '+currentCase.correct;
    if(currentCase.id && !sessionRetry[currentSubject].includes(currentCase.id)) sessionRetry[currentSubject].push(currentCase.id);
  }
  
  saveProgress(currentSubject,prog);
  if(currentSubject==="chinese"&&currentCase.hanzi){ hanziChar.textContent=currentCase.hanzi; hanziPinyin.textContent=currentCase.pinyinDisplay; hanziBox.classList.remove('hidden'); }
  if(currentCase.explanation) explanationBox.classList.remove('hidden');
  else explanationBox.classList.add('hidden');
  feedbackModal.style.display = 'flex';
  updateDashboard();
}

// MCQ Click
function handleMCQSubmit(clickedBtn, selectedOpt) {
    if(isSubmitted) return;
    const isCorrect = (selectedOpt === currentCase.correct);
    
    currentMCQButtons.forEach(b => {
        b.btn.disabled = true;
        if(b.opt === currentCase.correct) b.btn.classList.add('correct');
        else if (b.btn === clickedBtn) {
            b.btn.classList.add('wrong');
            if(!isCorrect) {
                b.btn.classList.add('shake');
                setTimeout(() => b.btn.classList.remove('shake'), 400);
            }
        }
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

// Next Case Button
nextCaseBtn.addEventListener('click', () => {
    feedbackModal.style.display = 'none';
    loadNewCase();
});
