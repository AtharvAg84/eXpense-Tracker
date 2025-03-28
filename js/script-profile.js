// ====================
// Load Profile Data on Page Load
// ====================
document.addEventListener('DOMContentLoaded', function () {
  const currentUserEmail = localStorage.getItem('currentUser');

  // Check if user is logged in, otherwise redirect to login
  if (!currentUserEmail) {
    alert('You are not logged in. Redirecting to login page...');
    window.location.href = 'login.html';
    return;
  }

  // Retrieve user data from localStorage
  const currentUserData = JSON.parse(localStorage.getItem(currentUserEmail));

  if (currentUserData) {
    // Update profile details dynamically
    document.querySelector('.profile-container h2').innerText =
      currentUserData.name || 'User';
    document.querySelector('.profile-container p').innerText =
      currentUserData.email || 'No email available';

    // Update spending summary if available
    updateSpendingSummary(currentUserData);

    // Check and apply dark mode if previously enabled
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
    }
  } else {
    alert('User data not found. Please log in again.');
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  }
});

// ====================
// Update Spending Summary
// ====================
function updateSpendingSummary(data) {
  document.querySelector(
    '.profile-spending-summary li:nth-child(1) span'
  ).innerText = data.rent || '$1,200';
  document.querySelector(
    '.profile-spending-summary li:nth-child(2) span'
  ).innerText = data.transport || '$300';
  document.querySelector(
    '.profile-spending-summary li:nth-child(3) span'
  ).innerText = data.food || '$500';
  document.querySelector(
    '.profile-spending-summary li:nth-child(4) span'
  ).innerText = data.subscriptions || '$100';
}

// ====================
// Toggle Dark Mode
// ====================
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'enabled');
  } else {
    localStorage.setItem('darkMode', 'disabled');
  }
}

// ====================
// Toggle Sidebar
// ====================
function toggleSidebar() {
  let sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("expanded");

  // Save state to localStorage
  if (sidebar.classList.contains("expanded")) {
      localStorage.setItem("sidebarState", "expanded");
  } else {
      localStorage.setItem("sidebarState", "collapsed");
  }
}

// ====================
// Logout Function
// ====================
function logout() {
  localStorage.removeItem('currentUser');
  alert('You have been logged out. Redirecting to login page...');
  window.location.href = 'login.html';
}

// ====================
// Edit Profile (Future Scope)
// ====================
document.addEventListener("DOMContentLoaded", function () {
  const editButton = document.querySelector(".edit-btn");
  const saveButton = document.querySelector(".save-btn");
  const modal = document.querySelector(".edit-profile-modal");
  const fileInput = document.getElementById("profile-pic");

  // Open modal for editing
  editButton.addEventListener("click", function () {
      modal.style.display = "block";
  });

  // Save changes and update profile
  saveButton.addEventListener("click", function (event) {
    event.preventDefault();
    updateProfile();
    closeModal();
});

// Cancel changes and update profile
  const cancelButton = document.querySelector(".cancel-btn");

  cancelButton.addEventListener("click", function () {
      modal.style.display = "none"; // Close the modal
 });


  function updateProfile() {
      const profileDetails = {
          name: document.getElementById("name").value.trim(),
          bio: document.getElementById("bio").value.trim(),
          email: document.getElementById("email").value.trim(),
          phone: document.getElementById("phone").value.trim(),
          dob: document.getElementById("dob").value.trim(),
          gender: document.getElementById("gender").value.trim(),
          location: document.getElementById("location").value.trim(),
          income: document.getElementById("income").value.trim(),
          bankName: document.getElementById("bank-name").value.trim(),
          accountType: document.getElementById("account-type").value.trim(),
          upiId: document.getElementById("upi-id").value.trim(),
          creditLimit: document.getElementById("credit-limit").value.trim(),
          website: document.getElementById("website").value.trim(),
          social1: document.getElementById("social1").value.trim(),
          social2: document.getElementById("social2").value.trim(),
          social3: document.getElementById("social3").value.trim(),
      };

      // Profile Picture Update
      const profilePic = document.querySelector(".profile-pic");
      if (fileInput.files.length > 0) {
          const reader = new FileReader();
          reader.onload = function (e) {
              profilePic.src = e.target.result;
              localStorage.setItem("profilePic", e.target.result); // Store image in localStorage
          };
          reader.readAsDataURL(fileInput.files[0]);
      }

      // Updating Profile Details (Ensuring Prefix Stays & Hiding Empty Fields)
      updateField("display-name", profileDetails.name, "👤 Name: ");
      updateField("display-bio", profileDetails.bio, "📝 Bio: ");
      updateField("display-location", profileDetails.location, "📍 Location: ");
      updateField("display-email", profileDetails.email, "📧 Email: ");
      updateField("display-phone", profileDetails.phone, "📞 Phone: ");
      updateField("display-dob", profileDetails.dob, "🎂 DOB: ");
      updateField("display-gender", profileDetails.gender, "🧑 Gender: ");
      updateField("display-income", profileDetails.income);
      updateField("display-bank-name", profileDetails.bankName, "🏦 Bank Name: ");
      updateField("display-account-type", profileDetails.accountType, "💳 Account Type: ");
      updateField("display-upi-id", profileDetails.upiId, "🔗 UPI ID: ");
      updateField("display-credit-limit", profileDetails.creditLimit, "🏦 Credit Limit: ");
      updateField("display-website", profileDetails.website, "🌐 Website: ");
      updateField("display-social1", profileDetails.social1, "🔗 Social 1: ");
      updateField("display-social2", profileDetails.social2, "🔗 Social 2: ");
      updateField("display-social3", profileDetails.social3, "🔗 Social 3: ");
  }

  function updateField(elementId, value, prefix = "") {
      const element = document.getElementById(elementId);
      if (value) {
          element.textContent = prefix + value;
          element.classList.remove("hidden");
      } else {
          element.classList.add("hidden");
      }
  }

  function closeModal() {
      modal.style.display = "none";
  }

  // Reload Profile Picture if stored
  const storedProfilePic = localStorage.getItem("profilePic");
  if (storedProfilePic) {
      document.querySelector(".profile-pic").src = storedProfilePic;
  }
});

// ====================
// Generate Report (Optional Feature)
// ====================
document
  .querySelector('.profile-btn.generate-report')
  .addEventListener('click', function () {
    alert('Generating financial report... (Feature coming soon!)');
  });
