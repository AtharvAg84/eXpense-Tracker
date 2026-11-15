// ====================
// Registration Form Logic
// ====================
document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    const emailInput = document.getElementById('register-email');
    const contactInput = document.getElementById('register-contact');
    const passwordInput = document.getElementById('register-password');
    const confirmPasswordInput = document.getElementById('register-confirm-password');
    emailInput.addEventListener('input', validateEmail);
    contactInput.addEventListener('input', validateContact);
    contactInput.addEventListener('blur', validateContact);
    confirmPasswordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('blur', validatePassword);

    registerForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const name = document.getElementById('register-name').value;
      const email = emailInput.value.trim();
      const contact = contactInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;

      if (!registerForm.reportValidity() || !validateEmail() || !validateContact() || !validatePassword()) {
        return;
      }

      // Check if user already exists in localStorage
      if (localStorage.getItem(email)) {
        alert('User already registered. Please log in.');
        window.location.href = 'login.html';
        return;
      }

      // Save user details to localStorage
      const userData = { name, email, contact, password };
      localStorage.setItem(email, JSON.stringify(userData));

      alert('Registration successful! Redirecting to login page...');
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    });
  }

  // ====================
  // Login Form Logic
  // ====================
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;

      // Check if user exists in localStorage
      const userData = JSON.parse(localStorage.getItem(email));

      if (!userData) {
        alert('User not found! Redirecting to registration page...');
        setTimeout(() => {
          window.location.href = 'register.html';
        }, 1500);
        return;
      }

      // Check password
      if (userData.password === password) {
        alert('User exists, redirecting to profile page...');
        localStorage.setItem('currentUser', email); // Save current logged-in user
        setTimeout(() => {
          window.location.href = 'profile.html'; // ✅ Redirect to profile page
        }, 1500);
      } else {
        alert('Incorrect password. Please try again.');
      }
    });
  }

  // ====================
  // Profile Page Logic
  // ====================
  if (window.location.pathname.includes('profile.html')) {
    const currentUserEmail = localStorage.getItem('currentUser');

    if (!currentUserEmail) {
      alert('You are not logged in. Redirecting to login page...');
      window.location.href = 'login.html';
    } else {
      const currentUserData = JSON.parse(localStorage.getItem(currentUserEmail));

      // Populate profile details
      document.querySelector('.profile-container h2').innerText = currentUserData.name;
      document.querySelector('.profile-container p').innerText =
        currentUserData.email || 'Software Engineer | AI & Robotics Enthusiast';
    }
  }
});

// ====================
// Logout Function
// ====================
function logout() {
  localStorage.removeItem('currentUser');
  alert('You have been logged out.');
  window.location.href = 'login.html';
}

// Validate form inputs
function validateEmail() {
  const email = document.getElementById("register-email");
  const errorSpan = document.getElementById("email-error");
  const valid = email.value === "" || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.value);
  errorSpan.textContent = valid || email.value === "" ? "" : "Invalid email format!";
  return valid && email.value !== "";
}

function validateContact() {
  const contact = document.getElementById("register-contact");
  const errorSpan = document.getElementById("contact-error");
  const valid = /^\d{10}$/.test(contact.value);
  errorSpan.textContent = contact.value === "" || valid ? "" : "Contact number must be 10 digits!";
  return valid;
}

function validatePassword() {
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById("register-confirm-password").value;
  const errorSpan = document.getElementById("password-error");
  const valid = confirmPassword !== "" && password === confirmPassword;
  errorSpan.textContent = confirmPassword === "" || valid ? "" : "Passwords do not match!";
  return valid;
}