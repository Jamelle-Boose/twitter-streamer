import inquirer from "inquirer"
import startFilteredStream from "./startFilteredStream.js"
import addRule from "./addRule.js"
import deleteRule from "./deleteRule.js"
import getRules from "./getRules.js"

const filteredStreamMenu = () => {
  const question = [
    {
      type: "list",
      name: "filteredStream",
      message: "Filtered stream:",
      choices: [
        "Get rule(s)",
        "Start stream",
        "Add rule",
        "Delete rule",
        "Exit",
      ],
    },
  ]
  inquirer
    .prompt(question)
    .then(answer => {
      switch (answer.filteredStream) {
        case "Start stream":
          startFilteredStream()
          break
        case "Add rule":
          addRule()
          break
        case "Delete rule":
          deleteRule()
          break
        case "Get rule(s)":
          getRules()
          break
        case "Exit":
          console.log(`Exiting...`)
          process.exitCode = 1
        default:
          process.exitCode = 1
      }
    })
    .catch(err => {
      console.error(err)
    })
}

export default filteredStreamMenu
