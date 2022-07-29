import inquirer from "inquirer"
import filteredStreamMenu from "./filteredStream/filteredStreamMenu.js"

const logo = `

	████████╗██╗    ██╗███████╗███████╗███████╗████████╗██╗   ██╗
	╚══██╔══╝██║    ██║██╔════╝██╔════╝██╔════╝╚══██╔══╝╚██╗ ██╔╝
	   ██║   ██║ █╗ ██║█████╗  █████╗  █████╗     ██║    ╚████╔╝ 
	   ██║   ██║███╗██║██╔══╝  ██╔══╝  ██╔══╝     ██║     ╚██╔╝  
	   ██║   ╚███╔███╔╝███████╗███████╗███████╗   ██║      ██║   
	   ╚═╝    ╚══╝╚══╝ ╚══════╝╚══════╝╚══════╝   ╚═╝      ╚═╝   
                                                             
																			   ${process.env.npm_package_version}`

const mainMenu = () => {
  const question = [
    {
      type: "list",
      name: "mainMenu",
      message: "Please select an option:",
      choices: ["Filtered stream", "Exit"],
    },
  ]
  inquirer
    .prompt(question)
    .then(answer => {
      switch (answer.MainMenu) {
        case "Filtered stream":
          filteredStreamMenu()
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

export default async function app() {
  console.log(logo)
  console.log(`Welcome to Tweeety!`)
  mainMenu()
}