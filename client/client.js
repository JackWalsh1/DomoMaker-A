// displays error message
const handleError = (message) => {
  document.getElementById('errorMessage').textContent = message;
  document.getElementById('domoMessage').classList.remove('hidden');
};

// sends post and then reacts accordingly based on response
const sendPost = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  document.getElementById('domoMessage').classList.add('hidden');

  if(result.redirect) {
    window.location = result.redirect;
  }

  if(result.error) {
    handleError(result.error);
  }
};

// sets up event listeners
const init = () => {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');
  const domoForm = document.getElementById('domoForm');
  const domoMessage = document.getElementById('domoMessage');

  /* page has signUpForm = add submit evLis
     evLis grabs username, password, and password2
    no exist => throw error
     else => uses sendPost
  */
  if(signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      domoMessage.classList.add('hidden');

      const username = signupForm.querySelector('#user').value;
      const pass = signupForm.querySelector('#pass').value;
      const pass2 = signupForm.querySelector('#pass2').value;

      if(!username || !pass || !pass2) {
        handleError('All fields are required!');
        return false;
      } 

      if(pass !== pass2) {
        handleError('Passwords do not match!');
        return false;
      }

      sendPost(signupForm.getAttribute('action'), {username, pass, pass2});
      return false;
    });
  }

  /* page has loginForm = add submit evLis
     evLis grabs username + password
     no exist => throw error
     else => uses sendPost
  */
  if(loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      domoMessage.classList.add('hidden');

      const username = loginForm.querySelector('#user').value;
      const pass = loginForm.querySelector('#pass').value;

      if(!username || !pass) {
        handleError('Username or password is empty!');
        return false;
      }

      sendPost(loginForm.getAttribute('action'), {username, pass});
      return false;
    });
  }

  /* page has signUpForm = add submit evLis
     evLIs grabs domo name / age
     no exist => throw error
     else => uses sendPost
  */
  if(domoForm) {
    domoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      domoMessage.classList.add('hidden');

      const name = domoForm.querySelector('#domoName').value;
      const age = domoForm.querySelector('#domoAge').value;

      if(!name || !age) {
        handleError('All fields are required!');
        return false;
      }

      sendPost(domoForm.getAttribute('action'), {name, age});
      return false;
    });
  }
};

window.onload = init;