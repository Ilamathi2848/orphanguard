// Check login status
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "login.html";
}

// Load user profile
// Load profile data
async function loadProfile() {
    try {
        const response = await fetch("http://localhost:5000/api/profile", {
            headers: { "Authorization": "Bearer " + token }
        });

        if (!response.ok) throw new Error("Failed profile load");

        const user = await response.json();

        // Set user details
        document.getElementById("user-name").textContent = user.name;
        document.getElementById("user-email").textContent = user.email;

        // Set profile image if exists, else fallback
        const profileImg = document.querySelector(".profile-img");
        profileImg.src = user.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

    } catch (err) {
        alert("Session expired. Login again.");
        logout();
    }
}


// Logout function
function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

// Attach logout button
const logoutBtn = document.querySelector(".logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", logout);
}

// Automatically load profile on page load
document.addEventListener("DOMContentLoaded", loadProfile);
