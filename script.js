// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('show') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('#navMenu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Services Navigation
const serviceNavLinks = document.querySelectorAll('.nav-link');
serviceNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Update active class
            serviceNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Scroll to section
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitButton = this.querySelector('button[type="submit"]');
        const formMessage = document.getElementById('formMessage');
        
        // Disable submit button and show loading
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Success
                formMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
                formMessage.className = 'form-message success';
                contactForm.reset();
            } else {
                // Error
                const errorData = await response.json();
                formMessage.textContent = errorData.error || 'There was an error sending your message. Please try again or contact us directly at 067 403 1185.';
                formMessage.className = 'form-message error';
            }
        } catch (error) {
            // Network error
            formMessage.textContent = 'Network error. Please check your connection and try again, or contact us directly at 067 403 1185.';
            formMessage.className = 'form-message error';
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            
            // Show message
            formMessage.style.display = 'block';
            
            // Hide message after 10 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 10000);
        }
    });
}

// Phone Number Click to Call
const phoneNumbers = document.querySelectorAll('a[href^="tel:"]');
phoneNumbers.forEach(phone => {
    phone.addEventListener('click', function(e) {
        console.log('Phone number clicked:', this.href);
        // Optional: Add analytics tracking here
    });
});

// Email Click to Email
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(email => {
    email.addEventListener('click', function(e) {
        console.log('Email link clicked:', this.href);
        // Optional: Add analytics tracking here
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        e.preventDefault();
        
        const targetId = href;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Update active class for service nav links
            if (href.includes('#')) {
                const serviceLinks = document.querySelectorAll('.nav-link');
                serviceLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

// Active Navigation Highlighting on Scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#navMenu a');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Check if this link corresponds to the current section
        if (href === `#${current}` || (current === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Update active nav on scroll
window.addEventListener('scroll', updateActiveNav);

// Form Validation Enhancement
const formInputs = document.querySelectorAll('input, select, textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
            this.style.borderColor = '#d32f2f';
        } else {
            this.style.borderColor = '#ddd';
        }
    });
    
    input.addEventListener('input', function() {
        this.style.borderColor = '#ddd';
    });
});

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sarah M Projects website loaded successfully');
    
    // Set current year in footer
    const yearElement = document.querySelector('.copyright');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        const text = yearElement.innerHTML;
        yearElement.innerHTML = text.replace('2026', currentYear);
    }
    
    // Update active nav on page load
    updateActiveNav();
    
    // Highlight current page in navigation
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('#navMenu a');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
});
