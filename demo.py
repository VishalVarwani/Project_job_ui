import time
import requests
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor, as_completed
from pymongo import MongoClient

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
        link = job.find('a', class_='base-card__full-link')['href']
        jobs.append({'Title': job_title, 'Company': company, 'Location': location, 'Link': link})
    return jobs

def save_to_mongodb(jobs, db_name='job_listings', collection_name='jobs'):
    client = MongoClient('mongodb://localhost:27017')
    db = client[db_name]
    collection = db[collection_name]
    if jobs:
        collection.insert_many(jobs)

def main():
    all_jobs = []
    urls = [
        f'https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=developer&location=india&trk=public_jobs_jobs-search-bar_search-submit&start={start}'
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

if __name__ == "__main__":
    main()
