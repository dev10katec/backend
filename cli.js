const { program } = require('commander')
const path = require('path')
const fs = require('fs')

const commandsDir = path.join(__dirname, './src/commands')

fs.readdirSync(commandsDir).forEach((file) => {
  if (file.endsWith('.js')) {
    const commandKey = file.replace('.js', '').replace(/\./g, ':')
    const commandPath = path.join(commandsDir, file)
    const commandHandler = require(commandPath)

    program
      .command(`${commandKey} <name>`)
      .description(`Tạo một ${commandKey.split(':')[1]}`)
      .action(commandHandler)
  }
})

program.parse(process.argv)
