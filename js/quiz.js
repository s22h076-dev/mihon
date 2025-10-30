// ===============================
// URLパラメータからレベル番号を取得
// ===============================
const urlParams = new URLSearchParams(window.location.search);
const level = parseInt(urlParams.get("level")) || 1;

// タイトルにレベル番号を反映
document.getElementById("level-title").textContent = `レベル${level}`;


// ===============================
// DOM要素の取得
// ===============================
const questionImage = document.getElementById("question-image");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const resultSection = document.getElementById("result-section");
const quizSection = document.getElementById("quiz-section");
const scoreText = document.getElementById("score-text");
const returnBtn = document.getElementById("return-btn");
const explanationList = document.getElementById("explanation-list");


// ===============================
// 各レベルのクイズデータ
// ===============================
const quizSets = {
  // 🔹 レベル①：茶道具クイズ
  1: [
  { question: "これは何のお茶道具？", img: "img/game/chawan.png", options: ["茶碗","茶杓","茶筅","懐紙"], answer: "茶碗" },
  { question: "これは何のお茶道具？", img: "img/game/chasen.png", options: ["茶碗","茶杓","茶筅","花入"], answer: "茶筅" },
  { question: "これは何のお茶道具？", img: "img/game/chashaku.png", options: ["茶碗","茶杓","茶筅","掛物"], answer: "茶杓" },
  { question: "これは何のお茶道具？", img: "img/game/kaisi.png", options: ["懐紙","茶碗","茶杓","花入"], answer: "懐紙" },
  { question: "これは何のお茶道具？", img: "img/game/kakeziku.png", options: ["掛物","茶杓","茶筅","花入"], answer: "掛物" },
  { question: "これは何のお茶道具？", img: "img/game/hanaire.png", options: ["茶碗","茶杓","懐紙","花入"], answer: "花入" },
  { question: "これは何のお茶道具？", img: "img/game/kensui.png", options: ["建水","茶杓","茶筅","掛物"], answer: "建水" },
  { question: "これは何のお茶道具？", img: "img/game/natume.png", options: ["茶碗","棗","茶杓","花入"], answer: "棗" },
  { question: "これは何のお茶道具？", img: "img/game/fukusa.png", options: ["懐紙","茶杓","茶碗","袱紗"], answer: "袱紗" },
  { question: "これは何のお茶道具？", img: "img/game/hishaku.png", options: ["茶碗","棗","柄杓","花入"], answer: "柄杓" }  ],

  // 🔹 レベル②：茶会のマナークイズ
2: [
  { question: "茶室に入る前、露地でまず行うことは？", img: "img/game/sado.png", options: ["懐石をいただく", "挨拶をする", "手を清める", "靴を脱ぐ"], answer: "手を清める"},
  { question: "茶室に入る際、敷居や畳の縁（へり）はどうする？", img: "img/game/sado.png", options: ["踏まないようにまたぐ", "踏んでもよい", "必ず左足から入る", "縁を撫でる"], answer: "踏まないようにまたぐ"},
  { question: "茶席でお菓子をいただくタイミングは？", img: "img/game/sado.png", options: ["お茶を飲んだ後", "お茶を点てる前", "帰る前", "最初に入室した直後"], answer: "お茶を点てる前"},
  { question: "お菓子をいただくときの一言は？", img: "img/game/sado.png", options: ["ごちそうさま", "お先に", "いただきます", "よろしくお願いします"], answer: "お先に"},
  { question: "茶碗を受け取るとき、右手はどこに添える？", img: "img/game/sado.png", options: ["茶碗の左側", "茶碗の下", "茶碗の口縁", "茶碗の中"], answer: "茶碗の下"},
  { question: "茶を飲む前に「お先に」と言う理由は？", img: "img/game/sado.png", options: ["次の人を急がせるため", "隣の客に礼を表すため", "茶の温度を確かめるため", "茶碗の向きを直すため"], answer: "隣の客に礼を表すため"},
  { question: "茶碗を回して飲むのはなぜ？", img: "img/game/sado.png", options: ["正面を避けて礼を表すため", "茶を混ぜるため", "茶碗を冷ますため", "模様を見やすくするため"], answer: "正面を避けて礼を表すため"},
  { question: "飲み終わった後の一礼は何への感謝？", img: "img/game/sado.png", options: ["茶碗", "隣の客", "亭主", "自分"], answer: "亭主"},
  { question: "茶碗を置くときの正しい姿勢は？", img: "img/game/sado.png", options: ["音を立てずに静かに置く", "茶碗を傾けて置く", "早く置く", "茶を残して置く"], answer: "音を立てずに静かに置く"},
  { question: "茶会で亭主が最初に行うのは？", img: "img/game/sado.png", options: ["茶を点てる", "挨拶をする", "花を生ける", "湯を汲む"], answer: "挨拶をする"}
],
3: [
  { question: "抹茶をすくうための竹の道具は？", img: "img/game/sado.png", options: ["茶筅", "茶杓", "棗", "茶入"], answer: "茶杓"},
  { question: "抹茶を点てるときに使う竹製の道具は？", img: "img/game/sado.png", options: ["茶巾", "茶杓", "茶筅", "建水"], answer: "茶筅"},
  { question: "茶碗を清めるために使う絹の布は？", img: "img/game/sado.png", options: ["懐紙", "袱紗", "茶巾", "茶筅"], answer: "茶巾"},
  { question: "抹茶を入れておく容器で、主に薄茶に使うものは？", img: "img/game/sado.png", options: ["棗（なつめ）", "茶入（ちゃいれ）", "建水（けんすい）", "茶碗"], answer: "棗（なつめ）"},
  { question: "濃茶に使う茶器は？", img: "img/game/sado.png", options: ["棗", "茶入", "茶筅", "茶杓"], answer: "茶入"},
  { question: "釜の湯をすくう竹の道具は？", img: "img/game/sado.png", options: ["茶杓", "柄杓", "茶筅", "茶巾"], answer: "柄杓"},
  { question: "使い終わった湯を捨てる容器は？", img: "img/game/sado.png", options: ["建水（けんすい）", "棗", "花入", "茶入"], answer: "建水（けんすい）"},
  { question: "懐紙（かいし）はどのような場面で使う？", img: "img/game/sado.png", options: ["茶を泡立てるとき", "お菓子を受けるとき", "茶碗を温めるとき", "道具を片づけるとき"], answer: "お菓子を受けるとき"},
  { question: "花を生けるための器は？", img: "img/game/sado.png", options: ["掛物", "花入", "茶筅", "茶碗"], answer: "花入"},
  { question: "茶杓は何で作られている？", img: "img/game/sado.png", options: ["竹", "陶器", "銅", "木"], answer: "竹"}
],
4: [
  { question: "茶室に入る入口「躙り口（にじりぐち）」が低く作られている理由は？", img: "img/game/sado.png", options: ["客が頭を下げて入ることで平等を表すため","冷気を防ぐため","景色を見やすくするため","湿気を避けるため"], answer: "客が頭を下げて入ることで平等を表すため"},
  { question: "茶室の広さとして有名な「四畳半」は何を意味する？", img: "img/game/sado.png", options: ["客が4人半座れる広さ","畳が4枚半敷かれた部屋","茶碗4個半を置く広さ","小さな茶室のこと"], answer: "畳が4枚半敷かれた部屋"},
  { question: "露地（ろじ）とは？", img: "img/game/sado.png", options: ["茶室に向かう庭の道", "茶碗を置く台","炭を置く場所","懐石を出す部屋"], answer: "茶室に向かう庭の道"},
  { question: "露地にある「蹲（つくばい）」の役割は？", img: "img/game/sado.png", options: ["飲み水を用意するため", "手と口を清めるため","茶を冷ますため","花を生けるため"], answer: "手と口を清めるため"},
  { question: "茶室の床の間に掛ける書や絵のことを何という？", img: "img/game/sado.png", options: ["掛物（かけもの）", "花入", "建水", "棗"], answer: "掛物（かけもの）"},
  { question: "床の間に生ける「茶花（ちゃばな）」の特徴は？", img: "img/game/sado.png", options: ["華やかに盛る", "季節の花を一枝、自然に生ける","大量の花を飾る","造花を用いる"], answer: "季節の花を一枝、自然に生ける"},
  { question: "茶室の天井が低く作られている理由は？", img: "img/game/sado.png", options: ["湿気を逃がすため", "客が自然に頭を下げるため","冷房を効かせるため","音が響かないようにするため"], answer: "客が自然に頭を下げるため"},
  { question: "茶室で最も重要な空間「床（とこ）」の目的は？", img: "img/game/sado.png", options: ["亭主の個室", "主客の心を映す場", "茶道具を保管する場所", "座布団を置くため"], answer: "主客の心を映す場"},
  { question: "茶庭の灯りとして用いられる石造物は？", img: "img/game/sado.png", options: ["灯籠（とうろう）", "手水鉢", "掛物", "柄杓"], answer: "灯籠（とうろう）"},
  { question: "露地の飛び石（とびいし）はどんな意味がある？", img: "img/game/sado.png", options: ["池を渡るため", "歩幅を整え、心を落ち着けるため","装飾のため","客の順番を示すため"], answer: "歩幅を整え、心を落ち着けるため"}
],
5: [
  { question: "千利休が重んじた「和敬清寂（わけいせいじゃく）」のうち、「和」とは？", img: "img/game/sado.png", options: ["心を清める", "人と調和する", "礼を守る", "茶を整える"], answer: "人と調和する"},
  { question: "「敬」とは何を意味する？", img: "img/game/sado.png", options: ["互いに敬意をもつ心", "清らかにすること", "落ち着いた雰囲気", "平和な空間"], answer: "互いに敬意をもつ心"},
  { question: "「清」とは？", img: "img/game/sado.png", options: ["心と物を清らかに保つこと", "部屋を飾ること", "道具を高価に保つこと", "茶を濃くすること"], answer: "心と物を清らかに保つこと"},
  { question: "「寂」とは？", img: "img/game/sado.png", options: ["静けさの中に深い味わいを見出す心", "孤独を感じること", "派手さを抑えること", "客を少なくすること"], answer: "静けさの中に深い味わいを見出す心"},
  { question: "「侘（わび）」の心に最も近いのは？", img: "img/game/sado.png", options: ["豪華絢爛", "簡素で静かな美", "鮮やかで派手", "豪快な楽しさ"], answer: "簡素で静かな美"},
  { question: "茶会の途中で亭主が中座し、再び客を招き入れる「中立（なかだち）」は、主に何のため？", img: "img/game/sado.png", options: ["懐石の後片付けのため", "道具を改めるため", "茶菓子を出すため", "客を入れ替えるため"], answer: "道具を改めるため"},
  { question: "茶会を通して、亭主と客が一体となることを表す言葉は？", img: "img/game/sado.png", options: ["一期一会", "一座建立", "一期共心", "一点集中"], answer: "一座建立"},
  { question: "「一期一会」の意味として最も正しいのは？", img: "img/game/sado.png", options: ["一生に一度の出会いを大切にする心", "毎回同じ作法を繰り返すこと", "茶室で一回しか飲まないこと", "茶会を短時間で行うこと"], answer: "一生に一度の出会いを大切にする心"},
  { question: "茶道で最も大切にされる心がけとして正しいものは？", img: "img/game/sado.png", options: ["技を競う", "心を整える", "道具を新しく保つ", "礼を簡略化する"], answer: "心を整える"},
  { question: "茶の湯が重視する「もてなし」の本質は？", img: "img/game/sado.png", options: ["相手への思いやりと心遣い", "料理の豪華さ", "道具の値段", "茶碗の大きさ"], answer: "相手への思いやりと心遣い"}
]

};


