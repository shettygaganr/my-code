document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const loginIdInput = document.getElementById('loginId');
    const loginIdLabel = document.getElementById('loginIdLabel');
    const errorText = document.getElementById('errorText');
    const toggleEmail = document.getElementById('toggleEmail');
    const togglePhone = document.getElementById('togglePhone');

    let currentMode = 'email'; // Start in email mode

    // Regex pattern: Must contain characters, followed by @gmail.com, and nothing else.
    const GMAIL_PATTERN_REGEX = new RegExp('^[a-zA-Z0-9._%+-]+@gmail\\.com$');

    // --- Validation Function (Ensuring Proper Gmail Format) ---
    const validateGmail = () => {
        const isValid = GMAIL_PATTERN_REGEX.test(loginIdInput.value);
        
        if (loginIdInput.value && !isValid) {
            errorText.textContent = "Login ID must be a valid @gmail.com address.";
            loginIdInput.setCustomValidity("Invalid Gmail format.");
        } else {
            errorText.textContent = "";
            loginIdInput.setCustomValidity(""); // Clear the error if valid
        }
        return isValid || !loginIdInput.value; 
    };

    // --- Mode Switching Logic ---
    const switchMode = (mode) => {
        if (mode === currentMode) return;
        currentMode = mode;

        // Update active buttons
        toggleEmail.classList.remove('active');
        togglePhone.classList.remove('active');
        
        // Reset validation message and clear input field on switch
        loginIdInput.setCustomValidity("");
        errorText.textContent = ""; 
        loginIdInput.value = ""; 

        if (mode === 'email') {
            toggleEmail.classList.add('active');
            loginIdLabel.textContent = "Login ID (Gmail)";
            loginIdInput.setAttribute('type', 'email');
            loginIdInput.setAttribute('placeholder', 'Enter your Gmail address');
            
            // Apply Gmail validation attributes
            loginIdInput.setAttribute('pattern', GMAIL_PATTERN_REGEX.source);
            loginIdInput.setAttribute('title', 'Please enter a valid Gmail address (e.g., example@gmail.com).');
        } else { // phone mode
            togglePhone.classList.add('active');
            loginIdLabel.textContent = "Login ID (Phone Number)";
            loginIdInput.setAttribute('type', 'tel'); 
            loginIdInput.setAttribute('placeholder', 'Enter your 10-digit phone number');
            
            // Apply phone validation: EXACTLY 10 digits
            loginIdInput.setAttribute('pattern', '\\d{10}'); 
            loginIdInput.setAttribute('title', 'Please enter a 10-digit phone number.');
        }
    };

    // Event listeners for the toggle buttons
    toggleEmail.addEventListener('click', () => switchMode('email'));
    togglePhone.addEventListener('click', () => switchMode('phone'));

    // Event listener for real-time validation feedback 
    loginIdInput.addEventListener('input', () => {
        if (currentMode === 'email') {
            validateGmail();
        } else {
             errorText.textContent = "";
        }
    });

    // --- Form Submission Handler ---
    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        // Ensure Gmail is valid on submission (only runs if in email mode)
        if (currentMode === 'email') {
            validateGmail();
        }

        // Check if the form is valid (native check + our custom check)
        if (form.checkValidity() && loginIdInput.reportValidity()) {
            
            // ALL VALIDATIONS PASSED! Redirect to Page 2
            window.location.href = "dashboard.html"; 

        } else {
            // If validation failed, this ensures the correct message pops up.
            console.log("Login Failed: Validation Errors.");
        }
    });

    // Initial setup (set to email mode on load)
    switchMode('email'); 
});