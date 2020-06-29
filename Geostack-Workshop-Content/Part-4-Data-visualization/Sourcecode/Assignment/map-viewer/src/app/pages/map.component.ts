/*
Here we import the default angular modules
*/
import {
	Component,
	OnInit
} from '@angular/core';

/**
 * Here we import the services which are used to call functions that perform
 * API requests to our Flask-API, which will then execute a query on our MongoDB
 * datastore.
 */
import {
	CraneService
} from '../services/crane.service'

/**
 * Here we create a global constant called:"ol".
 * This constant represents the instance of the geospatial framework OpenLayers.
 * To use the build in functions of OpenLayers we first need to call this constant.
 * For example to create a new TileLayer we need the syntax: "new ol.layer.Tile()"
 */
declare const ol: any;

/**
 * Here we create the component metadata. The following applies to this code:
 * 1) selector: If we want to use the map component, we add the code:
 *    <app-map/> to the HTML file in which we want to add the component.
 * 2) templateUrl: The HTML file in which we will define the layout of the
 *    component.
 * 3) providers: A list of providers (services) in which we have defined the
 *    functions required to perform API calls.
 */
@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	providers: [CraneService]
})

export class MapComponent implements OnInit {

	/*
    Here we create a global variable called: "map". This is the variable
    to which the OpenLayers map will be assigned after it's created. Because
    of the global variable we can use the map throughout the whole component.
    */
	private map: any;

	/*
    Here we create a global variable called: "animation".
    The interval of the animation will be assigned to this global variable.
    What the interval is will become clear when we start programming the
    animation.
    */
	private animation: any;

	/*
    Here we create a global variable called: "trackers".
    The type of the variable is a list of any type. This list starts of empty,
    When the function:"getTrackers()" in the function:"ngOnInit()"
    the list is filled with trackers.

    The trackers in this list will be displayed in the dropdown box used to
    select trackers.
    */
	private trackers: any[] = [];

	/*
    Here we create a global variable called: "transmissions".
    The type of the variable is a list of any type. This list starts of empty,
    When the function:"getTransmissions()" is triggered, when a Tracker is
    selected from the dropdown list in the application, the list is filled with
    transmissions belonging to the selected Tracker.
    */
	private transmissions: any[] = [];

	/*
    Here we create the class constructor of the MapComponent. We pass the map and
    CraneServices in the constructor. We assign the service to a fitting variable,
    this variable can be reused throughout the whole component. We use these
    variable to call the functions in our service which will then perform API
    calls to our Flask-API.
    */
	constructor(private _CraneService: CraneService) {}

	/*
    Here we create the ngOnInit() function. All the logic in this function will
    be executed when the component is loaded.

    When loading the application the following functions will be triggered:
    1) createMap(), this function creates the OpenLayersMap.
    2) getTrackers(), this function triggers the function in the CraneService
       which retrieves all the Trackers from our MongoDB datastore.
    */
	ngOnInit() {
		this.createMap();

		this.getTrackers();
	}

	/*
    Here we create a function called: "getTrackers()"

    This function is triggered in the ngOnInit() function. This function triggers
    the function: "getTrackers()" in our CraneService file, which then returns
    all the trackers in our MongoDB datastore.

    The syntax used in the function is as follows:

    this.{service}.{function}.subscribe({elements} =>
          this.trackers = {elements}
      });
    );

    The following applies to the syntax above:
    - service = the service which contains the API call functions
    - function = the function from the service you want to trigger. This function
      will then return the data retrieved from our datastore.
    - elements = this name can be generic. This value stands for the list of
      data returned by the function. A foreach function is performed on the list
      of data because we want to add all rows in the elements to the Tracker list.
    */
	getTrackers(): void {
		this._CraneService.getTrackers().subscribe((trackers: []) => (this.trackers = trackers));
	}


	/*
    Here we create a function called: "getTransmissions()"

    When the function:"getTransmissions()" is triggered, when a Tracker is
    selected from the dropdown list in the application, the list is filled with
    transmissions belonging to the selected Tracker.

    The data obtained from the function which was triggered in the service, will
    then be passed as parameter in the following functions:
    - createPointLayer(), this function then creates the data points using the
      list of transmissions obtained from the MongoDB datastore.
    - createLineLayer(), this function then creates the lines using the
      list of transmissions obtained from the MongoDB datastore.

    The retrieved transmissions are also assigned to the global variable:
    "transmissions".
    */
	getTransmissions(trackerId): void {
		this._CraneService.getTransmissionsID(trackerId).subscribe(
			(transmissions: []) => (

				this.createPointLayer(transmissions),
					this.createLineLayer(transmissions),
					this.transmissions = transmissions)
		)
	}

