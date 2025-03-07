// General Functions
document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript Loaded for All Pages");

    // Handle Navigation Highlights
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.style.fontWeight = "bold";
            link.style.color = "#ffa500";
        }
    });
});

// Home Page Script
if (document.body.classList.contains("home-page")) {
    console.log("Home Page Script Loaded");

    // Example feature: Scroll button
    const scrollButton = document.getElementById("scrollButton");
    if (scrollButton) {
        scrollButton.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}

// Login Page Script
if (document.body.classList.contains("login-page")) {
    console.log("Login Page Script Loaded");

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === "admin" && password === "admin123") {
                alert("Admin login successful!");
                window.location.href = "admin_dashboard.html"; // Redirect to admin dashboard
            } else if (username && password) {
                alert("User login successful!");
                window.location.href = "home.html"; // Redirect to home page
            } else {
                alert("Invalid credentials. Please try again.");
            }

            loginForm.reset();
        });
    }
}

// Signup Page Script
if (document.body.classList.contains("signup-page")) {
    console.log("Signup Page Script Loaded");

    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const username = document.getElementById("signupUsername").value;
            const email = document.getElementById("signupEmail").value;
            const password = document.getElementById("signupPassword").value;

            if (username && email && password) {
                alert("Signup successful! You can now log in.");
                window.location.href = "login.html"; // Redirect to login page
            } else {
                alert("Please fill out all required fields.");
            }

            signupForm.reset();
        });
    }
}

// Contact Page Script
if (document.body.classList.contains("contact-page")) {
    console.log("Contact Page Script Loaded");

    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = document.getElementById("contactName").value;
            const email = document.getElementById("contactEmail").value;
            const message = document.getElementById("contactMessage").value;

            if (name && email && message) {
                alert("Thank you for reaching out! We'll get back to you soon.");
                contactForm.reset();
            } else {
                alert("Please fill out all required fields.");
            }
        });
    }
}

// Services Page Script
if (document.body.classList.contains("services-page")) {
    console.log("Services Page Script Loaded");

    const prayerRequestButtons = document.querySelectorAll(".service-box button");
    prayerRequestButtons.forEach(button => {
        button.addEventListener("click", () => {
            const serviceName = button.closest(".service-box").querySelector("h3").innerText;
            alert(`You have selected the service: ${serviceName}.`);
        });
    });
}
