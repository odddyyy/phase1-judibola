$(document).ready(()=> {
    // console.log('jalanin first')
     var token = localStorage.getItem('token')
    if (token) {
        startTrue()
        // $(document).ready(() => {
            // getMatch()
            // $('#edit-user').show()
            // $('#register').hide()
            // $('#forum-betting').hide()
            // $('#login').hide()
            // $('#edit-form').hide()
            // $('#matches-list').show()
            // $('#btn-signout').show()
        // })
    } else {
        startFalse()
        // $('#btn-signout').hide()
        // $('#edit-user').hide()
        // $('#register').hide()
        // $('#matches-list').hide()
        // $('#forum-betting').hide()
        // $('#edit-form').hide()
        // $('#login').show()
    }
})

function startTrue() {
    getMatch()
            $('#edit-user').show()
            $('#register').hide()
            $('#forum-betting').hide()
            $('#login').hide()
            $('#edit-form').hide()
            $('#matches-list').show()
            $('#btn-signout').show()
}

function startFalse() {
    $('#btn-signout').hide()
        $('#edit-user').hide()
        $('#register').hide()
        $('#matches-list').hide()
        $('#forum-betting').hide()
        $('#edit-form').hide()
        $('#login').show()
}
// function start() {
//     // let token = localStorage.getItem('token')
//     // console.log(token)
//     if (token) {
//         // $(document).ready(() => {
//             getMatch()
//             $('#edit-user').show()
//             $('#register').hide()
//             $('#forum-betting').hide()
//             $('#login').hide()
//             $('#edit-form').hide()
//             $('#matches-list').show()
//         // })
//     } else {
//         $('#btn-signout').hide
//         $('#edit-user').hide()
//         $('#register').hide()
//         $('#matches-list').hide()
//         $('#forum-betting').hide()
//         $('#edit-form').hide()
//         $('#login').show()
//     }
// }

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
    $('#edit-user').show()
    $('#matches-list').show()
    $('#btn-signout').show()
    getMatch()
    
}

function getMatch () {
    $.ajax({
        headers: { 'X-Auth-Token': '2802184ee02149db8db662c465d15214' },
        url: `http://api.football-data.org/v2/competitions/PL/matches?status=SCHEDULED`,
        dataType: `json`,
        type: `GET`,
      }).done(function(response) {
        $('#table-list').empty()
        for (let i = 0 ; i < 10 ; i++) {
            let x = response.matches[i].utcDate.split(`T`)
            x.pop()
            $('#table-list').append(`
            <tr>    
            <td>${response.matches[i].homeTeam.name} vs ${response.matches[i].awayTeam.name} on ${x} </td>
            </tr>
            `)
        }
      });
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
        error: (response) => {
            $('#err-register').text(response.responseJSON)
            startFalse()
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
            console.log(`sukses login`)
            localStorage.setItem('token', data.token)
            loginSuccess()
        },
        error: (response) => {
            // start()
            $('#error-text').text(response.responseJSON.msg)
            // console.log(`masuk error`)
            // console.log()
        }
    })
    // loginSuccess()
})

$('#edit-user').on('click', function(){
    $('#forum-betting').hide()
    $('#login').hide()
    $('#matches-list').hide()
    $('#register').hide()
    $('#edit-form').show()
})

$('#btn-edit').on('submit', function(event){
    event.preventDefault()
    let $username = $('#username-edit').val()
    $.ajax({
        method : 'PUT',
        url : 'http://localhost:3000/user/edit',
        headers : {
            token : localStorage.getItem('token')
        },
        data:{
            username : $username
        },
        success : () =>{
            console.log('update success')
            // start()
            startTrue()
        }
    })
})

$('#btn-delete').on('click', function(event){
    event.preventDefault()
    $.ajax({
        method : 'DELETE',
        url : 'http://localhost:3000/user/delete',
        headers : {
            token : localStorage.getItem('token')
        },
        success : () =>{
            console.log('delete success')
            signOut()
            // start()
        }
    })
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
            $('#edit-user').show()
            loginSuccess()
        },
        error : (response)=>{
            console.log(response.responseJSON)
        }
    })
}

function signOut() {
    localStorage.removeItem('token')
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    startFalse()
    // start()
  }

// start()