import { Client } from "twitter-api-sdk"
import chalk from "chalk"

const getRules = async () => {
  const client = new Client(process.env.PROD_TW_BEARER_TOKEN)
  const rules = await client.tweets.getRules()

  console.log(`
	${chalk.green("Twitter rules:")}`)

  rules.data.forEach(rule => {
    console.log(`
			${chalk.yellow(rule.tag)}
			${chalk.blue(rule.value)}
		`)
  })
}

export default getRules
