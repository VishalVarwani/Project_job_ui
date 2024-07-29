from flask import Flask, jsonify, request
from pymongo import MongoClient
from bs4 import BeautifulSoup
import requests
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
import os

app = Flask(__name__)

def fetch_job_data(url, retries=3):
    while retries > 0:
        try:
            response = requests.get(url)
            if response.status_code == 200:
                return response.text
            else:
                break
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
        retries -= 1
        time.sleep(2)
    return None

def parse_job_listings(html):
    jobs = []
    soup = BeautifulSoup(html, 'html.parser')
    job_listings = soup.find_all('li')
    for job in job_listings:
        job_title = job.find('h3', class_='base-search-card__title').text.strip()
        company = job.find('h4', class_='base-search-card__subtitle').text.strip()
        location = job.find('span', class_='job-search-card__location').text.strip()
        # level = job.find('ul', class_='description__job-criteria-list').text.strip()

        link = job.find('a', class_='base-card__full-link')['href']
        jobs.append({'Title': job_title, 'Company': company, 'Location': location, 'Link': link,})

    return jobs

def save_to_mongodb(jobs, db_name='job_listings', collection_name='jobs'):
    client = MongoClient(os.getenv('MONGO_URI', 'mongodb://localhost:27017/'))
    db = client[db_name]
    collection = db[collection_name]
    collection.delete_many({})
    if jobs:
        collection.insert_many(jobs)

@app.route('/', methods=['POST'])
def fetch_jobs():
    data = request.get_json()
    job_title = data.get('job_title', 'developer')
    location = data.get('location', 'india')

    all_jobs = []
    urls = [
        f'https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords={job_title}&location={location}&trk=public_jobs_jobs-search-bar_search-submit&start={start}'
        for start in range(0, 1000, 25)
    ]

    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_url = {executor.submit(fetch_job_data, url): url for url in urls}
        for future in as_completed(future_to_url):
            url = future_to_url[future]
            try:
                html = future.result()
                if html:
                    jobs = parse_job_listings(html)
                    all_jobs.extend(jobs)
                else:
                    continue
            except Exception as e:
                print(f'Error processing URL: {url} - {e}')

    save_to_mongodb(all_jobs)
    return jsonify({'message': 'Job fetching initiated'})

@app.route('/', methods=['GET'])
def get_jobs():
    client = MongoClient(os.getenv('MONGO_URI', 'mongodb://localhost:27017/'))
    db = client['job_listings']
    collection = db['jobs']
    jobs = list(collection.find({}, {'_id': 0}))  # Exclude MongoDB's internal _id field
    return jsonify(jobs)

@app.route('/', methods=['GET'])
def hello_world():
    return jsonify({'message': 'Hello, World!'})

if __name__ == '__main__':
    app.run(debug=True)
