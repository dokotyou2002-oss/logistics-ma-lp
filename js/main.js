/* ============================================
   物流ネクスト Landing Page - Main JavaScript
   Interactions, Animations, Form Handling
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    // ============================================
    // Scroll Animations (Fade In)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // Scroll to Top Button
    // ============================================
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 20;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Form Handling
    // ============================================
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });

            // Validate required fields
            if (!data.revenue || !data.business || !data.concern) {
                alert('必須項目をご入力ください。');
                return;
            }

            // Show success message (in production, send to server)
            alert('お問い合わせありがとうございます。\n担当者より折り返しご連絡いたします。');

            // Reset form
            this.reset();

            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // Add subtle parallax effect to hero
    // ============================================
    const hero = document.querySelector('.hero');

    if (hero && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
            }
        });
    }

    // ============================================
    // Counter Animation for Numbers (if needed)
    // ============================================
    function animateValue(element, start, end, duration) {
        const range = end - start;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + range * easeOut);
            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // ============================================
    // Mobile Menu (if needed in future)
    // ============================================
    // Placeholder for mobile navigation toggle

    // ============================================
    // Console welcome message
    // ============================================
    console.log('%c物流ネクスト', 'font-size: 24px; font-weight: bold; color: #1a365d;');
    console.log('%c10年後も、輝き続ける物流会社へ。', 'font-size: 14px; color: #4a5568;');
});

// ============================================
// Utility: Debounce Function
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// Utility: Throttle Function
// ============================================
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
