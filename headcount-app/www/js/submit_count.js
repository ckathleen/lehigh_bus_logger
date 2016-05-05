$(function() { 

    //using jquery
    var formResponse = $('#formResponse');
    $('form').on('submit', function(e) {
        e.preventDefault();  
        //console.log(JSON.stringify(formData));
        var data = {'location': $('#location').val(),
                   'boarded': $('#boarded').val(),
                   'departed': $('#departed').val(),
                   'full': $('input[name="bus_full"]:checked').val(),
                   'vehicle_nbr': window.sessionStorage.getItem('vehicle_nbr'),
                   'trip_id': window.sessionStorage.getItem('trip_id')
                  };
        console.log(JSON.stringify(data));
        $.ajax({
            type: 'POST',
            url: $('form').attr('action'),
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: 'json' 
        })
        .done(function(res){
            if (res._id !== 0) {
                $('#location').val('');
                $('#boarded').val('');
                $('#departed').val('');
                $('input[name=bus_full]').prop('checked',false);
            } else {
                alert('You must log in to submit headcount');
                $.afui.loadContent("#page1",false,false,"pop");
            }
            console.log(JSON.stringify(res));
            $('form').trigger("reset"); //empty form
        })
        .fail(function(res){
            console.log('ajax request failed');
            $(formResponse).text('Ajax request failed');
        });
    });

$('#google_login').on('click', function(e) {
    // function oauth2_login() {
        alert('in ouath');
         $.oauth2({
                auth_url: 'https://accounts.google.com/o/oauth2/auth',
                response_type: 'token',
                logout_url: 'https://accounts.google.com/logout',
                client_id: 'CLIENT-ID-FROM-GOOGLE',
                redirect_uri: 'http://localhost:3000',
                other_params: {scope: 'profile'}
            }, function(token, response){
                 $("#logs").append("<p class='success'><b>access_token: </b>"+token+"</p>");
                $("#logs").append("<p class='success'><b>response: </b>"+JSON.stringify(response)+"</p>");
            }, function(error, response){
                alert(error);
                $("#logs").append("<p class='error'><b>error: </b>"+JSON.stringify(error)+"</p>");
                $("#logs").append("<p class='error'><b>response: </b>"+JSON.stringify(response)+"</p>");
        }); 
    });


    //using javascript  
    // document.getElementById("other-form").onsubmit = function(e) {
    //     e.preventDefault();
    //     console.log("pure js");
    //     var xhr = new XMLHttpRequest();
    //     xhr.open('POST', 'http://localhost:3000/headCountForm/');
    //     xhr.setRequestHeader('Content-Type', 'application/json');
    //     xhr.send(JSON.stringify($(this).serializeArray())); //jquery to convert
    // } 

});

