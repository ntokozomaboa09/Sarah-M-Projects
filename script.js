const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('show');
        mobileMenuBtn.innerHTML = navMenu.classList.contains('show') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    const navLinks = document.querySelectorAll('#navMenu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('show');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

const serviceNavLinks = document.querySelectorAll('.nav-link');
serviceNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            serviceNavLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const submitButton = this.querySelector('button[type="submit"]');
        const formMessage = document.getElementById('formMessage');
        
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
                formMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
                formMessage.className = 'form-message success';
                contactForm.reset();
            } else {
                const errorData = await response.json();
                formMessage.textContent = errorData.error || 'There was an error sending your message. Please try again or contact us directly at 067 403 1185.';
                formMessage.className = 'form-message error';
            }
        } catch (error) {
            formMessage.textContent = 'Network error. Please check your connection and try again, or contact us directly at 067 403 1185.';
            formMessage.className = 'form-message error';
        } finally {
            submitButton.disabled = false;
            submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            
            formMessage.style.display = 'block';
            
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 10000);
        }
    });
}

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
            
            if (href.includes('#')) {
                const serviceLinks = document.querySelectorAll('.nav-link');
                serviceLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        }
    });
});

const sections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('#navMenu a');

function updateActiveNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksArray.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === `#${current}` || (current === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

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

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sarah M Projects website loaded successfully');
    
    const yearElements = document.querySelectorAll('#currentYear');
    yearElements.forEach(element => {
        const currentYear = new Date().getFullYear();
        element.textContent = currentYear;
    });
    
    updateActiveNav();
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#navMenu a');
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        }
    });
});

const phoneNumbers = document.querySelectorAll('a[href^="tel:"]');
phoneNumbers.forEach(phone => {
    phone.addEventListener('click', function(e) {
        console.log('Phone number clicked:', this.href);
    });
});

const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(email => {
    email.addEventListener('click', function(e) {
        console.log('Email link clicked:', this.href);
    });
});
