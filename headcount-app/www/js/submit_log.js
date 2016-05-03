$(function() {
    
    var form = $('#start_log');
    var formMessages = $('#formMessages');
    
    // event listener for headcount form
    $(form).submit(function(event){
        // stop default form submission
        event.preventDefault();
        // submit form
        var data = {'driver_name': $('#driver_name').val(),
                   'vehicle_nbr': $('#vehicle_nbr').val(),
                   'starting_mileage': $('#starting_mileage').val(),
                   'route': $('input[name="route"]:checked').val()
                  };
        console.log(JSON.stringify(data));
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: "json", 
            success: function(res){
                console.log(JSON.stringify(res));
                sessionStorage.setItem("vehicle_nbr", res.vehicle_nbr);
                $.afui.loadContent("#main",false,false,"pop");
            }
        })
        .fail(function(data){
            console.log('ajax request failed');
            $(formMessages).text('Ajax request failed');
        });
    });
});

