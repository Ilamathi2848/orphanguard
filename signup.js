document.getElementById("signupForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Getting input values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirm_password = document.getElementById("confirm_password").value;

    // Simple validation
    if (!name || !email || !password || !confirm_password) {
        alert("Please fill all fields.");
        return;
    }

    if (password !== confirm_password) {
        alert("Passwords do not match.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Save token + user
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Signup successful!");

            // Redirect to profile page
            window.location.href = "profile.html";

        } else {
            alert(data.message || "Error signing up.");
        }

    } catch (err) {
        console.error("Signup Error:", err);
        alert("Server error. Please try again later.");
    }
});
