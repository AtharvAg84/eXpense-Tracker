// Sidebar Toggle
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

// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Save theme preference
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Load preferences on page load
document.addEventListener("DOMContentLoaded", () => {
    // Load Sidebar State
    let sidebar = document.querySelector(".sidebar");
    if (localStorage.getItem("sidebarState") === "expanded") {
        sidebar.classList.add("expanded");
    } else {
        sidebar.classList.remove("expanded");
    }

    // Load Theme Preference
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
});

