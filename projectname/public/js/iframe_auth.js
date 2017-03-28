//server-side append lib
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
    X_AUTH.ajax_param_switch = 'head'; //header|post|get
    X_AUTH.ajax_param = function(param) {
        if (!X_AUTH.x_auth || !X_AUTH.x_auth.x_auth_session) {
            X_AUTH.dbg('!x_auth', X_AUTH.x_auth);
            return param;
        }

        if (typeof param == 'string') {
            param = {url:param};
        }
        if (!X_AUTH.x_auth.x_auth_session) {
            return param
        }
        param = X_AUTH.ajax_param_header(param);

        switch (X_AUTH.ajax_param_switch) {
            case 'get':
                param = X_AUTH.ajax_param_get(param);
                break;
            case 'post':
                param = X_AUTH.ajax_param_post(param);
                break;
            case 'head':
            case 'header':
            default:
                //already
                break;
        }

        return param;
    };

    X_AUTH.ajax_param_header = function(param) {
        param.headers = {
            'x-auth-session': X_AUTH.x_auth.x_auth_session
        };

        return param;
    };

    X_AUTH.ajax_param_get = function(param) {
        if (!param.url) {
            console.log('wrong ajax param', param);
            return;
        }
        param.url += (param.url.match(/\?/) ? '&' : '?')
            + 'x_auth_session='
            + encodeURIComponent(X_AUTH.x_auth.x_auth_session);

        return param;
    };

    X_AUTH.ajax_param_post = function(param) {
        param.method = 'POST';
        if (!param.data) {
            param.data = {};
        }
        param.data.x_auth_session = X_AUTH.x_auth.x_auth_session;

        return param;
    };
    X_AUTH.init();

});

//just tests
function ajax_test() {
    q = $.ajax(
        X_AUTH.ajax_param({url:'/api/user'})
    )
        .done(function(data) {
            console.log('ajax_text', data);
            $("#ajax_test").text(JSON.stringify(data, null, 2));
        });
}

//$('input[name="dse_ajax_param"]').change(function(el) {
//    X_AUTH.ajax_param_switch = this.value;
//});