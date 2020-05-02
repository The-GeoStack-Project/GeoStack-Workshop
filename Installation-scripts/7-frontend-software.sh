#!/bin/sh

echo "-------------->>>> Installing NodeJS <<<<--------------"
sleep 2

# Install curl
sudo apt install curl

# Install the package required for nodejs.
sudo apt install build-essential

# Install nodejs.
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs


echo "-------------->>>> Cleanup <<<<--------------"
sleep 2

# Remove the nodesource_setup script
rm nodesource_setup.sh

echo "-------------->>>> Installing Angular-CLI <<<<--------------"
sleep 2

# Install the angular CLI
sudo npm install -g @angular/cli

echo "-------------->>>> Setting access to the local update config  <<<<--------------"
sleep 2
# Add access to NPM config for the user geostack.
sudo chown -R $USER:$(id -gn $USER) /home/geostack/.config 

echo "-------------->>>> Installing Angular Applications <<<<--------------"
sleep 2

# Enter the Solution/map-viewer directory, install the node_modules and update the node_modules.
cd ~/Geostack-Workshop-Content/Part-4-Data-visualization/Sourcecode/Solution/map-viewer && sudo npm install

# Enter the Assignment/map-viewer directory, install the node_modules and update the node_modules.
cd ~/Geostack-Workshop-Content/Part-4-Data-visualization/Sourcecode/Assignment/map-viewer && sudo npm install 

echo "-------------->>>> DONE <<<<--------------"
