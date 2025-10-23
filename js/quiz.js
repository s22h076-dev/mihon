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

// ✅ 問題データ（1〜4問は固定・5〜10問は重複なしに変更）
const quizzes = [
  { question: "これは何のお茶道具？", img: "chawan.png", options: ["茶碗","茶杓","茶筅","懐紙"], answer: "茶碗" },
  { question: "これは何のお茶道具？", img: "chasen.png", options: ["茶碗","茶杓","茶筅","花入"], answer: "茶筅" },
  { question: "これは何のお茶道具？", img: "chashaku.png", options: ["茶碗","茶杓","茶筅","掛物"], answer: "茶杓" },
  { question: "これは何のお茶道具？", img: "kaisi.png", options: ["懐紙","茶碗","茶杓","花入"], answer: "懐紙" },
  { question: "これは何のお茶道具？", img: "kakeziku.png", options: ["掛物","茶杓","茶筅","花入"], answer: "掛物" },
  { question: "これは何のお茶道具？", img: "hanaire.png", options: ["花入","茶碗","茶杓","懐紙"], answer: "花入" },
  { question: "これは何のお茶道具？", img: "kensui.png", options: ["建水","茶杓","茶筅","掛物"], answer: "建水" },
  { question: "これは何のお茶道具？", img: "natume.png", options: ["棗","茶碗","茶杓","花入"], answer: "棗" },
  { question: "これは何のお茶道具？", img: "fukusa.png", options: ["袱紗","懐紙","茶杓","茶碗"], answer: "袱紗" },
  { question: "これは何のお茶道具？", img: "hishaku.png", options: ["柄杓","茶碗","棗","花入"], answer: "柄杓" }
];

// ✅ 各問題の解説（順番対応）
const explanations = [
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
];

let currentIndex = 0;
let score = 0;

// 問題表示
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

// 回答チェック
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

  document.querySelectorAll(".option-btn").forEach(btn => btn.disabled = true);
  nextBtn.style.display = "inline-block";
}

// 次の問題へ
nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex >= quizzes.length) {
    showResult();
  } else {
    showQuestion();
  }
});

// 結果画面を表示
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
  explanationList.appendChild(list);
}

// 「マップに戻る」ボタン
returnBtn.addEventListener("click", () => {
  window.location.href = "1.html";
});

// 初回表示
showQuestion();
