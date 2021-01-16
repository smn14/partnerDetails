const fs = require('fs');

const readFileAsSync = (filename, key) => {
  try {
    const dataBuffer = fs.readFileSync(filename)
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
      return []
  }
}

module.exports = {readFileAsSync}