	/*
    Here we create the function which creates a new instance of an OpenLayers map.
    in the function we create a View and A baselayer which we then assign to the map.
    The map will be created in the HTML div element with the id: "map".
    This is the div element in the layout of the MapComponent (map.component.html)

    The view of the Map contains information related to that start values of the map.
    These start values are as follows:
    1) maxZoom: This value defines the maximum level in which you can zoom in on the
                map.
    2) center:  This value defines the coordinates on which the view of the map will
                  start. If you set the value of the center to the coordinates of the
                  Netherlands, the map will be centered in the Netherlands when it's
                  loaded.
    3) zoom:    This value defines the zoom level on which the view of the map will
                start. If you set this value to 18, the map will be zoomed in on the
                coordinates set as value of the center.
    */
	createMap(): void {

		/**
		 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
		 #                              START ASSIGNMENT 2                               #
		 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
		 #
		 #                COMPLETE THE CODE FOR THE CREATION OF THE BASELAYER
		 #
		 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
		 #
		 #   We now know that our maps are available via the Tileserver, running behind
		 #   the NGINX webserver, via the URL "http://localhost/tiles/{Name of the map}",
		 #   where the name of the map is the name of the tilestache entry declared in
		 #   our Tilestache configuration file.
		 #
		 #   We want the baselayer to contain the URL of our OpenStreetMap.
		 #
		 #   TIP: You also need to declare the values of the Tiles that need to be
		 #		 retrieved from our Tilestache Tileserver. We did this by declaring
		 #        3 values at the end of an URL.
		 #
		 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
		 */

		let baseLayer = new ol.layer.Tile({
			source: new ol.source.XYZ({
				//TODO: Create the URL which is required to obtain the OpenStreetMap
				//TODO: from our Tilestache Server.
			})
		});

		let view = new ol.View({
			maxZoom: 18,
			center: [0, 0],
			zoom: 3
		});

		this.map = new ol.Map({
			target: 'map',
			view: view,
			//TODO: Add the baselayer to our OpenLayers Map.
			layers: []
		});

		/**
		 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
		 #                              END ASSIGNMENT 2                                 #
		 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
		 */
	}

