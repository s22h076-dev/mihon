const levelMap = document.getElementById("level-map");
const progressBtn = document.getElementById("progress-btn");
const settingsBtn = document.getElementById("settings-btn");

// レベル①〜⑩を生成
const totalLevels = 10;
for (let i = 1; i <= totalLevels; i++) {
  // 2つごとに行を作る
  if (i % 2 === 1) {
    var row = document.createElement("div");
    row.classList.add("level-row");
    levelMap.appendChild(row);
  }

  const level = document.createElement("div");
  level.classList.add("level");
  level.textContent = i;

  // レベルクリックでクイズ画面へ（仮）
  level.addEventListener("click", () => {
    // レベル番号をURLに渡して quiz.html に遷移
    window.location.href = `quiz.html?level=${i}`;
  });

  row.appendChild(level);
}

// 進歩ボタン
progressBtn.addEventListener("click", () => {
  alert("進歩画面は今後追加されます。");
});

// 設定ボタン
settingsBtn.addEventListener("click", () => {
  alert("設定画面は準備中です。");
});
