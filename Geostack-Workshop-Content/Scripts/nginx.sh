#!/bin/bash

type=${1?Error: no Type given}

assignments=~/GeoStack-Workshop/Geostack-Workshop-Content/Part-3-Data-usage/Sourcecode/$type/3.Nginx-Webserver/nginx.conf

assignment8=$(cat $assignments |tr -d "[:blank:]"| grep 'upstreamtilestache-server{serverlocalhost:8080;}')

assignment9=$(cat $assignments |tr -d "[:blank:]"| grep 'location/tiles/openstreetmap/{proxy_passhttp://tilestache-server/openstreetmap/;}')

fuser -k 8080/tcp


clear

if [ "$assignment8" != "" ] && [ "$assignment9" != "" ]; then
    sudo cp ~/GeoStack-Workshop/Geostack-Workshop-Content/Part-3-Data-usage/Sourcecode/$type/3.Nginx-Webserver/nginx.conf /etc/nginx/; sudo service nginx restart&>/dev/null & sh -c "fuser -k 8080/tcp; bash ~/GeoStack-Workshop/Geostack-Workshop-Content/Scripts/tileserver.sh Solution"&>/dev/null & sh -c "fuser -k 5000/tcp; bash ~/GeoStack-Workshop/Geostack-Workshop-Content/Scripts/flask.sh Solution"&>/dev/null & echo "Good Job, you have completed all the assignments. If you navigate to the URL: 'http://localhost/tiles/openstreetmap/0/0/0.png' you can see the results of the Tileserver running behind the NGINX Webserver and if you navigate to the URL: 'http://localhost/api/' you will see the result of the Flask-API running behind the NGINX Webserver." ; echo ""; echo "When you encounter the error:'502 Bad Gateway' you should restart the Tileserver by clicking on the shortcut:'tilestache-tileserver-assignment' or 'tilestache-tileserver-result'!"
else
    if [ "$assignment8" != "" ]; then
    echo "assignment 8 is correct"
    else
        echo "assignment 8 is incorrect"
    fi

    if [ "$assignment9" != "" ]; then
        echo "assignment 9 is correct"
    else
        echo "assignment 9 is incorrect"
    fi
fi
