const header = document.querySelector(".header");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");
const revealElements = document.querySelectorAll(".reveal");
const parallaxItems = document.querySelectorAll(".parallax");
const preloader = document.querySelector(".preloader");
const cursorGlow = document.querySelector(".cursor-glow");
const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");
const scrollProgress = document.querySelector(".scroll-progress");
const themeToggle = document.querySelector(".theme-toggle");
const backToTop = document.querySelector(".back-to-top");
const interactiveCards = document.querySelectorAll(".service-card, .why-card, .portfolio-item, .proof-card");
const themes = ["royal-gold", "electric-blue", "lux-violet"];
let themeIndex = 0;

function handleHeader() {
  header.classList.toggle("scrolled", window.scrollY > 18);
}

function toggleMenu() {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  navLinks.classList.toggle("open");
  document.body.classList.toggle("menu-open");
}

menuToggle.addEventListener("click", toggleMenu);

links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.14 }
);

revealElements.forEach((element) => observer.observe(element));

const sections = [...document.querySelectorAll("main section[id]")];
function setActiveLink() {
  const scrollOffset = window.scrollY + 120;
  let current = "";

  sections.forEach((section) => {
    if (scrollOffset >= section.offsetTop) current = section.id;
  });

  links.forEach((link) => {
    const href = link.getAttribute("href").replace("#", "");
    link.classList.toggle("active", href === current);
  });
}

function applyParallax() {
  const y = window.scrollY;
  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.speed || 0.05);
    item.style.transform = `translateY(${y * speed}px)`;
  });
}

function handleScrollProgress() {
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const value = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = `${value}%`;
}

function toggleBackToTop() {
  if (!backToTop) return;
  backToTop.classList.toggle("visible", window.scrollY > 520);
}

window.addEventListener("scroll", () => {
  handleHeader();
  setActiveLink();
  applyParallax();
  handleScrollProgress();
  toggleBackToTop();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 760) {
    navLinks.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

handleHeader();
setActiveLink();
applyParallax();
handleScrollProgress();
toggleBackToTop();

document.body.classList.add("loading");
window.addEventListener("load", () => {
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add("hide");
      document.body.classList.remove("loading");
    }, 800);
  }
});

window.addEventListener("mousemove", (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

if (window.matchMedia("(min-width: 761px)").matches) {
  document.body.classList.add("custom-cursor");
}

window.addEventListener("mousemove", (event) => {
  if (!cursorDot || !cursorRing) return;
  cursorDot.style.left = `${event.clientX}px`;
  cursorDot.style.top = `${event.clientY}px`;
  cursorRing.style.left = `${event.clientX}px`;
  cursorRing.style.top = `${event.clientY}px`;
});

document.querySelectorAll("a, button, .service-card, .portfolio-item, .why-card, .proof-card").forEach((item) => {
  item.addEventListener("mouseenter", () => cursorRing && cursorRing.classList.add("active"));
  item.addEventListener("mouseleave", () => cursorRing && cursorRing.classList.remove("active"));
});

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    themeIndex = (themeIndex + 1) % themes.length;
    document.body.dataset.theme = themes[themeIndex];
    localStorage.setItem("pds-theme", themes[themeIndex]);
  });
}

const savedTheme = localStorage.getItem("pds-theme");
if (savedTheme && themes.includes(savedTheme)) {
  themeIndex = themes.indexOf(savedTheme);
  document.body.dataset.theme = savedTheme;
} else {
  document.body.dataset.theme = themes[0];
}

interactiveCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -8;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

if (backToTop) {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
