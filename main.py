from flask import Flask, render_template, request, jsonify
from assets_blueprint import assets_blueprint


# Set up application.
app = Flask(
    __name__,
    static_url_path="/",
    static_folder="public",
    template_folder="templates",
)

# Provide Vite context processors and static assets directory.
app.register_blueprint(assets_blueprint)


# Setup application routes.
@app.get("/")
def homepage():
    return render_template("homepage.html")


# API for communicating with frontend
@app.route('/api/query', methods=['POST'])
def receive_data_from_frontend():
    try:
        # Get the input data from frontend as a JSON object
        input_data = request.get_json()

        # Get each query parameter from the JSON object frontend just sent us
        #
        periodStart = input_data["periodStart"] # start of measurement period
        periodEnd = input_data["periodEnd"]     # end of measurement period
        subDateStart = input_data["subDateStart"] # `MM-DD` start date of query sub-interval 
        subDateEnd = input_data["subDateEnd"]     # `MM-DD` end date of query sub-interval
        subTimeStart = input_data["subTimeStart"] # eg: `03:01 AM` start time of query sub-interval 
        subTimeEnd = input_data["subTimeEnd"]     # eg: `11:11 PM` end time of query sub-interval
        subWeekDays = input_data["subWeekDays"]   # 7 element boolean array representing
                                                    # inclusion of [Mo,Tu,We,Th,Fr,Sa,Su] in query
        calmValue = input_data["calmValue"]   # ignore entries with wind speeds below this number
        calmUnits = input_data["calmUnits"]   # units for calmValue number ("m/s" or "mph")

        # Query the database using the above parameters

        
        # Populate response_data with query results as JSON object
        response_data = {}


        # Return a success response
        return jsonify({'success': True, 'message': response_data})

    except Exception as e:
        # Return an error response if something goes wrong
        return jsonify({'success': False, 'message': str(e)}), 500