document.addEventListener('DOMContentLoaded', () => {
    
    // --- UI ELEMENTS ---
    const navLinks = document.querySelectorAll('.main-nav ul li a');
    const header = document.querySelector('.main-header');
    const publicView = document.getElementById('public-view');
    const customerDashboard = document.getElementById('customer-dashboard');
    const corporateDashboard = document.getElementById('corporate-dashboard');
    const modal = document.getElementById('login-modal');
    
    // Dashboard elements
    const dashNavBtns = document.querySelectorAll('.dash-nav-btn');
    const dashViewPanels = document.querySelectorAll('.dash-view-panel');
    const dashboardLogoutBtn = document.getElementById('dashboard-logout-btn');
    const corporateLogoutBtn = document.getElementById('corporate-logout-btn');

    // Login Form Elements
    const showModalBtn = document.getElementById('show-login-modal');
    const closeModalBtn = modal.querySelector('.close-button');
    const loginTabs = modal.querySelectorAll('.login-tab');
    const statusMessage = document.getElementById('login-status-message');
    const personalLoginForm = document.getElementById('personal-login-form');
    const corporateLoginForm = document.getElementById('corporate-login-form');
    
    // Account Displays
    const accountBalance = document.getElementById('account-balance');
    const concurrentBalance = document.getElementById('concurrent-balance');
    const holderName = document.getElementById('holder-name');
    const holderAcct = document.getElementById('holder-acct');

    // --- CORE DATA (FIXED FOR DEMO) ---
    const USER_DATA = {
        'shivang': {
            name: 'Shivang Sharma',
            acct: '1234567890',
            balance: 55000.75,
            concurrent: 50000.75,
            transactions: [
                { date: '2025-10-25', type: 'Credit', amount: 12000.00, details: 'Salary Deposit' },
                { date: '2025-10-26', type: 'Debit', amount: 500.00, details: 'ATM Withdrawal' },
                { date: '2025-10-28', type: 'Debit', amount: 2500.00, details: 'Transfer to A/C 987654' }
            ]
        }
    };
    const ACCOUNTS = {
        personal: { username: 'shivang', password: '123' },
        corporate: { id: 'corp001', pin: '456' }
    };

    let currentUser = null; // Currently logged-in user data

    // --- HELPER FUNCTIONS ---

    const formatCurrency = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

    const displayMessage = (element, message, isSuccess = true) => {
        element.textContent = message;
        element.className = isSuccess ? 'message success' : 'message error';
        setTimeout(() => { element.textContent = ''; }, 4000);
    };

    // --- NAVIGATION/VIEW HANDLERS ---
    
    const updateDashboardData = () => {
        if (!currentUser || currentUser.type !== 'personal') return;
        const data = currentUser.data;

        holderName.textContent = data.name;
        holderAcct.textContent = data.acct;
        accountBalance.textContent = formatCurrency(data.balance);
        concurrentBalance.textContent = formatCurrency(data.concurrent);
        document.getElementById('dash-greeting').textContent = `Welcome, ${data.name}!`;

        // Load Statement
        const tableBody = document.querySelector('#transaction-table tbody');
        tableBody.innerHTML = '';
        data.transactions.forEach(t => {
            const row = tableBody.insertRow();
            row.className = t.type.toLowerCase();
            row.innerHTML = `
                <td>${t.date}</td>
                <td>${t.type}</td>
                <td class="${t.type.toLowerCase()}">${t.type === 'Credit' ? '+' : '-'} ${formatCurrency(t.amount).replace(/^-/, '')}</td>
                <td>${t.details}</td>
            `;
        });
    };

    const toggleView = (target) => {
        // Hide all views
        publicView.classList.add('hidden');
        customerDashboard.classList.add('hidden');
        corporateDashboard.classList.add('hidden');
        
        // Show target view
        if (target === 'public') {
            publicView.classList.remove('hidden');
            // Re-enable header scrolling/nav for public view
            document.querySelector('.main-header').classList.remove('hidden');
        } else if (target === 'personal') {
            customerDashboard.classList.remove('hidden');
            updateDashboardData();
        } else if (target === 'corporate') {
            corporateDashboard.classList.remove('hidden');
        }
        
        // Hide nav bar while in a dashboard
        if (target !== 'public') {
             document.querySelector('.main-header').classList.add('hidden');
        } else {
             document.querySelector('.main-header').classList.remove('hidden');
        }
    };

    const showView = (viewId) => {
        dashViewPanels.forEach(panel => panel.classList.add('hidden'));
        document.getElementById(viewId).classList.remove('hidden');
        dashNavBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.dash-nav-btn[data-view="${viewId}"]`).classList.add('active');
    };

    // --- EVENT HANDLERS ---
    
    // 1. LOGIN SUBMISSION
    personalLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('p-username').value;
        const password = document.getElementById('p-password').value;

        if (username === ACCOUNTS.personal.username && password === ACCOUNTS.personal.password) {
            currentUser = { type: 'personal', data: USER_DATA[username] };
            modal.classList.add('hidden');
            toggleView('personal');
        } else {
            displayMessage(statusMessage, 'Invalid Personal Username or Password.', false);
        }
    });

    corporateLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('c-corp-id').value;
        const pin = document.getElementById('c-pin').value;
        
        if (id === ACCOUNTS.corporate.id && pin === ACCOUNTS.corporate.pin) {
            currentUser = { type: 'corporate' };
            modal.classList.add('hidden');
            toggleView('corporate');
        } else {
            displayMessage(statusMessage, 'Invalid Corporate ID or PIN.', false);
        }
    });
    
    // 2. DASHBOARD NAVIGATION
    dashNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showView(btn.getAttribute('data-view'));
        });
    });

    // 3. DASHBOARD LOGOUT
    dashboardLogoutBtn.addEventListener('click', () => { currentUser = null; toggleView('public'); });
    corporateLogoutBtn.addEventListener('click', () => { currentUser = null; toggleView('public'); });
    
    // 4. COMPLAINT FORM
    document.getElementById('complaint-form').addEventListener('submit', (e) => {
        e.preventDefault();
        displayMessage(document.getElementById('complaint-msg'), `Complaint filed under category: ${document.getElementById('complaint-type').value}. Reference ID: GIB${Math.floor(Math.random() * 10000)}`, true);
        document.getElementById('complaint-form').reset();
    });

    // 5. INITIAL SETUP (Modal, Scrolling, etc.)
    showModalBtn.addEventListener('click', (e) => { e.preventDefault(); modal.classList.remove('hidden'); });
    closeModalBtn.addEventListener('click', () => { modal.classList.add('hidden'); });
    window.addEventListener('click', (e) => { if (e.target === modal) { modal.classList.add('hidden'); } });

    // Smooth Scrolling & Active State Logic (Ensure links scroll to sections)
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        // Only run scrolling logic if on the public view
        if (publicView.classList.contains('hidden')) return; 

        let current = 'home';
        const headerHeight = header.offsetHeight;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50; 
            if (pageYOffset >= sectionTop) { current = section.getAttribute('id'); }
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
    
    // Set initial active state and view
    document.querySelector('.main-nav ul li a[href="#home"]').classList.add('active');
    toggleView('public'); // Start on the public landing page

    // Initialize default dashboard view (Summary)
    showView('account-summary');
});