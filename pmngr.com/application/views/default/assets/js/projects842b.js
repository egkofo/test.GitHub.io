
$(document).ready(function(){ 
        


        $(document).on("submit",'#add_timepoint',function(event){ 

                event.preventDefault();

                var form = $("#add_timepoint");

                var time_title = form.find("#time_title").val();                                
                var time_desc = form.find("#time_desc").val();                                                         
                var time_type = form.find("#time_type").val();                                                         
                var time_timestamp = form.find("#time_timestamp").val();                                                         
                var project_id = form.find("#project_id").val();                                                         

                if(time_title && time_desc && time_type && time_timestamp && project_id){

                    form.find(".disable_me").attr("disabled",true); 

                    form.find(".errors").slideUp();

                    form.find("#submit_button").find(".loading-icon").removeClass("fa-plus").addClass("fa-spin fa-refresh");                

                    $.post("company/projects/submit_timepoint", { 
                            time_title : time_title ,
                            time_desc : time_desc ,
                            time_type : time_type,
                            time_timestamp:time_timestamp,
                            project_id : project_id,
                            ajax : 1,
                            csrf_token : csrf_token  
                        }, function(my_data) {  

                            var data = jQuery.parseJSON(my_data);                        

                            if(data.status == "ok"){                                                    
                                form.find(".errors").removeClass("alert-danger").addClass("alert-success").html('<i class="fa fa-check"></i> تم اضافة النقطة الزمنية بنجاح , يمكنك إضافة المزيد').slideDown(200);
                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-plus");
                                $("#timeline_points").append(data.data);
                                form.find(".req_field").val(""); 
                                $('.single_timepoint').tsort({attr:'time'});
                                
                                $("#timeline_points").find(".no-items").remove();

                            }else if(data.status == "error"){                        
                                form.find(".errors").html(data.data).slideDown(200);
                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-times");
                            }

                            form.find(".disable_me").attr("disabled",false);                             

                    });


                }

        });        






        $(document).on("submit",'#save_document',function(event){ 

                event.preventDefault();

                var form = $("#save_document");

                var doc_title = form.find("#doc_title").val();                                
                var doc_text = form.find("#doc_text").val();                                                         
                var doc_id = form.find("#doc_id").val();                                                         

                if(doc_title && doc_id){

                    form.find(".disable_me").attr("disabled",true); 

                    form.find(".errors").slideUp();

                    form.find("#submit_button").find(".loading-icon").removeClass("fa-save").addClass("fa-spin fa-refresh");                

                    $.post("company/projects/save_document", { 
                            doc_title : doc_title ,
                            doc_text : doc_text ,
                            doc_id : doc_id,
                            ajax : 1,
                            csrf_token : csrf_token  
                        }, function(my_data) {  

                            var data = jQuery.parseJSON(my_data);                        

                            if(data.status == "ok"){                                                    
                                form.find(".errors").removeClass("alert-danger").addClass("alert-success").html('<i class="fa fa-check"></i> تم حفظ المستند بنجاح').slideDown(200);
                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-save");

                            }else if(data.status == "error"){                        
                                form.find(".errors").html(data.data).slideDown(200);
                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-times");
                            }

                            form.find(".disable_me").attr("disabled",false);                             

                    });


                }

        });        






        $(document).on("submit",'#add_expense',function(event){ 

                event.preventDefault();

                var form = $("#add_expense");

                var exp_title = form.find("#exp_title").val();                                
                var exp_details = form.find("#exp_details").val();                                                         
                var exp_amount = form.find("#exp_amount").val();                                                         
                var exp_date = form.find("#exp_date").val();                                                         
                var project_id = form.find("#project_id").val();                                                         
                var currency = form.find("#currency").val();                                                         

                if(exp_title && exp_details && exp_amount && exp_date && project_id && currency){

                    form.find(".disable_me").attr("disabled",true); 

                    form.find(".errors").slideUp();

                    form.find("#submit_button").find(".loading-icon").removeClass("fa-plus").addClass("fa-spin fa-refresh");                

                    $.post("company/projects/submit_expense", { 
                            exp_title : exp_title ,
                            exp_details : exp_details ,
                            exp_amount : exp_amount,
                            exp_date : exp_date,
                            project_id : project_id,
                            currency : currency,
                            ajax : 1,
                            csrf_token : csrf_token  
                        }, function(my_data) {  

                            var data = jQuery.parseJSON(my_data);                        

                            if(data.status == "ok"){                                                    
                                $("#expenses").find(".no-items").remove();
                                $(data.data).hide().appendTo("#expenses").fadeIn(500);
                                $("#total_amount").html(data.total_amount);
                                form.find(".errors").removeClass("alert-danger").addClass("alert-success").html('<i class="fa fa-check"></i> تم الحفظ بنجاح , يمكنك إضافة بند جديد').slideDown(200);
                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-plus");                                

                                $(".req_field").val("");

                            }else if(data.status == "error"){                        
                                form.find(".errors").html(data.data).slideDown(200);
                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-times");
                            }

                            form.find(".disable_me").attr("disabled",false);                             

                    });


                }

        });        


        $(document).on("click",'#update_deps',function(event){ 

                var form = $("#edit_project_deps");

                var branches = form.find("#branches").val();                                                         
                var project_id = form.find("#project_id").val();                                                         

                if(branches && project_id){

                    form.find(".disable_me_1").attr("disabled",true); 

                    form.find(".errors").slideUp();

                    form.find("#update_deps").find(".loading-icon").addClass("fa-refresh fa-spin").removeClass("chevron-left");

                    $.post("company/projects/get_deps_by_branches", { 
                            branches : branches,
                            project_id : project_id,
                            ajax : 1,
                            csrf_token : csrf_token  
                        }, function(my_data) {  

                            var data = jQuery.parseJSON(my_data);                        

                            if(data.status == "ok"){                                                    
                                $("#deps").html(data.data);
                                form.find(".disable_me_2").attr("disabled",false);                                 
                            }else if(data.status == "error"){                        
                                form.find(".errors").html(data.data).slideDown(200);                                
                            }

                            form.find("#update_deps").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("chevron-left");                            

                    });


                }

        });  

        $(document).on("click",'#edit_branches',function(event){ 

                var form = $("#edit_project_deps");

                form.find(".disable_me_1").attr("disabled",false);                                    

                form.find(".disable_me_2").attr("disabled",true);                                    

        });



        $(document).on("submit",'#edit_project_deps',function(event){ 

                event.preventDefault();

                var form = $("#edit_project_deps");

                var branches = form.find("#branches").val();                                
                var deps = form.find("#deps").val();
                var project_id = form.find("#project_id").val();                                                         

                if(branches && project_id){

                    form.find(".disable_me_1 ,.disable_me_2").attr("disabled",true); 

                    form.find(".errors").slideUp();

                    form.find("#submit_button").find(".loading-icon").removeClass("fa-save").addClass("fa-spin fa-refresh");                

                    $.post("company/projects/edit_deps", { 
                            branches : branches ,
                            deps : deps ,
                            project_id : project_id,
                            ajax : 1,
                            csrf_token : csrf_token  
                        }, function(my_data) {  

                            var data = jQuery.parseJSON(my_data);                        

                            if(data.status == "ok"){                                                    
                                form.find(".errors").removeClass("alert-danger").addClass("alert-success").html('<i class="fa fa-check"></i> تم الحفظ بنجاح , جارى تحديث الصفحة').slideDown(200);
                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-save");                                
                                setTimeout("location.href='"+base_url+"company/projects/show_project/"+project_id+"/deps'", 1000);

                            }else if(data.status == "error"){                        
                                form.find(".errors").html(data.data).slideDown(200);
                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-times");
                            }

                            form.find(".disable_me").attr("disabled",false);                             

                    });


                }

        });          




        $(document).on("submit",'#enrol_employee',function(event){ 

                event.preventDefault();

                var form = $("#enrol_employee");

                var relu_u_id = form.find("#relu_u_id").val();                                
                var relu_title = form.find("#relu_title").val();                                                         
                var project_id = form.find("#project_id").val();                                                         

                if(relu_u_id && project_id){

                    form.find(".disable_me").attr("disabled",true); 

                    form.find(".errors").slideUp();

                    form.find("#submit_button").find(".loading-icon").removeClass("fa-plus").addClass("fa-spin fa-refresh");                

                    $.post("company/projects/enrol_employee", { 
                            relu_u_id : relu_u_id ,
                            relu_title : relu_title ,
                            project_id : project_id,
                            ajax : 1,
                            csrf_token : csrf_token  
                        }, function(my_data) {  

                            var data = jQuery.parseJSON(my_data);                        

                            if(data.status == "ok"){                                                    
                                form.find(".errors").removeClass("alert-danger").addClass("alert-success").html('<i class="fa fa-check"></i> تم اضافة الموظف بنجاح').slideDown(200);
                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-plus");
                                form.find("#relu_title").val("");
                                $('#company_employees tr:last').after(data.data);
                                $("#relu_u_id option[value='"+relu_u_id+"']").each(function(){ $(this).remove(); });                                
                            }else if(data.status == "error"){                        
                                form.find(".errors").html(data.data).slideDown(200);
                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-times");
                            }

                            form.find(".disable_me").attr("disabled",false);                             

                    });


                }

        });      



        
        
    $(document).on("submit",'#submit_chat_room',function(event){ 

        event.preventDefault();

        var form = $("#submit_chat_room");

        var mem_u_ids = form.find("#mem_u_ids").val();                                
        var room_title = form.find("#room_title").val();                                                         
        var room_subject = form.find("#room_subject").val();                                                         
        var project_id = form.find("#project_id").val();                                                         
             
        if(mem_u_ids && room_title && project_id){

            form.find(".disable_me").attr("disabled",true); 

            form.find(".errors").slideUp();

            form.find("#submit_button").find(".loading-icon").removeClass("fa-plus").addClass("fa-spin fa-refresh");                

            $.post("company/chat/submit_room", { 
                mem_u_ids : mem_u_ids ,
                room_title : room_title ,
                room_subject : room_subject,
                project_id : project_id,
                ajax : 1,
                csrf_token : csrf_token  
                }, function(my_data) {  

                    var data = jQuery.parseJSON(my_data);                        

                    if(data.status == "ok"){                                                    
                        form.find(".errors").removeClass("alert-danger").addClass("alert-success").html('<i class="fa fa-check"></i> تم تفعيل قناة التواصل بنجاح , جارى إعادة التحويل').slideDown(200);
                        form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-plus");
                        setTimeout("location.href='"+base_url+"company/chat/show_room/"+data.room_id+"'", 1000);
                    }else if(data.status == "error"){                        
                        form.find(".errors").html(data.data).slideDown(200);
                        form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-times");
                        form.find(".disable_me").attr("disabled",false);                             
                    }

            });


        }

    });           
        



});        