(function(){
    const listViews={
        login:'/login.html',
        register:'/register',
        fixture:'/fixture'
    }
    const viewsCache={};
    

    var token=localStorage.getItem('token');
    var $app=$('#app');
    var currPage='';

    function renderPage(page){
        $app.html(viewsCache[page]);
        currPage='login';
    }

    window.loadPage=function(page){
        if(viewsCache[page]){
           renderPage(page);
        }
        else{
            $.get('/'+page+'.html').done(function(html){
                viewsCache[page]=html;
                renderPage(page);
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
        if(currPage!=='login')
            return;
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