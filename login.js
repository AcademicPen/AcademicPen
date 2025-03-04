document.addEventListener("DOMContentLoaded", () => {
    function showLogin() {
        document.querySelector(".tab.active").classList.remove("active");
        document.querySelectorAll(".tab")[0].classList.add("active");
        document.getElementById("loginForm").style.display = "block";
    }

    function showRegister() {
        document.querySelector(".tab.active").classList.remove("active");
        document.querySelectorAll(".tab")[1].classList.add("active");
        alert("Registration feature coming soon!");
    }

    function handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username && password) {
            // Check for specific credentials
            if (username === "Michael" && password === "1703") {
                alert("Login successful! Redirecting to dashboard...");
                // Redirect to index.html after successful login
                window.location.href = "index.html";
            } else {
                alert("Invalid username or password");
            }
        } else {
            alert("Please enter your credentials.");
        }
    }

    window.showLogin = showLogin;
    window.showRegister = showRegister;
    window.handleLogin = handleLogin;
});