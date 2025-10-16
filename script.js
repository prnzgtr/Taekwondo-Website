//Enhanced Version
// Schedule Data
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

// Populate schedule
const scheduleBody = document.getElementById("schedule-body");
scheduleBody.innerHTML = scheduleData.map(s => `
  <tr>
    <td>${s.day}</td>
    <td>${s.time}</td>
    <td>${s.className}</td>
  </tr>
`).join("");

// Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.loading-screen').classList.add('hidden');
  }, 1500);
});

// Back to Top Button
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
  
  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Section Animation on Scroll
const sections = document.querySelectorAll('.section');
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

sections.forEach(section => {
  sectionObserver.observe(section);
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const menuLinks = document.querySelectorAll('.mobile-menu a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});

// Achievements Carousel
const track = document.querySelector('.achievements-track');
const dotsContainer = document.querySelector('.carousel-dots');
const btnPrev = document.querySelector('.arrow.left');
const btnNext = document.querySelector('.arrow.right');

let currentSlide = 0;

function getCardsPerSlide() {
  return window.innerWidth <= 768 ? 1 : 3;
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
  const cardWidth = track.querySelector('.achievement-card').offsetWidth;
  const gapWidth = 30;
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

window.addEventListener('resize', updateCarousel);
updateCarousel();

// Achievement Modal
const modal = document.getElementById('achievement-modal');
const modalImg = document.getElementById('modal-img');
const modalAthlete = document.getElementById('modal-athlete');
const modalMedal = document.getElementById('modal-medal');
const modalEvent = document.getElementById('modal-event');
const modalCategory = document.getElementById('modal-category');
const modalDetails = document.getElementById('modal-details');
const closeModal = document.querySelector('.close-modal');

document.querySelectorAll('.achievement-card').forEach(card => {
  card.addEventListener('click', () => {
    const athlete = card.dataset.athlete;
    const medal = card.dataset.medal;
    const event = card.dataset.event;
    const category = card.dataset.category;
    const details = card.dataset.details;
    const imgSrc = card.dataset.img || card.querySelector('img')?.src;

    if (imgSrc) {
      modalImg.src = imgSrc;
      modalImg.style.display = 'block';
    } else {
      modalImg.style.display = 'none';
    }
    
    modalAthlete.textContent = athlete;
    modalMedal.textContent = medal;
    modalEvent.textContent = event;
    modalCategory.textContent = category;
    modalDetails.textContent = details;

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  });
});

closeModal.addEventListener('click', () => {
  modal.classList.remove('show');
  document.body.style.overflow = '';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('show')) {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }
});

// Contact Form
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

  alert(`Thanks, ${name}! Your message has been received. We'll reply to ${email} soon.`);
  form.reset();
});
