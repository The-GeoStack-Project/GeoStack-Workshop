/*
Here we import some basice modules from Angular.
The HttpClient module is required to make requests to our API.
*/
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

/*
Here we create a class called CraneService. This class will be instantiated
in the MapComponent which we will create later. This class will contain all the
functions which are required to perform API requests to our Flask-API.

The class contains functions related to requesting Crane data from our MongoDB
datastore.
*/
@Injectable()
export class CraneService {

    /*
    Here we create class constructor and pass an instance of an HttpClient.
    The HttpClient is used to perform the following requests to our Flask-API:
    1) GET requests
    2) POST requests
    3) PUT requests
    For more info on the types of requests you can visit the following URL:
    https://www.tutorialspoint.com/http/http_requests.htm
    */
    constructor( private http: HttpClient ) { }

    /**
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #                                   START ASSIGNMENT 1                                  #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #                                                                                       #
    #     COMPLETE THE CODE WHICH IS USED TO OBTAIN ALL (CRANE)TRACKERS FROM OUR DATABASE   #
    #                                                                                       #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #
    # To do this you first have to call an instance of the HTTP client. This is done by
    # using the syntax: "this.http". After that you have to declare the type of reuquest
    # that needs to be made. In this case it's a GET Request to our Flask-API.
    #
    # Next you declare the type of data that is going to be returned.
    #
    # Finally you need to declare the URL that is bound to the function, in our Flask-API,
    # which obtains all the Crane Trackers from our MongoDB datastore.
    #
    # TIP 1: If you forgot which URL is bound to the function that serves our needs, you
    #        have to check back in the code of our Flask-API.
    #
    # TIP 2: If you get stuck you can always take a look at the code on lines (77, 95 and 117)
    #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    */
    getTrackers(): Observable<any[]> {
        return //TODO
    }
    /**
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    #                                   END ASSIGNMENT 1                                    #
    # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
    */

    /*
    Here we create a function called: "getTracker()", which is used to perform an
    HTTP GET request to our Flask-API.

    The function performs a request on the following URL:api/trackers/{id}.
    This URL is bound to a function in our Flask-API. The function, bound to this
    URL, executes a query on our MongoDB datastore and retrieves a tracker which
    has the id passed in this function,from the MongoDB datastore.

    The function:"getTracker()" then returns the tracker to our MapComponent.
    
    NOTE: When performing an API call using an input parameter (noted as: ${parameter name})
          use should encapsulate the Request URL in backtick qoutes (`) instead of singel quotes (').
          Backtick quotes are officiale called grave accent string quotes. 
    */
    getTracker(id:string): Observable<any> {
        return this.http.get<any>(`api/trackers/${id}`)
    }

    /*
    Here we create a function called: "getTransmissionsID()", which is used
    to perform an HTTP GET request to our Flask-API.

    The function performs a request on the following URL:
    api/transmissions_by_id/${id}.

    This URL is bound to a function in our Flask-API. The function, bound to this
    URL, executes a query on our MongoDB datastore and retrieves all
    transmissions belonging to a tracker that has the id passed in this function.

    The function:"getTransmissionsID()" then returns the transmissions to our
    MapComponent.
    */
    getTransmissionsID(id:string): Observable<any[]> {
        return this.http.get<any[]>(`api/transmissions_by_id/${id}`)
    }


    /*
    Here we create a function called: "getTransmissionsAmount()", which is used
    to perform an HTTP GET request to our Flask-API.

    The function performs a request on the following URL:
    api/transmissions_by_amount/${id}/${amount}

    This URL is bound to a function in our Flask-API. The function, bound to this
    URL, executes a query on our MongoDB datastore and retrieves all
    transmissions belonging to a tracker that has the id passed in this function.

    The amount of transmissions it returns is the amount passed in the function
    call.

    The function:"getTransmissionsAmount()" then returns the transmissions to our
    MapComponent.
    */
    getTransmissionsAmount(id:string,amount:number): Observable<any[]> {
        return this.http.get<any[]>(`api/transmissions_by_amount/${id}/${amount}`)
    }
}
