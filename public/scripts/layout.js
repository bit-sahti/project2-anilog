const loginBtn = document.getElementById('login')

loginBtn.onclick = event => {
  event.preventDefault()
  $('.ui.modal')
  .modal('show')
;
}


$('.ui.form')
  .form({
    inline: true,
    fields: {
      email: {
        identifier: 'email',
        rules: [
          {
            type: 'email',
            prompt: 'Invalid email format'
          },
          {
            type: 'empty',
            prompt: 'Enter your email.'
          }
        ]
      },
      password: {
        identifier: 'password',
        rules: [
          {
            type: 'empty',
            prompt: 'Enter your password.'
          }
        ]
      }
    }
  })
;