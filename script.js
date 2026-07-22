// --- DYNAMIC CASE GENERATOR (1000+ Cases) ---
const CHARACTERS = [
    { name: "Conan", image: "https://ui-avatars.com/api/?name=Conan&background=0a1f44&color=fff&size=128" },
    { name: "Ran", image: "https://ui-avatars.com/api/?name=Ran&background=e62020&color=fff&size=128" },
    { name: "Kogoro", image: "https://ui-avatars.com/api/?name=Kogoro&background=fcd34d&color=000&size=128" },
    { name: "Haibara", image: "https://ui-avatars.com/api/?name=Haibara&background=0a1f44&color=fff&size=128" },
    { name: "Agasa", image: "https://ui-avatars.com/api/?name=Agasa&background=e62020&color=fff&size=128" },
    { name: "Megure", image: "https://ui-avatars.com/api/?name=Megure&background=fcd34d&color=000&size=128" }
];

const PLACES = ["library", "school", "park", "museum", "hospital", "station", "restaurant", "supermarket"];
const OBJECTS = ["book", "watch", "glasses", "bag", "phone", "key", "letter", "map"];
const ADJECTIVES = ["big", "small", "fast", "slow", "good", "bad", "hot", "cold", "happy", "sad"];

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateCase() {
    const char = getRandomItem(CHARACTERS);
    const place = getRandomItem(PLACES);
    const obj = getRandomItem(OBJECTS);
    const adj = getRandomItem(ADJECTIVES);
    
    // We will randomly pick one of many templates
    const templates = [
        // Grammar: Past Simple
        {
            type: "Ngữ pháp (Quá khứ đơn)",
            title: "Vụ Án Hôm Qua",
            dialogue: `Yesterday, ${char.name} ______ to the ${place} to find a clue.`,
            correct: "went",
            explanation: `Vì có từ "Yesterday" (hôm qua) nên động từ "go" phải chia ở quá khứ là "went".`
        },
        {
            type: "Ngữ pháp (Quá khứ đơn)",
            title: "Đồ Vật Bị Mất",
            dialogue: `I ______ a strange ${obj} in the ${place} last night.`,
            correct: "found",
            explanation: `Quá khứ của "find" (tìm thấy) là "found" vì có cụm từ "last night".`
        },
        // Grammar: Present Continuous
        {
            type: "Ngữ pháp (Hiện tại tiếp diễn)",
            title: "Theo Dõi Nghi Phạm",
            dialogue: `Look! The suspect ______ running towards the ${place}.`,
            correct: "is",
            explanation: `Cấu trúc hiện tại tiếp diễn: S + is/am/are + V-ing. "The suspect" là số ít nên dùng "is".`
        },
        // Grammar: Prepositions
        {
            type: "Ngữ pháp (Giới từ)",
            title: "Vị Trí Của Bằng Chứng",
            dialogue: `The hidden ${obj} is ______ the table in the ${place}.`,
            correct: "on",
            explanation: `"on the table" nghĩa là ở trên mặt bàn.`
        },
        {
            type: "Ngữ pháp (Giới từ)",
            title: "Cuộc Hẹn",
            dialogue: `${char.name} will meet us ______ 8 o'clock.`,
            correct: "at",
            explanation: `Trước giờ cụ thể (8 o'clock) ta phải dùng giới từ "at".`
        },
        // Grammar: Modals
        {
            type: "Ngữ pháp (Động từ khuyết thiếu)",
            title: "Khả Năng Phá Án",
            dialogue: `${char.name} ______ solve this case easily!`,
            correct: "can",
            explanation: `"can" nghĩa là có thể làm gì đó (chỉ khả năng).`
        },
        {
            type: "Ngữ pháp (Động từ khuyết thiếu)",
            title: "Luật Lệ",
            dialogue: `You ______ not cross the police line!`,
            correct: "must",
            explanation: `"must not" dùng để chỉ sự cấm đoán (không được phép làm gì).`
        },
        // Vocab: Adjectives / Comparatives
        {
            type: "Từ vựng (Tính từ)",
            title: "Manh Mối Quan Trọng",
            dialogue: `This ${obj} is very ______. We need to keep it safe.`,
            correct: "important",
            explanation: `"important" có nghĩa là quan trọng.`
        },
        {
            type: "Ngữ pháp (So sánh hơn)",
            title: "Suy Luận Nhạy Bén",
            dialogue: `${char.name} is ______ than the real criminal.`,
            correct: "smarter",
            explanation: `So sánh hơn của "smart" (ngắn) là thêm đuôi "-er" thành "smarter".`
        },
        // Vocab: Nouns
        {
            type: "Từ vựng (Nơi chốn)",
            title: "Bóng Dáng Kẻ Gian",
            dialogue: `The thief escaped to the ______, where students are reading books.`,
            correct: "library",
            explanation: `Nơi học sinh đọc sách (reading books) chính là thư viện (library).`
        },
        {
            type: "Từ vựng (Đồ vật)",
            title: "Vật Dụng Thám Tử",
            dialogue: `Conan uses his ______ to see small clues on the floor.`,
            correct: "glasses",
            explanation: `"glasses" là cặp kính. Kính của Conan có chức năng đặc biệt.`
        },
        {
            type: "Từ vựng (Hành động)",
            title: "Cuộc Truy Đuổi",
            dialogue: `Quick! We need to ______ the suspect before he gets away.`,
            correct: "catch",
            explanation: `"catch" có nghĩa là bắt giữ, tóm lấy.`
        }
    ];

    const template = getRandomItem(templates);
    return {
        id: Date.now() + Math.random(),
        ...template,
        character: char.name,
        image: char.image
    };
}


