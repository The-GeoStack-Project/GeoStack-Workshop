from mongoengine import *
from datetime import datetime
import pandas as pd


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                                                             #
#                         CREATING THE TRAIL DATABASE MODEL                   #
#                                                                             #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                                                             #
#                     CREATING THE TRAIL DATABASE MODEL                       #
#                                                                             #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

class Trail(Document):

    name = StringField()

class Signal(Document):

    timestamp = DateTimeField()

    coord = PointField()

    alt = FloatField()

    trail = ReferenceField(Trail)


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                                                             #
#                  LOADING THE TRIAL DATA IN DATABASE                         #
#                                                                             #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #


def load_data(df,name):



    trail = Trail(name=name)

    trail.save()

    for index,row in df.iterrows():

        time = datetime.fromtimestamp(row['time']/1000)


        signal = Signal(timestamp = time,
                        coord=[row['lon'],row['lat']],
                        alt = row['alt'],
                        trail = trail)

        signal.save()

    print("Done importing dataset for trail: " + name)

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                                                             #
#                           LOAD DATASETS USING PANDAS                        #
#                                                                             #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

def import_data():
    connect('Trail_Database')
    print("Starting import")


    load_data(pd.read_json('~/GeoStack-Workshop/Geostack-Workshop-Content/Part-2-Data-storage/Datasets/JSON/Route-Biesbosch.json'),"Biesbosch")
    load_data(pd.read_json('~/GeoStack-Workshop/Geostack-Workshop-Content/Part-2-Data-storage/Datasets/JSON/Route-Zeeland_Car_1.json'),"Zeeland-Car-1")
    load_data(pd.read_json('~/GeoStack-Workshop/Geostack-Workshop-Content/Part-2-Data-storage/Datasets/JSON/Route-Zeeland_Car_2.json'),"Zeeland-Car-2")


    print('Done importing')




yes = {'yes','y', 'ye', ''}
no = {'no','n'}

choice = input('Are you sure you want to import the trail data? y/n').lower()
if choice in yes:
   import_data()
elif choice in no:
   print('bye')
   exit()
else:
   sys.stdout.write("Please respond with 'y' or 'n'")
