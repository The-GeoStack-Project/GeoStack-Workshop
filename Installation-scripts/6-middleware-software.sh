#!/bin/sh

echo "-------------->>>> Installing Flask <<<<--------------"
sleep 2
# Install Flask using python pip 3
pip3 install Flask

echo "-------------->>>> Installing Flask-Pymongo <<<<--------------"
sleep 2
# Install Flask-pymongo using python pip 3
pip3 install flask-pymongo

echo "-------------->>>> Installing Gunicorn 3 <<<<--------------"
sleep 2
# Install gunicorn 3
sudo apt install gunicorn3

echo "-------------->>>> Installing Tilestache & Pillow <<<<--------------"
sleep 2
# Install tilestache and pillow without cache directory,
# this solves the binary not found error.
pip3 --no-cache-dir install tilestache pillow

echo "-------------->>>> Installing NGINX <<<<--------------"
sleep 2

# Download the NGINX signing key and add it to the Key repository.
wget -qO - wget http://nginx.org/keys/nginx_signing.key | sudo apt-key add -

# Add the NGINX repo to the system's repository list.
sudo sh -c 'echo "deb [arch=amd64] http://nginx.org/packages/mainline/ubuntu/ `lsb_release -cs` nginx" >> /etc/apt/sources.list.d/nginx.list'

# Update our local database
sudo apt update

# Installing NGINX
sudo apt install nginx
echo "-------------->>>> Done installing tools  <<<<--------------"
