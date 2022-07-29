import inquirer from "inquirer"
import { Client } from "twitter-api-sdk"

const addRule = async () => {
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
    .then(answers => {
      console.log(`Adding rule: ${answers.rule}`)
      client.tweets.addOrDeleteRules({
        add: [
          {
            value: answers.rule,
            tag: answers.rule,
          },
        ],
      })
    })
    .catch(err => {
      console.error(err)
    })
}

export default addRule
