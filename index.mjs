import * as dotenv from "dotenv"
dotenv.config()

import { Client } from "twitter-api-sdk"
import logger from "./util/logger.mjs"
import convertDate from "./util/convert_date.mjs"
import { GoogleSpreadsheet } from "google-spreadsheet"
import GoogleAuth from "./client_secret.mjs"
import chalk from "chalk"

async function getGoogleDoc() {
  const doc = new GoogleSpreadsheet(process.env.TW_GOOGLE_DOC_ID)
  await doc.useServiceAccountAuth(GoogleAuth)
  await doc.loadInfo()

  return doc
}

async function main() {
  const search_term = process.env.TW_TERM
  const search_hashtag = process.env.TW_HASHTAG
  const client = new Client(process.env.TW_BEARER_TOKEN)

  await client.tweets.addOrDeleteRules({
    add: [
      {
        value: `(${search_term} OR #${search_hashtag}) -is:retweet -is:reply`,
        tag: `${search_term} OR #${search_hashtag}`,
      },
    ],
  })

  const rules = await client.tweets.getRules()
  console.log("info", rules)

  const doc = await getGoogleDoc()
  const sheet = doc.sheetsByIndex[0]

  const stream = client.tweets.searchStream({
    "tweet.fields": ["created_at"],
    expansions: ["author_id"],
  })

  try {
    for await (const tweet of stream) {
      const { data } = tweet
      if (!data) return

      const { id, created_at, text } = data
      const handle = tweet.includes.users[0].username
      const tweetLink = `https://twitter.com/${handle}/status/${id}`

      sheet.addRow([tweetLink, handle, created_at, text])

      // Log to console
      console.log(`${chalk.whiteBright.bgMagenta(handle)} | ${
        text.length > 30 ? `${text.slice(0, 30)}...` : text
      } | ${chalk.greenBright(convertDate(created_at))}
		
		`)
    }
  } catch (error) {
    logger.log("error", error)
  }
}

main()
