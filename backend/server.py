# Import Flask 
from flask import Flask, request, jsonify
from flask_cors import CORS

# Import Modules for ML Model 
import datetime
import pickle

app = Flask(__name__)
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
        offense_mapping_df = pd.DataFrame({"OFNS_DESC":['ABORTION','ADMINISTRATIVE CODE','AGRICULTURE & MRKTS LAW-UNCLASSIFIED','ALCOHOLIC BEVERAGE CONTROL LAW',
                                                'ARSON','ASSAULT',"BURGLAR'S TOOLS",'BURGLARY','CHILD ABANDONMENT/NON SUPPORT','CRIMINAL MISCHIEF & RELATED OF',
                                                'CRIMINAL TRESPASS','DANGEROUS DRUGS','DANGEROUS WEAPONS','DISORDERLY CONDUCT','DISRUPTION OF A RELIGIOUS SERV',
                                                'ENDAN WELFARE INCOMP','ESCAPE','FELONY SEX CRIMES','FORGERY','FORTUNE TELLING','FRAUD','GAMBLING','HARRASSMENT',
                                                'HOMICIDE','INTOXICATED/IMPAIRED DRIVING','JOSTLING','KIDNAPPING','LARCENY','LOITERING','MISCELLANEOUS PENAL LAW',
                                                'MURDER','NEW YORK CITY HEALTH CODE','NYS LAWS-UNCLASSIFIED FELONY','NYS LAWS-UNCLASSIFIED VIOLATION',
                                                'OFF. AGNST PUB ORD SENSBLTY &','OFFENSE','OTHER STATE LAWS','OTHER TRAFFIC INFRACTION','POSSESSION OF STOLEN PROPERTY',
                                                'RAPE','ROBBERY','SEX CRIMES','THEFT OF SERVICES','UNAUTHORIZED USE OF A VEHICLE','UNDER THE INFLUENCE OF DRUGS',
                                                'UNLAWFUL POSS. WEAP. ON SCHOOL','VEHICLE AND TRAFFIC LAWS'],
                                           "OFNS_DESC_NUM":[i for i in range(47)]})
        
        # Querying DataFrame
        offense = offense_mapping_df.loc[offense_mapping_df["OFNS_DESC_NUM"]==x,"OFNS_DESC"]

        return str(offense)

    def identify_age_group(x):
        """A function that maps User Numerical Age input to String Categorical for Model Input."""

        if x<18:
            return 4
        elif 18<=x<=24:
            return 0
        elif 25<=x<=44:
            return 1
        elif 44<=x<=64:
            return 2
        elif x>=65:
            return 3
        else:
            return 5
        
    # Requesting User Data
    user_data = request.get_json()

    # Reformatting User Data
    age = identify_age_group(int(user_data["age"]))
    gender = user_data["gender"]
    race = user_data["race"]
    time_hour = datetime.strptime(user_data["time"], '%H:%M:%S').strftime('%H')
    time_minute = datetime.strptime(user_data["time"], '%H:%M:%S').strftime('%M')
    latitude = float(user_data["latitude"])
    longitude = float(user_data["longitude"])

    # Formatting Model Input with User Data
    user_input = pd.DataFrame({
        "VIC_AGE_GROUP":[age],
        "VIC_SEX":[gender],
        "VIC_RACE":[race],
        "CMPLNT_HR":[time_hour],
        "CMPLNT_MIN":[time_minute],
        "Latitude":[latitude],
        "Longitude":[longitude]
    })

    # Loading Model 
    with open('xgboost.pkl', 'rb') as file:
        loaded_model = pickle.load(file)

    # Running Model
    user_output = xgboost.predict_proba(user_input)

    # Intialising Output result dictionary 
    result = {
        'Most Succeptible Crimes': [],
        'Risk %': []
    }

    # Reformatting Model Output Labels
    for crime, prob in zip(xgboost.classes_, user_output[0]):
        result['Most Succeptible Crimes'].append(identify_offense(crime))
        result['Risk %'].append(f"{p * 100:.2f}%")

    # Return Model Results
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, use_reloader=False)


