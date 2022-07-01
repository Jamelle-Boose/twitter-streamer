require("dotenv").config()

const needle = require("needle")
const logger = require("./util/logger")
const GOOGLE_SPREADSHEET = require("google-spreadsheet").GoogleSpreadsheet

const GOOGLE_CREDENTIALS = require("./client_secret.json")
// const TOKEN = process.env.TW_BEARER_TOKEN
let TOKEN

const STREAM_API_URL = "https://api.twitter.com/2/tweets/search/stream"
const RULES_API_URL = `${STREAM_API_URL}/rules`
const AUTH_HEADERS = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-type": "application/json",
  },
  timeout: 20000,
  stream_length: 0,
}

if (!TOKEN) {
  terminate(
    "Config mismatch. Expected TW_BEARER_TOKEN environment variable to contain a Twitter API token. Found undefined."
  )
}

async function setupRules() {
  const search_term = process.env.TW_TERM
  if (!search_term) {
    terminate(
      "Config mismatch. Expecting TW_TERM environment variable to contain name of company."
    )
  }
  const search_hashtag = process.env.TW_HASHTAG
  if (!search_hashtag) {
    terminate(
      "Config mismatch. Expecting TW_HASHTAG environment variable to contain a campaign hashtag."
    )
  }

  const filter_rule = `(${search_term} OR #${search_hashtag}) -is:retweet -is:reply`

  return needle("get", RULES_API_URL, {}, AUTH_HEADERS).then(async res => {
    const { body } = res,
      { data } = body
    if (body && (!data || !data.some(rule => rule.value === filter_rule))) {
      await addRule(filter_rule)
    }
    console.log(
      "\x1b[36m%s\x1b[0m",
      `Setting filter to search for original tweets containing ${search_term} or #${search_hashtag} with links.`
    )
  })
}

async function getGoogleDoc() {
  if (!process.env.TW_GOOGLE_DOC_ID) {
    terminate(
      "Config mismatch. Expecting TW_GOOGLE_DOC_ID environment variable to contain a Google Spreadsheet id. Found undefined."
    )
    return
  }
  const doc = new GOOGLE_SPREADSHEET(process.env.TW_GOOGLE_DOC_ID)
  await doc.useServiceAccountAuth(GOOGLE_CREDENTIALS)
  await doc.loadInfo()
  return doc
}

function storeTweetInSheet(sheet, data) {
  if (!data) return
  try {
    const json = JSON.parse(data)
    const { id, created_at, text } = json.data
    const handle = json.includes.users[0].username
    sheet
      .addRow([
        `https://twitter.com/${handle}/status/${id}`,
        handle,
        created_at,
        text,
      ])
      .then(
        ({
          ["Tweet Link"]: tweetLink,
          ["Author id"]: authorId,
          Timestamp,
          Text,
        }) => logger.log("info", { tweetLink, authorId, Timestamp, Text })
      )
  } catch (err) {
    // no need to do anything here
  }
}

function handleTweets(sheet) {
  const extraFields = "tweet.fields=created_at&expansions=author_id"
  const stream = needle.get(`${STREAM_API_URL}?${extraFields}`, AUTH_HEADERS)

  stream
    .on("data", data => storeTweetInSheet(sheet, data))
    .on("done", msg => terminate(msg))
    .on("err", err => terminate(err))
  return stream
}

function terminate(text) {
  logger.error(text)
  // console.error(text)
  process.exit(1)
}

async function addRule(filter_rule) {
  const filter = {
    add: [
      {
        value: filter_rule,
      },
    ],
  }
  return needle("post", RULES_API_URL, filter, AUTH_HEADERS)
    .then()
    .catch(err => terminate(err))
}

;(async () => {
  await setupRules()
  const doc = await getGoogleDoc()
  if (!doc) {
    terminate("Could not connect to Google Document.")
    return
  }
  const sheet = doc.sheetsByIndex[0]
  handleTweets(sheet)
})()
