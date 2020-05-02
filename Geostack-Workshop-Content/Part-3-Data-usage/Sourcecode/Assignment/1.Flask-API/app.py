'''
Below the required modules and libraries are imported.

Below the Flask and the Request modules are imported
'''

from flask import Flask,request
'''
The PyMongo import is used for the connection between the database and 
our Flask-API. PyMongo is also used to create queries which will be 
executed on our MongoDB data stores.
'''

from flask_pymongo import PyMongo

'''
The ObjectID import is used to be able to use the ObjectID of our 
JSON-Documents stored in our MongoDB databases.
'''

from bson.objectid import ObjectId

'''
The Json_Util import is used to convert the JSON, returned by our MongoDB
datastore to a valid JSON format.
'''

from bson import json_util

'''
Below an new instance of a Flask application is Created. We assign this 
instance to a variable called: "app".
'''
app = Flask(__name__)

'''
The function below returns the text, assigned to the variable: "_title", and displays
it on the web page when we navigate to the URL: localhost:5000/api/ or 
localhost:5000/api/ if the Flask-API is running behind the NGINX Webserver.
'''

@app.route("/api/")
def home_page():
    _title = "Homepage of the Flask API"
    return _title

'''
Below we create a new instance of PyMongo and assign it to a variable called:"crane_connection".
The first parameter passed in this instance call is the instance of our Flask application.
The second parameter passed in this instance call is the connection string of our Crane database
which is called: "Crane_Database".
'''
crane_connection = PyMongo(app, uri="mongodb://localhost:27017/Crane_Database")



# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                   START ASSIGNMENT 1                                  #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
'''
Create a MongoDB connection between our Trail database (Containing our GPS-Routes) and our 
Flask-API. For this you first need to create a new PyMongo instance. 

Because we already have a connection called: "crane_connection" (See line 53) we need to make 
sure this new connection is assigned to another variable. 

TIP: The name of this variable needs to be: "trail_connection" and the port on which the MongoDB
     datastores are available is localhost:27017

To create a new connection you first have to create a new instance of PyMongo. Then you need
pass 2 parameters in this new instance, which are as follows:
The first parameter passed in this instance call is the instance of our Flask application.
The second parameter passed in this instance call is the connection string of our Trail database

In case you get stuck you can always take a look at the line where we defined the Crane Database 
connection (See line 53).
'''

trail_connection = #TODO

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                   END ASSIGNMENT 1                                    #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

@app.route('/api/trails/', methods=['GET'])
def get_all_trails():
    
    query_result = trail_connection.db.trail.find()

    return json_util.dumps(list(query_result), default=json_util.default)



# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                   START ASSIGNMENT 2                                  #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
'''
Create a query that retrieves 1 trail, using the TrailID, from the our MongoDB datastore.

To create a query you first have to declare which connection needs to be used in the query.
TIP: Think about what you did in assignment 1.

Next you have to declare on which MongoDB collection, in the trail database, you want 
to execute the query. 

In the previous part of the workshop you learned what a MongoDB collection is. 
Below follows a small recap in case you forgot: 
A MongoDB collection can be compared to a database table in an SQL database. A table consists 
of rows. A MongoDB collection contains (JSON) documents. In the case of the query you want 
to create, the collection on which you want to perform a query contains the Trail documents.

After you have indicated on which collection you want to execute the query, you have to
declare on which values (field(s) in a document(s)) you want the query to search. In our 
case its the ObjectId of a Trail which has the field name: "_id" in our MongoDB datastore.

The value of this field need to be compared with the value of the id passed which is 
passed when the function: "get_one_trail" is called. 

In case you get stuck you can always take a look at the line where a query is defined
which does the same but than for a Crane tracker (See line 212).  
'''

@app.route('/api/trails/<id>', methods=['GET'])
def get_one_trail(id):

    query_result =  #TODO 

    return json_util.dumps(query_result, default=json_util.default)

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                   END ASSIGNMENT 2                                    #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 