	/*
    Here we create a function called: "createPointLayer()"

    This function is triggered in the function: "getTransmissions()" and creates
    a layer (VectorLayer) of datapoints, using the list of transmissions which
    is passed as parameter in this function. The layer is then added to the
    OpenLayers Map.

    The following steps are executed in this function:
    1) First the styling of the datapoints is created. If you want more info
       related to creating the styling of a layer, you should follow the
       complete GeoStack course.
    2) An empty list is created which is going to contain all the features
       (datapoints)
    3) Then we want to create a geometry for each of the coordinates in
         the list of transmissions which is passed as parameter in the
         function: "createPointLayer()".
    4) For each of the rows in the list of transmissions a feature is
       then create to which we assign the geometry created in step 3
       as geometry value of the feature. These features are then added
       to the empty list of features, created in step 2.
    */
	createPointLayer(transmissions): void {

		/*
		Below the styling, that each of the datapoints is going to have, is created.
		*/
		let pointStyle = new ol.style.Style({
			image: new ol.style.Circle({
				fill: new ol.style.Fill({
					color: 'rgba(178,34,34, 0.7)'
				}),
				stroke: new ol.style.Stroke({
					width: 1,
					color: 'rgba(178,34,34, 1)'
				}),
				radius: 3,
			}),
		});


		/**
		 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
		 #                              START ASSIGNMENT 3                               #
		 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
		 #                                                                               #
		 #               COMPLETE THE CODE LOGIC FOR CREATING THE FEATURES               #
		 #                                                                               #
		 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
		 #
		 # 	When this function is triggered in the function: "getTransmissions()" and
		 #   create a layer (VectorLayer) of datapoints, using the list of transmissions
		 #   which is passed as parameter in this function. The layer is then added to the
		 #   OpenLayers Map.
		 #
		 #	We are going to loop through  each of the rows in the list of transmissions.
		 #   Then we are going to retrieve the coordinate data from each of the rows using
		 #   the name of the Field (in our MongoDB datastore) that represents the
		 #   coordinates.
		 #   We also need to convert these coordinates to a valid format which can be used
		 #   by the Geospatial framework: "OpenLayers". We do this by using the built-in
		 #   OpenLayers function: "ol.proj.fromLonLat()" in which we pass the coordinates
		 #   as parameter.
		 #
		 #   After this conversion we are going to create a feature in which we are going
		 #   to assign the converted coordinates as feature geometry.
		 #
		 #   TIP 1: To obtain the value of the Coordinates you need to know the name
		 # 		   of the field representing the coordinates in a datarow.
		 #   TIP 2: A datarow in the list of transmissions can be seen as one document
		 #          in the Transmission collection from our MongoDB datastore.
		 #
		 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
		 */

		/*
        Below an empty list is created to which we are going to add all the features
        which are created below.
        */
		let pointFeatureList = [];

		/*
        Below a for each loop is created which loops through all of the transmissions
        in the list of transmissions, passed as parameter when the function is called.
        NOTE: The code inside this forEach loop will be executed on each of the rows
              in the list of transmissions.
        */
		transmissions.forEach(row => {

			/*
      		Below we create the geometry which is later going to be assigned to the geometry
      		value of a feature with the geometry type:"Point".
      		*/
			let pointGeometry = new ol.geom.Point(
				//TODO: Convert the Coordinates to a value which can be used by Openlayers
			);

			/*
      		Below a new feature is created for each of the transmissions in the list of
      		transmissions.
      		*/
			let pointFeature = new ol.Feature({
				type: "Point",
				//TODO: Add the converted coordinates, from the previous TODO, as geometry of the feature
			});

			/*
            Below we set the styling of the point to have the styling which we defined
     		above.
        	*/
			pointFeature.setStyle(pointStyle);

			/*
		    Below we add the newly created feature to our empty list of PointFeatures.
		    */
			pointFeatureList.push(pointFeature);

		});

		/*
		Below we create a new VectorSource to which we are going to add the list of
		PointFeatures as features of the VectorSource.
		*/
		let pointVectorSource = new ol.source.Vector({
            //TODO: Add the list of PointFeatures as value of the VectorSource Features.
		});

		/*
		Below we create a new vectorLayer to which we assign the pointVectorSource,
		which we created above, as source.
		*/
		let pointVectorLayer = new ol.layer.Vector({
			source: pointVectorSource
		});

		/*
		Below we add the newly created layer to our OpenLayers Map.
		*/
		this.map.addLayer(pointVectorLayer)
		/**
		 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
		 #                              END ASSIGNMENT 3                                 #
		 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
		*/
	}


