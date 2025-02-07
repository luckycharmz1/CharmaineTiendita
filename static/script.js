// Contact Form Modal Display
const contactBtn = document.getElementById("contact-btn");
const contactModal = document.getElementById("contact-modal");
const closeBtn = document.getElementById("close-modal");

contactBtn.addEventListener("click", () => {
    contactModal.style.display = "block"; // Show the modal when 'Contact Me' is clicked
});

closeBtn.addEventListener("click", () => {
    contactModal.style.display = "none"; // Hide the modal when 'Close' is clicked
});

// Form submission (sending email or handling form)
const contactForm = document.getElementById("contact-form");
contactForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    const formData = new FormData(contactForm);
    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message")
    };

    // Send form data to the backend (you can replace this with your actual backend endpoint)
    fetch('/send-contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(responseData => {
        alert("Your message has been sent!");
        contactModal.style.display = "none"; // Close the modal after submission
    })
    .catch(error => {
        console.error("Error sending message:", error);
        alert("There was an error sending your message. Please try again.");
    });
});
