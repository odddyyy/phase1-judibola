(function(){
    const listViews={
        login:'/login.html',
        register:'/register',
        fixture:'/fixture'
    }
    const viewsCache={};

    var token=localStorage.getItem('token');
    var $app=$('#app');

    window.loadPage=function(page){
        if(viewsCache[page]){
            $app.html(viewsCache[page])
        }
        else{
            $.get('/'+page+'.html').done(function(html){
                $app.html(html);
                viewsCache[page]=html;
            }).fail(function(){
                alert('Ada error');
            })
        }
    }

    $(document).on('submit','form',function(event){
        event.preventDefault();
    });

    function init(){
        if(!token){
            loadPage('login');
        }
    }

    window.renderGoogleButton=function(){
        gapi.signin2.render('g-signin', {
            'scope': 'profile email',
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'light',
            'onsuccess': onGoogleSuccess,
            'onfailure': onGoogleFailure
        });
    }

    function onGoogleSuccess(){
        
    }

    function onGoogleFailure(){

    }

    init();
})()