// --- APP STATE & LOGIC ---
const TARGET_BADGES = 50;
const POINTS_PER_CORRECT = 10;
const CORRECT_PER_BADGE = 20;

let points = 0;
let correctCount = 0;
let currentCase = null;
let hintLevel = 0; // 0: none, 1: length, 2: scrambled, 3: full
let isSubmitted = false;

// DOM Elements
const welcomeScreen = document.getElementById('welcomeScreen');
const mainApp = document.getElementById('mainApp');
const rewardScreen = document.getElementById('rewardScreen');
const startBtn = document.getElementById('startBtn');

const pointsDisplay = document.getElementById('pointsDisplay');
const badgesDisplay = document.getElementById('badgesDisplay');
const rankDisplay = document.getElementById('rankDisplay');
const progressBar = document.getElementById('progressBar');
const progressPercent = document.getElementById('progressPercent');

const caseImage = document.getElementById('caseImage');
const caseType = document.getElementById('caseType');
const caseTitle = document.getElementById('caseTitle');
const caseDialogue = document.getElementById('caseDialogue');
const speechBtn = document.getElementById('speechBtn');
const answerInput = document.getElementById('answerInput');
const submitBtn = document.getElementById('submitBtn');
const hintBtn = document.getElementById('hintBtn');
const hintDisplay = document.getElementById('hintDisplay');
const answerForm = document.getElementById('answerForm');
const feedbackBox = document.getElementById('feedbackBox');
const feedbackIcon = document.getElementById('feedbackIcon');
const feedbackText = document.getElementById('feedbackText');
const explanationBox = document.getElementById('explanationBox');
const caseExplanation = document.getElementById('caseExplanation');
const nextActionBox = document.getElementById('nextActionBox');
const nextCaseBtn = document.getElementById('nextCaseBtn');
const resetAppBtn = document.getElementById('resetAppBtn');

// --- INITIALIZATION ---
startBtn.addEventListener('click', () => {
    welcomeScreen.classList.add('hidden');
    mainApp.classList.remove('hidden');
    loadNewCase();
});

resetAppBtn.addEventListener('click', () => {
    points = 0;
    correctCount = 0;
    rewardScreen.classList.add('hidden');
    welcomeScreen.classList.remove('hidden');
    mainApp.classList.add('hidden');
    updateDashboard();
});

