/* script.js
   - change schedule entries here
   - change or add instructors/achievements images in the HTML or update data attributes
*/

/* ---------- SCHEDULE DATA (edit this array to change the weekly schedule) ---------- */
const scheduleData = [
  { day: "Monday", time: "4:00 - 6:00 PM", className: "Kids" },
  { day: "Monday", time: "6:00 - 8:00 PM", className: "Adults" },
  { day: "Tuesday", time: "4:00 - 6:00 PM", className: "Kids" },
  { day: "Tuesday", time: "6:00 - 8:00 PM", className: "Adults" },
  { day: "Wednesday", time: "4:00 - 6:00 PM", className: "Kids" },
  { day: "Wednesday", time: "6:00 - 8:00 PM", className: "Adults" },
  { day: "Thursday", time: "4:00 - 6:00 PM", className: "Kids" },
  { day: "Thursday", time: "6:00 - 8:00 PM", className: "Adults" },
  { day: "Friday", time: "4:00 - 7:00 PM", className: "Kids & Adults" },
];

/* populate schedule table */
const scheduleBody = document.getElementById("schedule-body");
scheduleBody.innerHTML = scheduleData.map(s => `
  <tr>
    <td>${s.day}</td>
    <td>${s.time}</td>
    <td>${s.className}</td>
  </tr>
`).join("");

/* contact form handling */
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }

    alert(`Thanks, ${name}! Your message has been received. We'll reply to ${email} soon.`);
    form.reset();
  });
}


/* Optional: dynamically set hero figure image if provided as CSS var or HTML image src */
(function setHeroAssets(){
  // Example: if hero has data-hero-img attribute, apply to CSS variable on :root so it overrides defaults
  const hero = document.getElementById('hero');
  if (hero) {
    const heroImg = hero.getAttribute('data-hero-img');
    if (heroImg) document.documentElement.style.setProperty('--img-hero', `url('${heroImg}')`);
  }

  // schedule background
  const schedule = document.querySelector('.schedule');
  if (schedule && schedule.dataset.scheduleBg) {
    document.documentElement.style.setProperty('--img-schedule-bg', `url('${schedule.dataset.scheduleBg}')`);
  }

  // instructors bg
  const instructors = document.querySelector('.instructors');
  if (instructors && instructors.dataset.instructorsBg) {
    document.documentElement.style.setProperty('--img-instructors-bg', `url('${instructors.dataset.instructorsBg}')`);
  }

  // contact bg
  const contact = document.querySelector('.contact');
  if (contact && contact.dataset.contactBg) {
    document.documentElement.style.setProperty('--img-contact-bg', `url('${contact.dataset.contactBg}')`);
  }
})();

// ===== Scrollable Achievements with Dots =====
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.achievements-track');
  const dotsContainer = document.querySelector('.carousel-dots');
  const btnPrev = document.querySelector('.arrow.left');
  const btnNext = document.querySelector('.arrow.right');

  if (!track || !btnPrev || !btnNext || !dotsContainer) return;

  let currentSlide = 0;

  function getCardsPerSlide() {
    return window.innerWidth <= 768 ? 1 : 3;
  }

  function getCardWidth() {
    // Get the first card's width (responsive)
    const card = track.querySelector('.achievement-card');
    return card ? card.offsetWidth : 300;
  }

  function updateCarousel() {
    // Remove old dots
    dotsContainer.innerHTML = '';
    const totalCards = track.children.length;
    const cardsPerSlide = getCardsPerSlide();
    const totalSlides = Math.max(1, Math.ceil(totalCards / cardsPerSlide));
    // Create dots
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (i === currentSlide) dot.classList.add('active');
      dot.dataset.slide = i;
      dotsContainer.appendChild(dot);
    }
    // Update dot click events
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.onclick = () => {
        currentSlide = index;
        scrollToSlide();
        updateDots();
      };
    });
    // Clamp currentSlide if needed
    if (currentSlide >= totalSlides) {
      currentSlide = totalSlides - 1;
      scrollToSlide();
      updateDots();
    }
  }

  function scrollToSlide() {
    const cardsPerSlide = getCardsPerSlide();
    const cardWidth = getCardWidth();
    const gapWidth = 20;
    const scrollDistance = (cardWidth + gapWidth) * currentSlide * cardsPerSlide;
    track.scrollTo({
      left: scrollDistance,
      behavior: 'smooth'
    });
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  btnNext.addEventListener('click', () => {
    const totalCards = track.children.length;
    const cardsPerSlide = getCardsPerSlide();
    const totalSlides = Math.max(1, Math.ceil(totalCards / cardsPerSlide));
    if (currentSlide < totalSlides - 1) {
      currentSlide++;
      scrollToSlide();
      updateDots();
    }
  });

  btnPrev.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      scrollToSlide();
      updateDots();
    }
  });

  // Recalculate on resize
  window.addEventListener('resize', () => {
    updateCarousel();
  });

  // Initial setup
  updateCarousel();
});

// ===== MOBILE HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const menuLinks = document.querySelectorAll('.mobile-menu a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Close menu when clicking a link
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});
