window.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const navSection = document.getElementById("nav-user-section");

    if (user && navSection) {
        navSection.innerHTML = `
            <img src="images/user-icon.png" class="profile-icon" onclick="openProfile()">
            <span class="hello-text">Hello, ${user.name}</span>
            <button onclick="logout()" class="logout-btn">Logout</button>
        `;
    }
});

function openProfile() {
    window.location.href = "profile.html";
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
}
