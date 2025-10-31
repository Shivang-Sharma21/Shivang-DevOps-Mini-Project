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

    // --- 1. DYNAMIC BACKGROUND CAROUSEL LOGIC ---
    let currentImageIndex = 0;
    
    const startImageCarousel = () => {
        if (heroImages.length === 0) return;

        // Ensure the first image is active when starting
        heroImages[0].classList.add('active-bg');

        setInterval(() => {
            // Remove active class from current image
            heroImages[currentImageIndex].classList.remove('active-bg');

            // Move to next image (loop back to 0 if at the end)
            currentImageIndex = (currentImageIndex + 1) % heroImages.length;

            // Add active class to new current image
            heroImages[currentImageIndex].classList.add('active-bg');
        }, 5000); // Change image every 5 seconds
    };
    
    startImageCarousel(); 

    // --- 2. MODAL AND LOGIN HANDLERS ---

    // Modal Control
    showModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
        loginModal.classList.add('hidden');
        statusMessage.textContent = ''; 
    });

    // Close modal if user clicks outside the content
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.add('hidden');
            statusMessage.textContent = '';
        }
    });

    // Tab Switching
    loginTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetType = tab.getAttribute('data-type');
            
            // Deactivate all tabs and panels
            loginTabs.forEach(t => t.classList.remove('active'));
            loginPanels.forEach(p => p.classList.add('hidden'));

            // Activate current tab and panel
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
    
    // 3. NAVIGATION AND SMOOTH SCROLLING HANDLERS
    
    // Smooth Scrolling for Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.hash !== '') {
                if (link.classList.contains('btn-login')) {
                    return; // Skip scrolling for login button
                }

                e.preventDefault();
                const targetId = link.hash;
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
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

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            // Adjust offset to trigger active state before reaching the top edge
            const sectionTop = section.offsetTop - headerHeight - 50; 
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            // Exclude the login button from the active state logic
            if (!link.classList.contains('btn-login')) {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            }
        });
    });

    // Set initial active state for Home link
    const homeLink = document.querySelector('.main-nav ul li a[href="#home"]');
    if (homeLink) {
        homeLink.classList.add('active');
    }

    // Add alerts for non-functional links
    document.querySelectorAll('a[href="#"], button:not([data-type], .login-tab, .close-button, .btn-secondary, .btn-login)').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Functionality is simulated or requires redirection to a dedicated portal.');
        });
    });
});