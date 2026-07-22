// ============================================================
//  DETECTIVE CONAN MULTI-SUBJECT LEARNING APP
//  Subjects: English KET | Math Grade 5 | Chinese (Pinyin)
//  Progress saved in localStorage
// ============================================================

// ======================== ENGLISH KET GENERATOR ========================
const EN_CHARS = ["Conan","Ran","Kogoro","Haibara","Heiji","Sonoko","Agasa","Megure"];
const EN_PLACES = ["library","school","park","museum","hospital","station","restaurant","supermarket","airport","cinema","hotel","zoo","garden","office"];
const EN_OBJECTS = ["book","watch","glasses","bag","phone","key","letter","map","camera","wallet","notebook","umbrella","ticket","pen"];
function pick(a){return a[Math.floor(Math.random()*a.length)]}

function generateEnglish(){
  const c=pick(EN_CHARS), p=pick(EN_PLACES), o=pick(EN_OBJECTS);
  const T=[
    {type:"Quá khứ đơn",title:"Vụ Án Hôm Qua",dialogue:`Yesterday, ${c} ______ to the ${p}.`,correct:"went",explanation:`"Yesterday" → quá khứ. "go" → "went".`},
    {type:"Quá khứ đơn",title:"Manh Mối",dialogue:`I ______ a strange ${o} in the ${p} last night.`,correct:"found",explanation:`"last night" → quá khứ. "find" → "found".`},
    {type:"Quá khứ đơn",title:"Bữa Trưa",dialogue:`${c} ______ lunch at the ${p} yesterday.`,correct:"ate",explanation:`"yesterday" → "eat" → "ate".`},
    {type:"Quá khứ đơn",title:"Chụp Ảnh",dialogue:`The detective ______ a photo of the suspect.`,correct:"took",explanation:`"take" → quá khứ "took".`},
    {type:"Quá khứ đơn",title:"Truy Đuổi",dialogue:`The police ______ after the thief.`,correct:"ran",explanation:`"run" → quá khứ "ran".`},
    {type:"Quá khứ đơn",title:"Viết Thư",dialogue:`${c} ______ the answer in a ${o}.`,correct:"wrote",explanation:`"write" → quá khứ "wrote".`},
    {type:"Quá khứ đơn",title:"Bắt Giữ",dialogue:`The police ______ the thief near the ${p}.`,correct:"caught",explanation:`"catch" → quá khứ "caught".`},
    {type:"Giới từ",title:"Trên Bàn",dialogue:`The ${o} is ______ the table.`,correct:"on",explanation:`"on the table" = trên mặt bàn.`},
    {type:"Giới từ",title:"Cuộc Hẹn",dialogue:`${c} will meet us ______ 3 o'clock.`,correct:"at",explanation:`Trước giờ cụ thể dùng "at".`},
    {type:"Giới từ",title:"Ngày",dialogue:`The crime happened ______ Monday.`,correct:"on",explanation:`Trước ngày trong tuần dùng "on".`},
    {type:"Giới từ",title:"Tháng",dialogue:`It happened ______ January.`,correct:"in",explanation:`Trước tháng dùng "in".`},
    {type:"Giới từ",title:"Trong Phòng",dialogue:`The suspect is hiding ______ the room.`,correct:"in",explanation:`"in the room" = trong phòng.`},
    {type:"Động từ khuyết thiếu",title:"Khả Năng",dialogue:`${c} ______ solve this case!`,correct:"can",explanation:`"can" = có thể.`},
    {type:"Động từ khuyết thiếu",title:"Cấm",dialogue:`You ______ not touch the evidence!`,correct:"must",explanation:`"must not" = không được phép.`},
    {type:"Động từ khuyết thiếu",title:"Nên",dialogue:`You ______ study harder.`,correct:"should",explanation:`"should" = nên.`},
    {type:"Hiện tại tiếp diễn",title:"Theo Dõi",dialogue:`Look! The suspect ______ running!`,correct:"is",explanation:`"The suspect" (số ít) + "is" + V-ing.`},
    {type:"Hiện tại tiếp diễn",title:"Chúng Ta",dialogue:`They ______ playing in the ${p}.`,correct:"are",explanation:`"They" + "are" + V-ing.`},
    {type:"Hiện tại tiếp diễn",title:"Ngay Lúc Này",dialogue:`I ______ reading a ${o} right now.`,correct:"am",explanation:`"I" + "am" + V-ing.`},
    {type:"Mạo từ",title:"Phát Hiện",dialogue:`${c} found ______ old ${o}.`,correct:"an",explanation:`"old" bắt đầu bằng nguyên âm → "an".`},
    {type:"So sánh",title:"Thông Minh",dialogue:`${c} is ______ than the criminal.`,correct:"smarter",explanation:`"smart" + "-er" → "smarter".`},
    {type:"So sánh",title:"Giỏi Nhất",dialogue:`Conan is the ______ detective.`,correct:"best",explanation:`"good" → "the best" (bất quy tắc).`},
    {type:"Câu hỏi",title:"Ở Đâu",dialogue:`______ do you live?`,correct:"Where",explanation:`"Where" = Ở đâu?`},
    {type:"Câu hỏi",title:"Khi Nào",dialogue:`______ did it happen?`,correct:"When",explanation:`"When" = Khi nào?`},
    {type:"Câu hỏi",title:"Tại Sao",dialogue:`______ are you late?`,correct:"Why",explanation:`"Why" = Tại sao?`},
    {type:"Từ vựng",title:"Thư Viện",dialogue:`Students read books at the ______.`,correct:"library",explanation:`"library" = thư viện.`,visual:"📚"},
    {type:"Từ vựng",title:"Rạp Phim",dialogue:`Let's watch a movie at the ______.`,correct:"cinema",explanation:`"cinema" = rạp chiếu phim.`,visual:"🎬"},
    {type:"Từ vựng",title:"Siêu Thị",dialogue:`We buy food at the ______.`,correct:"supermarket",explanation:`"supermarket" = siêu thị.`,visual:"🛒"},
    {type:"Từ vựng",title:"Bệnh Viện",dialogue:`Sick people go to the ______.`,correct:"hospital",explanation:`"hospital" = bệnh viện.`,visual:"🏥"},
    {type:"Từ vựng",title:"Giáo Viên",dialogue:`A ______ teaches students.`,correct:"teacher",explanation:`"teacher" = giáo viên.`,visual:"👩‍🏫"},
    {type:"Từ vựng",title:"Bác Sĩ",dialogue:`A ______ helps sick people.`,correct:"doctor",explanation:`"doctor" = bác sĩ.`,visual:"👨‍⚕️"},
    {type:"Từ vựng",title:"Con Mèo",dialogue:`A ______ says "meow".`,correct:"cat",explanation:`"cat" = con mèo.`,visual:"🐱"},
    {type:"Từ vựng",title:"Con Chó",dialogue:`A ______ is man's best friend.`,correct:"dog",explanation:`"dog" = con chó.`,visual:"🐶"},
    {type:"Từ vựng",title:"Trời Mưa",dialogue:`Take an umbrella! It is ______.`,correct:"rainy",explanation:`"rainy" = có mưa.`,visual:"🌧️"},
    {type:"Từ vựng",title:"Trời Nắng",dialogue:`Wear sunscreen! It is ______.`,correct:"sunny",explanation:`"sunny" = nắng.`,visual:"☀️"},
    {type:"Từ vựng",title:"Bầu Trời",dialogue:`The sky is ______ on a sunny day.`,correct:"blue",explanation:`"blue" = xanh dương.`,visual:"🔵"},
    {type:"Từ vựng",title:"Cỏ Cây",dialogue:`The grass is ______.`,correct:"green",explanation:`"green" = xanh lá.`,visual:"🟢"},
    {type:"Từ vựng",title:"Sữa",dialogue:`I drink ______ every morning.`,correct:"milk",explanation:`"milk" = sữa.`,visual:"🥛"},
    {type:"Hiện tại đơn",title:"Thói Quen",dialogue:`${c} ______ to school every day.`,correct:"goes",explanation:`Ngôi 3 số ít: "go" + "es" → "goes".`},
    {type:"Hiện tại đơn",title:"Phủ Định",dialogue:`I ______ not understand.`,correct:"do",explanation:`Phủ định ngôi 1: "I do not".`},
    {type:"Sở hữu",title:"Của Tôi",dialogue:`This is ______ book. (của tôi)`,correct:"my",explanation:`"my" = của tôi.`},
    {type:"Sở hữu",title:"Của Bạn",dialogue:`Is this ______ pen? (của bạn)`,correct:"your",explanation:`"your" = của bạn.`},
    {type:"There is/are",title:"Phát Hiện",dialogue:`______ is a ${o} on the floor!`,correct:"There",explanation:`"There is" + danh từ số ít.`},
    {type:"Liên từ",title:"Bởi Vì",dialogue:`${c} stayed home ______ it was rainy.`,correct:"because",explanation:`"because" = bởi vì.`},
    {type:"Liên từ",title:"Nhưng",dialogue:`I wanted to go, ______ it was late.`,correct:"but",explanation:`"but" = nhưng.`},
    {type:"Từ vựng",title:"Đôi Mắt",dialogue:`We use our ______ to see.`,correct:"eyes",explanation:`"eyes" = đôi mắt.`,visual:"👀"},
    {type:"Từ vựng",title:"Bàn Tay",dialogue:`We write with our ______.`,correct:"hands",explanation:`"hands" = bàn tay.`,visual:"✋"},
    {type:"Từ vựng",title:"Bà Ngoại",dialogue:`My ______ is my mom's mom.`,correct:"grandmother",explanation:`"grandmother" = bà.`,visual:"👵"},
    {type:"Từ vựng",title:"Bố",dialogue:`My ______ goes to work every morning.`,correct:"father",explanation:`"father" = bố.`,visual:"👨"},
  ];
  const t=pick(T);
  return {...t,emoji:pick(["🕵️","👩","🧔","👧","👨‍🔬","👮"]),subject:"english"};
}

