/* ══ SCROLL HEADER ══ */
const headerSection = document.getElementById("header-section");
let isScrolled = false;
function handleScroll() {
  const scrollY = window.scrollY;
  const shouldBeScrolled = scrollY > 20;
  if (shouldBeScrolled !== isScrolled) {
    isScrolled = shouldBeScrolled;
    requestAnimationFrame(() => {
      headerSection.classList.toggle("scrolled", shouldBeScrolled);
    });
  }
  document.getElementById("backTop").classList.toggle("visible", scrollY > 300);
}
window.addEventListener("scroll", handleScroll, { passive: true });

/* ══ MOBILE HAMBURGER MENU ══ */
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");
const mobileBackdrop = document.getElementById("mobileBackdrop");

function openMobileMenu() {
  mobileMenu.classList.add("open");
  mobileMenu.setAttribute("aria-hidden", "false");
  hamburgerBtn.classList.add("open");
  hamburgerBtn.setAttribute("aria-expanded", "true");
  document.body.style.overflow = "hidden"; // prevent body scroll
}

function closeMobileMenu() {
  mobileMenu.classList.remove("open");
  mobileMenu.setAttribute("aria-hidden", "true");
  hamburgerBtn.classList.remove("open");
  hamburgerBtn.setAttribute("aria-expanded", "false");
  document.body.style.overflow = "";
}

hamburgerBtn.addEventListener("click", () => {
  mobileMenu.classList.contains("open") ? closeMobileMenu() : openMobileMenu();
});
mobileClose.addEventListener("click", closeMobileMenu);
mobileBackdrop.addEventListener("click", closeMobileMenu);

// Tutup menu saat ESC ditekan
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu.classList.contains("open"))
    closeMobileMenu();
});

/* ══ MOBILE SUBMENU TOGGLE ══ */
function toggleMobileSubmenu(el) {
  const submenu = el.nextElementSibling;
  const icon = el.querySelector("i");
  const isOpen = submenu.classList.toggle("open");
  icon.style.transform = isOpen ? "rotate(180deg)" : "rotate(0deg)";
}

/* ══ HERO CAROUSEL ══ */
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
function goToSlide(n) {
  slides[currentSlide].classList.remove("active");
  dots[currentSlide].classList.remove("active");
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");
  dots[currentSlide].classList.add("active");
}
function moveSlide(dir) {
  goToSlide(currentSlide + dir);
}
setInterval(() => moveSlide(1), 5000);

/* ══ ABOUT TABS ══ */
function switchTab(id, event) {
  document
    .querySelectorAll(".tab-content")
    .forEach((t) => t.classList.remove("active"));
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  event.target.classList.add("active");
}

/* ══ EVENTS CAROUSEL ══ */
let eventsPos = 0;
const eventsTrack = document.getElementById("eventsTrack");
function moveEvents(dir) {
  const card = eventsTrack.querySelector(".event-card");
  const cardW = card.offsetWidth + 24;
  const maxPos = -(eventsTrack.children.length - 3) * cardW;
  eventsPos = Math.min(0, Math.max(maxPos, eventsPos - dir * cardW));
  eventsTrack.style.transform = `translateX(${eventsPos}px)`;
}

/* ══ COUNTER ANIMATION ══ */
function animateCounter(el) {
  const target = +el.getAttribute("data-target");
  const suffix = el.querySelector("span").textContent;
  let count = 0;
  const step = Math.ceil(target / 80);
  const timer = setInterval(() => {
    count = Math.min(count + step, target);
    el.innerHTML = count.toLocaleString() + "<span>" + suffix + "</span>";
    if (count >= target) clearInterval(timer);
  }, 18);
}

/* ══ INTERSECTION OBSERVER ══ */
const observer = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    }),
  { threshold: 0.15 },
);
document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

document.querySelectorAll(".stat-num[data-target]").forEach((el) => {
  const o = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateCounter(el);
        o.disconnect();
      }
    },
    { threshold: 0.5 },
  );
  o.observe(el);
});
