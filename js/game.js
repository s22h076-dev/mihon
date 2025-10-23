let shakeCount = 0;
let shaking = false;
let currentQuestion = 0;
let score = 0;

const questions = [
  {
    q: "お点前のとき、最初に清める道具は？",
    a: ["茶杓", "茶筅", "茶碗"],
    correct: 2
  },
  {
    q: "客が最初にいただくのは？",
    a: ["お茶", "お菓子", "お花"],
    correct: 1
  },
  {
    q: "茶碗を受け取るときの両手の位置は？",
    a: ["右手が下、左手が上", "左手が下、右手が上", "両手を合わせる"],
    correct: 1
  },
  {
    q: "茶筅を使うときの目的は？",
    a: ["泡立てる", "冷ます", "混ぜない"],
    correct: 0
  },
  {
    q: "裏千家を開いたのは？",
    a: ["千利休", "千宗室", "千宗旦"],
    correct: 2
  }
];

const bowl = document.getElementById("bowl");
const chasen = document.getElementById("chasen");
const startBtn = document.getElementById("start-btn");
const shakeSection = document.getElementById("shake-section");
const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");

startBtn.addEventListener("click", () => {
  shakeCount = 0;
  shaking = true;
  document.getElementById("shake-count").textContent = "振った回数：0";
  startBtn.textContent = "振ってね！(10秒間)";
  startBtn.disabled = true;
  chasen.style.animation = "whisk 0.2s infinite alternate";

  // 端末の加速度センサーで振りを検出
  window.addEventListener("devicemotion", detectShake);

  // 10秒後に終了
  setTimeout(() => {
    shaking = false;
    window.removeEventListener("devicemotion", detectShake);
    chasen.style.animation = "none";
    startBtn.disabled = false;
    startBtn.textContent = "お疲れ様！";
    setTimeout(startQuiz, 1000);
  }, 10000);
});

function detectShake(e) {
  if (!shaking) return;
  const acceleration = e.accelerationIncludingGravity;
  const total = Math.abs(acceleration.x) + Math.abs(acceleration.y) + Math.abs(acceleration.z);
  if (total > 25) {
    shakeCount++;
    document.getElementById("shake-count").textContent = `振った回数：${shakeCount}`;
  }
}

// クイズ開始
function startQuiz() {
  shakeSection.classList.add("hidden");
  quizSection.classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").textContent = q.q;
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  q.a.forEach((choice, i) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(i);
    choicesDiv.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === questions[currentQuestion].correct) score++;
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  const totalScore = shakeCount + score * 10;
  let rank = "";

  if (totalScore > 100) rank = "茶道の達人！🌸";
  else if (totalScore > 60) rank = "なかなかの腕前🍵";
  else rank = "まだまだ修行が必要です🍃";

  document.getElementById("result-text").innerHTML = `
    振った回数：${shakeCount}<br>
    クイズ正解数：${score} / ${questions.length}<br>
    合計スコア：${totalScore}<br><br>
    【${rank}】
  `;
}
