// ============================================================
// AUTHENTICATION - Login & Registration
// ============================================================

const API_BASE = 'https://travel-booking-api.onrender.com/api';

function openLoginModal() {
    document.getElementById('loginModal').classList.add('show');
}

function closeLoginModal() {
    document.getElementById('loginModal').classList.remove('show');
}

function openSignupModal() {
    document.getElementById('signupModal').classList.add('show');
}

function closeSignupModal() {
    document.getElementById('signupModal').classList.remove('show');
}

function switchToSignup() {
    closeLoginModal();
    openSignupModal();
}

function switchToLogin() {
    closeSignupModal();
    openLoginModal();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    
    if (event.target === loginModal) {
        loginModal.classList.remove('show');
    }
    if (event.target === signupModal) {
        signupModal.classList.remove('show');
    }
}

// Handle login
async function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.elements[0].value;
    const password = form.elements[1].value;

    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            // Save token
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            alert('Login successful!');
            closeLoginModal();
            updateUI();
            
            // Reload page to show user info
            location.reload();
        } else {
            alert('Login failed: ' + (data.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Connection error. Please try again.');
    }
}

// Handle signup
async function handleSignup(event) {
    event.preventDefault();
    
    const form = event.target;
    const fullName = form.elements[0].value;
    const email = form.elements[1].value;
    const password = form.elements[2].value;
    const confirmPassword = form.elements[3].value;
    const phone = form.elements[4].value;

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fullName,
                email,
                password,
                phone
            })
        });

        const data = await response.json();

        if (data.success) {
            alert('Account created successfully! Please login.');
            closeSignupModal();
            switchToLogin();
        } else {
            alert('Signup failed: ' + (data.message || 'Unknown error'));
        }
    } catch (error) {
        console.error('Signup error:', error);
        alert('Connection error. Please try again.');
    }
}

// Update UI based on auth status
function updateUI() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const navAuth = document.querySelector('.nav-auth');

    if (token && navAuth) {
        navAuth.innerHTML = `
            <div style="display: flex; gap: 15px; align-items: center;">
                <span>Welcome, ${user.fullName || 'Guest'}</span>
                <button class="btn-login" onclick="logout()">Logout</button>
            </div>
        `;
    }
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    alert('Logged out successfully');
    location.reload();
}

// Check auth on page load
document.addEventListener('DOMContentLoaded', function() {
    updateUI();
});