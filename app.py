from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Setup MongoDB connection
# Replace 'my_mongo_uri' with your actual MongoDB URI and 'mydatabase' with your database name
client = MongoClient('mongodb+srv://vjk2018:hackrtfm@cluster0.wcypreo.mongodb.net/')

@app.route('/get_data', methods=['GET'])
def get_data():
    # Replace 'mycollection' with your actual collection name
    collection = client['hackrtfm']['odb1']
    
    # Fetch all documents within the collection
    # Limit the number of documents to prevent overload, here we are limiting to 10 documents
    documents = list(collection.find())
    
    # Convert the documents to a list of dictionaries and exclude '_id' field
    data = [{k: v for k, v in doc.items() if k != '_id'} for doc in documents]

    # Return the data as JSON
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
