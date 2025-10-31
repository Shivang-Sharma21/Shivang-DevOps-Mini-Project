document.addEventListener('DOMContentLoaded', () => {
    // --- State Variables (In-Memory Data) ---
    const userAccount = {
        username: 'user',
        password: 'pass',
        name: 'John Doe',
        balance: 500.00
    };

    let isLoggedIn = false;

    // --- DOM Elements ---
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const loginForm = document.getElementById('login-form');
    const depositForm = document.getElementById('deposit-form');
    const withdrawForm = document.getElementById('withdraw-form');
    const currentBalanceDisplay = document.getElementById('current-balance');
    const accountNameDisplay = document.getElementById('account-name');
    const loginError = document.getElementById('login-error');
    const logoutBtn = document.getElementById('logout-btn');
    const depositMsg = document.getElementById('deposit-msg');
    const withdrawMsg = document.getElementById('withdraw-msg');

    // --- Helper Functions ---

    // Formats the balance to a US dollar string.
    const formatBalance = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    // Updates the displayed balance on the dashboard.
    const updateBalanceDisplay = () => {
        currentBalanceDisplay.textContent = formatBalance(userAccount.balance);
    };

    // Toggles the visibility of the login and dashboard sections.
    const toggleView = (showDashboard) => {
        if (showDashboard) {
            loginSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
            accountNameDisplay.textContent = userAccount.name;
            updateBalanceDisplay();
        } else {
            dashboardSection.classList.add('hidden');
            loginSection.classList.remove('hidden');
            loginForm.reset();
            loginError.textContent = ''; // Clear error message
        }
    };

    // Displays a temporary message in the action boxes.
    const displayMessage = (element, message, isSuccess) => {
        element.textContent = message;
        element.className = isSuccess ? 'message success' : 'message error';
        setTimeout(() => {
            element.textContent = '';
        }, 3000); // Clear message after 3 seconds
    };

    // --- Event Handlers ---

    // 1. Handle Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const usernameInput = document.getElementById('username').value;
        const passwordInput = document.getElementById('password').value;

        if (usernameInput === userAccount.username && passwordInput === userAccount.password) {
            isLoggedIn = true;
            toggleView(true);
            loginError.textContent = '';
        } else {
            loginError.textContent = 'Invalid username or password.';
        }
    });

    // 2. Handle Deposit
    depositForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('deposit-amount').value);

        if (isNaN(amount) || amount <= 0) {
            displayMessage(depositMsg, 'Please enter a valid amount.', false);
            return;
        }

        userAccount.balance += amount;
        updateBalanceDisplay();
        displayMessage(depositMsg, `Successfully deposited ${formatBalance(amount)}.`, true);
        depositForm.reset();
    });

    // 3. Handle Withdrawal
    withdrawForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const amount = parseFloat(document.getElementById('withdraw-amount').value);

        if (isNaN(amount) || amount <= 0) {
            displayMessage(withdrawMsg, 'Please enter a valid amount.', false);
            return;
        }

        if (amount > userAccount.balance) {
            displayMessage(withdrawMsg, 'Insufficient funds.', false);
            return;
        }

        userAccount.balance -= amount;
        updateBalanceDisplay();
        displayMessage(withdrawMsg, `Successfully withdrew ${formatBalance(amount)}.`, true);
        withdrawForm.reset();
    });

    // 4. Handle Logout
    logoutBtn.addEventListener('click', () => {
        isLoggedIn = false;
        toggleView(false);
    });

    // --- Initialization ---
    // Start by showing the login screen.
    toggleView(false);
});