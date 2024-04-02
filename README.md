Gold API
goldAPI requires APIKEY, to obtain the api key, go to https://www.goldapi.io/dashboard.


Deployment

gcloud beta functions deploy zendata_api \
--gen2 \
--runtime=nodejs18 \
--region=us-west1 \
--trigger-http \
--allow-unauthenticated \
--entry-point cf_api