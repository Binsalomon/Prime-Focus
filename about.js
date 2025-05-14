document.addEventListener('DOMContentLoaded', function () {


    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');

    mobileMenuBtn.addEventListener('click', function () {
        navMenu.classList.toggle('show');
    });



    // 2. Header Scroll Effect
    const header = document.querySelector('.glass-header');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });



    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                }
            }
        });
    });


     // 4. Highlight active nav link based on current URL
const navLinks = document.querySelectorAll('nav ul li a');
const currentPath = window.location.pathname.split('/').pop();

navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (linkPath === 'index.html' && currentPath === '')) {
        link.classList.add('active');
    }
});

    


    // 4. Animate Elements on Scroll
    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.leader-card, .advantage-card, .partner-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };



    // 5. Set Initial State of Animations
    const animatedElements = document.querySelectorAll('.leader-card, .advantage-card, .partner-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });

    // Run animation on load and scroll
    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);




    // 6. Country Tag Hover Effect
    const countryTags = document.querySelectorAll('.country-tag');
    countryTags.forEach(tag => {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
        });

        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});
 
// chatbox
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
