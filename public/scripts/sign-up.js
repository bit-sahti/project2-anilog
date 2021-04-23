const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');

emailInput.oninput = () => {
  const emailError = document.getElementById('emailError');

  if (emailError) {
    emailError.classList.add('hidden')

  }
}

usernameInput.oninput = () => {
  const usernameError = document.getElementById('usernameError');

  console.log(usernameError);

  if (usernameError) {
    usernameError.classList.add('hidden')

  }
}


$('.ui.form')
  .form({
    inline: true,
    fields: {
      username: {
        identifier: 'username',
        rules: [
          {
            type: 'empty',
            prompt: 'Enter a username'
          },
          {
            type: 'minLength[3]',
            prompt: 'The username must be at least 3 characters long.'
          }
        ]
      },
      email: {
        identifier: 'email',
        rules: [
          {
            type: 'email',
            prompt: 'Invalid email'
          }
        ]
      },
      password: {
        identifier: 'password',
        rules: [
          {
            type: 'empty',
            prompt: 'Enter a password'
          },
          {
            type: 'minLength[10]',
            prompt: 'The password must be at least 10 character long. We recommend you use  a custom phrase.'
          }
        ]
      },
      passConfirmation: {
        identifier: 'passConfirmation',
        rules: [
          {
            type: 'match[password]',
            prompt: 'The passwords do not match.'
          }
        ]
      },
      resetPassQuestion: {
        identifier: 'resetPassQuestion',
        rules: [
          {
            type: 'empty',
            prompt: 'A reset question must be set in case you forget your password.'
          }
        ]
      },
      resetPassAnswer: {
        identifier: 'resetPassAnswer',
        rules: [
          {
            type: 'empty',
            prompt: 'Enter the correct answer to you reset question.'
          }
        ]
      }
      



    }
  })
;