// ======================== MATH GRADE 5 GENERATOR ========================
function randInt(a,b){return Math.floor(Math.random()*(b-a+1))+a}

function generateMath(){
  const T=[];

  // --- Arithmetic ---
  for(let i=0;i<5;i++){
    const a=randInt(100,999),b=randInt(100,999);
    T.push({type:"Phép cộng",title:"Tính Nhanh",dialogue:`${a} + ${b} = ______`,correct:String(a+b),explanation:`${a} + ${b} = ${a+b}`,visual:"➕"});
  }
  for(let i=0;i<5;i++){
    const a=randInt(500,999),b=randInt(100,a);
    T.push({type:"Phép trừ",title:"Tính Nhanh",dialogue:`${a} - ${b} = ______`,correct:String(a-b),explanation:`${a} - ${b} = ${a-b}`,visual:"➖"});
  }
  for(let i=0;i<5;i++){
    const a=randInt(10,99),b=randInt(2,9);
    T.push({type:"Phép nhân",title:"Tính Nhanh",dialogue:`${a} × ${b} = ______`,correct:String(a*b),explanation:`${a} × ${b} = ${a*b}`,visual:"✖️"});
  }
  for(let i=0;i<5;i++){
    const b=randInt(2,12),r=randInt(10,99),a=b*r;
    T.push({type:"Phép chia",title:"Chia Hết",dialogue:`${a} ÷ ${b} = ______`,correct:String(r),explanation:`${a} ÷ ${b} = ${r}`,visual:"➗"});
  }

  // --- Find X ---
  for(let i=0;i<5;i++){
    const x=randInt(5,50),b=randInt(10,100),sum=x+b;
    T.push({type:"Tìm X",title:"Ẩn Số Bí Mật",dialogue:`X + ${b} = ${sum}. X = ______`,correct:String(x),explanation:`X = ${sum} - ${b} = ${x}`,visual:"❓"});
  }
  for(let i=0;i<5;i++){
    const x=randInt(2,20),b=randInt(2,9),prod=x*b;
    T.push({type:"Tìm X",title:"Ẩn Số Bí Mật",dialogue:`X × ${b} = ${prod}. X = ______`,correct:String(x),explanation:`X = ${prod} ÷ ${b} = ${x}`,visual:"❓"});
  }

  // --- Geometry: Rectangle ---
  for(let i=0;i<3;i++){
    const w=randInt(3,15),h=randInt(3,15);
    T.push({type:"Hình chữ nhật",title:"Chu Vi",dialogue:`Hình chữ nhật có chiều dài ${w}cm, chiều rộng ${h}cm. Chu vi = ______ cm`,correct:String((w+h)*2),explanation:`Chu vi = (${w} + ${h}) × 2 = ${(w+h)*2} cm`,visual:"▬"});
    T.push({type:"Hình chữ nhật",title:"Diện Tích",dialogue:`Hình chữ nhật ${w}cm × ${h}cm. Diện tích = ______ cm²`,correct:String(w*h),explanation:`S = ${w} × ${h} = ${w*h} cm²`,visual:"▬"});
  }

  // --- Geometry: Square ---
  for(let i=0;i<3;i++){
    const s=randInt(3,20);
    T.push({type:"Hình vuông",title:"Chu Vi",dialogue:`Hình vuông cạnh ${s}cm. Chu vi = ______ cm`,correct:String(s*4),explanation:`Chu vi = ${s} × 4 = ${s*4} cm`,visual:"⬜"});
    T.push({type:"Hình vuông",title:"Diện Tích",dialogue:`Hình vuông cạnh ${s}cm. Diện tích = ______ cm²`,correct:String(s*s),explanation:`S = ${s} × ${s} = ${s*s} cm²`,visual:"⬜"});
  }

  // --- Geometry: Triangle ---
  for(let i=0;i<3;i++){
    const b=randInt(4,20),h=randInt(4,20),area=b*h/2;
    if(Number.isInteger(area)){
      T.push({type:"Hình tam giác",title:"Diện Tích",dialogue:`Tam giác đáy ${b}cm, cao ${h}cm. Diện tích = ______ cm²`,correct:String(area),explanation:`S = ${b} × ${h} ÷ 2 = ${area} cm²`,visual:"🔺"});
    }
  }

  // --- Geometry: Circle ---
  for(let i=0;i<2;i++){
    const r=randInt(2,10);
    const circumference = Math.round(2*3.14*r*100)/100;
    T.push({type:"Hình tròn",title:"Chu Vi",dialogue:`Hình tròn bán kính ${r}cm (π ≈ 3.14). Chu vi = ______ cm`,correct:String(circumference),explanation:`C = 2 × 3.14 × ${r} = ${circumference} cm`,visual:"⭕"});
    const area = Math.round(3.14*r*r*100)/100;
    T.push({type:"Hình tròn",title:"Diện Tích",dialogue:`Hình tròn bán kính ${r}cm (π ≈ 3.14). Diện tích = ______ cm²`,correct:String(area),explanation:`S = 3.14 × ${r} × ${r} = ${area} cm²`,visual:"⭕"});
  }

  // --- Fractions ---
  for(let i=0;i<3;i++){
    const d=randInt(3,10),n1=randInt(1,d-1),n2=randInt(1,d-1),sum=n1+n2;
    if(sum<d){
      T.push({type:"Phân số",title:"Cộng Phân Số",dialogue:`${n1}/${d} + ${n2}/${d} = ______/${d}`,correct:String(sum),explanation:`${n1}/${d} + ${n2}/${d} = ${sum}/${d} (cùng mẫu, cộng tử)`,visual:"🔢"});
    }
  }

  // --- Average ---
  for(let i=0;i<3;i++){
    const n=randInt(3,5),nums=[];
    for(let j=0;j<n;j++) nums.push(randInt(5,20));
    const avg=nums.reduce((a,b)=>a+b,0)/n;
    if(Number.isInteger(avg)){
      T.push({type:"Trung bình cộng",title:"Tính TB",dialogue:`Trung bình cộng của ${nums.join(", ")} = ______`,correct:String(avg),explanation:`(${nums.join(" + ")}) ÷ ${n} = ${avg}`,visual:"📊"});
    }
  }

  const t=pick(T);
  return {...t,emoji:pick(["📐","📏","🔢","🧮","📊"]),subject:"math"};
}

