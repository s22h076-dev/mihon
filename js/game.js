let score = 0;
let timeLeft = 10;
let swipeCount = 0;
let timer;
const msg = document.getElementById("message");
const scoreDisplay = document.getElementById("scoreDisplay");

document.getElementById("startBtn").addEventListener("click", startWhisk);

function startWhisk() {
  msg.textContent = "シュッ！シュッ！と上下にスワイプしてね！";
  scoreDisplay.textContent = "泡立ちスコア：0";
  swipeCount = 0;
  timeLeft = 10;

  // スワイプ検知開始
  document.body.addEventListener("touchmove", swipeDetect);

  // カウントダウン
  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.body.removeEventListener("touchmove", swipeDetect);
      showWhiskResult();
    }
  }, 1000);
}

// スワイプを数える
function swipeDetect(e) {
  if (e.touches.length === 1) {
    swipeCount++;
    scoreDisplay.textContent = "泡立ちスコア：" + swipeCount;
  }
}

// 抹茶たて結果
function showWhiskResult() {
  msg.textContent = "お点前終了！";
  if (swipeCount > 30 && swipeCount < 60) {
    msg.textContent += " きめ細かい泡立ち！✨";
    score += 15;
  } else if (swipeCount >= 60) {
    msg.textContent += " 少し泡立ちすぎたかも💦";
    score += 10;
  } else {
    msg.textContent += " もう少し振っても良かったかも☁️";
    score += 5;
  }
  setTimeout(showQuiz1, 2000);
}

// クイズ表示
function showQuiz1() {
  const q = document.getElementById("quiz");
  document.getElementById("scene").style.display = "none";
  q.style.display = "block";
  q.innerHTML = `
    <h2>🍡 茶室マナー診断 🍡</h2>
    <p>お菓子をいただくタイミングは？</p>
    <button onclick="answer(1)">お茶の前</button>
    <button onclick="answer(2)">お茶の後</button>
  `;
}

// クイズ回答
function answer(choice) {
  const q = document.getElementById("quiz");
  if (choice === 1) {
    q.innerHTML = "<p>正解！甘味を先にいただくことでお茶の味が引き立ちます。</p>";
    score += 10;
  } else {
    q.innerHTML = "<p>残念！お菓子はお茶の前にいただきます。</p>";
  }
  setTimeout(showResult, 1500);
}

// 結果表示
function showResult() {
  const q = document.getElementById("quiz");
  q.style.display = "none";
  const result = document.getElementById("result");
  result.style.display = "block";

  let rank, comment;
  if (score >= 25) {
    rank = "🌸 茶道上級者（亭主級） 🌸";
    comment = "心も泡も美しく整いました。";
  } else if (score >= 15) {
    rank = "🍵 茶道見習い 🍵";
    comment = "おもてなしの心が伝わります。";
  } else {
    rank = "🌱 茶道初心者 🌱";
    comment = "今日から学び始めましょう！";
  }

  result.innerHTML = `
    <h2>${rank}</h2>
    <p>${comment}</p>
    <button onclick="location.reload()">もう一度あそぶ</button>
  `;
}
