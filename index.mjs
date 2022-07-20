import * as dotenv from "dotenv"
dotenv.config()

import { Client } from "twitter-api-sdk"
import logger from "./util/logger.mjs"
import convertDate from "./util/convert_date.mjs"
import blocked_users from "./util/blocked_users.mjs"
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
  const client = new Client(process.env.PROD_TW_BEARER_TOKEN)

  await client.tweets.addOrDeleteRules({
    add: [
      {
        value: `(${search_term} OR #${search_hashtag}) -is:retweet -is:reply -is:quote lang:en`,
        tag: `${search_term} OR #${search_hashtag}`,
      },
    ],
  })

  const rules = await client.tweets.getRules()
  console.log(`
	
		${chalk.green("Twitter rules:")}`)

  rules.data.forEach(rule => {
    console.log(`
			${chalk.yellow(rule.tag)}
			${chalk.blue(rule.value)}
		`)
  })

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

      if (blocked_users.includes(handle)) {
        logger.log("info", `${handle} is blocked`)
        continue
      }

      const row = await sheet.addRow([tweetLink, handle, created_at, text])

      console.log(`${chalk.whiteBright.bgMagenta(row["Author id"])} | ${
        row.Text.length > 50 ? `${row.Text.slice(0, 50)}...` : row.Text
      } | ${chalk.greenBright(convertDate(row.Timestamp))}

      `)
    }
  } catch (error) {
    logger.log("error", error)
  }
}

main()
