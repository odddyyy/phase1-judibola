function start() {
    let token = localStorage.getItem('token')
    if (token) {
        $(document).ready(() => {
            $('#register').hide()
            $('#forum-betting').hide()
            $('#login').hide()
            $('#matches-list').show()
        })
    } else {
        $('#register').hide()
        $('#matches-list').hide()
        $('#forum-betting').hide()
        $('#login').show()
    }
}

function loginSuccess() {
    $('#register').hide()
    $('#forum-betting').hide()
    $('#login').hide()
    $('#matches-list').show()
}

$('#btn-login').on('submit', function(event) {
    event.preventDefault()
    let $username = $('#username-login').val()
    let $password = $('#password-login').val()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/login',
        data: {
            username: $username,
            password: $password
        },
        success: (data) => {
            localStorage.setItem('token', data.token)
            loginSuccess()
        },
        error: (err) => {
            start()
            console.log(err)
        }
    })
    loginSuccess()
})

start()