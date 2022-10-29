const fs = require('fs')
const tempDir = "/opt/app/app/temp"
const tempFile = "temp.json"
const filePath = tempDir + "/" + tempFile

exports.set = (input) => {
  if (fs.existsSync(filePath)) {
    try {
      let newData = JSON.parse(input)
      let oldData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      let data = Object.assign(oldData, newData)
      fs.writeFileSync(filePath, JSON.stringify(data))
    } catch (err) {
      console.error(err)
    }
  } else {
    fs.writeFileSync(filePath, input);
  }
}

exports.get =  (key) => {
  if (fs.existsSync(filePath)) {
    const data =  fs.readFileSync(filePath, 'utf8')
    // console.log(data);
    return JSON.parse(data)[key]
  }
}

exports.del = (key) => {
  if (fs.existsSync(filePath)) {
    let data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    delete data[key]
    fs.writeFileSync(filePath, JSON.stringify(data))
  }
}