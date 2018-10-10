
function play_notif(){
    $('#notif_sound')[0].play();
}


function adjust_height(){
    var min_h = ($(window).height() - 180);
    if(min_h < 100){min_h = 100;}
    $("#main-container").css("min-height",min_h+"px");
}


$(document).ready(function(){ 


    adjust_height();
    $(window).on("resize",function(){        
        adjust_height();
    });     


    // addin notification sound to body
    $('<audio id="notif_sound"><source src="'+base_url+'assets/notify/notify.ogg" type="audio/ogg"><source src="'+base_url+'assets/notify/notify.mp3" type="audio/mpeg"><source src="'+base_url+'assets/notify/notify.wav" type="audio/wav"></audio>').appendTo('body');


    $(".disable_me").attr("disabled",false);    

    //$('.timeago').timeago();

    $('.timeago').cuteTime({ refresh: 1000*20 });        

    $("[rel=tooltip]").tooltip();

    $('.popover-me').popover({trigger:"hover"});

    $(document).on("submit",'#login_form',function(event){ 

        event.preventDefault();

        var form = $("#login_form");

        var username = form.find("#username").val();                                
        var password = form.find("#password").val();                                                         

        if(username && password){

            form.find(".errors").slideUp();

            form.find("#submit_button").find(".loading-icon").addClass("fa-spin fa-refresh");                

            $.post("company/account/login_submit", { 
                username : username ,
                password : password ,
                ajax : 1,
                csrf_token : csrf_token  
                }, function(data) {                                                                                         

                    if(data == 1){

                        form.find(".errors").removeClass("alert-danger").addClass("alert-success").html('<i class="fa fa-check"></i> تم تسجيل الدخول بنجاح , جارى تحويلك').slideDown(200);
                        setTimeout("location.href='"+base_url+"'", 1000); 

                    }else{
                        form.find(".errors").html(data).slideDown(200);
                        form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-times");                                                
                    }

            });


        }


    });   




    $(document).on("submit",'#register_form',function(event){ 

        event.preventDefault();

        var form = $("#register_form");

        var username = form.find("#username").val();                                
        var password = form.find("#password").val();                                                         
        var repassword = form.find("#repassword").val();                                                         
        var email = form.find("#email").val();  
        var capatcha = grecaptcha.getResponse();
        var agree_on_terms = form.find("#agree_on_terms:checked").length;      

        if(agree_on_terms == 1){

            if(username && password && email){

                form.find(".errors").slideUp();

                form.find("#submit_button").find(".loading-icon").addClass("fa-spin fa-refresh");                

                $.post("company/account/register_submit", { 
                    username : username ,
                    password : password ,
                    repassword : repassword ,
                    email : email ,
                    agree_on_terms : agree_on_terms,
                    capatcha_ajax : capatcha,
                    ajax : 1,
                    csrf_token : csrf_token  
                    }, function(data) {                                                                                         

                        if(data == 1){

                            form.find(".errors").removeClass("alert-danger").addClass("alert-success").html('<i class="fa fa-check"></i> تم التسجيل بنجاح , من فضلك راجع بريدك من أجل تفعيل حسابك').slideDown(200);

                            form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh");                                                

                            //setTimeout("location.href='"+base_url+"'", 1000); 

                        }else{
                            form.find(".errors").html(data).slideDown(200);
                            form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-times");                                                
                        }

                });


            }

        }else{
            form.find(".errors").html('<i class="fa fa-times"></i> يجب الموافقة على الشروط و الأحكام').slideDown(200);
        }

    });        




    $(document).on("submit",'#join_form',function(event){ 

        event.preventDefault();

        var form = $("#join_form");

        var username = form.find("#username").val();                                
        var password = form.find("#password").val();                                                         
        var code = form.find("#code").val();                                                         
        var capatcha = grecaptcha.getResponse();

        var agree_on_terms = form.find("#agree_on_terms:checked").length;      

        if(agree_on_terms == 1){

            if(username && password && code){

                form.find(".errors").slideUp();

                form.find("#submit_button").find(".loading-icon").addClass("fa-spin fa-refresh");                

                $.post("company/account/join_submit", { 
                    username : username ,
                    password : password ,
                    code : code,
                    agree_on_terms : agree_on_terms,
                    capatcha_ajax : capatcha,
                    ajax : 1,
                    csrf_token : csrf_token  
                    }, function(data) {                                                                                         

                        if(data == 1){

                            form.find(".errors").removeClass("alert-danger").addClass("alert-success").html('<i class="fa fa-check"></i> تم الحفظ بنجاح , جارى تحويلك').slideDown(200);
                            setTimeout("location.href='"+base_url+"'", 1000); 

                        }else{
                            form.find(".errors").html(data).slideDown(200);
                            form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-times");                                                
                        }

                });


            }        

        }else{
            form.find(".errors").html('<i class="fa fa-times"></i> يجب الموافقة على الشروط و الأحكام').slideDown(200);
        }


    });        






    $(document).on("click",'.show_hiddenform',function(event){ 

        $(".hiddenform").slideToggle();

    });   


    $(function() {

        $(".print_now").click(function(){
            $("#print_me").print();
        });    

    });        




    $(document).on("click",'.delete_sure',function(event){ 

        var x = window.confirm("هل أنت متأكد ؟")                
        if (x){ 
            return true;
        }else{
            event.preventDefault();    
        }

    });        




    $( ".limited_chars" ).each(function( index ) {                    
        var current_lenght = $( this ).val().length;
        var max_chars = $( this ).attr("max_chars");
        var chars_counter = $( this ).attr("chars_counter");// id of the element where the count appears
        if(chars_counter){
            if(current_lenght) max_chars = max_chars - current_lenght;
            $("#"+chars_counter).html(max_chars);

            if(current_lenght > max_chars)
                $("#"+chars_counter).css("color","red");                
        }
    }); 

    $(".limited_chars").keydown(function(){

        var my_input = $(this);
        var max_chars = my_input.attr("max_chars");
        var chars_counter = my_input.attr("chars_counter");

        if(my_input.val().length > max_chars){
            my_input.val($(this).val().substr(0, max_chars));
        }
        var remaining = max_chars -  my_input.val().length;
        $("#"+chars_counter).html(remaining);
        if(remaining <= 10){
            $("#"+chars_counter).css("color","red");
        }else{
            $("#"+chars_counter).css("color","black");
        }

    });           



});