	/*
  Here we create a function called: "createLineLayer()"

  This function is triggered in the function: "getTransmissions()" and creates
  a layer (VectorLayer) of lines, using the list of transmissions which
  is passed as parameter in this function. The layer is then added to the
  OpenLayers Map.

  The following steps are executed in this function:
  1) First the styling of the lines is created. If you want more info
     related to creating the styling of a layer, you should follow the
     complete GeoStack course.
  2) An empty list is created which is going to contain all the features
     (lines)
  3) Then we want to create a geometry for each of the coordinates in
       the list of transmissions which is passed as parameter in the
       function: "createLineLayer()".
  4) For each of the rows in the list of transmissions a feature is
     then create to which we assign the geometry created in step 3
     as geometry value of the feature. These features are then added
     to the empty list of features, created in step 2.
  */
	createLineLayer(transmissions): void {
		/*
        Below the styling, that each of the lines is going to have, is created.
        */
		let styles = {
			'lineString': new ol.style.Style({
				stroke: new ol.style.Stroke({
					width: 2,
					color: "#FF0000",
				}),
				zIndex: 101
			})
		};

		/*
        Below we create an empty OpenLayers geometry of the type: "LineString".
        A linestring is a list of coordinates.
        */
		let lineString = new ol.geom.LineString([]);

		/*
        Below a for each loop is created which loops through all of the transmissions
        in the list of transmissions, passed as parameter when the function is called.
        We are going to add each of the coordinates to the empty linestring by using
        the built-in OpenLayers function: ".appendCoordinate()" on the linestring.

        NOTE: The code inside this forEach loop will be executed on each of the rows
              in the list of transmissions.

        */
		transmissions.forEach(row => {

			/*
            Below we assign the location, on which the values of the coordinates are located,
            to a variable called: "coordinates". Because we do this we don't have to use the
            syntax: "row.coord.coordinates" each time we want to obtain the coordinates.
            A linestring is a list of coordinates.
            */
			let coordinates = row.coord.coordinates;

			/*
            Below we transform the coordinates to a format which can be used by OpenLayers.
            we assign the results to a variable called:"transformedCoords".
            */
			let transformedCoords = ol.proj.fromLonLat(coordinates);

			/*
            Below we add the transformed Coordinates to the empty LineString by using
            the built-in OpenLayers function: ".appendCoordinate()" on the linestring.

            We pass the variable:"transformedCoords" as parameter in this function.
            */
			lineString.appendCoordinate(transformedCoords);
		});

		/*
        Below we create a new feature with the geometry type:"lineString".
        We only want to create one feature since we add the list of coordinates
       (the LineString) as geometry of this feature.
        */
		let lineStringFeature = new ol.Feature({
			type: 'lineString',
			geometry: lineString
		});

		/*
        Below we create a new VectorSource to which we add the LineStringFeature
        as features.
        */
		let lineVectorSource = new ol.source.Vector({
			features: [lineStringFeature]
		});

		/*
      Below we create a new vectorLayer to which we assign the lineVectorSource,
      which we created above, as source. We also add the styling of the lines
      using a styling function.
      The styling function links the styling, defined above, to the correct
      type of feature: "line" in this case.
      For more information related to this function you should follow the
      complete GeoStack Course.
      */
		let lineVectorLayer = new ol.layer.Vector({
			source: lineVectorSource,
			style: function(feature) {
				return styles[feature.get('type')];
			},
		});

		/**
		 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
		 #                              START ASSIGNMENT 4                               #
		 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
		 #                        ADD THE LINELAYER TO THE OPENLAYERS MAP  				       #
		 #																		                                      		 #
		 # 			TIP: Remember how we added the PointLayer to our map?                    #
		 #																			   																		   #
		 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
		 */
		 //TODO:
		/**
		 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
		 #                              END ASSIGNMENT 4                                 #
		 # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
		 */
	}

