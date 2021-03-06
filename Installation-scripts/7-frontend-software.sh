#!/bin/bash

echo "-------------->>>> Installing NodeJS <<<<--------------"
sleep 2

# Install curl
sudo apt install curl

# Install the package required for nodejs.
sudo apt install build-essential

# Install nodejs.
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

sudo apt-get install -y nodejs


echo "-------------->>>> Installing Angular-CLI <<<<--------------"
sleep 2

# Install the angular CLI
sudo npm install -g @angular/cli


echo "-------------->>>> Installing Angular Applications <<<<--------------"
sleep 2

# Enter the Solution/map-viewer directory, install the node_modules and update the node_modules.
cd ~/GeoStack-Workshop/Geostack-Workshop-Content/Part-4-Data-visualization/Sourcecode/Solution/map-viewer && sudo npm install

# Enter the Assignment/map-viewer directory, install the node_modules and update the node_modules.
cd ~/GeoStack-Workshop/Geostack-Workshop-Content/Part-4-Data-visualization/Sourcecode/Assignment/map-viewer && sudo npm install 

echo "-------------->>>> DONE <<<<--------------"

