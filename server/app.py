from flask import Flask, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

CORS(app)
# Setup MongoDB connection
# Replace 'my_mongo_uri' with your actual MongoDB URI and 'mydatabase' with your database name
client = MongoClient(os.getenv('MONGO_URI'))

@app.route('/get_data/<int:Number>', methods=['GET'])
def get_data(Number):
    # Replace 'mycollection' with your actual collection name
    collection = client['hackrtfm']['odb1']
    
    # Fetch all documents within the collection
    # Limit the number of documents to prevent overload, here we are limiting to 10 documents
    documents = list(collection.find().limit(Number))
    
    # Convert the documents to a list of dictionaries and exclude '_id' field
    data = [{k: v for k, v in doc.items() if k != '_id'} for doc in documents]

    # Return the data as JSON
    return jsonify(data)
@app.route('/trips', methods=['GET'])
def get_trip_data():
    # Replace 'mycollection' with your actual collection name
    collection = client['hackrtfm']['driverData']
    
    # Fetch all documents within the collection
    # Limit the number of documents to prevent overload, here we are limiting to 10 documents
    documents = list(collection.find())
    
    # Convert the documents to a list of dictionaries and exclude '_id' field
    data = [{k: v for k, v in doc.items() if k != '_id'} for doc in documents]

    # Return the data as JSON
    return jsonify(data)

@app.route('/revenue', methods=['GET'])
def get_revenue_data():
    # Replace 'mycollection' with your actual collection name
    collection = client['hackrtfm']['driverData']
    
    # Fetch all documents within the collection
    # Limit the number of documents to prevent overload, here we are limiting to 10 documents
    documents = list(collection.find())
    
    # Convert the documents to a list of dictionaries and exclude '_id' field
    data = [{k: v for k, v in doc.items() if k != '_id'} for doc in documents]

    # Return the data as JSON
    return jsonify(data)
@app.route('/miles', methods=['GET'])
def get_miles_data():
    # Replace 'mycollection' with your actual collection name
    collection = client['hackrtfm']['driverData']
    
    # Fetch all documents within the collection
    # Limit the number of documents to prevent overload, here we are limiting to 10 documents
    documents = list(collection.find())
    
    # Convert the documents to a list of dictionaries and exclude '_id' field
    data = [{k: v for k, v in doc.items() if k != '_id'} for doc in documents]

    # Return the data as JSON
    return jsonify(data)
@app.route('/efficiency', methods=['GET'])
def get_efficiency_data():
    # Replace 'mycollection' with your actual collection name
    collection = client['hackrtfm']['odb1']
    
    # Fetch all documents within the collection
    # Limit the number of documents to prevent overload, here we are limiting to 10 documents
    documents = list(collection.find())
    
    # Convert the documents to a list of dictionaries and exclude '_id' field
    data = [{k: v for k, v in doc.items() if k != '_id'} for doc in documents]
    total_efficiency = 0.0
    count = 0
    
    for entry in data:
        if "EFFICIENCY" in entry:
            if entry['EFFICIENCY'] <10:
                continue
            else:
                total_efficiency += entry["EFFICIENCY"]
                count += 1
    
    if count > 0:
        mean_efficiency = total_efficiency / count
    else:
        return None

    carbonPoints=0
    if (10<=mean_efficiency<=40):
        carbonPoints = 10 * 10
    elif(41<=mean_efficiency<=60):
        carbonPoints = 20 * 12
    elif(61<=mean_efficiency<90):
        carbonPoints = 30 * 12
    else:carbonPoints = 40 * 12
    
    resultData=[{"CARBONPOINTS":carbonPoints+100,"MEANEFFICIENCY":mean_efficiency}]
    # efficiency = data[0]
    # Return the data as JSON
    return jsonify(resultData)
port = int(os.getenv('PORT', 5000)) 

if __name__ == '__main__':
    app.run(debug=True, port=port)