	/*
    Here we create a function called: "animateRoute()".

    This function contains the code login which is required to animate a route
    displayed on the Map. The function will use the transmissions assigned to
    the global variable:"transmissions".

    The following steps are executed in this function:

    1) The function:"animateRoute()" is assigned to a button which is defined
       in the HTML layout of the Map component (map.component.html).

    2) When the button is pressed, the function: animateRoute() is triggered.

    3) The function creates an Overlay on the map, which contains the marker
       (the blue dot that moves) from which the position (geometry) is updated
       constantly.

    4) A variable called:"currentCoordIndex" is created. The value of this
       variable starts at 0 and will increment by one after an N amount of time.
       the value of this variable will define which index in the list of transmission
       needs to be used next. If this is not clear, it wil become more clear when
       creating the code.

    5) Then a check is performed to see if the value of the global variable:
       "animation" is equal to undefined. The following can than happen:

       5.1) If the value of the global variable:"animation" IS equal to undefined
               The nested function:"startAnimation()" is triggered. This is done using
               a built-in JavaScript function called:"setInterval()". In this function
               we pass 2 parameters which are as follows:

               - The function that needs to be triggered.
               - An Integer representing a time in milliseconds.

               This function makes sure that the function which is passed as first
               parameter is triggered periodically, depending on the integer passed
               as second parameter in the function call.

               NOTE: The lower the value of the second parameter, the faster
                     the animation will play.

               The interval is then assigned to the global variable:"animation". We do
               this because we need the value of this variable to stop the animation.

       5.2) If the value of the global variable:"animation" IS NOT equal to undefined
               the animation is running and needs to be stopped. This is done using a
               built-in JavaScript function called:"clearInterval()". In this function
               we pass 1 parameter which is as follows:

               - The global variable:"animation" which contains the value of the interval
                 that is currently running.

            After the animation is stopped, the value of the global variable is set
            to undefined again. Now when we click on the start button again the
            application will know there is no animation running.

    6) The nested function:"startAnimation()" does the following when triggered:

       6.1) The coordinates, from the list of transmissions, on the index which is
               equal to the value of the variable:"currentCoordIndex", are obtained
               from the list.

       6.2) The coordinates are then converted to the format which is used by OpenLayers.

       6.3) The position(geometry) of the marker, created at the beginning of the function:
               "animateRoute()" is then updated by using the built-in OpenLayers function:
               ".setPosition()". As parameter we pass the coordinates which were transformed
               in the previous step.

       6.4) The value of the variable:"currentCoordIndex" is incremented with 1.
            This will result in the following:
            When the startAnimation() function is called again, by the interval,
            the coordinates, from the list of transmissions, on the new index (old index +1)
            are then obtained. Which will then move the marker to the next transmission
            coordinates in the list.

       6.5) A check is performed to see if the route has not reached the last coordinate yet.
            The last coordinate is the same as the last value in the list of transmissions (
            the last index in the list). We check this by comparing the length of the
            transmission list - 1 to the value of the variable:"currentCoordIndex".
            If these values are the same, it means the last coordinate has been reached.
            If this is the case, the same is done as in step 5.2.
    */
	animateRoute() {

		/*
    	Below the marker is created by creating a new overlay and assigning the HTML
    	element with the id:"marker" as overlay element.
    	*/
		let marker = new ol.Overlay({
			positioning: 'center-center',
			element: document.getElementById('marker'),
		});

		/*
        Below the marker overlay is added to the OpenLayers Map.
        */
		this.map.addOverlay(marker);

		/*
        The line below is required since we are using nested functions (A function in a function)
        The function startAnimation() is defined in the function animateRoute().
        This means that when we want to use global variables in the function: "startAnimation()",
        we need to use _this.{global variable} instead of this.{global variable}.
        */
		let _this = this;

		/*
        Below we assign the value 0 to the variable: "currentCoordIndex". We do this because
        every time we call the function: "animateRoute", we want the Index to be set to 0.
        */
		let currentCoordIndex = 0;

		/*
        Below we perform the check to see whether an animation is currently running.
        We do this by checking if the value of the global variable: "animation" is
        equal to undefined. If this is the case, no animation is running.
        If this is NOT the case, an animation IS running.

        We use a short version of an IF/ELSE statement which is done by using the
        following syntax:

        {The condition that needs to be checked} ? {the code that is executed is
        the condition is true} : {the code that is executed if the condition is false}

        */
		this.animation == undefined ? this.animation = setInterval(startAnimation, 40) :
			(clearInterval(this.animation), this.animation = undefined);



		/*
      Below we create the function:"startAnimation()" the logic inside this function will
      be executed periodically, depending on the value of the integer passed in the
      setInterval function.
      */
		function startAnimation() {


			/*
        	Below the coordinates, from the list of transmissions, on the index which is
        	equal to the value of the variable:"currentCoordIndex", are obtained
        	from the list and assigned to a variable called:'coordinates".
        	*/
			let coordinates = _this.transmissions[currentCoordIndex]['coord']['coordinates'];


      /**
      # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
      #                              START ASSIGNMENT 5                               #
      # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
      #                       Finish the code required to create an Animation         #
      # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
      */


			//TODO: Transform the value of the variable:"coordinates" to the correct
			//TODO  format that can be used by OpenLayers. When doing this, think about what
			//TODO  you did when creating the line and point layers.
      // TIP: place te anwser behind the code:" let transformedCoords = "
			let transformedCoords

			/*
			Below the old position of the marker is replaced by the new position which
			is the value of the variable:"transformedCoords".
      		*/
			marker.setPosition(transformedCoords);

			//TODO: Create the code which increments the value of the currentCoordIndex
			//TODO  variable by 1.

			/**
			# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
			#                              END ASSIGNMENT 5                                 #
			# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
			*/
			  /*
			  Below the check is performed to see if the route has not reached the last coordinate yet.
			  The last coordinate is the same as the last value in the list of transmissions (
			  the last index in the list). We check this by comparing the length of the
			  transmission list - 1 to the value of the variable:"currentCoordIndex".
			  If these values are the same, it means the last coordinate has been reached
			  and the animation needs to be stopped by clearing the interval.
			  */
			currentCoordIndex == _this.transmissions.length - 1 ? (clearInterval(_this.animation), _this.animation = undefined) :
				null
		}
	}
}
