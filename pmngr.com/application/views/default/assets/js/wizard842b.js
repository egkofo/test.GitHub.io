$(document).ready(function(){ 
        

        $(document).on("submit",'#wizard_personal_form',function(event){ 

                event.preventDefault();

                var form = $("#wizard_personal_form");

                var firstname = form.find("#firstname").val();                                                         
                var lastname = form.find("#lastname").val();                                                         
                var country = form.find("#country").val();                                
                var mobile = form.find("#mobile").val();                                                         
                var birthdate = form.find("#birthdate").val();                                                         
                var gender = form.find("#gender").val();                                                         

                if(firstname && lastname && country && mobile && birthdate && gender){

                    form.find(".errors").slideUp();

                    form.find("#submit_button").find(".loading-icon").removeClass("fa-arrow-left").addClass("fa-spin fa-refresh");                

                    $.post("company/wizard/personal_update", { 
                            firstname : firstname,        
                            lastname : lastname,    
                            country : country ,
                            mobile : mobile ,
                            birthdate : birthdate ,
                            gender : gender,
                            ajax : 1,
                            csrf_token : csrf_token  
                        }, function(data) {                                                                                         
                                  //alert(data);
                            if(data == 1){

                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-check");                                                
                                form.find(".errors").removeClass("alert-danger").addClass("alert-success").html('<i class="fa fa-check"></i> تم حفظ البيانات , جارى الإنتقال للخطوة التالية').slideDown(200);                                
                                setTimeout("location.href='"+base_url+"company/wizard'", 1000); 

                            }else{                           
                                form.find(".errors").html(data).slideDown(200);
                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-times");                                                
                            }

                    });


                }

        });        





        $(document).on("submit",'#wizard_company_form',function(event){ 

                event.preventDefault();

                var form = $("#wizard_company_form");

                var company_name = form.find("#company_name").val();                                                         
                var company_desc = form.find("#company_desc").val();                                                         
                var established = form.find("#established").val();                                
                var country = form.find("#country").val();                                                         
                var currency = form.find("#company_currency").val();                                                         
                var password = form.find("#password").val();                                                         

                if(company_name && company_desc && established && country ){

                    form.find(".errors").slideUp();

                    form.find("#submit_button").find(".loading-icon").removeClass("fa-arrow-left").addClass("fa-spin fa-refresh");                

                    $.post("company/wizard/company_update", { 
                            company_name : company_name,        
                            company_desc : company_desc,    
                            established : established ,
                            currency : currency,
                            country : country ,
                            password : password,
                            ajax : 1,
                            csrf_token : csrf_token  
                        }, function(data) {                                                                                         

                            if(data == 1){

                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-check");                                                
                                form.find(".errors").removeClass("alert-danger").addClass("alert-success").html('<i class="fa fa-check"></i> تم حفظ البيانات , جارى الإنتقال للخطوة التالية').slideDown(200);                                
                                setTimeout("location.href='"+base_url+"company/wizard'", 1000); 

                            }else{                           
                                form.find(".errors").html(data).slideDown(200);
                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-times");                                                
                            }

                    });


                }

        });     




        $(document).on("submit",'#wizard_branches_form',function(event){ 
                
                event.preventDefault();

                var form = $("#wizard_branches_form");

                var branch_title = form.find("#branch_title").val();                                                         
                var branch_address = form.find("#branch_address").val();                                                         

                if(branch_title ){                                                                             

                    form.find("#branch_title").attr("disabled",true); 
                    form.find("#branch_address").attr("disabled",true); 

                    form.find(".errors").slideUp();

                    form.find("#submit_button").find(".loading-icon").removeClass("fa-plus").addClass("fa-spin fa-refresh");                

                    $.post("company/wizard/branch_submit", { 
                            branch_title : branch_title,        
                            branch_address : branch_address,
                            ajax : 1,
                            csrf_token : csrf_token  
                        }, function(my_data) {                                                                                         

                            var data = jQuery.parseJSON(my_data);

                            if(data.status == "ok"){

                                form.find("#branch_title").val(""); 
                                form.find("#branch_address").val("");

                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-plus");
                                $("#wizard4_branches_container").find(".no-content").remove();
                                $(data.data).hide().appendTo("#wizard4_branches_container").fadeIn(500);

                            }else if(data.status == "error"){

                                form.find(".errors").html(data.data).slideDown(200);
                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-times");

                            }

                            form.find("#branch_title").attr("disabled",false); 
                            form.find("#branch_address").attr("disabled",false);                            

                    });


                }

        });   




        $(document).on("click",'.wizard_delete_branch',function(event){

                var branch_id = $(this).attr("my_id");

                $.post("company/wizard/branch_delete", { 
                        branch_id : branch_id,        
                        ajax : 1,
                        csrf_token : csrf_token  
                    }, function(data) {  

                        if(data == 1){                        
                            $("#wiz_branch_"+branch_id).remove()                                            
                        }else{
                            alert("خطأ فى عملية الحذف");
                        }

                });


        });





        $(document).on("submit",'.wizard_dep_form',function(event){ 

                event.preventDefault();

                var form = $(this);

                var dep_title = form.find("#dep_title").val();                                                         
                var dep_desc = form.find("#dep_desc").val();                                                         
                var dep_parent_id = form.find("#dep_parent_id").val();                                               
                var dep_branch_id = form.find("#dep_branch_id").val();                                                                         

                if(dep_title && dep_branch_id ){                                                                             


                    form.find(".errors").slideUp();
                    //form.find("#submit_button").attr("disabled",true); 
                    form.find("#submit_button").find(".loading-icon").removeClass("fa-plus").addClass("fa-spin fa-refresh");                

                    $.post("company/wizard/dep_submit", { 
                            dep_title : dep_title,        
                            dep_desc : dep_desc,
                            dep_parent_id : dep_parent_id,
                            dep_branch_id : dep_branch_id,
                            ajax : 1,
                            csrf_token : csrf_token  
                        }, function(my_data) {                                                                                         

                            //form.find(".errors").html(my_data).show();

                            var data = jQuery.parseJSON(my_data);

                            //alert(data.data);

                            if(data.status == "ok"){

                                form.find("#dep_title").val(""); 
                                form.find("#dep_desc").val("");

                                if(data.type == "parent"){                                                                 
                                    $(data.data).hide().appendTo("#branch_"+dep_branch_id).fadeIn(500);                                                                         
                                    form.find("#dep_parent_id").append('<option value="'+data.dep_id+'">فرعى من : '+dep_title+'</option>');                                                                        
                                }else if(data.type == "child"){                                                                                                            
                                    $(data.data).hide().appendTo("#children_of_"+dep_parent_id).fadeIn(500);                                     
                                }

                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-plus");
                                $("#branch_"+dep_branch_id).find(".no-content").remove();                                

                            }else if(data.status == "error"){

                                form.find(".errors").html(data.data).slideDown(200);
                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-times");

                            }

                            form.find("#submit_button").attr("disabled",false); 

                    });


                }

        });   



        $(document).on("click",'.wizard_delete_dep',function(event){

                var item = $(this);                
                var dep_id = item.attr("my_id");                
                item.find(".loading-icon").removeClass("fa-trash-o").addClass("fa-spin fa-refresh");

                var x = window.confirm("سيتم حذف القسم و أى أقسام تابعه له ,هل أنت متأكد ؟")                
                if (x){                                 
                    $.post("company/wizard/delete_dep", { 
                            dep_id : dep_id,        
                            ajax : 1,
                            csrf_token : csrf_token  
                        }, function(my_data) {  

                            var data = jQuery.parseJSON(my_data);                        

                            if(data.status == "ok"){                        

                                if(data.type == "parent"){                        
                                    $("#dep_"+dep_id).remove();
                                }else if(data.type == "child"){                        
                                    $("#child_"+dep_id).remove();
                                }                        

                            }else if(data.status == "error"){                        
                                alert("خطأ فى عملية الحذف");
                                item.find(".loading-icon").addClass("fa-trash-o").removeClass("fa-spin fa-refresh");                            
                            }                            
                    });

                }
        });


        $(document).on("click",'.add_new_employee',function(event){

                var item = $(this);

                item.find("i").removeClass("fa-plus").addClass("fa-spin fa-refresh");

                var rank = item.attr("rank");

                $.post("company/wizard/new_employee_form", { 
                        rank : rank,        
                        ajax : 1,
                        csrf_token : csrf_token  
                    }, function(data) {  

                        $("#add_employee_modal").html(data).modal('show');

                        item.find("i").addClass("fa-plus").removeClass("fa-spin fa-refresh");

                });            


        });







        $(document).on("submit",'#wizard_add_employee',function(event){ 

                event.preventDefault();

                var form = $("#wizard_add_employee");

                var firstname = form.find("#firstname").val();                                                         
                var lastname = form.find("#lastname").val();                                                         
                var email = form.find("#email").val();                                                         
                var deps_ids = form.find("#deps_ids").val();                                                         
                var branches_ids = form.find("#branches_ids").val();                                                         
                var rank = form.find("#rank").val();                                                         

                if(firstname && lastname && email && rank ){                                                                             

                    form.find(".disable_me").attr("disabled",true); 

                    form.find(".errors").slideUp();

                    form.find("#submit_button").find(".loading-icon").addClass("fa-spin fa-refresh");                

                    $.post("company/wizard/employee_submit", { 
                            firstname : firstname,        
                            lastname : lastname,        
                            email : email,        
                            deps_ids : deps_ids,        
                            branches_ids : branches_ids,        
                            rank : rank,        
                            ajax : 1,
                            csrf_token : csrf_token  
                        }, function(my_data) {                                                                                         

                            var data = jQuery.parseJSON(my_data);

                            if(data.status == "ok"){

                                form.find(".form-control").val(""); 

                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh");

                                $("#"+rank+"_row").find(".no-content").remove();

                                $(data.data).hide().appendTo("#"+rank+"_row").fadeIn(500);

                            }else if(data.status == "error"){

                                form.find(".errors").html(data.data).slideDown(200);
                                form.find("#submit_button").find(".loading-icon").removeClass("fa-spin fa-refresh").addClass("fa-times");

                            }

                            form.find(".disable_me").attr("disabled",false); 

                    });


                }

        });   





        $(document).on("click",'.wizard_delete_employee',function(event){

                var item = $(this);                
                var employee_id = item.attr("my_id");                
                item.find(".loading-icon").removeClass("fa-trash-o").addClass("fa-spin fa-refresh");

                var x = window.confirm("هل أنت متأكد ؟")                
                if (x){                                 
                    $.post("company/wizard/delete_employee", { 
                            employee_id : employee_id,        
                            ajax : 1,
                            csrf_token : csrf_token  
                        }, function(my_data) {  

                            var data = jQuery.parseJSON(my_data);                        

                            if(data.status == "ok"){                        

                                $("#employee_"+employee_id).remove();

                            }else if(data.status == "error"){                        
                                alert("خطأ فى عملية الحذف");
                                item.find(".loading-icon").addClass("fa-trash-o").removeClass("fa-spin fa-refresh");                            
                            }                            
                    });

                }else{
                    item.find(".loading-icon").addClass("fa-trash-o").removeClass("fa-spin fa-refresh");                            
                }
        });


});