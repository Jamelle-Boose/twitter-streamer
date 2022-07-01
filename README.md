# Twitter-Streamer

An app to stream Tweets in real-time using Twitter API v2.

- Clone this repository
- Run `npm install` in the repo's directory
- Obtain a json key file for Google API (See https://www.fastcomet.com/tutorials/nodejs/google-spreadsheet-package) and place it inside the config directory
- Obtain a Twitter access token
- Create a Google Spreadsheet and get its id (The last part of the url: https://docs.google.com/spreadsheets/d/xxxxxxx)
- Make sure to share the sheet with `client_email` from within the Google json key file
- `npm start`

## Environment Variables

The code relies on the following variables to be available, e.g. by using an `.env` file.

```
TW_BEARER_TOKEN=<A Twitter API v2 bearer token>
TW_TERM=<A search term>
TW_HASHTAG=<A tag (without the # sign)>
TW_GOOGLE_DOC_ID=<The Google Sheet id to use>
```

It also requires the Google json keyfile to be stored in `/config/client_secret.json`
