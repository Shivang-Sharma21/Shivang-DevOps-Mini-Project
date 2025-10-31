document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CORE DATA MODEL (The entire bank database simulation) ---
    const users = [
        {
            accNumber: '123456',
            pin: '1111',
            name: 'Shivang Sharma',
            branch: 'TX-South',
            balance: 15000.50,
            nominee: { name: 'Asha Sharma', relation: 'Mother' },
            transactions: [
                { date: '2025-10-25', type: 'Credit', amount: 5000.00, details: 'Initial Deposit' },
                { date: '2025-10-26', type: 'Credit', amount: 10000.00, details: 'Salary Deposit' },
                { date: '2025-10-28', type: 'Debit', amount: 500.00, details: 'ATM Withdrawal' }
            ]
        },
        {
            accNumber: '987654',
            pin: '2222',
            name: 'DevOps Master',
            branch: 'NY-Central',
            balance: 5000.00,
            nominee: { name: 'IT Partner', relation: 'Colleague' },
            transactions: [
                { date: '2025-10-25', type: 'Credit', amount: 5000.00, details: 'Initial Deposit' }
            ]
        }
    ];

    let currentUser = null; // Stores the object of the currently logged-in user

    // --- 2. DOM ELEMENTS ---
    const loginSection = document.getElementById('login-section');
    const dashboardSection = document.getElementById('dashboard-section');
    const loginForm = document.getElementById('login-form');
    const transferForm = document.getElementById('transfer-form');
    const nomineeForm = document.getElementById('nominee-form');
    const branchTransferForm = document.getElementById('branch-transfer-form');
    const logoutBtn = document.getElementById('logout-btn');

    // Display elements
    const currentBalanceDisplay = document.getElementById('current-balance');
    const accountNameDisplay = document.getElementById('account-name');
    const accountNumberDisplay = document.getElementById('account-number');
    const accountBranchDisplay = document.getElementById('account-branch');
    const transactionTableBody = document.querySelector('#transaction-table tbody');
    const currentNomineeDisplay = document.getElementById('current-nominee');
    const currentBranchDisplay = document.getElementById('current-branch-display');

    // Message elements
    const loginError = document.getElementById('login-error');
    const transferMsg = document.getElementById('transfer-msg');
    const nomineeMsg = document.getElementById('nominee-msg');
    const branchMsg = document.getElementById('branch-msg');

    // Navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    const featurePanels = document.querySelectorAll('.feature-panel');


    // --- 3. HELPER FUNCTIONS ---

    const formatBalance = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
    
    const displayMessage = (element, message, isSuccess) => {
        element.textContent = message;
        element.className = isSuccess ? 'message success' : 'message error';
        setTimeout(() => { element.textContent = ''; }, 4000);
    };

    const updateUI = () => {
        if (!currentUser) return;

        // Update Summary
        accountNameDisplay.textContent = currentUser.name;
        accountNumberDisplay.textContent = currentUser.accNumber;
        accountBranchDisplay.textContent = currentUser.branch;
        currentBranchDisplay.textContent = currentUser.branch;
        currentBalanceDisplay.textContent = formatBalance(currentUser.balance);

        // Update Nominee
        const nom = currentUser.nominee;
        currentNomineeDisplay.textContent = nom ? `${nom.name} (${nom.relation})` : 'None Registered';

        // Update Statement (Transaction Table)
        transactionTableBody.innerHTML = ''; // Clear previous
        // Sort transactions by date descending
        const sortedTransactions = [...currentUser.transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

        sortedTransactions.forEach(t => {
            const row = transactionTableBody.insertRow();
            const amountClass = t.type === 'Credit' ? 'credit' : 'debit';
            const sign = t.type === 'Credit' ? '+' : '-';
            
            row.innerHTML = `
                <td>${t.date}</td>
                <td>${t.type}</td>
                <td class="${amountClass}">${sign} ${formatBalance(t.amount).replace(/^-/, '')}</td>
                <td>${t.details}</td>
            `;
        });
    };

    const logTransaction = (user, type, amount, details) => {
        user.transactions.push({
            date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
            type: type,
            amount: parseFloat(amount),
            details: details
        });
    };
    
    // --- 4. EVENT HANDLERS ---

    // A. Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const accNumberInput = document.getElementById('acc-number').value;
        const pinInput = document.getElementById('login-password').value;

        const userFound = users.find(u => u.accNumber === accNumberInput && u.pin === pinInput);

        if (userFound) {
            currentUser = userFound;
            loginSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
            loginError.textContent = '';
            updateUI();
        } else {
            loginError.textContent = 'Invalid Account Number or PIN.';
        }
        loginForm.reset();
    });

    // B. Logout
    logoutBtn.addEventListener('click', () => {
        currentUser = null;
        dashboardSection.classList.add('hidden');
        loginSection.classList.remove('hidden');
    });

    // C. Feature Navigation
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            // Deactivate all buttons/panels
            navButtons.forEach(b => b.classList.remove('active'));
            featurePanels.forEach(p => p.classList.add('hidden'));

            // Activate current button/panel
            btn.classList.add('active');
            document.getElementById(targetId).classList.remove('hidden');

            // Ensure UI is updated when switching to a fresh view
            updateUI(); 
        });
    });

    // D. Fund Transfer
    transferForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const recipientAcc = document.getElementById('recipient-acc').value;
        const amount = parseFloat(document.getElementById('transfer-amount').value);
        const remark = document.getElementById('transfer-remark').value || 'IMPS Transfer';

        const recipientUser = users.find(u => u.accNumber === recipientAcc);

        if (amount <= 0 || isNaN(amount)) {
            displayMessage(transferMsg, 'Please enter a positive amount.', false);
        } else if (recipientAcc === currentUser.accNumber) {
            displayMessage(transferMsg, 'Cannot transfer funds to your own account.', false);
        } else if (!recipientUser) {
            displayMessage(transferMsg, `Recipient account ${recipientAcc} not found.`, false);
        } else if (amount > currentUser.balance) {
            displayMessage(transferMsg, 'Insufficient balance for this transfer.', false);
        } else {
            // 1. Debit sender
            currentUser.balance -= amount;
            logTransaction(currentUser, 'Debit', amount, `Transfer to A/C ${recipientAcc}: ${remark}`);

            // 2. Credit recipient
            recipientUser.balance += amount;
            logTransaction(recipientUser, 'Credit', amount, `Transfer from A/C ${currentUser.accNumber}: ${remark}`);
            
            updateUI(); // Refresh current user's balance and statement
            displayMessage(transferMsg, `Transfer of ${formatBalance(amount)} to ${recipientUser.name} successful!`, true);
            transferForm.reset();
        }
    });

    // E. Nominee Registration
    nomineeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('nominee-name').value;
        const relation = document.getElementById('nominee-relation').value;

        currentUser.nominee = { name, relation };
        updateUI();
        displayMessage(nomineeMsg, `Nominee ${name} (${relation}) registered successfully!`, true);
        nomineeForm.reset();
    });

    // F. Branch Transfer
    branchTransferForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newBranch = document.getElementById('new-branch').value;

        if (newBranch === currentUser.branch) {
            displayMessage(branchMsg, `You are already assigned to the ${newBranch} branch.`, false);
            return;
        }

        // Simulating the transfer process
        setTimeout(() => {
            currentUser.branch = newBranch;
            updateUI();
            displayMessage(branchMsg, `Branch transfer request approved! Your new branch is ${newBranch}.`, true);
        }, 500); // Simulate a brief processing time
    });

    // --- 5. INITIALIZATION ---
    // Start with the login section visible
    loginSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
});