const toPascalCase = (str) => {
  return str.replace(/(^\w|[\s-_.]\w)/g, (match) => match.replace(/[\s-_.]/, '').toUpperCase())
}

module.exports = toPascalCase
