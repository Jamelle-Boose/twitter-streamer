import inquirer from "inquirer"
import startFilteredStream from "./startFilteredStream.js"
import disconnectFilteredStream from "./disconnectFilteredStream.js"

const filteredStreamMenu = () => {
  const question = [
    {
      type: "list",
      name: "filteredStream",
      message: "Filtered stream:",
      choices: [
        "Start stream",
        "Disconnect stream",
        "Add rule",
        "Delete rule",
        "Get rules",
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
        case "Disconnect stream":
          disconnectFilteredStream()
          break
        case "Add rule":
          addRule()
          break
        case "Delete rule":
          deleteRule()
          break
        case "Get rules":
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
