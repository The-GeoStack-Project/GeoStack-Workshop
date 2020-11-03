#!/bin/sh

echo "-------------->>>> Installing Flask <<<<--------------"
sleep 2
# Install Flask using python pip 3
sudo -H pip3 install Flask

echo "-------------->>>> Installing Flask-Pymongo <<<<--------------"
sleep 2
# Install Flask-pymongo using python pip 3
pip3 install flask-pymongo


echo "-------------->>>> Installing tilestache & pillow & gunicorn<<<<--------------"
sleep 2

# Install Tilestache Pillow and Gunicorn2 python-packages.
sudo -H pip3 install tilestache pillow gunicorn

if [ `lsb_release -cs` == "focal" ] || [ `lsb_release -cs` == "Eoan" ] || [ `lsb_release -cs` == "groovy" ]
then
    sudo apt install gunicorn
    echo "Fixing Tilestache on Ubuntu 20.04 and 20.10"
    sudo cp ~/GeoStack-Workshop/Geostack-Workshop-Content/Scripts/py3_compat.py /usr/local/lib/python3.8/dist-packages/TileStache
else
    
    sudo apt install gunicorn3
fi

echo "-------------->>>> Installing NGINX <<<<--------------"
sleep 2

# Download the NGINX signing key and add it to the Key repository.
wget -qO - wget http://nginx.org/keys/nginx_signing.key | sudo apt-key add -

# Add the NGINX repo to the system's repository list.
sudo sh -c 'echo "deb [arch=amd64] http://nginx.org/packages/mainline/ubuntu/ `lsb_release -cs` nginx" >> sudo tee --append /etc/apt/sources.list.d/nginx.list'

# Update our local database
sudo apt update

# Installing NGINX
sudo apt install nginx
echo "-------------->>>> Done installing tools  <<<<--------------"
