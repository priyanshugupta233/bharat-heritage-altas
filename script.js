const app = document.getElementById("app");

let score = 0;
let index = 0;

/* HOME */
function showHome() {
  location.reload();
}

/* 🗺️ ANIMATED MAP SCREEN */
function showMap() {
  app.innerHTML = `
    <section class="hero-card">
      <h2>🇮🇳 India Interactive Map</h2>
      <p>Select a region to explore heritage</p>

      <div class="map-grid">

        <div class="map-tile" onclick="showNote(50)">
          Karnataka<br><small>Hampi</small>
        </div>

        <div class="map-tile" onclick="showNote(100)">
          Gujarat<br><small>Rani ki Vav</small>
        </div>

        <div class="map-tile" onclick="showNote(200)">
          Madhya Pradesh<br><small>Sanchi</small>
        </div>

        <div class="map-tile" onclick="showNote(500)">
          Delhi<br><small>Red Fort</small>
        </div>

      </div>
    </section>
  `;
}

/* SHOW NOTE */
function showNote(v) {
  const d = noteData[v];

  app.innerHTML = `
    <div class="card">
      <img src="${d.image}" style="width:200px;border-radius:12px;">
      <h2>${d.place}</h2>
      <p>${d.fact}</p>

      <button class="btn" onclick="openMap('${d.place}')">
        View on Google Maps 🗺️
      </button>
    </div>
  `;
}

/* MAP */
function openMap(place) {
  window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`);
}

/* QUIZ */
const quiz = [
  {q:"₹50 note shows?", options:["Hampi","Taj Mahal","Goa"], a:"Hampi"},
  {q:"₹100 note shows?", options:["Rani ki Vav","Red Fort","Kerala"], a:"Rani ki Vav"},
  {q:"₹500 note shows?", options:["Red Fort","Qutub Minar","Gateway"], a:"Red Fort"}
];

function startQuiz() {
  score = 0;
  index = 0;
  showQ();
}

function showQ() {
  const q = quiz[index];

  app.innerHTML = `
    <div class="card">
      <h2>${q.q}</h2>

      ${q.options.map(o => `
        <button class="btn" onclick="check('${o}')">${o}</button>
      `).join("")}

      <p>Score: ${score}</p>
    </div>
  `;
}

function check(ans) {
  if(ans === quiz[index].a) score++;

  index++;

  if(index < quiz.length) showQ();
  else app.innerHTML = `
    <div class="card">
      <h2>🎉 Completed</h2>
      <h3>Score: ${score}/${quiz.length}</h3>
    </div>
  `;
}

/* LEADERBOARD */
function showLeaderboard() {
  let data = JSON.parse(localStorage.getItem("board") || "[]");

  app.innerHTML = `
    <div class="card">
      <h2>🏆 Leaderboard</h2>

      ${data.map(d => `<p>${d.name} - ${d.score}</p>`).join("")}
    </div>
  `;
}

/* AI */
function openAI() {
  app.innerHTML = `
    <div class="card">
      <h2>🤖 AI Assistant</h2>
      <input id="q" placeholder="Ask..." style="padding:10px;width:80%;">
      <button class="btn" onclick="ask()">Ask</button>
      <p id="ans"></p>
    </div>
  `;
}

function ask() {
  let q = document.getElementById("q").value.toLowerCase();
  let ans = "I don't know.";

  if(q.includes("hampi")) ans = "Hampi is in Karnataka.";
  if(q.includes("red fort")) ans = "Red Fort is in Delhi.";
  if(q.includes("rani")) ans = "Rani ki Vav is in Gujarat.";

  document.getElementById("ans").innerText = ans;
}