// --- AUDIO (WEB SPEECH API) ---
function speakText(text) {
    if (!('speechSynthesis' in window)) {
        alert("Trình duyệt không hỗ trợ Web Speech API");
        return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    // Try to find a male voice
    const voices = window.speechSynthesis.getVoices();
    const maleVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Male') || v.name.includes('David') || v.name.includes('Guy')));
    if (maleVoice) utterance.voice = maleVoice;
    
    speechBtn.classList.add('playing');
    utterance.onend = () => speechBtn.classList.remove('playing');
    utterance.onerror = () => speechBtn.classList.remove('playing');
    
    window.speechSynthesis.speak(utterance);
}

speechBtn.addEventListener('click', () => {
    if(currentCase) speakText(currentCase.dialogue.replace("______", "blank"));
});

// Load Voices early
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

// --- LOGIC FUNCTIONS ---
function getRank(bCount) {
    if (bCount < 10) return "Thám Tử Nhí";
    if (bCount < 20) return "Trợ Lý Thám Tử";
    if (bCount < 30) return "Thám Tử Học Việc";
    if (bCount < 40) return "Thám Tử Trung Cấp";
    if (bCount < 50) return "Thám Tử Cao Cấp";
    return "Thám Tử Lừng Danh";
}

function updateDashboard() {
    const badges = Math.floor(correctCount / CORRECT_PER_BADGE);
    pointsDisplay.innerText = points;
    badgesDisplay.innerText = `${badges}/${TARGET_BADGES}`;
    rankDisplay.innerText = getRank(badges);
    
    const percentage = Math.min(100, Math.round((badges / TARGET_BADGES) * 100));
    progressBar.style.width = `${percentage}%`;
    progressPercent.innerText = `${percentage}%`;

    if (badges >= TARGET_BADGES) {
        setTimeout(() => {
            mainApp.classList.add('hidden');
            rewardScreen.classList.remove('hidden');
        }, 1000);
    }
}

function scrambleWord(word) {
    const arr = word.split('');
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join(' ');
}

function loadNewCase() {
    currentCase = generateCase();
    hintLevel = 0;
    isSubmitted = false;
    
    caseImage.src = currentCase.image;
    caseType.innerText = currentCase.type;
    caseTitle.innerText = currentCase.title;
    caseDialogue.innerText = `"${currentCase.dialogue}"`;
    caseExplanation.innerText = currentCase.explanation;
    
    answerInput.value = "";
    answerInput.disabled = false;
    submitBtn.disabled = false;
    answerInput.focus();
    
    hintDisplay.innerText = "";
    
    feedbackBox.classList.add('hidden');
    explanationBox.classList.add('hidden');
    nextActionBox.classList.add('hidden');
    
    updateDashboard();
}

// --- EVENT LISTENERS ---
hintBtn.addEventListener('click', () => {
    if(!currentCase || isSubmitted) return;
    const ans = currentCase.correct;
    hintLevel++;
    if(hintLevel === 1) {
        hintDisplay.innerText = "Độ dài: " + ans.split('').map(() => '_').join(' ');
    } else if (hintLevel === 2) {
        hintDisplay.innerText = "Đảo lộn: " + scrambleWord(ans);
    } else {
        hintDisplay.innerText = "Đáp án: " + ans;
    }
});

answerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(isSubmitted) return;
    
    const userAns = answerInput.value.trim().toLowerCase();
    if(!userAns) return;
    
    const correctAns = currentCase.correct.toLowerCase();
    const isCorrect = userAns === correctAns;
    
    isSubmitted = true;
    answerInput.disabled = true;
    submitBtn.disabled = true;
    
    feedbackBox.classList.remove('hidden');
    feedbackBox.classList.remove('correct-msg', 'incorrect-msg');
    feedbackBox.style.backgroundColor = isCorrect ? '#f0fff4' : '#fff5f5';
    feedbackBox.style.color = isCorrect ? 'var(--color-success)' : 'var(--color-error)';
    
    if(isCorrect) {
        feedbackIcon.setAttribute('data-lucide', 'check-circle-2');
        feedbackText.innerText = 'Chính xác! Làm tốt lắm thám tử.';
        points += POINTS_PER_CORRECT;
        correctCount += 1;
    } else {
        feedbackIcon.setAttribute('data-lucide', 'x-circle');
        feedbackText.innerText = `Sai rồi! Đáp án đúng là: ${currentCase.correct}`;
    }
    lucide.createIcons();
    
    explanationBox.classList.remove('hidden');
    nextActionBox.classList.remove('hidden');
    
    updateDashboard();
});

nextCaseBtn.addEventListener('click', loadNewCase);
