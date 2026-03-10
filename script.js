// Mobile Menu Toggle - Optimized for 5 menu items
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
    // Single click handler for the menu button
    mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        const isOpen = navMenu.classList.contains('show');
        
        if (isOpen) {
            navMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.classList.remove('menu-open');
        } else {
            navMenu.classList.add('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            document.body.classList.add('menu-open');
        }
    });
    
    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('show') && 
            !navMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.classList.remove('menu-open');
        }
    });
    
    // Close menu on window resize (if switching to desktop view)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.classList.remove('menu-open');
        }
    });
}

// Services Navigation - For services.html
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
                
                window.scrollTo({
                    top: targetElement.offsetTop - 120, // Adjusted for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitButton = this.querySelector('button[type="submit"]');
        const formMessage = document.getElementById('formMessage');
        
        if (!formMessage) return;
        
        // Basic validation
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

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Set active navigation based on current page
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('#navMenu a').forEach(link => {
        const linkHref = link.getAttribute('href');
        link.classList.remove('active');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });
}

// Update active nav on scroll (for sections)
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#navMenu a');
    
    if (sections.length === 0 || window.location.pathname.includes('services.html')) return;
    
    let current = '';
    const scrollPosition = window.scrollY + 200;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
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

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.querySelectorAll('#currentYear').forEach(element => {
        element.textContent = new Date().getFullYear();
    });
    
    // Set active navigation
    setActiveNav();
    
    // Add touch-friendly hover effects for mobile
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
    }
    
    // Initialize any tooltips or popups
    console.log('Sarah M Projects (Pty) Ltd loaded successfully');
});

// Scroll event for active nav (only on pages with sections)
window.addEventListener('scroll', updateActiveNavOnScroll);

// Handle phone and email clicks for analytics (optional)
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

// WhatsApp click handler
document.querySelectorAll('a[href*="wa.me"]').forEach(whatsapp => {
    whatsapp.addEventListener('click', function() {
        console.log('WhatsApp chat initiated');
    });
});
