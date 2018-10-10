function colorize_req_fields(){

    $(".req_field").each(function( index ){

        if( $(this).val() && $(this).val() != "__placeholder" ){
            $(this).removeClass("red_border").addClass("green_border");
        }else{
            $(this).removeClass("green_border").addClass("red_border");
        }

    });

}

$(document).ready(function(){

    $(".check_submit").submit(function(event){

        var my_form = $(this);

        var error = false;

        my_form.find(".req_field").each(function( index ){

            if(!$(this).val() || $(this).val() == "__placeholder" ){                
                error = true;
                
                //alert($(this).attr("id"));
                
            }                                    

        });
            
        if(error == false){

            if(my_form.attr("release") == "true"){
                return true;
            }else{                
                event.preventDefault();   
            }
            
        }else{           
            
            $('#error_fill_all').modal('show');
            
            event.preventDefault();
        }                

    });

    colorize_req_fields();

    $(document).on("focusout keyup mouseout",'.req_field', function(){                              
        colorize_req_fields();  
    });

});