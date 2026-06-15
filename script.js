/* ===== Dados — edite aqui pra atualizar o site ===== */

// Próximos pedais. nivel: "iniciante" | "intermediário" | "avançado"
const PEDAIS = [
  {
    dia: "21", mes: "Jun", titulo: "Pedal do Amanhecer",
    hora: "05:30", local: "Orla de Carapajó", distancia: "25 km",
    nivel: "iniciante",
    desc: "Saída cedinho pra ver o sol nascer no Tocantins. Ritmo leve, perfeito pra quem tá começando."
  },
  {
    dia: "28", mes: "Jun", titulo: "Ramal Adentro",
    hora: "06:00", local: "Saída da Vila de Carapajó", distancia: "45 km",
    nivel: "avançado",
    desc: "Ramais de terra mata adentro, sol forte e poeira. Leve bastante água e disposição extra."
  },
  {
    dia: "05", mes: "Jul", titulo: "Carapajó × Cametá",
    hora: "06:30", local: "Centro de Carapajó", distancia: "38 km",
    nivel: "intermediário",
    desc: "Percurso pela estrada até a cidade de Cametá, com parada pro açaí e a resenha na volta."
  },
  {
    dia: "12", mes: "Jul", titulo: "Pedal Noturno na Vila",
    hora: "19:00", local: "Praça de Carapajó", distancia: "18 km",
    nivel: "iniciante",
    desc: "Volta tranquila pela vila à noite. Obrigatório farol e luz traseira. Bora iluminar o ramal!"
  },
];

// Galeria — troque os 'src' pelas fotos reais (ex.: imagens baixadas do lummi.ai)
const FOTOS = [
  { src: "https://picsum.photos/seed/cilada1/600/450", cap: "Amanhecer na orla" },
  { src: "https://picsum.photos/seed/cilada2/600/450", cap: "Ramal adentro" },
  { src: "https://picsum.photos/seed/cilada3/600/450", cap: "Parada pro açaí" },
  { src: "https://picsum.photos/seed/cilada4/600/450", cap: "Turma reunida em Carapajó" },
  { src: "https://picsum.photos/seed/cilada5/600/450", cap: "Beira do Tocantins" },
  { src: "https://picsum.photos/seed/cilada6/600/450", cap: "Pedal noturno na vila" },
  { src: "https://picsum.photos/seed/cilada7/600/450", cap: "Rumo a Cametá" },
  { src: "https://picsum.photos/seed/cilada8/600/450", cap: "Pôr do sol no ramal" },
];

/* ===== Render calendário ===== */
const ridesEl = document.getElementById("rides");
if (ridesEl) {
  ridesEl.innerHTML = PEDAIS.map(p => `
    <article class="ride-card reveal">
      <div class="ride-head">
        <div class="ride-date"><span class="d">${p.dia}</span><span class="m">${p.mes}</span></div>
        <div>
          <h3>${p.titulo}</h3>
          <span class="ride-time">⏰ ${p.hora} · 📍 ${p.local}</span>
        </div>
      </div>
      <div class="ride-meta">
        <span class="tag lvl-${p.nivel}">${p.nivel}</span>
        <span class="tag">🚲 ${p.distancia}</span>
      </div>
      <p class="ride-desc">${p.desc}</p>
    </article>
  `).join("");
}

/* ===== Render galeria ===== */
const galleryEl = document.getElementById("gallery");
if (galleryEl) {
  galleryEl.innerHTML = FOTOS.map(f => `
    <figure class="gallery-item reveal">
      <img src="${f.src}" alt="${f.cap}" loading="lazy" />
      <figcaption class="cap">${f.cap}</figcaption>
    </figure>
  `).join("");
}

/* ===== Menu mobile ===== */
const toggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => nav.classList.remove("open"))
  );
}

/* ===== Ano no rodapé ===== */
const anoEl = document.getElementById("ano");
if (anoEl) anoEl.textContent = new Date().getFullYear();

/* ===== Contadores animados ===== */
function animateCount(el) {
  const target = +el.dataset.count;
  const dur = 1400;
  const start = performance.now();
  function step(now) {
    const prog = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - prog, 3);
    el.textContent = Math.floor(eased * target).toLocaleString("pt-BR");
    if (prog < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ===== Reveal on scroll + dispara contadores ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      if (entry.target.classList.contains("stat-num")) animateCount(entry.target);
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal, .stat-num").forEach(el => io.observe(el));
