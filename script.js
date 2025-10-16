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
    const card = track.querySelector('.achievement-card');
    return card ? card.offsetWidth : 300;
  }

  function updateCarousel() {
    dotsContainer.innerHTML = '';
    const totalCards = track.children.length;
    const cardsPerSlide = getCardsPerSlide();
    const totalSlides = Math.max(1, Math.ceil(totalCards / cardsPerSlide));
    
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (i === currentSlide) dot.classList.add('active');
      dot.dataset.slide = i;
      dotsContainer.appendChild(dot);
    }
    
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
      dot.onclick = () => {
        currentSlide = index;
        scrollToSlide();
        updateDots();
      };
    });
    
    if (currentSlide >= totalSlides) {
      currentSlide = totalSlides - 1;
      scrollToSlide();
      updateDots();
    }
  }

  function scrollToSlide() {
    const cardsPerSlide = getCardsPerSlide();
    const cardWidth = getCardWidth();
    const gapWidth = 24;
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

  window.addEventListener('resize', () => {
    updateCarousel();
  });

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

// ===== ACHIEVEMENT MODAL =====
const modal = document.getElementById('achievement-modal');
const modalImg = document.getElementById('modal-img');
const modalAthlete = document.getElementById('modal-athlete');
const modalMedal = document.getElementById('modal-medal');
const modalEvent = document.getElementById('modal-event');
const modalCategory = document.getElementById('modal-category');
const modalDetails = document.getElementById('modal-details');
const closeModal = document.querySelector('.close-modal');

// Add click event to all achievement cards
document.querySelectorAll('.achievement-card').forEach(card => {
  card.addEventListener('click', () => {
    const athlete = card.dataset.athlete;
    const medal = card.dataset.medal;
    const event = card.dataset.event;
    const category = card.dataset.category;
    const details = card.dataset.details;
    const imgSrc = card.querySelector('img').src;

    // Populate modal
    modalImg.src = imgSrc;
    modalAthlete.textContent = athlete;
    modalMedal.textContent = medal;
    modalEvent.textContent = event;
    modalCategory.textContent = category;
    modalDetails.textContent = details;

    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

// Close modal when clicking X
closeModal.addEventListener('click', () => {
  modal.classList.remove('show');
  document.body.style.overflow = '';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
});

// Close modal with ESC key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
});
let lastScrollY = window.scrollY;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY && window.scrollY > 80) {
    // Scrolling down
    header.classList.add('hide-on-scroll');
  } else {
    // Scrolling up
    header.classList.remove('hide-on-scroll');
  }
  lastScrollY = window.scrollY;
});
