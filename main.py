from flask import Flask, render_template, request, jsonify, send_file
from assets_blueprint import assets_blueprint
import requests
import pandas as pd
import numpy as np
import matplotlib
from matplotlib import pyplot as plt
import matplotlib.cm as cm
from windrose import WindroseAxes
import io

matplotlib.use('Agg')

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

@app.route('/generate-rose', methods=['POST'])
def generate_rose():
    data = request.json
    inputs = data.get('inputs', {})
    rose_params = data.get('rose', {})

    start_date = inputs.get('start_date')
    end_date = inputs.get('end_date')

    url = "https://windrose-api-r2oaltsiuq-uc.a.run.app/meteorological_data/csv/"
    params = {
    "start_date": start_date,
    "end_date": end_date
    }

    response = requests.get(url, params=params)

    if response.status_code == 200:
        # Save the content to a CSV file
        with open('meteorological_data.csv', 'wb') as file:
            file.write(response.content)
        print("File downloaded successfully.")
    else:
        print(f"Failed to download file. Status code: {response.status_code}")
        print(response.text)

    df = pd.read_csv('meteorological_data.csv')

    ax = WindroseAxes.from_ax()
    ax.bar(df.wind_direction, df.wind_speed, normed=True, opening=0.8, edgecolor='white')
    ax.set_xticklabels(['E', 'NE', 'N', 'NW', 'W', 'SW', 'S', 'SE'])

    handles, labels = ax.get_legend_handles_labels()

    ax.legend_ = super(WindroseAxes, ax).legend(handles, labels, loc='upper right', title='Wind Speed (m/s)')

    # Save the image to a BytesIO object
    img_io = io.BytesIO()
    plt.savefig(img_io, format='png')
    img_io.seek(0)

    return send_file(img_io, mimetype='image/png')

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