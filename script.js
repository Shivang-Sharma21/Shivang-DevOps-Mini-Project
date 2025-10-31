document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    const header = document.querySelector('.main-header');

    // Smooth Scrolling for Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.hash !== '') {
                e.preventDefault();
                // Special case for login button (not a scroll link)
                if (link.classList.contains('btn-login')) {
                    alert('Login functionality not implemented in this demo.');
                    return;
                }

                const targetId = link.hash;
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    // Remove 'active' from all nav links
                    navLinks.forEach(nav => nav.classList.remove('active'));
                    // Add 'active' to the clicked nav link
                    link.classList.add('active');

                    // Scroll to target with offset for fixed header
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Highlight active nav link on scroll (optional but nice touch)
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 1; // Adjust for header and a small offset
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Initial active state for Home link
    const homeLink = document.querySelector('.main-nav ul li a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }

    // Placeholder for other interactive elements (e.g., loan calculator pop-up)
    const loginButton = document.querySelector('.btn-login');
    if (loginButton) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Login portal will be integrated here for secure access.');
        });
    }

    const applyNowButtons = document.querySelectorAll('.loan-card .btn-secondary');
    applyNowButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Redirecting to loan application form...');
        });
    });

    const openDepositButtons = document.querySelectorAll('.deposit-card .btn-primary');
    openDepositButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Opening online deposit application...');
        });
    });

    const emiCalculatorButton = document.querySelector('.loan-calculator-promo .btn-outline');
    if (emiCalculatorButton) {
        emiCalculatorButton.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Opening EMI Calculator...');
        });
    }
});