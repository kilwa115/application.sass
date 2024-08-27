document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Clear previous error messages
            errorMessage.textContent = '';

            // Get the form data
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Send login request
            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.message === "Connexion réussie!") {
                    // Redirect to navigation page
                    window.location.href = 'navigation.html';
                } else {
                    // Display error message
                    errorMessage.textContent = data.message;
                }
            })
            .catch(error => {
                // Display error message
                errorMessage.textContent = "Erreur lors de la connexion.";
                console.error('There was a problem with the fetch operation:', error);
            });
        });
    }
});
