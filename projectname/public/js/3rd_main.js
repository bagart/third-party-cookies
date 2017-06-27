//iframe-side append lib
document.addEventListener("DOMContentLoaded", function () {
    X_AUTH.is_dbg = true;

    X_AUTH.addAction('x_auth',function(data) {
        X_AUTH.dbg('x_auth: visual');
        if (data.user_id) {
            $('#user_id').text(X_AUTH.x_auth.user_id);
            $('#user_name').text(X_AUTH.x_auth.user_name);
        } else {
            $('#user_id').text('');
            $('#user_name').text('Guest');
        }
    });

    X_AUTH.addAction('auth_by_email', function(param) {
        //param = { email:email,password:password };
        $.post({
            url:"/api/auth",
            data: JSON.stringify(param),
            headers: {
                //'x-Cookie': JSON.stringify(param),
                'Content-Type': 'application/json'
            }
        })
            .done(function(data) {
                delete data.result;
                X_AUTH.doAction('x_auth', data);
                X_AUTH.send('x_auth', data);
            })
            .fail(function(data) {
                console.log( "error", this, data);
            })
    });
    X_AUTH.init();

});

//just tests
function ajax_test() {
    q = $.ajax(
        X_AUTH.ajax_param({url:'/api/user_check'})
    )
        .done(function(data) {
            console.log('ajax_text', data);
            $("#ajax_test").text(JSON.stringify(data, null, 2));
        });
}

//$('input[name="dse_ajax_param"]').change(function(el) {
//    X_AUTH.ajax_param_switch = this.value;
//});