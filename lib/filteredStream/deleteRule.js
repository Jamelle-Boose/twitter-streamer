import { Client } from "twitter-api-sdk"
import inquirer from "inquirer"

const deleteRule = () => {
  const ruleID = []

  const question = [
    {
      type: "list",
      name: "getRuleToDelete",
      message: "Which rule should we delete?",
      async choices() {
        const client = new Client(process.env.PROD_TW_BEARER_TOKEN)
        const rules = await client.tweets.getRules()
        rules.data.forEach(rule => {
          ruleID.push(rule)
        })
        return rules.data
      },
    },
  ]
  inquirer
    .prompt(question)
    .then(async answer => {
      try {
        const client = new Client(process.env.PROD_TW_BEARER_TOKEN)
        const ruleToDelete = ruleID.find(rule => {
          return rule.tag === answer.getRuleToDelete
        })
        const deletedRule = await client.tweets.addOrDeleteRules({
          delete: {
            ids: [`${ruleToDelete.id}`],
          },
        })
        console.dir(deletedRule, { depth: null })
      } catch (error) {
        console.error(error)
        process.exitCode = 1
      }
    })
    .catch(err => {
      console.error(err)
      process.exitCode = 1
    })
}

export default deleteRule
