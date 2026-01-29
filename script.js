// Interactions and Animations
document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.7)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 2. Animate Mood Bars on Scroll
    const observerOptions = {
        threshold: 0.2
    };

    const moodObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const target = bar.getAttribute('data-target-width');
                if (target) {
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s cubic-bezier(0.22, 1, 0.36, 1)';
                        bar.style.width = target;
                    }, 150);
                }
                moodObserver.unobserve(bar);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.mood-row .fill').forEach(fill => {
        const w = fill.style.width;
        if(w && w !== '0%') {
             fill.setAttribute('data-target-width', w);
             fill.style.width = '0%';
             moodObserver.observe(fill);
        }
    });

    // 3. Reveal elements on scroll (simple fade-up)
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const fadeElements = document.querySelectorAll('.step, .analysis-inner, .privacy-inner p');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeObserver.observe(el);
    });
    
    // Add class for visible state via JS to avoid CSS clutter if JS fails
    const style = document.createElement('style');
    style.innerHTML = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});