// Function to validate the form
function validateForm() {
    // Clear any previous error messages
    clearErrors();

    // Get the values of all the input fields
    const name = document.querySelector('input[placeholder="NAME"]').value;
    const email = document.querySelector('input[placeholder="EMAIL"]').value;
    const contactNo = document.querySelector('input[placeholder="CONTACT NO"]').value;
    const message = document.querySelector('input[placeholder="MESSAGE"]').value;

    let valid = true;

    // Name Validation (Should not contain digits)
    if (name === "" || !/^[a-zA-Z\s]+$/.test(name)) {
        displayError('NAME', "This field is required and should contain only letters.");
        valid = false;
    }

    // Email Validation (Should be a valid email format)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === "" || !emailRegex.test(email)) {
        displayError('EMAIL', "Please enter a valid email address.");
        valid = false;
    }

    // Phone Number Validation (Should be exactly 10 digits)
    if (contactNo === "" || !/^\d{10}$/.test(contactNo)) {
        displayError('CONTACT NO', "Please enter a valid 10-digit phone number.");
        valid = false;
    }

    // Message Validation (Should be at least 10 words)
    if (message === "" || message.split(/\s+/).length < 10) {
        displayError('MESSAGE', "Message must contain at least 10 words.");
        valid = false;
    }

    return valid; // If all validations pass, return true
}

// Function to display error messages next to the input fields
function displayError(fieldName, message) {
    const field = document.querySelector(`input[placeholder="${fieldName}"]`);
    const errorElement = document.createElement("div");
    errorElement.classList.add("error-message");
    errorElement.innerText = message;
    field.parentElement.appendChild(errorElement);
}

// Function to clear error messages
function clearErrors() {
    // Remove any existing error messages
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(error => error.remove());
}

// Function to clear all the input fields (for Cancel button)
function clearForm() {
    // Get all input fields and clear them
    document.querySelector('input[placeholder="NAME"]').value = "";
    document.querySelector('input[placeholder="EMAIL"]').value = "";
    document.querySelector('input[placeholder="CONTACT NO"]').value = "";
    document.querySelector('input[placeholder="MESSAGE"]').value = "";
}

// Add event listener to the Send button for form validation
document.querySelector('.app-form-button:nth-child(2)').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission
    if (validateForm()) {
        // If form is valid, you can proceed with form submission or other logic
        alert("Form submitted successfully!");
        clearForm();
        // In a real scenario, you would submit the form here
    }
});

// Add event listener to the Cancel button for clearing the form
document.querySelector('.app-form-button:nth-child(1)').addEventListener('click', function(event) {
    clearForm(); // Clear the form when Cancel button is clicked
});
