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
    document.querySelector('.sidebar').classList.toggle('collapsed');
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
  document.querySelector('.edit-btn').addEventListener('click', function () {
    alert('Edit Profile feature is coming soon!');
  });
  
  // ====================
  // Generate Report (Optional Feature)
  // ====================
  document
    .querySelector('.profile-btn.generate-report')
    .addEventListener('click', function () {
      alert('Generating financial report... (Feature coming soon!)');
    });
  