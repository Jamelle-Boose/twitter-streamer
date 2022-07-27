const app = async () => {
  const search_term = process.env.TW_TERM
  const search_hashtag = process.env.TW_HASHTAG
  const client = new Client(process.env.PROD_TW_BEARER_TOKEN)

  await client.tweets.addOrDeleteRules({
    add: [
      {
        value: `(${search_term} OR #${search_hashtag}) -is:retweet -is:reply -is:quote`,
        tag: `${search_term} OR #${search_hashtag}`,
      },
    ],
  })

  const rules = await client.tweets.getRules()
  const logo = `

	████████╗██╗    ██╗███████╗███████╗███████╗████████╗██╗   ██╗
	╚══██╔══╝██║    ██║██╔════╝██╔════╝██╔════╝╚══██╔══╝╚██╗ ██╔╝
	   ██║   ██║ █╗ ██║█████╗  █████╗  █████╗     ██║    ╚████╔╝ 
	   ██║   ██║███╗██║██╔══╝  ██╔══╝  ██╔══╝     ██║     ╚██╔╝  
	   ██║   ╚███╔███╔╝███████╗███████╗███████╗   ██║      ██║   
	   ╚═╝    ╚══╝╚══╝ ╚══════╝╚══════╝╚══════╝   ╚═╝      ╚═╝   
                                                             
																			   ${process.env.npm_package_version}`
}

export default app
