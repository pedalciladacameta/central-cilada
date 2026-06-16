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

// Galeria — troque os 'src' pelas fotos reais (ex.: imagens em img/)
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

// Depoimentos — EXEMPLOS, troque pelos depoimentos reais da turma
const DEPOIMENTOS = [
  { quote: "Entrei achando que não ia aguentar e hoje não perco um pedal. A galera segura a tua mão na subida e ninguém fica pra trás mesmo.", name: "Membro do grupo", role: "Pedala desde 2025" },
  { quote: "Melhor jeito de conhecer os ramais de Carapajó. Saímos cedo, vemos o sol nascer no Tocantins e ainda tem açaí no fim. É outro nível.", name: "Membro do grupo", role: "Carapajó" },
  { quote: "Comecei do zero, sem fôlego nenhum. Em poucos meses já encarei a estrada até Cametá. O Pedal Cilada me deu saúde e amizade.", name: "Membro do grupo", role: "Iniciante que evoluiu" },
];

/* ===== Render calendário ===== */
const ridesEl = document.getElementById("rides");
if (ridesEl) {
  ridesEl.innerHTML = PEDAIS.map(p => `
    <article class="ride-card reveal-up">
      <div class="ride-head">
        <div class="ride-date"><span class="d">${p.dia}</span><span class="m">${p.mes}</span></div>
        <div>
          <h3>${p.titulo}</h3>
          <span class="ride-time">${p.hora} · ${p.local}</span>
        </div>
      </div>
      <div class="ride-meta">
        <span class="tag lvl lvl-${p.nivel}">${p.nivel}</span>
        <span class="tag">${p.distancia}</span>
      </div>
      <p class="ride-desc">${p.desc}</p>
    </article>
  `).join("");
}

/* ===== Render galeria ===== */
const galleryEl = document.getElementById("gallery");
if (galleryEl) {
  galleryEl.innerHTML = FOTOS.map(f => `
    <figure class="gallery-item reveal-up">
      <img src="${f.src}" alt="${f.cap}" loading="lazy" />
      <figcaption class="cap">${f.cap}</figcaption>
    </figure>
  `).join("");
}

/* ===== Carrossel de depoimentos ===== */
(function initTestimonials() {
  const root = document.getElementById("testi");
  if (!root || !DEPOIMENTOS.length) return;
  const elQuote = document.getElementById("testiQuote");
  const elAvatar = document.getElementById("testiAvatar");
  const elName = document.getElementById("testiName");
  const elRole = document.getElementById("testiRole");
  const elDots = document.getElementById("testiDots");
  const btnPrev = document.getElementById("testiPrev");
  const btnNext = document.getElementById("testiNext");

  let idx = 0;
  let timer = null;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const initials = (name) => name.trim().split(/\s+/).slice(0, 2).map(w => w[0]).join("").toUpperCase();

  // Dots
  DEPOIMENTOS.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "testi-dot" + (i === 0 ? " active" : "");
    dot.setAttribute("aria-label", "Ir para o depoimento " + (i + 1));
    dot.addEventListener("click", () => { show(i); restart(); });
    elDots.appendChild(dot);
  });

  function show(i) {
    idx = (i + DEPOIMENTOS.length) % DEPOIMENTOS.length;
    const d = DEPOIMENTOS[idx];
    // Aspas em palavras (revelação com blur)
    elQuote.innerHTML = ("“" + d.quote + "”").split(" ")
      .map(w => `<span class="w">${w}&nbsp;</span>`).join("");
    elName.textContent = d.name;
    elRole.textContent = d.role;
    elAvatar.textContent = initials(d.name);
    elDots.querySelectorAll(".testi-dot").forEach((dot, j) => dot.classList.toggle("active", j === idx));

    const words = elQuote.querySelectorAll(".w");
    words.forEach((w, j) => {
      if (reduce) { w.classList.add("show"); return; }
      setTimeout(() => w.classList.add("show"), 24 * j);
    });
  }

  function next() { show(idx + 1); }
  function prev() { show(idx - 1); }
  function restart() { if (timer) { clearInterval(timer); start(); } }
  function start() { if (!reduce) timer = setInterval(next, 6500); }

  btnNext.addEventListener("click", () => { next(); restart(); });
  btnPrev.addEventListener("click", () => { prev(); restart(); });
  root.addEventListener("mouseenter", () => timer && clearInterval(timer));
  root.addEventListener("mouseleave", () => start());

  show(0);
  start();
})();

