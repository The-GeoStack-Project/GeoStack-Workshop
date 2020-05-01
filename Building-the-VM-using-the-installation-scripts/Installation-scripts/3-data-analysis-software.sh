#!/bin/sh

echo "-------------->>>> Installing Jupyter Lab <<<<--------------"
sleep 2

# Install Jupyter Lab
sudo -H pip3 install jupyterlab

echo "-------------->>>> Installing Pandas <<<<--------------"
sleep 2

# Update the local package database
sudo apt update

# Install packages required for pandas and cartopy
sudo apt-get install libproj-dev proj-data proj-bin libgeos-dev

# Install Pandas.
pip3 install pandas

echo "-------------->>>> Installing Cartopy <<<<--------------"
sleep 2

# Install cython before cartopy since it's a dependency for cartopy.
pip3 install cython

# Install cartopy matplotlib and scipy.
pip3 install cartopy matplotlib scipy

echo "-------------->>>> Installing GPXPY <<<<--------------"
sleep 2

# Install GPXPY geopy and numpy
pip3 install gpxpy geopy numpy
