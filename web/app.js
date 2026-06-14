"use strict";

const view = document.querySelector("#view");
const tabs = [...document.querySelectorAll(".tab")];
let demo;

const escapeHtml = (value) => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

function renderOracle() {
  const cards = demo.races.map((race) => `
    <article class="race-card">
      <div class="race-heading">
        <div>
          <p class="race-meta">${escapeHtml(race.venue)} / 第${race.race_number}競走 / ${escapeHtml(race.start_time)}</p>
          <h3>${escapeHtml(race.race_name)}</h3>
        </div>
        <span class="demo-badge">架空レース</span>
      </div>
      <div class="entry-list">
        ${race.entries.map((entry) => `
          <div class="entry" data-role="${escapeHtml(entry.role)}">
            <div class="horse">${escapeHtml(entry.role_label)} ${entry.horse_number} ${escapeHtml(entry.horse_name)}</div>
            <div class="score">AI妙味指数 ${entry.ai_value_score}</div>
            <p class="comment">${escapeHtml(entry.jizo_comment)}</p>
          </div>
        `).join("")}
      </div>
    </article>
  `).join("");

  view.innerHTML = `<h2 class="section-title">本日のお告げ</h2><div class="race-grid">${cards}</div>`;
}

function renderBenefits() {
  const items = demo.races.map((race) => `
    <li>
      <strong>${escapeHtml(race.race_name)}</strong>
      <p>${escapeHtml(race.review.summary)}</p>
      <p class="note">${escapeHtml(race.review.next_note)}</p>
    </li>
  `).join("");
  view.innerHTML = `<section class="panel"><h2 class="section-title">ご利益帳</h2><ul class="panel-list">${items}</ul></section>`;
}

function renderMirror() {
  const items = demo.races[0].entries.slice(0, 3).map((entry) => `
    <li>
      <strong>${entry.horse_number} ${escapeHtml(entry.horse_name)}</strong>
      <p>前走: ${escapeHtml(entry.past_runs[0])} / 前々走: ${escapeHtml(entry.past_runs[1])}</p>
      <p class="note">地蔵より: ${escapeHtml(entry.value_reason)}</p>
    </li>
  `).join("");
  view.innerHTML = `<section class="panel"><h2 class="section-title">過去走の鏡</h2><ul class="panel-list">${items}</ul></section>`;
}

function renderStatus() {
  view.innerHTML = `
    <section class="panel">
      <h2 class="section-title">社中稼働状況</h2>
      <ul class="panel-list">
        <li><strong>公開デモ</strong><p>正常 / 完全架空データのみ</p></li>
        <li><strong>正式画像</strong><p>未配置 / fallback表示中</p></li>
        <li><strong>データ接続</strong><p>なし / 静的デモ</p></li>
      </ul>
    </section>`;
}

const renderers = { oracle: renderOracle, benefits: renderBenefits, mirror: renderMirror, status: renderStatus };

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    renderers[tab.dataset.view]();
  });
});

fetch("./demo/race_cards.demo.json")
  .then((response) => {
    if (!response.ok) throw new Error("demo data unavailable");
    return response.json();
  })
  .then((payload) => {
    if (payload.is_demo !== true) throw new Error("demo marker missing");
    demo = payload;
    renderOracle();
  })
  .catch(() => {
    view.innerHTML = `<p class="error">架空データを読み込めませんでした。安全な空表示に切り替えました。</p>`;
  });
