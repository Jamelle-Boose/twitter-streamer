const addRule = () => {
  const question = [
    {
      type: "input",
      name: "rule",
      message: "Rule:",
    },
  ]
  inquirer
    .prompt(question)
    .then(answer => {
      console.log(`Adding rule: ${answer.rule}`)
      filteredStream.addRule(answer.rule)
    })
    .catch(err => {
      console.error(err)
    })
}

export default addRule
