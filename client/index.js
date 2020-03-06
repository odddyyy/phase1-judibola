function start() {
    let token = localStorage.getItem('token')
    
    if (token) {
        $(document).ready(() => {
            $('#register').hide()
            $('#forum-betting').hide()
            $('#login').hide()
            $('#edit-form').hide()
            $('#matches-list').show()
        })
    } else {
        $('#register').hide()
        $('#matches-list').hide()
        $('#forum-betting').hide()
        $('#edit-form').hide()
        $('#login').show()
    }
}

function registerSuccess() {
    $('#register').hide()
    $('#forum-betting').hide()
    $('#matches-list').hide()
    $('#edit-form').hide()
    $('#login').show()
}

function loginSuccess() {
    $('#register').hide()
    $('#forum-betting').hide()
    $('#login').hide()
    $('#edit-form').hide()
    $('#matches-list').show()
    // $.ajax({
    //     headers: { 'X-Auth-Token': '2802184ee02149db8db662c465d15214' },
    //     url: `http://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED`,
    //     dataType: `json`,
    //     type: `GET`,
    //   }).done(function(response) {
    //     $('#table-list').empty()
    //     for (let i = 0 ; i < 10 ; i++) {
    //         let x = response.matches[i].utcDate.split(`T`)
    //         x.pop()
    //         $('#table-list').append(`
    //         <tr>    
    //         <td>${response.matches[i].homeTeam.name} vs ${response.matches[i].awayTeam.name} on ${x} </td>
    //         </tr>
    //         `)
    //     }
    //   });
}

$('#btn-register').on('click', function(){
    $('#forum-betting').hide()
    $('#login').hide()
    $('#matches-list').hide()
    $('#edit-form').hide()
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

$('#edit-user').on('click', function(){
    $('#forum-betting').hide()
    $('#login').hide()
    $('#matches-list').hide()
    $('#register').hide()
    $('#edit-form').show()
    // $.ajax({
    //     method : 'GET',

    //     success
    //     edit()
    // })
})

function edit(id){

}

$('#btn-edit').on('submit', function(){

})

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/user/googleSign',
        data: {
            token : id_token
        },
        success : (token)=>{
            localStorage.setItem('token', token)
            loginSuccess()
        }
    })
}

function signOut() {
    localStorage.removeItem('token')
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    start()
  }

start()