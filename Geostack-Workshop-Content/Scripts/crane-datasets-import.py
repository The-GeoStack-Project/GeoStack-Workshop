from mongoengine import *
from datetime import datetime
import pandas as pd


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                                                             #
#                     CREATING THE CRANE DATABASE MODEL                       #
#                                                                             #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

class Tracker(Document):
    
    name = StringField()

    study_name = StringField() 
    
    individual_taxon_canonical_name = StringField()
     
    individual_local_identifier =  IntField() 

class Transmission(Document):
    
    event_id = IntField()
    
    timestamp = DateTimeField() 
    
    coord = PointField()
    
    alt = FloatField()
    
    speed = FloatField() 
    
    heading = IntField()

    tracker = ReferenceField(Tracker)

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                                                             #
#                  LOADING THE CRANE DATA IN DATABASE                         #
#                                                                             #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

def load_data(df,name):
    
    tracker = Tracker(study_name = df.at[0,'study-name'],
                      individual_taxon_canonical_name = df.at[0,'individual-taxon-canonical-name'],
                      individual_local_identifier = df.at[0,'individual-local-identifier'],
                      name = name,).save()

    transmissions = []

    for index,row in df.iterrows():
        transmissions.append(Transmission(event_id = row['event-id'],
                                          timestamp = row['timestamp'],
                                          coord = [row['location-long'],row['location-lat']],
                                          alt = row['height-above-ellipsoid'],
                                          speed = row['ground-speed'],
                                          tracker = tracker))
        
    Transmission.objects.insert(transmissions,load_bulk=True)
    
    print("Done importing dataset for crane: " + name)


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                                                             #
#                           LOAD DATASETS USING PANDAS                        #
#                                                                             #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #

def import_data():
    connect('Crane_Database')
    print("Starting import")

    load_data(pd.read_csv('~/GeoStack-Workshop/Geostack-Workshop-Content/Workshop-Datasets/CSV/20181003_Dataset_SV_GPS_Crane_9407_STAW_Crane_RRW-BuGBk_Agnetha.csv'),"Agnetha")
    load_data(pd.read_csv('~/GeoStack-Workshop/Geostack-Workshop-Content/Workshop-Datasets/CSV/20181003_Dataset_SV_GPS_Crane_9381_STAW_Crane_RRW-BuGBk_Frida.csv'),"Frida")
    load_data(pd.read_csv('~/GeoStack-Workshop/Geostack-Workshop-Content/Workshop-Datasets/CSV/20181003_Dataset_SV_GPS_Crane_9472_STAW_Crane_RRW-BuGR_Cajsa.csv'),"Cajsa")


    print("Finished import")



yes = {'yes','y', 'ye', ''}
no = {'no','n'}

choice = input('Are you sure you want to import the crane data? y/n').lower()
if choice in yes:
   import_data()
elif choice in no:
   print('bye')
   exit()
else:
   sys.stdout.write("Please respond with 'yes' or 'no'")

