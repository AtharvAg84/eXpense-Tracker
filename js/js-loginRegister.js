document.getElementById('login-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    alert('Login successful!');
    // Redirect or perform other actions
  } else {
    alert(data.message);
  }
});

document.getElementById('register-form').addEventListener('submit', async function(event) {
  event.preventDefault();
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  const response = await fetch('/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    alert('Registration successful!');
    // Redirect or perform other actions
  } else {
    alert(data.message);
  }
});
