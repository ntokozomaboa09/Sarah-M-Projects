const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        const isOpen = navMenu.classList.contains('show');
        
        if (isOpen) {
            navMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-label', 'Open menu');
            document.body.classList.remove('menu-open');
        } else {
            navMenu.classList.add('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            mobileMenuBtn.setAttribute('aria-label', 'Close menu');
            document.body.classList.add('menu-open');
        }
    });
    
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-label', 'Open menu');
            document.body.classList.remove('menu-open');
        });
    });
    
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('show') && 
            !navMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-label', 'Open menu');
            document.body.classList.remove('menu-open');
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            mobileMenuBtn.setAttribute('aria-label', 'Open menu');
            document.body.classList.remove('menu-open');
        }
    });
}

const serviceNavLinks = document.querySelectorAll('.nav-link');
if (serviceNavLinks.length > 0) {
    serviceNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                serviceNavLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                const headerHeight = window.innerWidth <= 768 ? 76 : 140;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitButton = this.querySelector('button[type="submit"]');
        const formMessage = document.getElementById('formMessage');
        
        if (!formMessage) return;
        
        let isValid = true;
        const requiredFields = this.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#ff0000';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        if (!isValid) {
            formMessage.textContent = 'Please fill in all required fields.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
            return;
        }
        
        submitButton.disabled = true;
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            
            if (response.ok) {
                formMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
                formMessage.className = 'form-message success';
                contactForm.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            formMessage.textContent = 'Error sending message. Please call us at 067 403 1185 or try again.';
            formMessage.className = 'form-message error';
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    });
}

document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = window.innerWidth <= 768 ? 76 : 140;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: 'smooth'
            });
        }
    });
});

function setActiveNav() {
    const currentPath = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || 'index';
    document.querySelectorAll('#navMenu a').forEach(link => {
        const linkHref = link.getAttribute('href').replace(/^\//, '').replace(/\.html$/, '');
        link.classList.remove('active');
        if (currentPath === linkHref || (currentPath === 'index' && linkHref === '')) {
            link.classList.add('active');
        }
    });
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navMenu a');
    
    if (sections.length === 0 || window.location.pathname.includes('services')) return;
    
    let current = '';
    const scrollPosition = window.scrollY + 200;
    const headerHeight = window.innerWidth <= 768 ? 76 : 140;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('#currentYear').forEach(element => {
        element.textContent = new Date().getFullYear();
    });
    
    setActiveNav();
    
    const links = document.querySelectorAll('a[href$=".html"]');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === 'index.html') {
            link.setAttribute('href', '/');
        } else {
            link.setAttribute('href', href.replace(/\.html$/, ''));
        }
    });
    
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    mobileMenuBtn?.setAttribute('aria-label', 'Open menu');
});

window.addEventListener('scroll', updateActiveNavOnScroll, { passive: true });

document.querySelectorAll('a[href^="tel:"]').forEach(phone => {
    phone.addEventListener('click', function() {
        console.log('Phone call initiated');
    });
});

document.querySelectorAll('a[href^="mailto:"]').forEach(email => {
    email.addEventListener('click', function() {
        console.log('Email link clicked');
    });
});

document.querySelectorAll('a[href*="wa.me"]').forEach(whatsapp => {
    whatsapp.addEventListener('click', function() {
        console.log('WhatsApp chat initiated');
    });
});
