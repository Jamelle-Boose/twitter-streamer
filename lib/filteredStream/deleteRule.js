const deleteRule = () => {
  const question = [
    {
      type: "input",
      name: "rule",
      message: "Rule to delete:",
    },
  ]
  inquirer
    .prompt(question)
    .then(answer => {
      const rule = answer.rule
      if (rule) {
        filteredStream.deleteRule(rule)
      }
    })
    .catch(err => {
      console.error(err)
    })
}

export default deleteRule
