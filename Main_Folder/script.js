/* =========================================
   PORTFOLIO — JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PRELOADER ── */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1800);
  });

  /* ── THEME TOGGLE ── */
  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = themeBtn.querySelector('i');

  const savedTheme = localStorage.getItem('theme') || 'dark';
  root.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeBtn.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  /* ── SCROLL PROGRESS BAR ── */
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });

  /* ── NAVBAR SCROLL ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ── ACTIVE NAV LINK ── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => observer.observe(s));

  /* ── HAMBURGER MENU ── */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ── REVEAL ON SCROLL ── */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ── SKILL BARS ── */
  const skillCards = document.querySelectorAll('.skill-card');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.skill-bar-fill');
        if (bar) {
          setTimeout(() => {
            bar.style.width = bar.dataset.width;
          }, 200);
        }
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillCards.forEach(card => skillObserver.observe(card));

  /* ── JOURNEY STEPS ── */
  const journeySteps = document.querySelectorAll('.journey-step');
  const journeyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible', 'active');
        journeyObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  journeySteps.forEach(step => journeyObserver.observe(step));

  /* ── ANIMATED COUNTERS ── */
  function animateCounter(el, target, duration = 1800) {
    let start = null;
    const startVal = 0;

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + (el.dataset.suffix || '');
    }
    requestAnimationFrame(step);
  }

  const counters = document.querySelectorAll('[data-counter]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        animateCounter(el, parseInt(el.dataset.counter));
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ── PORTFOLIO FILTERS ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          setTimeout(() => card.style.opacity = '1', 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => card.style.display = 'none', 300);
        }
      });
    });
  });

  /* ── TILT EFFECT ON PROJECT CARDS ── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotX = ((y - midY) / midY) * -6;
      const rotY = ((x - midX) / midX) * 6;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── CONTACT FORM ── */
                // const form = document.getElementById('contact-form');
                // if (form) {
                //   form.addEventListener('submit', (e) => {
                //     e.preventDefault();
                //     const btn = form.querySelector('.form-submit');
                //     btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                //     btn.disabled = true;

                //     setTimeout(() => {
                //       form.innerHTML = `
                //         <div class="form-success" style="display:block">
                //           <div style="font-size:3rem;margin-bottom:1rem">✅</div>
                //           <h3 style="font-family:var(--font-display);font-size:1.4rem;color:var(--text);margin-bottom:.5rem">Message Sent!</h3>
                //           <p style="color:var(--text2)">Thanks for reaching out. I'll get back to you soon.</p>
                //         </div>
                //       `;
                //     }, 1800);
                //   });
                // }
     const form = document.getElementById("contact-form");

          if(form){

            form.addEventListener("submit", function(e){

            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const service = document.getElementById("service").value;
            const message = document.getElementById("message").value.trim();
            const honeypot = document.getElementById("company").value;

            const btn = form.querySelector(".form-submit");


            // SPAM PROTECTION

            if(honeypot !== ""){
            return;
            }


            // EMAIL VALIDATION

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if(name === ""){
            alert("Please enter your name");
            return;
            }

            if(!emailPattern.test(email)){
            alert("Please enter a valid email address");
            return;
            }

            if(message === ""){
            alert("Please enter your message");
            return;
            }


            // LOADING STATE

            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.disabled = true;


            // 1️⃣ SEND MESSAGE TO YOU

            emailjs.send("service_upvk3am","template_ra4eklc",{

            from_name: name,
            from_email: email,
            service: service,
            message: message

            })

        .then(function(){

            // 2️⃣ SEND AUTO REPLY TO USER

            emailjs.send("service_upvk3am","template_lpfcbj9",{

            to_name: name,
            to_email: email

            });


          // SUCCESS MESSAGE UI

            form.innerHTML = `
            <div class="form-success" style="display:block;text-align:center">
            <div style="font-size:3rem;margin-bottom:1rem">✅</div>

            <h3 style="font-family:var(--font-display);font-size:1.4rem;color:var(--text);margin-bottom:.5rem">
            Message Sent Successfully
            </h3>

            <p style="color:var(--text2)">
            Thank you for reaching out. I've received your message and will get back to you soon.
            </p>

            </div>
            `;

            })

            .catch(function(error){

            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            btn.disabled = false;

            alert("Something went wrong. Please try again later.");

            });

            });

        }
                  
  /* ── BACK TO TOP ── */
  const backToTop = document.getElementById('back-to-top');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── SMOOTH SCROLLING FOR ANCHOR LINKS ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = navbar.offsetHeight;
        window.scrollTo({
          top: target.offsetTop - navH,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ── LAZY LOADING IMAGES ── */
  const lazyImages = document.querySelectorAll('img[data-src]');
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        imgObserver.unobserve(entry.target);
      }
    });
  });
  lazyImages.forEach(img => imgObserver.observe(img));

  /* ── TYPED TEXT EFFECT ── */
  const typedEl = document.getElementById('typed-text');
  if (typedEl) {
    const phrases = [
       'BCA Student',
       'Power BI Dashboard',
       'Power BI Dax',
       'Advance Excel',
       'SQL Enthusiast',
       'Wordpress Developer'
     
    ];
    let pi = 0, ci = 0, deleting = false;

    function type() {
      const phrase = phrases[pi];
      if (!deleting) {
        typedEl.textContent = phrase.slice(0, ++ci);
        if (ci === phrase.length) {
          deleting = true;
          setTimeout(type, 1500);
          return;
        }
      } else {
        typedEl.textContent = phrase.slice(0, --ci);
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % phrases.length;
        }
      }
      setTimeout(type, deleting ? 60 : 100);
    }
    type();
  }

});
