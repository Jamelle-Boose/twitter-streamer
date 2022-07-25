import inquirer from "inquirer"
const logo = `

	████████╗██╗    ██╗███████╗███████╗███████╗████████╗██╗   ██╗
	╚══██╔══╝██║    ██║██╔════╝██╔════╝██╔════╝╚══██╔══╝╚██╗ ██╔╝
	   ██║   ██║ █╗ ██║█████╗  █████╗  █████╗     ██║    ╚████╔╝ 
	   ██║   ██║███╗██║██╔══╝  ██╔══╝  ██╔══╝     ██║     ╚██╔╝  
	   ██║   ╚███╔███╔╝███████╗███████╗███████╗   ██║      ██║   
	   ╚═╝    ╚══╝╚══╝ ╚══════╝╚══════╝╚══════╝   ╚═╝      ╚═╝   
                                                             
																			   ${process.env.npm_package_version}`

const questions = []

const mainMenu = () => {}

export async function app() {
  console.log(logo)
  console.log(`Welcome to Tweeety!`)

  inquirer
    .prompt(questions)
    .then(answers => {})
    .catch(err => {})
}
