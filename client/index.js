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

function registerSuccess() {
    $('#register').hide()
    $('#forum-betting').hide()
    $('#matches-list').hide()
    $('#login').show()
}

function loginSuccess() {
    $('#register').hide()
    $('#forum-betting').hide()
    $('#login').hide()
    $('#matches-list').show()
}

$('#btn-register').on('click', function(){
    $('#forum-betting').hide()
    $('#login').hide()
    $('#matches-list').hide()
    $('#register').show()
})  

$('#btn-signup').on('submit', function(event) {
    event.preventDefault()
    let $username = $('#username-register').val()
    let $email = $('#email-register').val()
    let $password = $('#password-register').val()
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/register',
        data: {
            username: $username,
            email: $email,
            password: $password
        },
        success: (data) => {
            localStorage.setItem('token',data)
            loginSuccess()
        },
        error: (err) => {
            start()
        }
    })
    loginSuccess()
})

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