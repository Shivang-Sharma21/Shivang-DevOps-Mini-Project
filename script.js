document.addEventListener('DOMContentLoaded', () => {
    
    // --- UI ELEMENTS ---
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    const header = document.querySelector('.main-header');

    // Modal elements
    const loginModal = document.getElementById('login-modal');
    const showModalBtn = document.getElementById('show-login-modal');
    const closeModalBtn = document.querySelector('.close-button');
    const loginTabs = document.querySelectorAll('.login-tab');
    const loginPanels = document.querySelectorAll('.login-form-panel');
    const statusMessage = document.getElementById('login-status-message');
    const heroImages = document.querySelectorAll('.hero-image'); // For dynamic background

    // Login forms
    const personalLoginForm = document.getElementById('personal-login-form');
    const corporateLoginForm = document.getElementById('corporate-login-form');
    
    // --- CORE LOGIN ACCOUNTS (SIMULATION) ---
    const ACCOUNTS = {
        personal: { username: 'shivang', password: '123' },
        corporate: { id: 'corp001', pin: '456' }
    };

    // --- HELPER FUNCTIONS ---

    const displayLoginMessage = (message, isSuccess = true) => {
        statusMessage.textContent = message;
        statusMessage.className = isSuccess ? 'message success' : 'message error';
        setTimeout(() => { statusMessage.textContent = ''; }, 4000);
    };

    // --- 1. FIX FOR DYNAMIC BACKGROUND CAROUSEL ---
    let currentImageIndex = 0;
    
    const startImageCarousel = () => {
        if (heroImages.length === 0) return;

        // Ensure ONLY the first image has the active class initially (CSS handles opacity 1)
        heroImages.forEach((img, index) => {
            img.classList.remove('active-bg');
            if (index === 0) {
                img.classList.add('active-bg');
            }
        });

        setInterval(() => {
            heroImages[currentImageIndex].classList.remove('active-bg');
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;
            heroImages[currentImageIndex].classList.add('active-bg');
        }, 5000); // Change image every 5 seconds
    };
    
    startImageCarousel(); 

    // --- 2. LOGIN MODAL FUNCTIONALITY ---

    // Show Modal
    showModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('hidden');
    });

    // Hide Modal (Close button)
    closeModalBtn.addEventListener('click', () => {
        loginModal.classList.add('hidden');
        statusMessage.textContent = ''; 
    });

    // Hide Modal (Click outside)
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.add('hidden');
            statusMessage.textContent = '';
        }
    });

    // Tab Switching (Personal/Corporate)
    loginTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetType = tab.getAttribute('data-type');
            
            loginTabs.forEach(t => t.classList.remove('active'));
            loginPanels.forEach(p => p.classList.add('hidden'));

            tab.classList.add('active');
            document.getElementById(`${targetType}-login-form`).classList.remove('hidden');
            statusMessage.textContent = ''; 
        });
    });

    // Personal Login Submission (SIMULATION)
    personalLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('p-username').value;
        const password = document.getElementById('p-password').value;

        if (username === ACCOUNTS.personal.username && password === ACCOUNTS.personal.password) {
            displayLoginMessage('🎉 Personal Login Successful! Redirecting...', true);
            setTimeout(() => {
                loginModal.classList.add('hidden');
                personalLoginForm.reset();
                alert('Success! You are now logged in as a Personal Banking user.');
            }, 1000);
        } else {
            displayLoginMessage('Invalid Personal Username or Password.', false);
        }
    });

    // Corporate Login Submission (SIMULATION)
    corporateLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const corpId = document.getElementById('c-corp-id').value;
        const pin = document.getElementById('c-pin').value;
        
        if (corpId === ACCOUNTS.corporate.id && pin === ACCOUNTS.corporate.pin) {
            displayLoginMessage('✅ Corporate Login Securely Authenticated! Entering Portal...', true);
            setTimeout(() => {
                loginModal.classList.add('hidden');
                corporateLoginForm.reset();
                alert('Success! You are now logged in as a Corporate Banking user.');
            }, 1000);
        } else {
            displayLoginMessage('Invalid Corporate ID or Token/PIN. Please try again.', false);
        }
    });
    
    // 3. NAVIGATION (SMOOTH SCROLLING) AND UTILITY ---
    
    // Smooth Scrolling & Active State Logic (Ensures links scroll to sections)
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.hash && !link.classList.contains('btn-login')) {
                e.preventDefault();
                const targetSection = document.querySelector(link.hash);

                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            } else if (link.getAttribute('href') === '#') {
                e.preventDefault();
            }
        });
    });

    window.addEventListener('scroll', () => {
        let current = 'home';
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50; 
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            if (!link.classList.contains('btn-login')) {
                link.classList.remove('active');
                if (link.getAttribute('href') && link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            }
        });
    });

    // Add alerts for simulated links
    document.querySelectorAll('a[href="#"], button:not([data-type], .login-tab, .close-button, .btn-secondary, .btn-login)').forEach(el => {
        el.addEventListener('click', (e) => {
            // Check if it's the Apply Now button in the loan grid to avoid double alert
            if (el.classList.contains('btn-primary-outline') || el.classList.contains('btn-outline')) {
                 e.preventDefault();
                 alert('Functionality is simulated or requires redirection to a dedicated portal.');
            }
        });
    });
});