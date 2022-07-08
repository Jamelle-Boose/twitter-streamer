import { Client } from "twitter-api-sdk"
import dotenv from "dotenv"
import logger from "./util/logger"

dotenv.config()

function main() {
	const client = new Client(process.env.TW_BEARER_TOKEN)
	const search_term = process.env.TW_TERM
	const search_hashtag = process.env.TW_HASHTAG
	await client.tweets.addOrDeleteRules({
		add: [
			{
				value: `(${search_term} OR #${search_hashtag}) -is:retweet -is:reply`,
				tag: `${search_term} OR #${search_hashtag}`
			}
		]
	})

	const rules = await client.tweets.getRules()
	logger.log('info', rules)

	const stream = client.tweets.searchStream({
		"tweet.fields": ["created_at"],
		"expansions": ["author_id"]
	})

	for (const tweet of stream) {
		const {data} = tweet
		if (!data) return
		logger.log("info", tweet)
	}
}

main()