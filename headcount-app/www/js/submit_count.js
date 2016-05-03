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
                   'vehicle_nbr': window.sessionStorage.getItem('vehicle_nbr'),
                   'trip_id': window.sessionStorage.getItem('trip_id')
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
                if (res._id !== 0) {
                    $('#location').val('');
                    $('#boarded').val('');
                    $('#departed').val('');
                    $('input[name=bus_full]').prop('checked',false);
                } else {
                    alert('You must log in to submit headcount');
                    $.afui.loadContent("#page1",false,false,"pop");
                }
            }
        })
        .fail(function(data){
            console.log('ajax request failed');
            $(formMessages).text('Ajax request failed');
        });
    });
});

