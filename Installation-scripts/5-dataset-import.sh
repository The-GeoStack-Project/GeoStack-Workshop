#!/bin/bash

echo "-------------->>>> Copying Workshop Part 1 Datasets <<<<--------------"
sleep 2

cp -r ~/GeoStack-Workshop/Geostack-Workshop-Content/Workshop-Datasets/CSV ~/GeoStack-Workshop/Geostack-Workshop-Content/Part-1-Data-processing/Datasets/
cp -r ~/GeoStack-Workshop/Geostack-Workshop-Content/Workshop-Datasets/GPX ~/GeoStack-Workshop/Geostack-Workshop-Content/Part-1-Data-processing/Datasets/

echo "-------------->>>> Transforming and copying datasets for workshop Part 2 <<<<--------------"
sleep 2

python3 ~/GeoStack-Workshop/Geostack-Workshop-Content/Scripts/dataset-convert.py



echo "-------------->>>> Importing and indexing Crane datasets <<<<--------------"
sleep 2

# Run the Python script used to import all the Crane datasets.
python3 ~/GeoStack-Workshop/Geostack-Workshop-Content/Scripts/crane-datasets-import.py

echo "-------------->>>> Importing and indexing GPS-Route (Trail) datasets <<<<--------------"
sleep 2

# Run the Python script used to import all the GPS-Route (Trail) datasets.
python3 ~/GeoStack-Workshop/Geostack-Workshop-Content/Scripts/trail-datasets-import.py


echo "-------------->>>> DONE <<<<--------------"

