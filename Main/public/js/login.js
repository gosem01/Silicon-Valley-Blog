const templateData = {
  loggedIn: false
};

const login = document.querySelector('#login');
const signup = document.querySelector('#signup');

const switchToSignup = async (event) => {
  event.preventDefault();

  console.log('BEFORE CLICK: ' + templateData.loggedIn);

  if(!templateData.loggedIn) {
    templateData.loggedIn = true
    login.setAttribute('style', 'display: none');
    signup.setAttribute('style', 'display: visible');
  } else {
    templateData.loggedIn = false
    login.setAttribute('style', 'display: visible');
    signup.setAttribute('style', 'display: none');
  }

  console.log('AFTER CLICK: ' + templateData.loggedIn);
};

const switchToLogin = async (event) => {
  event.preventDefault();

  console.log('BEFORE CLICK: ' + templateData.loggedIn);

  if(templateData.loggedIn) {
    templateData.loggedIn = false
    signup.setAttribute('style', 'display: none');
    login.setAttribute('style', 'display: visible');
  } else {
    templateData.loggedIn = true
    signup.setAttribute('style', 'display: visible');
    login.setAttribute('style', 'display: none');
  }

  console.log('AFTER CLICK: ' + templateData.loggedIn);
};

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#clickToSignup')
  .addEventListener('click', switchToSignup);

document
  .querySelector('#clickToLogin')
  .addEventListener('click', switchToLogin);

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
