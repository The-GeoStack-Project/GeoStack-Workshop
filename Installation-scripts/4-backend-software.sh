#!/bin/sh

echo "-------------->>>> Installing MongoDB <<<<--------------"
sleep 2

# Install a package required for MongoDB
sudo apt install libgconf-2-4

# Install MongoDB
sudo apt install mongodb

echo "-------------->>>> Downloading MongoCompass <<<<--------------"
sleep 2

# Download the MongoCompass deb file.
wget https://downloads.mongodb.com/compass/mongodb-compass_1.20.4_amd64.deb

echo "-------------->>>> Installing MongoCompass <<<<--------------"
sleep 2

# Run dpkg to install the deb file downloaded in the previous step.
sudo dpkg -i mongodb-compass_1.20.4_amd64.deb

echo "-------------->>>> Adding shortcut <<<<--------------"
sleep 2

# Set the sidebar shortcuts to contain firefox, nautilus, a terminal launcher, atom and the MongoCompass shortcut.
gsettings set org.gnome.shell favorite-apps "['firefox.desktop', 'org.gnome.Nautilus.desktop','org.gnome.Software.desktop','yelp.desktop', 'org.gnome.Terminal.desktop', 'atom.desktop','mongodb-compass.desktop']"

echo "-------------->>>> Installing MongoEngine <<<<--------------"
sleep 2

# Install MongoEngine
pip3 install mongoengine

echo "-------------->>>> Cleaning <<<<--------------"
sleep 2

# Remove the downloaded deb file from MongoCompass.
sudo rm mongodb-compass_1.20.4_amd64.deb
