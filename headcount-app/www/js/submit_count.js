$(function() {
    var validateJSON = require('./json_validator.js').validate;
    var busStops = require('./busStops');
    intel.xdk.device.hideSplashScreen(); 

    busStops.map(function(building){
        $('#busStops').append(
            $('<option>', {
                text: building,
                value: building
            })
        )
    });  

    $("#login_screen").on('click', function() {
        $('#login_screen').css('visibility','hidden');
        $("#main-screen").css('visibility','visible');
    });

    $('#googlebtn').on('click', function() {
        var login_url = 'https://accounts.google.com/o/oauth2/auth' + '?' + 
        $.param({ 
             auth_url: 'https://accounts.google.com/o/oauth2/auth',
            response_type: 'token',
            redirect_uri: 'http://localhost:3000/oauth2callback',
            logout_url: 'https://accounts.google.com/logout',
            client_id: '526739814121-ggsoa1ievauoisbsed3fec2v5vo8646i.apps.googleusercontent.com',
            other_params: {scope: 'profile'}
        });
        var loginWindow = window.open(login_url, '_blank', 'location=yes');
    });

    var formResponse = $('#formResponse');
    $('form').on('submit', function(e) {
        e.preventDefault();  
        //console.log(JSON.stringify(formData));
        var data = {'location': $('#location').val(),
                   'boarded': parseInt($('#boarded').val()),
                   'departed': parseInt($('#departed').val()),
                   'full': $('input[name="bus_full"]:checked').val(),
                   'vehicle_nbr': window.sessionStorage.getItem('vehicle_nbr'),
                   'trip_id': window.sessionStorage.getItem('trip_id')
                  };

                  var valid = validateJSON(data)

    console.log(JSON.stringify(data));
    if(valid){
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
                //$('form').trigger('reset');
            } else {
                alert('You must log in to submit headcount');
                $.afui.loadContent("#page1",false,false,"pop");
            }
            console.log(JSON.stringify(res));
        })
        .fail(function(res){
            console.log('ajax request failed');
            $(formResponse).text('Ajax request failed');
        });
    };
});




$('#google_login').on('click', function(e) {
     $.oauth2({
            auth_url: 'https://accounts.google.com/o/oauth2/auth',
            response_type: 'token',
            redirect_uri: 'http://localhost:3000/oauth2callback',
            client_id: '526739814121-ggsoa1ievauoisbsed3fec2v5vo8646i.apps.googleusercontent.com',
            other_params: {scope: 'profile'}
        }, function(token, response){
            this.close();
            alert(this);
            alert('hey');
             $("#logs").append("<p class='success'><b>access_token: </b>"+token+"</p>");
            $("#logs").append("<p class='success'><b>response: </b>"+JSON.stringify(response)+"</p>");
        }, function(error, response){
            alert(error);
            $("#logs").append("<p class='error'><b>error: </b>"+JSON.stringify(error)+"</p>");
            $("#logs").append("<p class='error'><b>response: </b>"+JSON.stringify(response)+"</p>");
    });
      $.afui.loadContent("#page1",false,false,"pop");

});




  



//  $.oauth2({
//         auth_url: '',           // required
//         response_type: '',      // required  - "code"/"token"
//         token_url: '',          // required for response_type ="code"
//         logout_url: '',         // recommended if available
//         client_id: '',          // required
//         client_secret: '',      // required for response_type ="code"
//         redirect_uri: '',       // required - any dummy url http://www.yourcompany.com
//         other_params: {}         // optional params object for scope, state, ...
//     }, function(token, response){
//         // do something with token or response
//     }, function(error, response){
//         // do something with error object
//     }); 

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

