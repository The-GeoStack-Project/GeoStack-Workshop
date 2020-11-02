#!/bin/sh
# Installation script 1
echo "-------------->>>> Updating System <<<<--------------"
sleep 2 
# Update the local package database and upgrade the local package 
# database
sudo apt update && sudo apt upgrade

echo "-------------->>>> Installing Bleachbit <<<<--------------"
sleep 2 
# Install bleachbit
sudo apt install bleachbit 

echo "-------------->>>> Installing Net tools <<<<--------------"
sleep 2 
# Install net-tools
sudo apt install net-tools 

echo "-------------->>>> Installing Curl <<<<--------------"
sleep 2 
# Install CURL 
sudo apt install curl 

echo "-------------->>>> Installing Python3 and PIP <<<<--------------"
sleep 2 
# Install Python3 and Python3-Pip
sudo apt install python3-pip 

echo "-------------->>>> Installing Atom <<<<--------------"
sleep 2 
# There are multiple ways to install atom. These methods can be found on the following URL's:
# https://flight-manual.atom.io/getting-started/sections/installing-atom/
# https://itsfoss.com/install-atom-ubuntu/
# 
# Add the atom signing key.
wget -qO - https://packagecloud.io/AtomEditor/atom/gpgkey | sudo apt-key add -

# Add the atom repo to the repo list.
sudo sh -c 'echo "deb [arch=amd64] https://packagecloud.io/AtomEditor/atom/any/ any main" > /etc/apt/sources.list.d/atom.list'

# Update the local package database and install Atom.
sudo apt-get update && sudo apt-get install atom

# Set the sidebar shortcuts to contain firefox, nautilus, a terminal launcher and Atom.
echo "-------------->>>> Adding new shortcuts <<<<--------------"
sleep 2 
gsettings set org.gnome.shell favorite-apps "['firefox.desktop', 'org.gnome.Nautilus.desktop','org.gnome.Software.desktop','yelp.desktop', 'org.gnome.Terminal.desktop','atom.desktop']"

echo "-------------->>>> Rebooting system <<<<--------------"
sleep 5
# Reboot the system
reboot
