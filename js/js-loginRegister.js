// ====================
// Registration Form Logic
// ====================
document.addEventListener('DOMContentLoaded', function () {
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', function (event) {
      event.preventDefault();

      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const contact = document.getElementById('register-contact').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;

      if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
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

      const email = document.getElementById('login-email').value;
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
  let email = document.getElementById("register-email").value;
  let errorSpan = document.getElementById("email-error");
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (email === "") {
      errorSpan.textContent = "";
  } else if (!emailPattern.test(email)) {
      errorSpan.textContent = "Invalid email format!";
  } else {
      errorSpan.textContent = "";
  }
}

function validateContact() {
  let contact = document.getElementById("register-contact").value;
  let errorSpan = document.getElementById("contact-error");

  if (contact === "") {
      errorSpan.textContent = "";
  } else if (!/^\d{10}$/.test(contact)) {
      errorSpan.textContent = "Contact number must be 10 digits!";
  } else {
      errorSpan.textContent = "";
  }
}

function validatePassword() {
  let password = document.getElementById("register-password").value;
  let confirmPassword = document.getElementById("register-confirm-password").value;
  let errorSpan = document.getElementById("password-error");

  if (confirmPassword === "") {
      errorSpan.textContent = "";
  } else if (password !== confirmPassword) {
      errorSpan.textContent = "Passwords do not match!";
  } else {
      errorSpan.textContent = "";
  }
}