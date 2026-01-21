// ====== NAV (mobile + shadow) ======
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");
const header = document.querySelector(".header");

toggle?.addEventListener("click", () => {
  const isOpen = links.classList.toggle("show");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach(a => {
  a.addEventListener("click", () => {
    if (links.classList.contains("show")) {
      links.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 30);
});

// ====== SECTION REVEAL (pro animation) ======
const sections = document.querySelectorAll(".section");
const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  },
  { threshold: 0.12 }
);

sections.forEach(s => io.observe(s));

// ====== FOOTER YEAR ======
document.getElementById("year").textContent = new Date().getFullYear();

// ====== RESUME LINK ======
// Put resume.pdf in the same folder and enable this:
document.getElementById("resumeBtn").href = "./resume.pdf";

// ====== CONTACT FORM (mailto) ======
const form = document.getElementById("contactForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);

  const name = data.get("name");
  const email = data.get("email");
  const message = data.get("message");

  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  window.location.href = `mailto:saianudeep.kbs24@gmail.com?subject=${subject}&body=${body}`;
  form.reset();
});
