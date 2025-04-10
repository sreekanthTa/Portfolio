// Wait for document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
                
                // Get the target section
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 70,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section');
    
    function setActiveLink() {
        let scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                const activeLink = document.querySelector('.nav-menu a.active');
                if (activeLink) {
                    activeLink.classList.remove('active');
                }
                const newActiveLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
                if (newActiveLink) {
                    newActiveLink.classList.add('active');
                }
            }
        });
    }
    
    // Email sending functionality now uses FormSubmit instead of EmailJS
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // FormSubmit handles the submission through the form's action attribute
        // We just add some UI enhancements
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - let the form submit normally
            
            // Simple form validation 
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');
            const formStatus = document.querySelector('.form-status');
            
            if (name.value.trim() === '' || email.value.trim() === '' || subject.value.trim() === '' || message.value.trim() === '') {
                e.preventDefault(); // Prevent submission if validation fails
                formStatus.style.display = 'block';
                formStatus.textContent = 'దయచేసి అన్ని ఫీల్డ్‌లను పూరించండి.';
                formStatus.style.color = '#ff3860';
                return;
            }
            
            // Change button state
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.textContent = 'పంపుతోంది...';
            
            // FormSubmit handles the actual sending
            // The page will be redirected to the _next URL specified in the form
        });
    }
    
    // Initialize active link on page load
    setActiveLink();
    
    // Update active link on scroll
    window.addEventListener('scroll', setActiveLink);
}); 