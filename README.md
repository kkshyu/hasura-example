# Hasura Example

## Step 1. Setup

1. log into https://hasura.io
2. bind your Heroku account
3. create a new project

## Step 2. Migration

1. go into the hasura folder: `cd hasura`
2. migrate DB: `hasura migrate apply --endpoint https://YOUR_HEROKU_APP_ID.hasura.app`
3. migrate Hasura: `hasura metadata apply --endpoint https://YOUR_HEROKU_APP_ID.hasura.app`
4. change `hasura/config.yaml` endpoint into your instance

## Step 3. Development

1. turn on hasura console to listen to the changes: `yarn hasura`
2. start developing with the project

## Note

You can only run step 3. for the further development

## Reference

- Hasura: https://hasura.io
- Heroku: https://www.heroku.com/
