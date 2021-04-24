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
          },
          {
            type: 'maxLength[30]',
            prompt: 'The username must be 30 charaters or bellow.'
          },
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
      birthDate: {
        identifier: 'birthDate',
        rules: {
          type: 'empty',
          prompt: 'Please enter your birthdate.'
        }
      },
      password: {
        identifier: 'password',
        rules: [
          {
            type: 'empty',
            prompt: 'Enter a password'
          },
          {
            type: 'minLength[6]',
            prompt: 'The password must have at least 6 characters. The longer, the better.'
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
            prompt: 'Enter the correct answer to your reset question.'
          }
        ]
      }
    }
  })
;
