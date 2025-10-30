// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Enhanced scroll effect for navigation and active link update
window.addEventListener('scroll', function() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    if (window.scrollY > 100) nav.classList.add('scrolled'); else nav.classList.remove('scrolled');
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= (sectionTop - 200)) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
}

// Click ripple effect for nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Light/Dark Theme Toggle
(function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    const applyTheme = (mode) => {
        if (mode === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeIcon) themeIcon.className = 'fas fa-sun text-xl';
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (themeIcon) themeIcon.className = 'fas fa-moon text-xl';
        }
        localStorage.setItem('theme', mode);
    };
    
    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    
    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = localStorage.getItem('theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(newTheme);
        });
    }
})();

// Animate skill bars when cards enter viewport
const observerOptions = { threshold: 0.5, rootMargin: '0px 0px -100px 0px' };
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-bar');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => { bar.style.width = width; }, 200);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.theme-card, .card-hover').forEach(card => observer.observe(card));

// Stagger floating animation
document.querySelectorAll('.floating').forEach((el, idx) => { el.style.animationDelay = `${idx * 0.5}s`; });

// Scroll progress bar
(function() {
    const barId = 'scroll-progress-bar';
    let bar = document.getElementById(barId);
    if (!bar) {
        bar = document.createElement('div');
        bar.id = barId;
        bar.className = 'scroll-progress';
        document.body.appendChild(bar);
    }
    const update = () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = docHeight ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = progress + '%';
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
})();

// Cursor glow follower
(function() {
    const glowId = 'cursor-glow';
    let glow = document.getElementById(glowId);
    if (!glow) {
        glow = document.createElement('div');
        glow.id = glowId;
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);
    }
    window.addEventListener('mousemove', (e) => {
        glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
})();

// Lightweight tilt effect on cards
(function() {
    const maxTilt = 10; // degrees
    const els = document.querySelectorAll('.tilt-card');
    els.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = x / rect.width - 0.5;
            const cy = y / rect.height - 0.5;
            const rx = (+cy * maxTilt).toFixed(2);
            const ry = (-cx * maxTilt).toFixed(2);
            el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)';
        });
    });
})();

// Mobile navigation drawer logic (DOM ready)
document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const btn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-nav-drawer');
    const drawerPanel = drawer ? drawer.querySelector('.drawer-panel') : null;
    const closeBtn = document.getElementById('mobile-nav-close');
    
    if (!btn || !drawer || !drawerPanel || !closeBtn) return;
    
    // Improved mobile menu open function
    const open = () => {
        drawer.classList.add('active');
        drawerPanel.style.transform = 'translateX(0)';
        body.style.overflow = 'hidden';
        body.style.touchAction = 'none'; // Prevent scrolling when menu is open
        setTimeout(() => drawerPanel.style.transition = 'transform 0.3s ease-out', 10);
        
        // Add keyboard accessibility
        drawerPanel.setAttribute('aria-hidden', 'false');
    };
    
    // Improved mobile menu close function
    const close = () => {
        drawerPanel.style.transform = 'translateX(100%)';
        drawerPanel.style.transition = 'transform 0.3s ease-in';
        setTimeout(() => { 
            drawer.classList.remove('active'); 
            body.style.overflow = ''; 
            body.style.touchAction = '';
            drawerPanel.setAttribute('aria-hidden', 'true');
        }, 300);
    };
    
    // Enhanced event listeners
    btn.addEventListener('click', open);
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            open();
        }
    });
    
    closeBtn.addEventListener('click', close);
    closeBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            close();
        }
    });
    
    drawer.addEventListener('click', e => { if (e.target === drawer) close(); });
    
    // Close menu when pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer.classList.contains('active')) {
            close();
            btn.focus(); // Return focus to menu button
        }
    });
    
    // Close menu when clicking on links
    (drawer.querySelectorAll('.mobile-nav-link') || []).forEach(link => {
        link.addEventListener('click', close);
    });
    
    // Add swipe to close functionality for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    drawerPanel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    drawerPanel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        // If swipe is to the right (closing direction)
        if (touchStartX - touchEndX > 50) {
            close();
        }
    }, false);
});