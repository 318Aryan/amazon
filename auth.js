// Authentication System
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
            this.updateUIForLoggedInUser();
        }

        // Set up login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Set up signup form
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => this.handleSignup(e));
        }
    }

    handleLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');

        // Hardcoded credentials for demo
        if (email === 'Sparsh@gmail.com' && password === '1234abcd') {
            this.currentUser = {
                id: 1,
                email: email,
                name: 'Sparsh',
                joinDate: new Date().toISOString()
            };

            localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            this.updateUIForLoggedInUser();
            window.location.href = '/';
        } else {
            this.showError('Invalid email or password. Please try again.');
        }
    }

    handleSignup(e) {
        e.preventDefault();
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const name = document.getElementById('name').value;
        const errorMessage = document.getElementById('signupErrorMessage');

        if (password !== confirmPassword) {
            this.showError('Passwords do not match.', 'signupErrorMessage');
            return;
        }

        if (password.length < 6) {
            this.showError('Password must be at least 6 characters long.', 'signupErrorMessage');
            return;
        }

        // Create new user
        this.currentUser = {
            id: Date.now(),
            email: email,
            name: name,
            joinDate: new Date().toISOString()
        };

        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.updateUIForLoggedInUser();
        window.location.href = '/';
    }

    showError(message, elementId = 'errorMessage') {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }

    hideError(elementId = 'errorMessage') {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }

    updateUIForLoggedInUser() {
        // Update navigation to show user info
        const navTexts = document.querySelectorAll('.nav-texts');
        if (navTexts.length > 0) {
            navTexts[0].innerHTML = `
                <p>Hello, ${this.currentUser.name}</p>
                <h1>Account & Lists <img src="./assets/dropdown_icon.png" width="8px" alt=""> </h1>
            `;
        }

        // Add logout functionality
        this.addLogoutButton();
    }

    addLogoutButton() {
        // Add logout option to account dropdown
        const accountDropdown = document.querySelector('.nav-texts h1');
        if (accountDropdown) {
            accountDropdown.addEventListener('click', () => {
                if (confirm('Are you sure you want to logout?')) {
                    this.logout();
                }
            });
        }
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('cart');
        localStorage.removeItem('wishlist');
        window.location.href = '/login.html';
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    getCurrentUser() {
        return this.currentUser;
    }
}

// Initialize authentication system
const auth = new AuthSystem();

// Export for use in other files
window.auth = auth;
