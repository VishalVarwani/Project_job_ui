# app.py

from flask import Flask, jsonify, request
from pymongo import MongoClient

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/pythondata")
db = client['job_listings']  # Replace with your database name
collection = db['jobs']  # Replace with your collection name

# Sample data for testing
initial_jobs = [
    {
        'Title': 'Software Engineer',
        'Company': 'Example Company',
        'Location': 'New York',
        'Link': 'https://example.com/job/123'
    },
    {
        'Title': 'Data Analyst',
        'Company': 'Another Company',
        'Location': 'San Francisco',
        'Link': 'https://example.com/job/456'
    }
]

# Insert initial data into MongoDB (uncomment if needed)
# collection.insert_many(initial_jobs)

@app.route('/api/jobs', methods=['GET'])
def get_jobs():
    try:
        job_title = request.args.get('title')
        jobs = list(collection.find({'Title': {'$regex': job_title, '$options': 'i'}}))  # Case-insensitive search

        return jsonify(jobs)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
