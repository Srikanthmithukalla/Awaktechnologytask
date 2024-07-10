
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errormessage = document.getElementById('errormessage').value;
    const rememberMe = document.getElementById('remember-me').checked;

    let isValid = true;

    // Clear previous error messages
    document.getElementById('usernameError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('errormessage').textContent = '';
    document.getElementById('loginError').textContent = '';

    // clear input fields
    document.getElementById('username').value='';
    document.getElementById('password').value='';
    document.getElementById('remember-me').checked='';

    // Validate both fields 
    if (!username || !password) {
        document.getElementById('errormessage').textContent = 'Please fill in both fields.';
        isValid=false;
    }

    // Validate username/email
    if (!username) {
        document.getElementById('usernameError').textContent = 'Email is required.';
        isValid = false;
    } else if (!validateEmail(username)) {
        document.getElementById('usernameError').textContent = 'Invalid email format.';
        isValid = false;
    }

    // Validate password
    if (!password) {
        document.getElementById('passwordError').textContent = 'Password is required.';
        isValid = false;
    } else if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be atleast 6 characters';
        isValid = false;
    }

    if (isValid) {

        // Perform API login
        login(username, password, rememberMe);
    }

});

function validateEmail(email) {
    const re =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function login(username, password, rememberMe) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.id) {
            alert('Login successful!');
            if (rememberMe) {
                localStorage.setItem('username', username);
            } else {
                localStorage.removeItem('username');
            }
        } else {
            document.getElementById('loginError').textContent = 'Invalid login credentials.';
        }
    })
    .catch(error => {

        console.error('Error:', error);
        document.getElementById('loginError').textContent = 'Login failed. Please try again.';
    });
}
