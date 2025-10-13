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
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    return;
  }

  // For demo we just show a friendly confirmation. Replace with AJAX to your backend if needed.
  alert(`Thanks, ${name}! Your message has been received. We'll reply to ${email} soon.`);
  form.reset();
});

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
  const dotsContainer = document.querySelector('.carousel-dots'); // Corrected selector
  const btnPrev = document.querySelector('.arrow.left');
  const btnNext = document.querySelector('.arrow.right');

  if (!track || !btnPrev || !btnNext || !dotsContainer) {
    console.log('Achievement carousel elements not found.');
    return;
  }

  let currentSlide = 0;
  const cardWidth = 300; // Width of each achievement card
  const gapWidth = 20; // Gap between cards
  const cardsPerSlide = 3; // Number of cards per slide
  const scrollDistance = (cardWidth + gapWidth) * cardsPerSlide;

  const totalCards = track.children.length;
  const totalSlides = Math.max(0, Math.ceil(totalCards / cardsPerSlide) - 1);
  const numClickableSlides = Math.max(0, Math.ceil(totalCards / cardsPerSlide) - 2);

  // Create dots
  for (let i = 0; i <= numClickableSlides; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.dataset.slide = i;
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll('.carousel-dots .dot'); // Get dots after creation

  function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
  }

  updateDots(); // Initialize dots

  btnNext.addEventListener('click', () => {
    if (currentSlide < totalSlides) {
      currentSlide++;
      track.scrollBy({
        left: scrollDistance,
        behavior: 'smooth'
      });
      updateDots();
    }
  });

  btnPrev.addEventListener('click', () => {
    if (currentSlide > 0) {
      currentSlide--;
      track.scrollBy({
        left: -scrollDistance,
        behavior: 'smooth'
      });
      updateDots();
    }
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      track.scrollTo({
        left: scrollDistance * index,
        behavior: 'smooth'
      });
      updateDots();
    });
  });
});
