document.getElementById("volunteer-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    // Collect roles
    const roles = Array.from(document.querySelectorAll("input[name='roles[]']:checked"))
        .map(checkbox => checkbox.value);

    const data = {
        fullname: document.getElementById("fullname").value,
        email: document.getElementById("email").value,
        contact: document.getElementById("contact").value,
        availability: document.getElementById("availability").value,
        skills: document.getElementById("skills").value,
        roles: roles
    };

    try {
        const response = await fetch("http://localhost:5000/api/volunteer/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert("🎉 Volunteer registration successful!");
            document.getElementById("volunteer-form").reset();
        } else {
            alert(result.message || "Something went wrong.");
        }
    } catch (err) {
        console.error(err);
        alert("Server error. Try again later.");
    }
});