// ===============================
// 各レベルの解説データ
// ===============================
const explanationsSets = {
  1: [
  "茶碗：抹茶を入れて点てる器。焼き物の種類や形にも意味がある。",
  "茶筅：抹茶を泡立てるための竹製の道具。",
  "茶杓：抹茶をすくうための竹の匙。",
  "懐紙：お菓子を受けたり、茶碗を拭いたりする紙。",
  "掛物：床の間に掛ける書や絵で、茶会のテーマを示す。",
  "花入：茶室に季節の花を生けるための器。",
  "建水：茶碗をすすいだ湯や水を捨てるための金属や陶器の器。",
  "棗：抹茶を入れるための漆塗りの小さな容器。",
  "袱紗：茶道具を清めるために使う絹の布。紫と朱の色がある。",
  "柄杓：釜から湯を汲むための竹製の道具。"
  ],
  2: [
    "露地で手を清めて心身を整え、茶室に入る準備をするのが作法です。",
    "畳の縁は踏まずにまたぐことで、畳を大切に扱います。",
    "お茶を点てる前にお菓子をいただくことで、甘みが茶の苦味と調和します。",
    "茶席では先に一礼して『お先に』と言い、礼を表します。",
    "右手を茶碗の下に添えて受け取り、安定させます。",
    "隣の客や亭主に礼を示すため、『お先に』と言います。",
    "茶碗の正面を避けることで、亭主や相手への礼を示します。",
    "亭主のもてなしと茶に対して感謝を示すため一礼します。",
    "静かに置くことで、茶席の雰囲気を乱さず礼を尽くします。",
    "亭主はまず客を迎える挨拶を行い、茶会を始めます。"
  ],
  3: [
    "茶杓は竹で作られ、抹茶を茶碗にすくうために使います。",
    "茶筅で抹茶を泡立て、均一に点てます。",
    "茶巾で茶碗を拭き清め、清潔に保ちます。",
    "棗は薄茶用の抹茶入れで、小ぶりで扱いやすいです。",
    "濃茶は茶入に入れた抹茶で点てます。",
    "柄杓で釜の湯をすくい、茶碗や水指に注ぎます。",
    "建水に茶碗の残り湯やすすぎ湯を捨てます。",
    "懐紙でお菓子を受け、手を拭いたり清潔に使います。",
    "花入に茶花を生け、床の間に飾ります。",
    "茶杓は竹で作られ、抹茶をすくう道具です。"
  ],
  4: [
    "低い入口をくぐることで、身分や地位の違いを忘れ、平等を示します。",
    "四畳半は畳4枚半分の広さを指す、伝統的な小規模茶室です。",
    "露地は茶室に至る庭の道で、歩くことで心を落ち着けます。",
    "蹲で手と口を清め、心身を整えて茶室に入ります。",
    "床の間に掛物を飾り、茶会の趣を演出します。",
    "季節の花を一枝、自然に生けることで、静かで落ち着いた美を表現します。",
    "天井を低くして、客が自然に頭を下げることで謙虚さを表します。",
    "床は茶会の趣や精神性を示す空間です。",
    "灯籠は庭の灯りとして用いられ、茶会の情緒を演出します。",
    "飛び石を踏むことで歩幅が整い、歩く間に心が静まります。"
  ],
  5: [
    "『和』は他人との調和を意味し、茶会での心の在り方を示します。",
    "『敬』は相手に対する敬意を表すことで、茶会の基本的な姿勢です。",
    "『清』は心と茶道具の両方を清らかに保つことを意味します。",
    "『寂』は静けさや簡素の中に美を見出す心を表します。",
    "侘は簡素で静かな美を重んじ、落ち着いた趣を表します。",
    "中立は茶道具の点検や整備を行い、茶会を円滑に進めるための時間です。",
    "『一座建立』は茶会全体を通して、亭主と客が心を合わせることを意味します。",
    "一期一会は一生に一度の出会いとして、茶会のひとときを大切にする心を示します。",
    "茶道では心を整え、相手への思いやりや礼を大切にすることが最も重要です。",
    "もてなしの本質は、相手への思いやりと心遣いであり、形だけでなく心で行うことです。"
  ]

};


