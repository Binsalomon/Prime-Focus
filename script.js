        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
        
        // Toggle service card content
        function setupServiceCards() {
            const serviceCards = document.querySelectorAll('.service-card');
            
            serviceCards.forEach(card => {
                const header = card.querySelector('.service-card-header');
                
                header.addEventListener('click', () => {
                    card.classList.toggle('active');
                    
                    // Close other open cards
                    serviceCards.forEach(otherCard => {
                        if (otherCard !== card && otherCard.classList.contains('active')) {
                            otherCard.classList.remove('active');
                        }
                    });
                });
            });
        }
        
        // Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            setupServiceCards();
        });



               //links alight 
        document.addEventListener('DOMContentLoaded', () => {
    setupServiceCards();

    // Highlight the current page in the navbar
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop(); 

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});



//hero scection

// Hero Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    if (i === index) slide.classList.add('active');
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

// Change slide every 3 seconds
setInterval(nextSlide, 3000);



// Animated Counter for Stats
        function animateValue(id, start, end, duration) {
            const obj = document.getElementById(id);
            let startTimestamp = null;
            const step = (timestamp) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                obj.innerHTML = Math.floor(progress * (end - start) + start);
                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }

        // Trigger counter animation when stats section is in view
        const statsSection = document.querySelector('.stats');
        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateValue('projects-count', 0, 150, 2000);
                    animateValue('clients-count', 0, 80, 2000);
                    animateValue('team-count', 0, 15, 2000);
                    animateValue('years-count', 0, 5, 2000);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        if (statsSection) {
            observer.observe(statsSection);
        }

        // Header Scroll Effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.9)';
                header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
            }
        });

        // Simple Testimonial Slider
        let currentTestimonial = 0;
        const testimonials = document.querySelectorAll('.testimonial-slide');
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        }
        
        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }
        
        // Initialize
        showTestimonial(0);
        setInterval(nextTestimonial, 5000);


 document.getElementById('whatsapp-button').addEventListener('click', function () {
        const phone = '256785230670'; 
        const message = encodeURIComponent('');
        const url = `https://wa.me/${phone}?text=${message}`;

        window.open(url, '_blank');
    });
     



     // Get the modal elements
        const termsModal = document.getElementById('termsModal');
        const privacyModal = document.getElementById('privacyModal');
        const disclaimerModal = document.getElementById('disclaimerModal');
        const intellectualModal = document.getElementById('intellectualModal');
        
        // Get the link elements
        const termsLink = document.getElementById('termsLink');
        const privacyLink = document.getElementById('privacyLink');
        const disclaimerLink = document.getElementById('disclaimerLink');
        const intellectualLink = document.getElementById('intellectualLink');

        
        // Get all close buttons
        const closeButtons = document.querySelectorAll('.close-btn');
        
        // Function to show modal with animation
        function showModal(modal) {
            modal.style.display = 'block';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
        }
        
        // Function to hide modal with animation
        function hideModal(modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
        
        // When the user clicks on Terms of Service, open the modal
        termsLink.addEventListener('click', function(e) {
            e.preventDefault();
            showModal(termsModal);
        });
        
        // When the user clicks on Privacy Policy, open the modal
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            showModal(privacyModal);
        });
        
        // When the user clicks on Disclaimer, open the modal
        disclaimerLink.addEventListener('click', function(e) {
            e.preventDefault();
            showModal(disclaimerModal);
        });

        // When the user clicks on intellectual, open the modal
        intellectualLink.addEventListener('click', function(e) {
            e.preventDefault();
            showModal(intellectualModal);
        });
        


closeButtons.forEach(button => {
    // Add both click and touch events for mobile compatibility
    button.addEventListener('click', closeModalHandler);
    button.addEventListener('touchend', closeModalHandler);
});

function closeModalHandler(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    const modal = this.closest('.modal');
    if (modal) {
        hideModal(modal);
    }
}

// Also update the window click handler for mobile
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        hideModal(event.target);
    }
});
window.addEventListener('touchend', function(event) {
    if (event.target.classList.contains('modal')) {
        hideModal(event.target);
    }
});



    //year updt

document.addEventListener('DOMContentLoaded', function () {
    const yearSpan = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  });
