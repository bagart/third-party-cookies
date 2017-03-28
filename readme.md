#Third Party Cookies

Auth with blocked 3-rd party cookie in iframe (Safari, Ios)
with Laravel (Optional)

Implement with iframe.postMessage
    
##Not work:
- Laravel Session


##Install
```
echo 10.0.75.1 project3rdparty.local >> /etc/hosts
echo 10.0.75.1 projectname.local >> /etc/hosts

git clone https://bagart@bitbucket.org/dse1/third-party-cookies.git
cd third-party-cookies
cmd/install.sh

#build Laravel if needed
#composer install
#php artuisan migrate
```

#Run
```
#only after stop
#cmd/up.sh

#connect to workspace container, if needed
#cmd/conn-workspace.sh
```
http://project3rdparty.local


##Stop
```
cmd/stop.sh
```

###Powered by
 
- https://github.com/bagart/laradock_env
- https://github.com/laravel/laravel
