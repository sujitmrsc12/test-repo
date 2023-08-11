## Description

Its a nodejs app that will store and return the user's session information i.e(Ip Address, sessionId, url parameters, time stamp of session initiated).We are using airtable cloudbased database to store the data. Basically this apis we are using at the client side (html webpage). Whenever user visits the webpage will first check the sessionId in session storage if its not exists then will call the `/session-data` post api to store session data. Users can also see the sessions information by using `/session-data` get api.

## Prequisties

- npm
- node
- serverless
- serverless-offline
- aws-cli
- run `npm i` in the root directory

## Run Locally

- sls offline
- As results of this command you'll get this `http://localhost:3000/dev`
- Now you can access the api endoints using above url

## Deploymenet

- configure aws credentials i.e (accessKeyId, secretKeyId, region, output format) using `aws configure`.
- run npm i in `lib/nodejs` directory.
- run `sls deploy` to deploy it on aws as a lambda.
- collect the endpoint url after the above command completion.
