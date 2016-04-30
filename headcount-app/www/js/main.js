$.ready(function() {
    $("#Enter").click(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            data: $("form").serialize(),
            dataType: 'json',
            url: 'http://localhost:3000/postHeadCount',
            success: function(data) {
                console.log('success');
            }
            
        })
    })
    
    
})