// ======================== CHINESE GENERATOR ========================
const ZH_VOCAB = [
  // Greetings
  {hanzi:"你好",pinyin:"ni hao",meaning:"Xin chào",visual:"👋"},
  {hanzi:"谢谢",pinyin:"xie xie",meaning:"Cảm ơn",visual:"🙏"},
  {hanzi:"再见",pinyin:"zai jian",meaning:"Tạm biệt",visual:"👋"},
  {hanzi:"对不起",pinyin:"dui bu qi",meaning:"Xin lỗi",visual:"🙇"},
  {hanzi:"没关系",pinyin:"mei guan xi",meaning:"Không sao",visual:"😊"},
  {hanzi:"请",pinyin:"qing",meaning:"Xin mời / Làm ơn",visual:"🤲"},
  // Numbers
  {hanzi:"一",pinyin:"yi",meaning:"Một (1)",visual:"1️⃣"},
  {hanzi:"二",pinyin:"er",meaning:"Hai (2)",visual:"2️⃣"},
  {hanzi:"三",pinyin:"san",meaning:"Ba (3)",visual:"3️⃣"},
  {hanzi:"四",pinyin:"si",meaning:"Bốn (4)",visual:"4️⃣"},
  {hanzi:"五",pinyin:"wu",meaning:"Năm (5)",visual:"5️⃣"},
  {hanzi:"六",pinyin:"liu",meaning:"Sáu (6)",visual:"6️⃣"},
  {hanzi:"七",pinyin:"qi",meaning:"Bảy (7)",visual:"7️⃣"},
  {hanzi:"八",pinyin:"ba",meaning:"Tám (8)",visual:"8️⃣"},
  {hanzi:"九",pinyin:"jiu",meaning:"Chín (9)",visual:"9️⃣"},
  {hanzi:"十",pinyin:"shi",meaning:"Mười (10)",visual:"🔟"},
  {hanzi:"百",pinyin:"bai",meaning:"Trăm (100)",visual:"💯"},
  // Family
  {hanzi:"妈妈",pinyin:"ma ma",meaning:"Mẹ",visual:"👩"},
  {hanzi:"爸爸",pinyin:"ba ba",meaning:"Bố",visual:"👨"},
  {hanzi:"哥哥",pinyin:"ge ge",meaning:"Anh trai",visual:"👦"},
  {hanzi:"姐姐",pinyin:"jie jie",meaning:"Chị gái",visual:"👧"},
  {hanzi:"弟弟",pinyin:"di di",meaning:"Em trai",visual:"👦"},
  {hanzi:"妹妹",pinyin:"mei mei",meaning:"Em gái",visual:"👧"},
  {hanzi:"爷爷",pinyin:"ye ye",meaning:"Ông nội",visual:"👴"},
  {hanzi:"奶奶",pinyin:"nai nai",meaning:"Bà nội",visual:"👵"},
  // Animals
  {hanzi:"猫",pinyin:"mao",meaning:"Con mèo",visual:"🐱"},
  {hanzi:"狗",pinyin:"gou",meaning:"Con chó",visual:"🐶"},
  {hanzi:"鱼",pinyin:"yu",meaning:"Con cá",visual:"🐟"},
  {hanzi:"鸟",pinyin:"niao",meaning:"Con chim",visual:"🐦"},
  {hanzi:"马",pinyin:"ma",meaning:"Con ngựa",visual:"🐴"},
  {hanzi:"牛",pinyin:"niu",meaning:"Con bò",visual:"🐮"},
  {hanzi:"猪",pinyin:"zhu",meaning:"Con heo",visual:"🐷"},
  {hanzi:"兔子",pinyin:"tu zi",meaning:"Con thỏ",visual:"🐰"},
  {hanzi:"老虎",pinyin:"lao hu",meaning:"Con hổ",visual:"🐯"},
  {hanzi:"大象",pinyin:"da xiang",meaning:"Con voi",visual:"🐘"},
  {hanzi:"猴子",pinyin:"hou zi",meaning:"Con khỉ",visual:"🐵"},
  // Colors
  {hanzi:"红色",pinyin:"hong se",meaning:"Màu đỏ",visual:"🔴"},
  {hanzi:"蓝色",pinyin:"lan se",meaning:"Màu xanh dương",visual:"🔵"},
  {hanzi:"绿色",pinyin:"lv se",meaning:"Màu xanh lá",visual:"🟢"},
  {hanzi:"黄色",pinyin:"huang se",meaning:"Màu vàng",visual:"🟡"},
  {hanzi:"白色",pinyin:"bai se",meaning:"Màu trắng",visual:"⚪"},
  {hanzi:"黑色",pinyin:"hei se",meaning:"Màu đen",visual:"⚫"},
  // Food & Drink
  {hanzi:"水",pinyin:"shui",meaning:"Nước",visual:"💧"},
  {hanzi:"茶",pinyin:"cha",meaning:"Trà",visual:"🍵"},
  {hanzi:"牛奶",pinyin:"niu nai",meaning:"Sữa bò",visual:"🥛"},
  {hanzi:"米饭",pinyin:"mi fan",meaning:"Cơm",visual:"🍚"},
  {hanzi:"面条",pinyin:"mian tiao",meaning:"Mì / Phở",visual:"🍜"},
  {hanzi:"苹果",pinyin:"ping guo",meaning:"Quả táo",visual:"🍎"},
  {hanzi:"西瓜",pinyin:"xi gua",meaning:"Dưa hấu",visual:"🍉"},
  {hanzi:"蛋糕",pinyin:"dan gao",meaning:"Bánh kem",visual:"🎂"},
  {hanzi:"鸡蛋",pinyin:"ji dan",meaning:"Trứng gà",visual:"🥚"},
  {hanzi:"面包",pinyin:"mian bao",meaning:"Bánh mì",visual:"🍞"},
  // Objects / Furniture
  {hanzi:"书",pinyin:"shu",meaning:"Sách",visual:"📖"},
  {hanzi:"笔",pinyin:"bi",meaning:"Bút",visual:"🖊️"},
  {hanzi:"桌子",pinyin:"zhuo zi",meaning:"Cái bàn",visual:"🪑"},
  {hanzi:"椅子",pinyin:"yi zi",meaning:"Cái ghế",visual:"💺"},
  {hanzi:"门",pinyin:"men",meaning:"Cái cửa",visual:"🚪"},
  {hanzi:"窗户",pinyin:"chuang hu",meaning:"Cửa sổ",visual:"🪟"},
  {hanzi:"电话",pinyin:"dian hua",meaning:"Điện thoại",visual:"📱"},
  {hanzi:"电脑",pinyin:"dian nao",meaning:"Máy tính",visual:"💻"},
  {hanzi:"钟",pinyin:"zhong",meaning:"Đồng hồ",visual:"🕐"},
  {hanzi:"伞",pinyin:"san",meaning:"Cái ô/dù",visual:"☂️"},
  // Places
  {hanzi:"学校",pinyin:"xue xiao",meaning:"Trường học",visual:"🏫"},
  {hanzi:"医院",pinyin:"yi yuan",meaning:"Bệnh viện",visual:"🏥"},
  {hanzi:"家",pinyin:"jia",meaning:"Nhà",visual:"🏠"},
  {hanzi:"商店",pinyin:"shang dian",meaning:"Cửa hàng",visual:"🏪"},
  {hanzi:"公园",pinyin:"gong yuan",meaning:"Công viên",visual:"🌳"},
  // Body
  {hanzi:"手",pinyin:"shou",meaning:"Bàn tay",visual:"✋"},
  {hanzi:"头",pinyin:"tou",meaning:"Cái đầu",visual:"🗣️"},
  {hanzi:"眼睛",pinyin:"yan jing",meaning:"Mắt",visual:"👀"},
  {hanzi:"耳朵",pinyin:"er duo",meaning:"Tai",visual:"👂"},
  {hanzi:"嘴",pinyin:"zui",meaning:"Miệng",visual:"👄"},
  {hanzi:"脚",pinyin:"jiao",meaning:"Bàn chân",visual:"🦶"},
  // Nature / Weather
  {hanzi:"太阳",pinyin:"tai yang",meaning:"Mặt trời",visual:"☀️"},
  {hanzi:"月亮",pinyin:"yue liang",meaning:"Mặt trăng",visual:"🌙"},
  {hanzi:"星星",pinyin:"xing xing",meaning:"Ngôi sao",visual:"⭐"},
  {hanzi:"花",pinyin:"hua",meaning:"Bông hoa",visual:"🌸"},
  {hanzi:"树",pinyin:"shu",meaning:"Cái cây",visual:"🌳"},
  {hanzi:"山",pinyin:"shan",meaning:"Núi",visual:"⛰️"},
  {hanzi:"雨",pinyin:"yu",meaning:"Mưa",visual:"🌧️"},
  // Actions
  {hanzi:"吃",pinyin:"chi",meaning:"Ăn",visual:"🍽️"},
  {hanzi:"喝",pinyin:"he",meaning:"Uống",visual:"🥤"},
  {hanzi:"看",pinyin:"kan",meaning:"Nhìn / Xem",visual:"👁️"},
  {hanzi:"听",pinyin:"ting",meaning:"Nghe",visual:"👂"},
  {hanzi:"说",pinyin:"shuo",meaning:"Nói",visual:"💬"},
  {hanzi:"走",pinyin:"zou",meaning:"Đi bộ",visual:"🚶"},
  {hanzi:"跑",pinyin:"pao",meaning:"Chạy",visual:"🏃"},
  {hanzi:"写",pinyin:"xie",meaning:"Viết",visual:"✍️"},
  {hanzi:"读",pinyin:"du",meaning:"Đọc",visual:"📖"},
  {hanzi:"学",pinyin:"xue",meaning:"Học",visual:"📚"},
  {hanzi:"玩",pinyin:"wan",meaning:"Chơi",visual:"🎮"},
  {hanzi:"睡觉",pinyin:"shui jiao",meaning:"Ngủ",visual:"😴"},
  // Adjectives
  {hanzi:"大",pinyin:"da",meaning:"To / Lớn",visual:"🔷"},
  {hanzi:"小",pinyin:"xiao",meaning:"Nhỏ / Bé",visual:"🔹"},
  {hanzi:"好",pinyin:"hao",meaning:"Tốt / Hay",visual:"👍"},
  {hanzi:"多",pinyin:"duo",meaning:"Nhiều",visual:"📦"},
  {hanzi:"少",pinyin:"shao",meaning:"Ít",visual:"📌"},
  {hanzi:"快",pinyin:"kuai",meaning:"Nhanh",visual:"⚡"},
  {hanzi:"慢",pinyin:"man",meaning:"Chậm",visual:"🐌"},
  {hanzi:"高",pinyin:"gao",meaning:"Cao",visual:"📏"},
  {hanzi:"热",pinyin:"re",meaning:"Nóng",visual:"🔥"},
  {hanzi:"冷",pinyin:"leng",meaning:"Lạnh",visual:"🧊"},
  // Time
  {hanzi:"今天",pinyin:"jin tian",meaning:"Hôm nay",visual:"📅"},
  {hanzi:"明天",pinyin:"ming tian",meaning:"Ngày mai",visual:"📆"},
  {hanzi:"昨天",pinyin:"zuo tian",meaning:"Hôm qua",visual:"📅"},
  // People
  {hanzi:"朋友",pinyin:"peng you",meaning:"Bạn bè",visual:"🤝"},
  {hanzi:"老师",pinyin:"lao shi",meaning:"Thầy/Cô giáo",visual:"👩‍🏫"},
  {hanzi:"学生",pinyin:"xue sheng",meaning:"Học sinh",visual:"🧑‍🎓"},
  {hanzi:"男孩",pinyin:"nan hai",meaning:"Con trai",visual:"👦"},
  {hanzi:"女孩",pinyin:"nv hai",meaning:"Con gái",visual:"👧"},
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
  [welcomeScreen,subjectScreen,exerciseScreen,rewardScreen].forEach(s=>s.classList.add('hidden'));
  screen.classList.remove('hidden');
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

// Subject card click → Exercise
document.querySelectorAll('.subject-card').forEach(card=>{
  card.addEventListener('click',()=>{
    currentSubject=card.dataset.subject;
    startExercise();
  });
});

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
  else answerLabel.textContent="Gõ từ điền vào chỗ trống:";

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
speechBtn.addEventListener('click',()=>{if(currentCase&&currentSubject==="english")speakText(currentCase.dialogue.replace("______","blank"));});
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
  else if(currentSubject==="math") currentCase=generateMath();
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
  caseDialogue.textContent=currentCase.dialogue;
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

  document.querySelector('.exercise-wrap').scrollTo?.({top:0,behavior:'smooth'});
  window.scrollTo({top:0,behavior:'smooth'});
  setTimeout(()=>answerInput.focus(),300);

  updateDashboard();
}

// ======================== EVENTS ========================
hintBtn.addEventListener('click',()=>{
  if(!currentCase||isSubmitted)return;
  const ans=currentCase.correct;
  hintLevel++;
  if(hintLevel===1){
    hintDisplay.textContent='📏 '+ans.split('').map(c=>c===' '?' ':'_').join(' ');
  }else if(hintLevel===2){
    hintDisplay.textContent='🔤 '+ans[0]+' '+ans.slice(1).split('').map(c=>c===' '?' ':'_').join(' ');
  }else{
    hintDisplay.textContent='✅ '+ans;
  }
});

answerForm.addEventListener('submit',e=>{
  e.preventDefault();
  if(isSubmitted)return;
  const userAns=answerInput.value.trim().toLowerCase();
  if(!userAns)return;

  const correctAns=currentCase.correct.toLowerCase();
  const isCorrect=userAns===correctAns;

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
