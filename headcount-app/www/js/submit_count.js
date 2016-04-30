$(function() {
    
    var form = $('#form');
    var formMessages = $('#formMessages');
    
    // event listener for headcount form
    $(form).submit(function(event){
        // stop default form submission
        event.preventDefault();
        //var formData = $(form).serializeArray();
        //console.log(JSON.stringify(formData));
        // submit form
        var data = {'location': $('#location').val(),
                   'boarded': $('#boarded').val(),
                   'departed': $('#departed').val(),
                   'full': $('input[type="radio"]:checked').val()
                  };
        //console.log(JSON.stringify(data));
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: "json", 
            success: function(res){
                console.log(JSON.stringify(res));
                
                //clear form
                $('#location').val('');
                $('#boarded').val('');
                $('#departed').val('');
                $('input[name=bus_full]').prop('checked',false);
                //$('#yes').val('');
                //$('#no').val('');
                }
            
        })
        .fail(function(data){
            console.log('ajax request failed');
            $(formMessages).text('Ajax request failed');
        });
})
});

