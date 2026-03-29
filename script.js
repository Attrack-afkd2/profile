document.addEventListener("DOMContentLoaded", function() {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    themeToggle.textContent = savedTheme === 'dark' ? '🌞' : '🌙';

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '🌞' : '🌙';
    });

    // Email Copy Logic
    const emailDisplay = document.getElementById('email-display');
    if (emailDisplay) {
        emailDisplay.addEventListener('click', () => {
            const email = emailDisplay.textContent;
            navigator.clipboard.writeText(email).then(() => {
                const feedback = document.getElementById('copy-feedback');
                feedback.style.opacity = '1';
                setTimeout(() => {
                    feedback.style.opacity = '0';
                }, 2000);
            });
        });
    }

    // Certificate Carousel Logic
    const track = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let index = 0;

    function updateCarousel() {
        const slideWidth = document.querySelector('.carousel-slide').offsetWidth + 32; // width + gap
        track.style.transform = `translateX(-${index * slideWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        const maxIndex = track.children.length - 2; // Show 3 at once roughly
        if (index < maxIndex) {
            index++;
            updateCarousel();
        } else {
            index = 0; // Loop back
            updateCarousel();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (index > 0) {
            index--;
            updateCarousel();
        } else {
            index = track.children.length - 2;
            updateCarousel();
        }
    });

    // Modal Logic
    window.openModal = function(img) {
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("modalImg");
        modal.style.display = "flex";
        modalImg.src = img.src;
    }

    window.closeModal = function() {
        const modal = document.getElementById("imageModal");
        modal.style.display = "none";
    }

    // Scroll Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});
