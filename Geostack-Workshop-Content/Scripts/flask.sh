#!/bin/bash

type=${1?Error: no Type given}

assignments=~/GeoStack-Workshop/Geostack-Workshop-Content/Part-3-Data-usage/Sourcecode/$type/1.Flask-API/app.py

assignment1=$(cat $assignments |tr -d "[:blank:]"| grep -e 'trail_connection=PyMongo(app,uri="mongodb://localhost:27017/Trail_Database")' -e "trail_connection=PyMongo(app,uri='mongodb://localhost:27017/Trail_Database')")

assignment2=$(cat $assignments |tr -d "[:blank:]"| grep -e 'query_result=trail_connection.db.trail.find({"_id":ObjectId(id)})' -e "query_result=trail_connection.db.trail.find({'_id':ObjectId(id)})")

assignment3=$(cat $assignments |tr -d "[:blank:]"| grep -e 'query_result_id=trail_connection.db.signal.find({"trail":ObjectId(id)})\[:int(amount)]' -e "query_result_id=trail_connection.db.signal.find({'trail':ObjectId(id)})\[:int(amount)]")

assignment4=$(cat $assignments |tr -d "[:blank:]"| grep 'query_result=crane_connection.db.tracker.find()')

assignment5=$(cat $assignments |tr -d "[:blank:]"| grep -e 'query_result_id=crane_connection.db.transmission.find({"tracker":ObjectId(id)})' -e "query_result_id=crane_connection.db.transmission.find({'tracker':ObjectId(id)})")

fuser -k 5000/tcp
clear


if [ "$assignment1" != "" ] && [ "$assignment2" != "" ]&& [ "$assignment3" != "" ]&& [ "$assignment4" != "" ]&& [ "$assignment5" != "" ]; then
     gunicorn3 -b :5000 app:app --chdir ~/GeoStack-Workshop/Geostack-Workshop-Content/Part-3-Data-usage/Sourcecode/$type/1.Flask-API &>/dev/null & echo "Good Job, you have completed all the assignments. If you navigate to the URL: 'http://localhost:5000/api/trackers' or 'http://localhost:5000/api/trails' you can see the results."
else
    if [ "$assignment1" != "" ]; then
    	echo "Assignment 1 is correct"
    else
        echo "assignment 1 is incorrect"
    fi

    if [ "$assignment2" != "" ]; then
        echo "assignment 2 is correct"
    else
        echo "assignment 2 is incorrect"
    fi
    if [ "$assignment3" != "" ]; then
    	echo "assignment 3 is correct"
    else
        echo "assignment 3 is incorrect"
    fi

    if [ "$assignment4" != "" ]; then
        echo "assignment 4 is correct"
    else
        echo "assignment 4 is incorrect"
    fi
    if [ "$assignment5" != "" ]; then
        echo "assignment 5 is correct"
    else
        echo "assignment 5 is incorrect"
    fi
fi
