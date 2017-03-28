<h1>3rd party cookie</h1>

<div>
    <form id="form_projectname_cookie1" name="form_projectname_cookie" method="POST" target="iframe_projectname_cookie" action="http://projectname.local/iframe_auth">
            <button onclick="testMessageAuth('form_projectname_cookie1');return false">login</button>
            <input type="submit" />
            <input type=text name=email value="user1@projectname.local" /> :
            <input type=text name=password value="user1@projectname.local" />
    </form>
</div>
<div>
    <form id="form_projectname_cookie2" name="form_projectname_cookie" method="POST" target="iframe_projectname_cookie" action="http://projectname.local/iframe_auth">
            <button onclick="testMessageAuth('form_projectname_cookie2');return false">login</button>
            <input type="submit" />
            <input type=text name=email value="user2@projectname.local" /> :
            <input type=text name=password value="user2@projectname.local" />
    </form>
</div>
<button onclick="testMessageAuth();return false">test logout</button><br />

<iframe name="iframe_projectname_cookie" width=100% height="700px" src="http://projectname.local/home"></iframe>

<script src="http://projectname.local/js/3rd_auth.js"></script>
<script>
    document.addEventListener("DOMContentLoaded", function () {
        X_AUTH.origins_regexp.push('projectname\.local');
        X_AUTH.target = window.frames['iframe_projectname_cookie'];
        X_AUTH.is_dbg = true;
        X_AUTH.init();
    });

    function testMessageAuth(form_id) {
        X_AUTH.send(
            'auth_by_email',
            form_id
                ? {
                    email: document.getElementById(form_id)['email'].value,
                    password: document.getElementById(form_id)['password'].value
                }
            : {}
        );

    }
</script>