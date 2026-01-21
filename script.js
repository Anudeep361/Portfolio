// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const links = document.querySelector(".nav-links");

toggle?.addEventListener("click", () => {
  const isOpen = links.classList.toggle("show");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu on link click (mobile)
document.querySelectorAll(".nav-links a").forEach(a => {
  a.addEventListener("click", () => {
    if (links.classList.contains("show")) {
      links.classList.remove("show");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Resume link placeholder (optional)
// Upload resume.pdf in same folder and uncomment next line:
// document.getElementById("resumeLink").href = "./resume.pdf";

// Contact form => opens email client (no backend)
const form = document.getElementById("contactForm");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = encodeURIComponent(data.get("name"));
  const email = encodeURIComponent(data.get("email"));
  const msg = encodeURIComponent(data.get("message"));

  const subject = encodeURIComponent(`Portfolio message from ${data.get("name")}`);
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\nMessage:\n${data.get("message")}`
  );

  window.location.href = `mailto:saianudeep.kbs24@gmail.com?subject=${subject}&body=${body}`;
  form.reset();
});
