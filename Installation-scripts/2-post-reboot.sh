#!/bin/sh

echo "-------------->>>> Moving workshop shortcuts <<<<--------------"
sleep 2
# Set owner of the shortcuts to geostack. The -R is used to recursivly execute
# the command. $USER greps the username of the current user.
sudo chown -R $USER ~/GeoStack-Workshop/Geostack-Workshop-Content/Shortcuts/

# A for loop which loops through the content of the Shortcuts folder. and then
# copies each file to the Desktop.
for i in ~/GeoStack-Workshop/Geostack-Workshop-Content/Shortcuts/*.desktop; do cp $i ~/Desktop/ ;done

echo "-------------->>>> Setting shortcuts to trusted <<<<--------------"
sleep 2
# A for loop which loops through all the shortcuts on the desktop and then
# sets the shortcut metadata to trusted. This has to be done for the Shortcuts
# to be executable.
for i in ~/Desktop/*.desktop; do    gio set "$i" "metadata::trusted" yes ;done

echo "-------------->>>> Restarting nautilus <<<<--------------"
sleep 2
# Kill the nautilus process for the changes in the previous step to take effect.
pkill nautilus

# Restart the nautilus process in the background. This is done by using the
# syntax : "> /dev/null 2>&1 &"
nautilus-desktop > /dev/null 2>&1 & echo "-------------->>>> Restarted nautilus <<<<--------------"

echo "-------------->>>> Creating file links <<<<--------------"
sleep 2
# Create file links on the desktop for each of the folders in
# the Geostack-Workshop-Content folder.
ln -s /home/geostack/GeoStack-Workshop/Geostack-Workshop-Content/Part-1-Data-processing ~/Desktop/Part-1-Data-processing
ln -s /home/geostack/GeoStack-Workshop/Geostack-Workshop-Content/Part-2-Data-storage ~/Desktop/Part-2-Data-storage
ln -s /home/geostack/GeoStack-Workshop/Geostack-Workshop-Content/Part-3-Data-usage ~/Desktop/Part-3-Data-usage
ln -s /home/geostack/GeoStack-Workshop/Geostack-Workshop-Content/Part-4-Data-visualization ~/Desktop/Part-4-Data-visualization

echo "-------------->>>> DONE <<<<--------------"
sleep 2

