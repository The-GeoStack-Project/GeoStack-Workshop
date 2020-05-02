#!/bin/sh

echo "-------------->>>> Installing Flask <<<<--------------"
sleep 2
# Install Flask using python pip 3
pip3 install Flask

# Check flask version and assign it to a variable called flaskcheck
flaskcheck= flask --version | grep 1.1.1


# If flask version not found it means the install has failed.
# If flask version is found the installer continues.
echo "-------------->>>> Validating Flask <<<<--------------"
if [$flaskcheck != ""]; then
	echo "successfully installed flask, moving on"
	sleep 5
else
	echo "flask not successfully installed, exiting installer"
	echo "-------------->>>> Exiting installer <<<<--------------"
	exit
fi

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
echo 'deb [arch=amd64] http://nginx.org/packages/mainline/ubuntu/ bionic nginx' | sudo tee --append /etc/apt/sources.list.d/nginx.list

# Update our local database
sudo apt update

# Installing NGINX
sudo apt install nginx

# Validating NGINX Install and assign it to a variable: "nginxcheck"
nginxcheck= nginx -v | grep nginx

echo "-------------->>>> Validating NGINX <<<<--------------"

# If nginx version not found it means the install has failed.
# If nginx version is found the installer continues.
if [$nginxcheck != ""]; then
	echo "successfully installed NGINX, moving on"
	sleep 5
else
	echo "nginx not successfully installed, exiting installer"
	echo "-------------->>>> Exiting installer <<<<--------------"
	exit
fi

echo "-------------->>>> Done installing tools  <<<<--------------"
