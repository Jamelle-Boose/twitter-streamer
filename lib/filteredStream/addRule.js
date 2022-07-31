import inquirer from "inquirer"
import { Client } from "twitter-api-sdk"

const addRule = () => {
  const client = new Client(process.env.PROD_TW_BEARER_TOKEN)

  const questions = [
    {
      type: "input",
      name: "rule",
      message: "Rule:",
    },
    {
      type: "input",
      name: "tag",
      message: "Tag:",
    },
  ]
  inquirer
    .prompt(questions)
    .then(async answers => {
      console.log(`Adding rule: ${answers.rule}`)
      try {
        const addOrDeleteRules = await client.tweets.addOrDeleteRules({
          add: [
            {
              value: answers.rule,
              tag: answers.rule,
            },
          ],
        })
        console.dir(addOrDeleteRules, { depth: null })
      } catch (error) {
        console.error(error)
        process.exitCode = 1
      }
    })
    .catch(err => {
      //HACK: https://github.com/Jamelle-Boose/twitter-streamer/issues/21 this is a hack to get the error to show up in the console
      console.error(err)
    })
}

export default addRule
