const usernameInput = document.getElementById('username');

usernameInput.oninput = () => {
  const usernameError = document.getElementById('usernameError');

  if (usernameError) {
    usernameError.classList.add('hidden')
  }
}

$('.ui.dropdown')
    .dropdown()
;

$('.ui.form')
  .form({
    inline: true,
    fields: {
      username: {
        identifier: 'username',
        rules: [
          {
            type: 'empty',
            prompt: 'A username must be set.'
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
      description: {
        identifier: 'description',
        rules: [
          {
            type: 'maxLength[1000]',
            prompt: 'Characters limit exceeded. Please keep your text under 1000 characters.'
          }
        ]
      },
      preferedGenres: {
        identifier: 'preferedGenres',
        rules: [
          {
            type: 'maxCount[3]',
            prompt: 'Please limit your choices to your three prefered genres.'
          }
        ]
      } 
    }
  })
;
