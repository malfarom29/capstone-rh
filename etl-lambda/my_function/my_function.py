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

def populate_incidents(engine, df):
    df_types = pd.read_sql('SELECT id incident_type_id, name incident_type_name FROM incident_types', engine)
    df_cities = pd.read_sql('SELECT id city_id, name city_name FROM cities', engine)
    df_locations = pd.read_sql('SELECT id location_id, name location_name FROM locations', engine)
    
    df = df.merge(df_types, left_on='tipo', right_on='incident_type_name', how='left')
    df = df.merge(df_cities, left_on='ciudad', right_on='city_name', how='left')
    df = df.merge(df_locations, left_on='localidad', right_on='location_name', how='left')

    months = {
        'Enero': 1,
        'Febrero': 2,
        'Marzo': 3,
        'Abril': 4,
        'Mayo': 5,
        'Junio': 6,
        'Julio': 7,
        'Agosto': 8,
        'Septiembre': 9,
        'Octubre': 10,
        'Noviembre': 11,
        'Diciembre': 12
    }

    df['report_month'] = df['mes'].map(months)
    

    df = df.drop(columns=['tipo', 'ciudad', 'localidad', 'pais', 'incident_type_name', 'city_name', 'location_name', 'mes'])
    df = df.rename(columns={
        'incident_type_id': 'incident_type_id',
        'city_id': 'city_id',
        'location_id': 'location_id',
        'edad': 'age',
        'genero': 'gender',
        'año': 'report_year'
    })

    df.to_sql('incidents', engine, if_exists='append', index=False)

def lambda_handler(event, context):
    # load_dotenv()

    # client_s3 = boto3.client('s3')
    # bucket_name = event['Records'][0]['s3']['bucket']['name']
    # file_key = event['Records'][0]['s3']['object']['key']
    # file_obj = client_s3.get_object(Bucket=bucket_name, Key=file_key)
    # df = pd.read_csv(StringIO(file_obj['Body'].read().decode('utf-8')))

    engine = create_engine('postgresql://malfaro@host.docker.internal:5432/capstone_hr')

    df = pd.read_csv('incidentes_ddhh.csv')

    populate_countries(engine, df)
    populate_cities(engine, df)
    populate_locations(engine, df)
    populate_incident_types(engine, df)
    populate_incidents(engine, df)

    return {
        'statusCode': 200,
        'body': 'Data populated successfully'
    }

lambda_handler({}, {})