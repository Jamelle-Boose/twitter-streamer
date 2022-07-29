import { Client } from "twitter-api-sdk"
import chalk from "chalk"
import logger from "../../util/logger.js"
import blockedUsers from "../../util/blockedUsers.js"
import convertDate from "../../util/convertDate.js"
import { getGoogleDoc } from "./getGoogleDoc"

const startFilteredStream = async () => {
  const client = new Client(process.env.PROD_TW_BEARER_TOKEN)

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

      if (blockedUsers.includes(handle)) {
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
    process.exitCode = 1
  }
}

export default startFilteredStream