/* ===== Linhas animadas de fundo no CTA ===== */
(function initCtaPaths() {
  const host = document.getElementById("ctaPaths");
  if (!host) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const small = window.matchMedia("(max-width: 768px)").matches;
  const count = small ? 10 : 18;
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("viewBox", "0 0 696 316");
  svg.setAttribute("fill", "none");
  svg.setAttribute("preserveAspectRatio", "xMidYMid slice");

  [1, -1].forEach(position => {
    for (let i = 0; i < count; i++) {
      const p = document.createElementNS(svgNS, "path");
      const d = `M-${380 - i * 5 * position} -${189 + i * 6}C-${380 - i * 5 * position} -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${152 - i * 5 * position} ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${684 - i * 5 * position} ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`;
      p.setAttribute("d", d);
      p.setAttribute("stroke-width", (0.5 + i * 0.05).toFixed(2));
      p.setAttribute("stroke-opacity", (0.1 + i * 0.04).toFixed(2));
      svg.appendChild(p);
    }
  });
  host.appendChild(svg);

  if (!reduce) {
    svg.querySelectorAll("path").forEach(p => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = len;
      p.animate(
        [
          { strokeDashoffset: len, opacity: 0.25 },
          { strokeDashoffset: 0, opacity: 0.6, offset: 0.5 },
          { strokeDashoffset: -len, opacity: 0.25 }
        ],
        { duration: 18000 + Math.random() * 9000, iterations: Infinity, easing: "linear" }
      );
    });
  }
})();

/* ===== Menu mobile ===== */
const toggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("open");
    toggle.classList.toggle("open");
  });
  nav.querySelectorAll("a").forEach(a =>
    a.addEventListener("click", () => { nav.classList.remove("open"); toggle.classList.remove("open"); })
  );
}

/* ===== Ano no rodapé ===== */
const anoEl = document.getElementById("ano");
if (anoEl) anoEl.textContent = new Date().getFullYear();

/* ===== Contadores animados ===== */
function animateCount(el) {
  const target = +el.dataset.count;
  const dur = 1600;
  const start = performance.now();
  function step(now) {
    const prog = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - prog, 3);
    el.textContent = Math.floor(eased * target).toLocaleString("pt-BR");
    if (prog < 1) requestAnimationFrame(step);
    else el.textContent = target.toLocaleString("pt-BR");
  }
  requestAnimationFrame(step);
}

/* ===== Reveal on scroll + contadores (base, sem depender de CDN) ===== */
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !prefersReduced) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      if (entry.target.classList.contains("stat-num")) animateCount(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.18 });
  document.querySelectorAll(".reveal-up, .stat-num").forEach(el => io.observe(el));
} else {
  // Sem suporte/reduced motion: mostra tudo e preenche contadores
  document.querySelectorAll(".reveal-up").forEach(el => el.classList.add("in"));
  document.querySelectorAll(".stat-num").forEach(el => {
    el.textContent = (+el.dataset.count).toLocaleString("pt-BR");
  });
}

/* ===== Camada premium: animações com GSAP / Lenis / SplitType =====
   Tudo opcional: se um CDN não carregar, o site continua funcionando. */
const isMobile = window.matchMedia("(max-width: 768px)").matches || "ontouchstart" in window;

// Smooth scroll (Lenis) — só desktop e se a lib carregou
if (typeof Lenis !== "undefined" && !isMobile && !prefersReduced) {
  try {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, syncTouch: false });
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(t) { lenis.raf(t); requestAnimationFrame(raf); }
      requestAnimationFrame(raf);
    }
  } catch (e) { /* scroll nativo continua */ }
}

if (typeof gsap !== "undefined" && !prefersReduced) {
  if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

  // Entrada do hero (elementos visíveis por padrão; gsap.from = seguro)
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
  heroTl.from(".hero-logo", { opacity: 0, y: 16, scale: .9, duration: .7 })
        .from(".hero-eyebrow", { opacity: 0, y: 14, duration: .5 }, "-=0.3");

  // Headline cinética com SplitType (palavra por palavra)
  if (typeof SplitType !== "undefined") {
    try {
      const split = new SplitType(".hero-headline", { types: "words" });
      heroTl.from(split.words, { opacity: 0, y: 32, stagger: 0.08, duration: .9 }, "-=0.1");
    } catch (e) {
      heroTl.from(".hero-headline", { opacity: 0, y: 24, duration: .8 }, "-=0.1");
    }
  } else {
    heroTl.from(".hero-headline", { opacity: 0, y: 24, duration: .8 }, "-=0.1");
  }

  heroTl.from(".hero-sub", { opacity: 0, y: 18, duration: .6 }, "-=0.4")
        .from(".hero-actions", { opacity: 0, y: 18, duration: .6 }, "-=0.4")
        .from(".hero-stats .stat", { opacity: 0, y: 18, stagger: .12, duration: .6 }, "-=0.3");

  if (typeof ScrollTrigger !== "undefined") {
    // Títulos de seção: revelam palavra por palavra ao entrar na tela
    if (typeof SplitType !== "undefined") {
      gsap.utils.toArray(".section-headline").forEach(el => {
        let targets;
        try { targets = new SplitType(el, { types: "words" }).words; }
        catch (e) { targets = [el]; }
        gsap.from(targets, {
          opacity: 0, y: 26, stagger: .05, duration: .7, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" }
        });
      });
    }

    // Parallax sutil na logo do hero (só desktop)
    if (!isMobile) {
      gsap.to(".hero-logo", {
        yPercent: 22, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });
    }
  }
}
