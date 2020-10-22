
import gpxpy
import datetime
import pandas as pd
import os

input_location_gpx = '/home/geostack/GeoStack-Workshop/Geostack-Workshop-Content/Workshop-Datasets/GPX/'
output_location_gpx = '/home/geostack/GeoStack-Workshop/Geostack-Workshop-Content/Part-2-Data-storage/Datasets/JSON/'

input_location_csv = '/home/geostack/GeoStack-Workshop/Geostack-Workshop-Content/Workshop-Datasets/CSV/'
output_location_csv = '/home/geostack/GeoStack-Workshop/Geostack-Workshop-Content/Part-2-Data-storage/Datasets/JSON/'


def create_df(data):

    df = pd.DataFrame(columns=['lon', 'lat', 'alt', 'time'])

    for point in data:
        df = df.append({'lon': point.longitude,
                        'lat' : point.latitude,
                        'alt' : point.elevation,
                        'time' : point.time}, ignore_index=True)
    return df

def parse_transform_GPX(input_file,output_file):

    input_location = input_location_gpx + input_file

    output_location = output_location_gpx + output_file

    parsed_file =  gpxpy.parse(open(input_location, 'r'))

    df = create_df(parsed_file.tracks[0].segments[0].points)

    df.to_json(output_location,orient='records')

    print("transformed: "+input_file+" to: " + output_file)


def filter_transform_CSV(input_file,output_file):

    input_location = input_location_csv+input_file

    output_location = output_location_csv+output_file

    df = pd.read_csv(input_location,low_memory=False)

    columns_to_filter = ['event-id', 'study-name',
                     'timestamp',
                     'ground-speed',
                     'location-long','location-lat',
                     'height-above-ellipsoid',
                     'individual-taxon-canonical-name',
                     'individual-local-identifier']

    filtered_df = df[columns_to_filter]

    filtered_df.to_json(output_location,orient='records')

    print("transformed: "+input_file+" to: " + output_file)




parse_transform_GPX("Zeeland_Car_1.gpx",'Route-Zeeland_Car_1.json')
parse_transform_GPX("Biesbosch.gpx",'Route-Biesbosch.json')
parse_transform_GPX("Zeeland_Car_2.gpx",'Route-Zeeland_Car_2.json')

filter_transform_CSV('20181003_Dataset_SV_TrackerID_9381_ColorCode_RRW-BuGBk_Crane_Frida.csv','Crane-Frida.json')
filter_transform_CSV('20181003_Dataset_SV_TrackerID_9407_ColorCode_RRW-BuGY_Crane_Agnetha.csv','Crane-Agnetha.json')
filter_transform_CSV('20181003_Dataset_SV_TrackerID_9472_ColorCode_RRW-BuGR_Crane_Cajsa.csv','Crane-Cajsa.json')