// ===============================
// 現在のレベルに対応した問題を取得
// ===============================
const quizzes = quizSets[level] || quizSets[1];
const explanations = explanationsSets[level] || explanationsSets[1];

let currentIndex = 0;
let score = 0;


// ===============================
// 問題を表示
// ===============================
function showQuestion() {
  const q = quizzes[currentIndex];
  questionImage.src = q.img;
  questionText.textContent = `第${currentIndex + 1}問：${q.question}`;
  optionsContainer.innerHTML = "";
  feedback.textContent = "";
  nextBtn.style.display = "none";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");
    btn.addEventListener("click", () => checkAnswer(option));
    optionsContainer.appendChild(btn);
  });
}


// ===============================
// 回答チェック
// ===============================
function checkAnswer(selected) {
  const correct = quizzes[currentIndex].answer;
  if (selected === correct) {
    feedback.textContent = "✅ 正解！";
    feedback.style.color = "green";
    score++;
  } else {
    feedback.textContent = `❌ 不正解。答えは「${correct}」です`;
    feedback.style.color = "red";
  }

  // ボタンを無効化
  document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);
  nextBtn.style.display = "inline-block";
}


// ===============================
// 次の問題へ
// ===============================
nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex >= quizzes.length) {
    showResult();
  } else {
    showQuestion();
  }
});


// ===============================
// 結果画面を表示
// ===============================
function showResult() {
  quizSection.style.display = "none";
  resultSection.style.display = "block";
  scoreText.textContent = `あなたの得点は ${score} / ${quizzes.length} 点です！`;

  const list = document.createElement("ol");
  explanations.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    list.appendChild(li);
  });
  explanationList.innerHTML = "";
  explanationList.appendChild(list);
}


// ===============================
// マップに戻るボタン
// ===============================
returnBtn.addEventListener("click", () => {
  window.location.href = "1.html";
});


// ===============================
// 初回表示
// ===============================
showQuestion();


