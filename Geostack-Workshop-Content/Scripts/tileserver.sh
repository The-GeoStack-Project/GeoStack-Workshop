#!/bin/bash

type=${1?Error: no Type given}

assignment=~/Geostack-Workshop-Content/Part-3-Data-usage/Sourcecode/$type/2.Tilestache-Tileserver/configuration.cfg

assignment7=$(cat $assignment | grep '"path":"cache",')

assignment8=$(cat $assignment | grep '"url":"http://tile.openstreetmap.de/{Z}/{X}/{Y}.png"')

fuser -k 8080/tcp

clear

if [ "$assignment7" != "" ] && [ "$assignment8" != "" ]; then
   cd && gunicorn3 --workers 4 -b :8080 "TileStache:WSGITileServer('Geostack-Workshop-Content/Part-3-Data-usage/Sourcecode/$type/2.Tilestache-Tileserver/configuration.cfg')" &>/dev/null & sed -i '/^ *#/ d' ~/Geostack-Workshop-Content/Part-3-Data-usage/Sourcecode/$type/2.Tilestache-Tileserver/configuration.cfg  & echo "Good Job, you have completed all the assignments. If you navigate to the URL: 'http://localhost:8080/openstreetmap/0/0/0.png' you can see the results."
else
    if [ "$assignment7" != "" ]; then
    echo "assignment 6 is correct"
    else
        echo "assignment 6 is incorrect"
    fi

    if [ "$assignment8" != "" ]; then
        echo "assignment 7 is correct"
    else
        echo "assignment 7 is incorrect"
    fi
fi
