// ===== Utilities =====
const $ = (q, el = document) => el.querySelector(q);
const $$ = (q, el = document) => Array.from(el.querySelectorAll(q));

// ===== Header shadow + scroll progress =====
const header = $(".header");
const bar = $("#bar");

function onScroll() {
  const y = window.scrollY || 0;
  header?.classList.toggle("scrolled", y > 12);

  const doc = document.documentElement;
  const max = (doc.scrollHeight - doc.clientHeight) || 1;
  const pct = Math.min(100, Math.max(0, (y / max) * 100));
  if (bar) bar.style.width = pct.toFixed(2) + "%";
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// ===== Mobile menu =====
const burger = $("#burger");
const navLinks = $("#navLinks");

burger?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("show");
  burger.setAttribute("aria-expanded", String(open));
});

$$(".links a").forEach(a => {
  a.addEventListener("click", () => {
    if (navLinks.classList.contains("show")) {
      navLinks.classList.remove("show");
      burger?.setAttribute("aria-expanded", "false");
    }
  });
});

// ===== Reveal on scroll (stagger) =====
const revealEls = $$("[data-reveal]");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("revealed");
    io.unobserve(entry.target);
  });
}, { threshold: 0.12 });

revealEls.forEach((el, i) => {
  el.style.transitionDelay = (i % 6) * 60 + "ms";
  io.observe(el);
});

// ===== Active nav link highlight (based on sections) =====
const sections = ["about","skills","experience","kashnex","projects","contact"]
  .map(id => document.getElementById(id))
  .filter(Boolean);

const navAnchors = $$("[data-link]");

const io2 = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    const id = e.target.id;
    navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
  });
}, { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });

sections.forEach(s => io2.observe(s));

// ===== Card tilt (subtle, premium) =====
function addTilt(el) {
  const strength = 10; // smaller = subtle
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const rx = ((y / r.height) - 0.5) * -strength;
    const ry = ((x / r.width) - 0.5) * strength;

    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`;
  });

  el.addEventListener("mouseleave", () => {
    el.style.transform = "";
  });
}

$$(".tilt").forEach(addTilt);

// ===== Footer year =====
$("#year").textContent = new Date().getFullYear();

// ===== Contact form -> mailto =====
const form = $("#contactForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

  window.location.href = `mailto:saianudeep.kbs24@gmail.com?subject=${subject}&body=${body}`;
  form.reset();
});

// ===== Theme toggle (simple: toggles a class, optional) =====
const themeBtn = $("#themeBtn");
themeBtn?.addEventListener("click", () => {
  document.body.classList.toggle("light");
});
