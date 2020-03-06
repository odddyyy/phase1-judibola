(function(){

    var $listBtn=$('.list-btn');
    var $btnLogout=$('#btn-logout');
    var $mainNavbar=$('#main-navbar');
    var $editProfile=$('#btn-edit-profile');

    window.initNavbar=function(flag){
        if(flag){
            $listBtn.show();
            $mainNavbar.removeClass('col-sm-12');
            $mainNavbar.addClass('col-sm-10');
        }
        else{
            $listBtn.hide();
            $mainNavbar.removeClass('col-sm-10');
            $mainNavbar.addClass('col-sm-12');
        }
    }

    $editProfile.on('click',function(){
        loadPage('edit-profile')
    })

    $btnLogout.click(function(){
        loadPage('login')
        initNavbar(false);
    })

})()