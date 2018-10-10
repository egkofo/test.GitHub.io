$(document).ready(function(){

        $( '.editor' ).ckeditor();

        $(document).on("submit",'form',function(event){ 
                $('.editor').each(function() {
                        var name = $(this).attr('name');
                        CKEDITOR.instances[name].updateElement();
                });                  
        });

        $.fn.modal.Constructor.prototype.enforceFocus = function() {
            modal_this = this
            $(document).on('focusin.modal', function (e) {
                    if (
                        modal_this.$element[0] !== e.target && !modal_this.$element.has(e.target).length 
                        && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_select') 
                        && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_text')
                        && !$(e.target.parentNode).hasClass('cke_dialog_ui_input_textarea')
                        && $(e.target.parentNode).hasClass('cke_contents cke_reset')                        
                    ) {

                        modal_this.$element.focus()
                    }
            })
        };              

});