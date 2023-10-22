# Import Flask
from flask import Flask, request, jsonify
from flask_cors import CORS

# Import Modules for ML Model
import pandas as pd
from datetime import datetime
import pickle
import xgboost as xgb

app = Flask(_name_)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})


@app.route("/")
def home():
    return {"message": "Hello from backend"}


@app.route("/upload", methods=['POST'])
def upload():

    # Initilialising Categorical Label Mapping Functions
    def identify_offense(x):
        """A function that maps Model Numerical Label Output to String Crime Label."""

        # Initialising Offense Label Mapping DataFrame
        offense_mapping_df = pd.DataFrame({'OFNS_DESC': ['ADMINISTRATIVE CODE', 'AGRICULTURE & MRKTS LAW-UNCLASSIFIED', 'ALCOHOLIC BEVERAGE CONTROL LAW', 'ARSON',
                                                         'ASSAULT', "BURGLAR'S TOOLS", 'BURGLARY', 'CHILD ABANDONMENT/NON SUPPORT', 'CRIMINAL MISCHIEF & RELATED OF',
                                                         'CRIMINAL TRESPASS', 'DANGEROUS DRUGS', 'DANGEROUS WEAPONS', 'DISORDERLY CONDUCT', 'DISRUPTION OF A RELIGIOUS SERV',
                                                         'ENDAN WELFARE INCOMP', 'ESCAPE', 'FELONY SEX CRIMES', 'FORGERY', 'FORTUNE TELLING', 'FRAUD', 'GAMBLING', 'HARRASSMENT',
                                                         'HOMICIDE', 'INTOXICATED/IMPAIRED DRIVING', 'JOSTLING', 'KIDNAPPING', 'LARCENY', 'LOITERING', 'MISCELLANEOUS PENAL LAW',
                                                         'MURDER', 'NEW YORK CITY HEALTH CODE', 'NYS LAWS-UNCLASSIFIED FELONY', 'NYS LAWS-UNCLASSIFIED VIOLATION', 'OFFENSE',
                                                         'OTHER STATE LAWS', 'OTHER TRAFFIC INFRACTION', 'POSSESSION OF STOLEN PROPERTY', 'RAPE', 'ROBBERY', 'SEX CRIMES',
                                                         'THEFT OF SERVICES', 'UNAUTHORIZED USE OF A VEHICLE', 'UNDER THE INFLUENCE OF DRUGS',
                                                         'UNLAWFUL POSS. WEAP. ON SCHOOL', 'VEHICLE AND TRAFFIC LAWS'],
                                           "OFNS_DESC_NUM": [i for i in range(45)]})

        # Querying DataFrame
        offense = str(offense_mapping_df[offense_mapping_df["OFNS_DESC_NUM"]
                                         == x]["OFNS_DESC"].to_list())[2:-2]

        return offense

    def identify_age_group(x):
        """A function that maps User Numerical Age input to String Categorical for Model Input."""

        if x < 18:
            return 4
        elif 18 <= x <= 24:
            return 0
        elif 25 <= x <= 44:
            return 1
        elif 44 <= x <= 64:
            return 2
        elif x >= 65:
            return 3
        else:
            return 5

    # Requesting User Data
    user_data = request.get_json()

    # Reformatting User Data
    age = identify_age_group(int(user_data["age"]))
    gender = str(user_data["gender"])
    race = str(user_data["race"])
    time = datetime.strptime(user_data["timeOfDeparture"], '%H:%M')
    time_hour = int(time.strftime('%H'))
    time_minute = int(time.strftime('%M'))
    latitude = float(user_data["latitude"])
    longitude = float(user_data["longitude"])

    # Formatting Model Input with User Data
    user_input = pd.DataFrame({
        "VIC_AGE_GROUP_NUM": [age],
        "VIC_SEX": [gender],
        "VIC_RACE": [race],
        "CMPLNT_HR": [time_hour],
        "CMPLNT_MIN": [time_minute],
        "Latitude": [latitude],
        "Longitude": [longitude]
    })

    # Get Dummies
    user_input = pd.get_dummies(
        user_input, columns=["VIC_AGE_GROUP_NUM", "VIC_SEX", "VIC_RACE"])

    # Define all expected columns (the ones your model was trained on)
    expected_columns = ['CMPLNT_HR', 'CMPLNT_MIN', 'Latitude', 'Longitude', 'VIC_AGE_GROUP_NUM_0', 'VIC_AGE_GROUP_NUM_1', 'VIC_AGE_GROUP_NUM_2', 'VIC_AGE_GROUP_NUM_3', 'VIC_AGE_GROUP_NUM_4', 'VIC_AGE_GROUP_NUM_5', 'VIC_SEX_DECLINE TO STATE', 'VIC_SEX_FEMALE', 'VIC_SEX_LGBTQ+', 'VIC_SEX_MALE',
                        'VIC_SEX_NON-BINARY/OTHER', 'VIC_SEX_UNKNOWN', 'VIC_RACE_AMERICAN INDIAN/ALASKAN NATIVE', 'VIC_RACE_ASIAN / PACIFIC ISLANDER', 'VIC_RACE_BLACK', 'VIC_RACE_BLACK HISPANIC', 'VIC_RACE_OTHER', 'VIC_RACE_UNKNOWN', 'VIC_RACE_UNKONWN', 'VIC_RACE_WHITE', 'VIC_RACE_WHITE HISPANIC']

    # Check for missing columns and fill with 0
    for col in expected_columns:
        if col not in user_input.columns:
            user_input[col] = 0

    # Ensure the order of columns matches the training data
    user_input = user_input[expected_columns]

    # Loading Model
    with open('xgboost.pkl', 'rb') as file:
        loaded_model = pickle.load(file)

    # Running Model
    user_output = loaded_model.predict_proba(user_input)

    # Intialising Output result dictionary
    full_result = {
        'Most Succeptible Crimes': [],
        'Risk': []
    }

    # Reformatting Model Output Labels
    for crime, p in zip(loaded_model.classes_, user_output[0]):
        full_result['Most Succeptible Crimes'].append(
            identify_offense(crime))
        full_result['Risk'].append(round(p, 4))

    # Get top 3 Crimes by Risk
    result_df = pd.DataFrame(full_result).sort_values(
        by='Risk', ascending=True)[-3:]

    result = {
        'Most Succeptible Crimes': result_df["Most Succeptible Crimes"].tolist(),
        'Risk': result_df["Risk"].tolist()
    }

    # Return Model Results
    return jsonify(result)


if _name_ == '_main_':
    app.run(debug=True, use_reloader=False)