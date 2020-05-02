#!/bin/sh

echo "-------------->>>> Importing and indexing Crane datasets <<<<--------------"
sleep 2

# Run the Python script used to import all the Crane datasets.
python3 /home/geostack/GeoStack-Workshop/Geostack-Workshop-Content/Scripts/crane-datasets-import.py

echo "-------------->>>> Importing and indexing GPS-Route (Trail) datasets <<<<--------------"
sleep 2

# Run the Python script used to import all the GPS-Route (Trail) datasets.
python3 /home/geostack/GeoStack-Workshop/Geostack-Workshop-Content/Scripts/trail-datasets-import.py

echo "-------------->>>> DONE <<<<--------------"
