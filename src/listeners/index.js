import fs from 'fs'

fs.readdirSync(__dirname).forEach(async (file) => {
  if (file.endsWith('listener.js')) {
    const module = await import(`./${file}`)
    new module.default()
  }
})