@app.route('/api/signals_by_id/<id>', methods=['GET'])
def get_all_signals_by_id(id):

    query_result = trail_connection.db.signal.find({"trail": ObjectId(id)})

    return json_util.dumps(list(query_result[:2000]), default=json_util.default)



# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                   START ASSIGNMENT 3                                  #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
'''
Create a query that retrieves an N amount of Signals, belonging to a Trail, from the MongoDB
datastore using the ReferenceFields in the Signal documents.


Again, you first have to declare which connection needs to be used in the query.
TIP: Think about what you did in assignment 1.

Next you have to declare on which MongoDB collection, in the trail database, you want 
to execute the query. 

After you have indicated on which collection you want to execute the query, you have to
declare on which values (field(s) in a document(s)) you want the query to search. In this 
case its the ReferenceField in a Signal document which has the field name: "trail",
in our MongoDB datastore.

In case you get stuck you can always take a look at the line where a query is defined
which does the same but than for the transmissions belonging to a Crane tracker (See line 253).  
'''

@app.route('/api/signals_by_amount/<id>/<amount>', methods=['GET'])
def get_all_signals_amount(id,amount):

    query_result_id = #TODO

    return json_util.dumps(list(query_result_id), default=json_util.default)

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                   END ASSIGNMENT 3                                    #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                   START ASSIGNMENT 4                                  #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
'''
Create a query that retrieves all the Trackers in our MongoDB datastore.

Again, you first have to declare which connection needs to be used in the query.

Next you have to declare on which MongoDB collection, in the Crane database, you want 
to execute the query. 

In this case we do not have to search on any fields in the Tracker documents since 
we want to return ALL the trackers in the database. 

In case you get stuck you can always take a look at the line where a query is defined
which does the same but than for all the Trails (See line 88).  

'''

@app.route('/api/trackers/', methods=['GET'])
def get_all_trackers():

    query_result = #TODO
    
    return json_util.dumps(list(query_result), default=json_util.default)

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                   END ASSIGNMENT 4                                    #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

@app.route('/api/trackers/<id>', methods=['GET'])
def get_one_tracker(id):

    query_result = crane_connection.db.tracker.find({"_id": ObjectId(id)})
    
    return json_util.dumps(query_result, default=json_util.default)

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                   START ASSIGNMENT 5                                  #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
'''
Create a query that retrieves all the Transmissions, belonging to a Tracker, from the 
MongoDB datastore using the ReferenceFields in the Transmission documents.


Again, you first have to declare which connection needs to be used in the query.

Next you have to declare on which MongoDB collection, in the Crane database, you want 
to execute the query. 

After you have indicated on which collection you want to execute the query, you have to
declare on which values (field(s) in a document(s)) you want the query to search. In this 
case its the ReferenceField in a Transmission document which has the field name: "tracker",
in our MongoDB datastore.

In case you get stuck you can always take a look at the line where a query is defined
which does the same but than for all the Signals belonging to a Trail (See line 138). 
'''

@app.route('/api/transmissions_by_id/<id>', methods=['GET'])
def get_all_transmissions_by_id(id):

    query_result_id = #TODO

    return json_util.dumps(list(query_result_id[:100]), default=json_util.default)

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
#                                   END ASSIGNMENT 5                                    #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 


@app.route('/api/transmissions_by_amount/<id>/<amount>', methods=['GET'])
def get_all_transmissions_amount(id,amount):

    query_result = crane_connection.db.transmission.find({"tracker": ObjectId(id)})[:int(amount)]

    return json_util.dumps(list(query_result), default=json_util.default)


if __name__ == '__main__':
    # Call the trigger function app.run() to run the Flask application webserver.
    #app.run(host='0.0.0.0') # Run the Flask WSGI app in the normal operation mode!
    app.run(debug=True) # Run the Flask WSGI app in debugging mode!


