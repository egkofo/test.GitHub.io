

$(document).ready(function(){ 






    var no_more = false;
    $(document).on("click",'.load_more_project_tasks',function(event){ 

        var project_id = $("#project_id").val();                                                         
        var show_hidden = $("#show_hidden").val();                                                         
        

        var last_task_id = $('.single_task:last').attr("my_id");

        if(no_more == false){

            $(".load_more_project_tasks").find(".loading-icon").addClass("fa-spin");

            $.post("company/tasks/show_more_project_tasks", { 
                last_task_id : last_task_id ,
                project_id : project_id,
                show_hidden : show_hidden,
                ajax : 1,
                csrf_token : csrf_token  
                }, function(my_data) {  

                    var data = jQuery.parseJSON(my_data);                        

                    if(data.status == "ok"){                                                                                    
                        $(data.data).hide().appendTo(".tasks_container").fadeIn(500);                                
                        $(".load_more_project_tasks").find(".loading-icon").removeClass("fa-spin");
                        $("[rel=tooltip]").tooltip();
                    }else if(data.status == "no_more"){                        
                        $(".load_more_project_tasks").html('لا يوجد المزيد');
                        no_more = true;
                    }

                    $('.timeago').cuteTime({ refresh: 1000*20 });        


            });

        }

    });   





    $(document).on("submit",'#save_task_drafts',function(event){ 

        event.preventDefault();

        var form = $("#save_task_drafts");

        var draft_text = form.find("#draft_text").val();                                
        var task_id = form.find("#task_id").val();                                                         
        var draft_id = form.find("#draft_id").val();                                                                                                            

        if(draft_text && task_id && draft_id){

            form.find(".disable_me").attr("disabled",true); 

            form.find(".errors").slideUp();

            form.find(".loading-icon").addClass("fa-spin fa-refresh");                

            $.post("company/tasks/save_task_drafts", { 
                draft_text : draft_text ,
                task_id : task_id ,
                draft_id : draft_id,
                ajax : 1,
                csrf_token : csrf_token  
                }, function(data) {  

                    if(data == 1){                                                    
                        form.find(".loading-icon").addClass("fa-check");
                    }else{                        
                        form.find(".loading-icon").removeClass("fa-check");
                        form.find(".errors").html('<i class="fa fa-times"></i> حدث خطأ أثناء حفظ المسودة').slideDown(200);
                    }

                    form.find(".loading-icon").removeClass("fa-spin fa-refresh");                            
                    form.find(".disable_me").attr("disabled",false);                             

            });


        }

    });   



    $(document).on("submit",'#submit_task_comment',function(event){ 

        event.preventDefault();

        var form = $("#submit_task_comment");

        var comment_text = form.find("#comment_text").val();                                
        
        var notif_method = form.find("#notif_method").val();                                                                 
        var task_id = form.find("#task_id").val();                                                                 
        var attachs_ids = form.find('[name="attach_id[]"]').serializeArray();                                                         
        
        if(!attachs_ids){
            attachs_ids = Array();
        }        

        if(comment_text && notif_method && task_id){

            form.find(".disable_me").attr("disabled",true); 

            form.find(".errors").slideUp();

            form.find("#submit_button").find(".loading-icon").removeClass("fa-comment").addClass("fa-spin fa-refresh");                

            $.post("company/tasks/submit_comment", { 
                comment_text : comment_text ,
                notif_method : notif_method ,
                task_id : task_id,
                attachs_ids : attachs_ids,
                ajax : 1,
                csrf_token : csrf_token  
                }, function(my_data) {  

                    var data = jQuery.parseJSON(my_data);                        

                    if(data.status == "ok"){                                                    
                        form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-comment");
                        $(data.data).hide().prependTo("#comments_container").fadeIn(500);
                        form.find("#comment_text").val("");
                        form.find("#form_attachments_container").html("");
                        form.find("#attach_ids_values").html("");
                        $("[rel=tooltip]").tooltip();
                        $('.timeago').cuteTime({ refresh: 1000*20 });        
                    }else if(data.status == "error"){                        
                        form.find(".errors").html('<i class="fa fa-times"></i> ليس لديك الصلاحيات للتعليق على هذا المحتوى').slideDown(200);
                        form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-times");                                
                    }

                    form.find(".disable_me").attr("disabled",false);                             

            });


        }

    });    




    $(document).on("submit",'#update_task_progress',function(event){ 

        event.preventDefault();

        var form = $("#update_task_progress");

        var progress = form.find("#progress").val();                                
        var task_id = form.find("#task_id").val();                                                         

        if(task_id){

            form.find(".disable_me").attr("disabled",true); 

            form.find(".errors").slideUp();

            form.find(".loading-icon").addClass("fa-spin");                

            $.post("company/tasks/update_progress", { 
                progress : progress ,
                task_id : task_id ,
                ajax : 1,
                csrf_token : csrf_token  
                }, function(data) {  
                    if(data == 1){                                                    
                        form.find(".loading-icon").removeClass("fa-refresh").addClass("fa-check");                
                    }else{                                                        
                        form.find(".errors").html('<i class="fa fa-times"></i> ليس لديك الصلاحية').slideDown(200);
                    }

                    form.find(".loading-icon").removeClass("fa-spin");

                    form.find(".disable_me").attr("disabled",false);                             

            });


        }

    });         







    $(document).on("click",'#task_process_timing',function(){ 
        var element = $(this);
        var task_id = element.attr("task_id");                                

        var stop_click = false;

        if(task_id > 0 && stop_click == false){

            element.attr("disabled",true);         

            element.find(".loading-icon").removeClass("fa-pause fa-play").addClass("fa-spin fa-refresh");                

            $.post("company/tasks/timing_process", { 
                task_id : task_id ,
                ajax : 1,
                csrf_token : csrf_token  
                }, function(my_data) {  

                    var data = jQuery.parseJSON(my_data);                        

                    if(data.status == "ok"){    

                        stop_click = true;
                        element.attr("disabled",false);

                        if(data.action == "play"){                        
                            location.reload(); 
                        }else if(data.action == "stop"){
                            $("#countup").remove();
                            $("#timing_id").val(data.timing_id);
                            $("#").modal('show');
                            $('#timing_achievements').modal({
                                show:true,
                                keyboard:false,
                                backdrop:'static'
                            });

                            $('#timing_achievements').on('shown.bs.modal', function (e) {                            
                                element.find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-check");                                                    
                            });

                        }

                    }                                                                 

            });


        }

    });   





    $(document).on("submit",'#submit_task_todo',function(event){ 

        event.preventDefault();

        var form = $("#submit_task_todo");

        var todo_text = form.find("#todo_text").val();                                
        var task_id = form.find("#task_id").val();                                                         

        if(todo_text && task_id){

            form.find(".disable_me").attr("disabled",true); 

            form.find(".errors").slideUp();

            form.find("#submit_button").find(".loading-icon").removeClass("fa-plus").addClass("fa-spin fa-refresh");                

            $.post("company/tasks/submit_todo", { 
                todo_text : todo_text ,
                task_id : task_id,
                ajax : 1,
                csrf_token : csrf_token  
                }, function(my_data) {  

                    var data = jQuery.parseJSON(my_data);                        

                    if(data.status == "ok"){                                                    
                        form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-plus");
                        $(data.data).hide().appendTo("#todos_container").fadeIn(500);
                        form.find("#todo_text").val("");
                    }else if(data.status == "error"){                        
                        form.find(".errors").html('<i class="fa fa-times"></i> ليس لديك الصلاحيات اللازمة').slideDown(200);
                        form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-times");                                
                    }

                    form.find(".disable_me").attr("disabled",false);                             

            });


        }

    });    




    $(document).on("click",'.todo_toggler',function(event){ 

        var todo_status = $(this);        
        var todo_id = todo_status.parent().attr("my_id");        
        var task_id = $("#task_id").val();

        var allow_toggle = true;

        if(allow_toggle == true){

            todo_status.find(".fa").addClass("fa-spin fa-refresh").removeClass("fa-check").removeClass("fa-clock-o");

            allow_toggle = false;

            $.post("company/tasks/toggle_todo", { 
                todo_id : todo_id ,
                task_id : task_id,
                ajax : 1,
                csrf_token : csrf_token  
                }, function(data) {  

                    if(data == "done"){                                                    
                        todo_status.parent().addClass("todo_done");
                        todo_status.find(".fa").removeClass("fa-spin fa-refresh").addClass("fa-check");
                    }else if(data == "undone"){                        
                        todo_status.parent().removeClass("todo_done");
                        todo_status.find(".fa").addClass("fa-clock-o").removeClass("fa-spin fa-refresh");
                    }

                    allow_toggle = true;

            });

        }

    });      








    $(document).on("submit",'#submit_task_expense',function(event){ 

        event.preventDefault();

        var form = $("#submit_task_expense");

        var expense_amount = form.find("#expense_amount").val();                                
        var expense_title = form.find("#expense_title").val();                                
        var expense_date = form.find("#expense_date").val();                                        
        var currency = form.find("#currency").val();                                        
        var task_id = form.find("#task_id").val();                                                         

        if(expense_amount && expense_title && task_id && currency){

            form.find(".disable_me").attr("disabled",true); 

            form.find(".errors").slideUp();

            form.find("#submit_button").find(".loading-icon").removeClass("fa-plus").addClass("fa-spin fa-refresh");                

            $.post("company/tasks/submit_expense", { 
                expense_amount : expense_amount ,
                expense_title : expense_title ,
                expense_date : expense_date,
                currency : currency,
                task_id : task_id,
                ajax : 1,
                csrf_token : csrf_token  
                }, function(my_data) {  

                    var data = jQuery.parseJSON(my_data);                        

                    if(data.status == "ok"){                                                    
                        form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-plus");
                        $(data.data).hide().appendTo("#expenses_container").fadeIn(500);                        
                        form.find(".reset_me").val("");
                    }else if(data.status == "error"){                        
                        form.find(".errors").html(data.data).slideDown(200);
                        form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-times");                                
                    }

                    form.find(".disable_me").attr("disabled",false);                             

            });


        }

    });    



    $(document).on('mouseenter', '.single_comment',  function(){
        $(this).find(".comment_edit_tools").show();
    }).on('mouseleave', '.single_comment', function() {
        $(this).find(".comment_edit_tools").hide();
    });       
    
    
    
    $(document).on("click",'.edit_comment',function(event){ 
        
        var item = $(this);

        var comment_id = item.attr("comment_id");
        
        $("#edited_comment_id").val(comment_id);
        
        var old_comment = $("#comment_text_"+comment_id).html();
        
        $("#edited_comment_text").val(old_comment);
        
        $('#edit_comment_modal').modal('show');
        
        
        
    });



    $(document).on("submit",'#update_task_comment',function(event){ 

        event.preventDefault();

        var form = $("#update_task_comment");

        var edited_comment_text = form.find("#edited_comment_text").val();                                
        var edited_comment_id = form.find("#edited_comment_id").val();                                                         

        if(edited_comment_text && edited_comment_id){

            form.find(".disable_me").attr("disabled",true); 

            form.find(".errors").slideUp();

            form.find("#submit_button").find(".loading-icon").removeClass("fa-comment").addClass("fa-spin fa-refresh");                

            $.post("company/tasks/update_comment", { 
                comment_text : edited_comment_text ,
                comment_id : edited_comment_id ,
                ajax : 1,
                csrf_token : csrf_token  
                }, function(my_data) {  

                    var data = jQuery.parseJSON(my_data);                        

                    if(data.status == "ok"){                                                    
                        form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-comment");                        
                        $("#comment_text_"+edited_comment_id).html(edited_comment_text);
                        $('#edit_comment_modal').modal('hide');
                    }else if(data.status == "error"){                        
                        form.find(".errors").html('<i class="fa fa-times"></i> خطأ أثناء تعديل التعليق , قم بتحديث الصفحة').slideDown(200);
                        form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-times");                                
                    }

                    form.find(".disable_me").attr("disabled",false);                             

            });

        }else{
            form.find(".errors").html('<i class="fa fa-times"></i> من فضلك قم بكتابة التعليق').slideDown(200);
            form.find(".disable_me").attr("disabled",false);
        }

    });      
    
    

    $(document).on("click",'.delete_comment',function(event){ 
        
        var item = $(this);
        
        var x = window.confirm("هل أنت متأكد ؟")                
        if (x){ 
                        
            var comment_id = item.attr("comment_id");
                    
            $.post("company/tasks/delete_comment", { 
                comment_id : comment_id ,
                ajax : 1,
                csrf_token : csrf_token  
                }, function(my_data) {  

                    var data = jQuery.parseJSON(my_data);                        

                    if(data.status == "ok"){                                                    
                        $("#comment_"+comment_id).slideUp(500);
                    }else{
                        alert("لا يمكن حذف هذا التعليق");
                    }

            });            
            
            
        }else{
            event.preventDefault();    
        }        

    });    

    
    var can_load = true;
    $(document).on("click",'.load-more-task-comments',function(event){ 
        
        if(can_load == true){
        
            can_load = false;
            
            var item = $(this);
            
            item.find(".loading-icon").addClass("fa-spin");
            
            var task_id = item.attr("task_id");
            var last_comment_id = $("#comments_container .single_comment:last").attr("comment_id");
            
            if(last_comment_id && task_id){
                    
                $.post("company/tasks/get_more_comments", { 
                    task_id : task_id,
                    last_comment_id : last_comment_id ,
                    ajax : 1,
                    csrf_token : csrf_token  
                    }, function(my_data) {  

                        var data = jQuery.parseJSON(my_data);                        

                        if(data.status == "success"){                                                    
                            $(data.data).hide().appendTo("#comments_container").fadeIn(500);
                            can_load = true;
                            $("[rel=tooltip]").tooltip();
                            $('.timeago').cuteTime({ refresh: 1000*20 });                                                                                            
                        }else{                            
                            if(data.data == "no_more"){
                                item.addClass("disabled").html("لا يوجد المزيد من التعليقات");    
                                can_load = false;
                            }else{
                                item.removeClass("btn-info").addClass("btn-danger").html(data.data);    
                                can_load = false;
                            }                                                    
                        }                        
                        
                        item.find(".loading-icon").removeClass("fa-spin");                        

                });       
            
            }else{
                item.removeClass("btn-info").addClass("btn-danger").html("هناك خطأ ما , يجب تحديث الصفحة");    
            }     
                        
        }
    });        
    


});                