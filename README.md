Deployment

gcloud beta functions deploy zendata_api \
--gen2 \
--runtime=nodejs18 \
--region=us-west1 \
--trigger-http \
--allow-unauthenticated \
--entry-point cf_api