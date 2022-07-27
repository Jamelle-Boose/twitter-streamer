import inquirer from "inquirer"
import filteredStreamMenu from "./filteredStream/filteredStreamMenu.js"

const logo = `

	████████╗██╗    ██╗███████╗███████╗███████╗████████╗██╗   ██╗
	╚══██╔══╝██║    ██║██╔════╝██╔════╝██╔════╝╚══██╔══╝╚██╗ ██╔╝
	   ██║   ██║ █╗ ██║█████╗  █████╗  █████╗     ██║    ╚████╔╝ 
	   ██║   ██║███╗██║██╔══╝  ██╔══╝  ██╔══╝     ██║     ╚██╔╝  
	   ██║   ╚███╔███╔╝███████╗███████╗███████╗   ██║      ██║   
	   ╚═╝    ╚══╝╚══╝ ╚══════╝╚══════╝╚══════╝   ╚═╝      ╚═╝   
                                                             
<<<<<<< HEAD
																			      v${process.env.npm_package_version}`
=======
																			   ${process.env.npm_package_version}`
>>>>>>> 5a9a35f (refactor: beta complete)

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
<<<<<<< HEAD
      switch (answer.mainMenu) {
=======
      switch (answer.MainMenu) {
>>>>>>> 5a9a35f (refactor: beta complete)
        case "Filtered stream":
          filteredStreamMenu()
          break
        case "Exit":
          console.log(`Exiting...`)
          process.exitCode = 1
<<<<<<< HEAD
          break
=======
>>>>>>> 5a9a35f (refactor: beta complete)
        default:
          process.exitCode = 1
      }
    })
    .catch(err => {
      console.error(err)
    })
}

<<<<<<< HEAD
export default function app() {
  console.log(logo)
=======
export default async function app() {
  console.log(logo)
  console.log(`Welcome to Tweeety!`)
>>>>>>> 5a9a35f (refactor: beta complete)
  mainMenu()
}
