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
    const currentPage = window.location.pathname.split('/').pop(); // gets the file name, e.g., "about.html"

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
});







     //chatbox
 document.getElementById('whatsapp-button').addEventListener('click', function () {
        const phone = '256785230670'; 
        const message = encodeURIComponent('');
        const url = `https://wa.me/${phone}?text=${message}`;

        window.open(url, '_blank');
    });
     

//year updt

document.addEventListener('DOMContentLoaded', function () {
    const yearSpan = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  });












          // Form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form values
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const subject = document.getElementById('subject').value;
                
                
                alert(`Thank you, ${name}! Your message about "${subject}" has been received. We'll contact you at ${email} soon.`);
                
                // Reset form
                contactForm.reset();
            });
        }
