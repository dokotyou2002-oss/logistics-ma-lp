/* ===========================================
   物流・運送業M&A特化LP - Main JavaScript
   =========================================== */

document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for anchor links
    initSmoothScroll();

    // Form handling
    initFormHandling();

    // Scroll animations
    initScrollAnimations();
});

/**
 * Smooth scroll to anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Form validation and handling
 */
function initFormHandling() {
    const form = document.getElementById('contact-form');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate form
        if (validateForm(form)) {
            // Collect form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            // For demo purposes, log and show success
            console.log('Form submitted:', data);

            // Show success message
            showSuccessMessage(form);
        }
    });

    // Real-time validation on blur
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        // Clear error on focus
        input.addEventListener('focus', function () {
            clearFieldError(this);
        });
    });
}

/**
 * Validate entire form
 */
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    // Scroll to first error
    if (!isValid) {
        const firstError = form.querySelector('.form__group--error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    return isValid;
}

/**
 * Validate single field
 */
function validateField(field) {
    const parent = field.closest('.form__group');
    let isValid = true;
    let errorMessage = '';

    // Required check
    if (field.hasAttribute('required') && !field.value.trim()) {
        isValid = false;
        errorMessage = 'この項目は必須です';
    }

    // Email validation
    if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
            isValid = false;
            errorMessage = '正しいメールアドレスを入力してください';
        }
    }

    // Phone validation
    if (field.type === 'tel' && field.value) {
        const phoneRegex = /^[\d\-+()]+$/;
        if (!phoneRegex.test(field.value)) {
            isValid = false;
            errorMessage = '正しい電話番号を入力してください';
        }
    }

    // Update UI
    if (!isValid) {
        showFieldError(parent, errorMessage);
    } else {
        clearFieldError(field);
    }

    return isValid;
}

/**
 * Show field error
 */
function showFieldError(parent, message) {
    if (!parent) return;

    parent.classList.add('form__group--error');

    // Remove existing error
    const existingError = parent.querySelector('.form__error');
    if (existingError) {
        existingError.remove();
    }

    // Add error message
    const errorElement = document.createElement('span');
    errorElement.className = 'form__error';
    errorElement.textContent = message;
    parent.appendChild(errorElement);

    // Style the input
    const input = parent.querySelector('input, select, textarea');
    if (input) {
        input.style.borderColor = '#dc2626';
    }
}

/**
 * Clear field error
 */
function clearFieldError(field) {
    const parent = field.closest('.form__group');
    if (!parent) return;

    parent.classList.remove('form__group--error');

    const errorElement = parent.querySelector('.form__error');
    if (errorElement) {
        errorElement.remove();
    }

    field.style.borderColor = '';
}

/**
 * Show success message after form submission
 */
function showSuccessMessage(form) {
    const wrapper = form.closest('.cta__form-wrapper');

    wrapper.innerHTML = `
    <div style="text-align: center; padding: 2rem 0;">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#e67e22" stroke-width="2" style="margin-bottom: 1.5rem;">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <h3 style="color: #0a1628; font-size: 1.5rem; margin-bottom: 1rem;">
        お申し込みありがとうございます
      </h3>
      <p style="color: #64748b; line-height: 1.8;">
        ご入力いただいた内容を確認の上、<br>
        2営業日以内に担当者よりご連絡いたします。
      </p>
    </div>
  `;

    // Scroll to success message
    wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.check-list__item, .step, .strength, .diagram__box'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach((el, index) => {
        // Set initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

        observer.observe(el);
    });
}
