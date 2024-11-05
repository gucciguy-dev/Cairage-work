const toggleNavColor = () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseover' , () => {
            link.style.color = '#FF4848';
        });
        link.addEventListener('mouseout' , () => {
            link.style.color = '#f1f1f1';
        });
    });
};

const updateContent = (sectionId, content) => {
    const section = document.getElementById(sectionId);
    if(section) {
        section.innerHTML =`<p>${content}</p>`;
    }
};

toggleNavColor();

document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Create a FormData object to send data as form-urlencoded
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch('login.php', {  // Point to your PHP file
        method: 'POST',
        body: formData  // Use the FormData object
    });

    const data = await response.json();
    const message = document.getElementById('loginMessage');
    if (data.status === 'success') {
        message.textContent = 'Login successful!';
        message.style.color = 'green';
        
        // Change login button to logout button
        document.querySelector('.login-start').textContent = 'Logout';
        document.querySelector('.login-start').classList.add('logout'); // Optional: add a class for styling

        // Optionally, set a session variable or token in localStorage to track login
        localStorage.setItem('loggedIn', 'true'); // Example of session management

        // Close overlay if necessary
        document.getElementById('loginOverlay').style.display = 'none';
    } else {
        message.textContent = 'Invalid login!';
        message.style.color = 'red';
    }
});

document.querySelector('.login-start').addEventListener('click', function() {
    if (localStorage.getItem('loggedIn') === 'true') {
        // Clear user-created cards
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('userCar_')) {
                localStorage.removeItem(key);
            }
        }

        // Handle logout logic
        localStorage.removeItem('loggedIn');
        this.textContent = 'Login'; // Change back to Login button text
    } else {
        // Open the login overlay
        document.getElementById('loginOverlay').style.display = 'block';
        closeOverlay.addEventListener('click', function() {
            loginOverlay.style.display = 'none'; // Hide the overlay
        });
    }
});

document.getElementById('logout').addEventListener('click', function() {
    localStorage.removeItem('userCards'); // Remove user-created cards
    localStorage.removeItem('loggedIn'); // Clear the login state

    // Optionally, redirect the user or refresh the page
    window.location.href = '/'; // Redirect to the homepage or login page
});