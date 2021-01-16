const fs = require('fs');
const fsPromises = require('fs').promises;


const readJson = (filename, callback) => {
    console.log(filename);
    const data = fs.readFileSync(filename)
    callback(JSON.parse(data))
}

const readFileAsSync = (filename, key) => {
  try {
    const dataBuffer = fs.readFileSync(filename)
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
      return []
  }
}
const readJsonPromise = async (filename)=>{
  console.log(filename);
  const data = await fsPromises.readFile(filename)
                               .catch((err) => console.error('Failed to read file', err));
  return JSON.parse(data)
}


module.exports = {readJson, readJsonPromise, readFileAsSync}