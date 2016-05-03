$(function() {
    
    var form = $('#form');
    var formMessages = $('#formMessages');
    
    // event listener for headcount form
    $(form).submit(function(event){
        // stop default form submission
        event.preventDefault();
        // submit form
        var data = {'location': $('#location').val(),
                   'boarded': $('#boarded').val(),
                   'departed': $('#departed').val(),
                   'full': $('input[name="bus_full"]:checked').val(),
                   'vehicle_nbr': window.sessionStorage.getItem('vehicle_nbr')
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
                $('#location').val('');
                $('#boarded').val('');
                $('#departed').val('');
                $('input[name=bus_full]').prop('checked',false);
            }
        })
        .fail(function(data){
            console.log('ajax request failed');
            $(formMessages).text('Ajax request failed');
        });
    });
});

