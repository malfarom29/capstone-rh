import boto3
import pandas as pd
from io import StringIO
from sqlalchemy import create_engine
from dotenv import load_dotenv
import os

engine = create_engine('postgresql://malfaro@host.docker.internal:5432/capstone_hr')

def populate_countries(engine, df):
    df_pais = df['pais'].unique()
    df_pais = pd.DataFrame(df_pais, columns=['name'])

    existing_countries = pd.read_sql('SELECT name FROM countries', engine)
    new_countries = df_pais[~df_pais['name'].isin(existing_countries['name'])]
    new_countries.to_sql('countries', engine, if_exists='append', index=False)

def populate_cities(engine, df):
    df_cities = df[['ciudad', 'pais']]
    df_cities = df_cities.drop_duplicates()
    df_cities = df_cities.rename(columns={'ciudad': 'name', 'pais': 'country_name'})

    countries = pd.read_sql('SELECT id country_id, name country_name FROM countries', engine)
    existing_cities = pd.read_sql('SELECT name, country_id FROM cities', engine)
    new_cities = pd.merge(df_cities, countries, on='country_name', how='left')
    new_cities = new_cities.drop(columns=['country_name'])
    new_cities = new_cities[~new_cities['name'].isin(existing_cities['name'])]
    new_cities.to_sql('cities', engine, if_exists='append', index=False)

def populate_locations(engine, df):
    df_locations = df['localidad'].unique()
    df_locations = pd.DataFrame(df_locations, columns=['name'])
    existing_locations = pd.read_sql('SELECT name FROM locations', engine)
    new_locations = df_locations[~df_locations['name'].isin(existing_locations['name'])]
    new_locations.to_sql('locations', engine, if_exists='append', index=False)

def populate_incident_types(engine, df):
    df_incident_types = df['tipo'].unique()
    df_incident_types = pd.DataFrame(df_incident_types, columns=['name'])

    existing_incident_types = pd.read_sql('SELECT name FROM incident_types', engine)
    new_incident_types = df_incident_types[~df_incident_types['name'].isin(existing_incident_types['name'])]
    new_incident_types.to_sql('incident_types', engine, if_exists='append', index=False)

def lambda_handler(event, context):
    load_dotenv()

    client_s3 = boto3.client('s3')
    bucket_name = event['Records'][0]['s3']['bucket']['name']
    file_key = event['Records'][0]['s3']['object']['key']
    file_obj = client_s3.get_object(Bucket=bucket_name, Key=file_key)
    df = pd.read_csv(StringIO(file_obj['Body'].read().decode('utf-8')))

    engine = create_engine(os.getenv('DATABASE_URL'))

    populate_countries(engine, df)
    populate_cities(engine, df)
    populate_locations(engine, df)
    populate_incident_types(engine, df)

    return {
        'statusCode': 200,
        'body': 'Data populated successfully'
    }
