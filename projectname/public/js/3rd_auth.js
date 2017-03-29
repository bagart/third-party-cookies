var X_AUTH = {
    target: parent,
    is_dbg: false,
    x_auth: null,
    x_cookie_name: 'x_auth_param',
    origins_regexp: [],
    action_callback: {
        'test': [function(param) {
            console.log('++test++',param);
        }],
        //@note only 1 times
        'ready': [function(x_auth) {
            if (x_auth) {
                //@noteself-auth with cookie || js
                //@todo not need when cookie is work
                X_AUTH.setXAuth(x_auth);
            } else if (X_AUTH.x_auth) {
                //3rd party cookie disabled
                X_AUTH.send(
                    'x_auth',
                    X_AUTH.x_auth
                );
            }
        }],
        //@store anywhere
        'x_auth': [function(x_auth) {
            X_AUTH.setXAuth(x_auth);
        }]
    },
    init: function() {
        window.addEventListener(
            window.addEventListener ? 'message' : 'onmessage',
            this.onMessageEvent
        );

        if (document[this.x_cookie_name]) {
            this.x_auth = document[this.x_cookie_name];
            delete document[this.x_cookie_name];//For prevent confuse
        } else if (this.cookie(this.x_cookie_name)) {
            this.x_auth = JSON.parse(this.cookie(this.x_cookie_name));
        }

        if (X_AUTH.target == parent) {
            X_AUTH.send(
                'ready',
                this.x_auth
            );
        }
    },

    setXAuth: function (x_auth) {
        X_AUTH.x_auth = x_auth;
        X_AUTH.cookie(
            X_AUTH.x_cookie_name,
            JSON.stringify(X_AUTH.x_auth)
        );
    },
    //helper
    cookie: function (name, value, options) {
        if (typeof value == 'undefined') {
            var matches = document.cookie.match(
                new RegExp(
                    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
                )
            );
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }
        options = options || {};
        var expires = options.expires;
        if (typeof expires == "number" && expires) {
            var d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }
        value = encodeURIComponent(value);
        var updatedCookie = name + "=" + value;
        for (var propName in options) {
            updatedCookie += "; " + propName;
            var propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }
        document.cookie = updatedCookie;
    },
    send: function(type, param) {
        this.target.postMessage(
            {
                type: type,
                param: param
            },
            '*'
        );
    },
    addAction: function(type, callback) {
        if (typeof this.action_callback[type] == 'undefined') {
            this.action_callback[type] = [];
        }
        this.action_callback[type].push(callback);
    },
    dbg: function(msg1, msg2, msg3) {
        if (this.is_dbg && console) {
            typeof msg3 != 'undefined'
                ? console.log(msg3)
                : (typeof msg2 != 'undefined'
                    ? console.log(msg1, msg2)
                    : console.log(msg1)
                );
        }
    },
    isValidOrigin: function(origin) {
        if (!this.origins_regexp.length) {
            return true;
        }
        for (var i=0;i < this.origins_regexp.length;++i) {
            if (origin.match(new RegExp('^(?:https?:)?\/\/' + this.origins_regexp[i] + '(\/|$)', 'i'))) {
                return true;
            }
        }

        return false;
    },
    onMessageEvent: function(event) {
        if (!X_AUTH.isValidOrigin(event.origin)) {
            X_AUTH.dbg('ignore by origin:', event.origin);
            return false;
        }
        if (!event.data.type) {
            X_AUTH.dbg('wrong format', event.data);
            return false;
        }
        X_AUTH.doAction(
            event.data.type,
            event.data.param
        );
    },
    doAction: function(type, param) {
        if (typeof X_AUTH.action_callback[type] == 'undefined') {
            X_AUTH.dbg('action not prepared:', type, param);
            return false;
        }
        this.dbg('run:', type, param);
        for (var i=0; i < X_AUTH.action_callback[type].length; ++i) {
            X_AUTH.action_callback[type][i](param)
        }
    }
};
