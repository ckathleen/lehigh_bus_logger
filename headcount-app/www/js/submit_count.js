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
                   'full': $('#yes').val()
                  };
        console.log(JSON.stringify(data));
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: "json"
            
        })
        .done(function(data){
                console.log(data);
                
                //clear form
                $('#location').val('');
                $('#boarded').val('');
                $('#departed').val('');
                $('#yes').val('');
                $('#no').val('');
        })
        .fail(function(data){
            console.log('ajax request failed');
            $(formMessages).text('Ajax request failed');
        });
})
});

