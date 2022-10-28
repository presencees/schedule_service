const fs = require('fs')
const tempDir = "/opt/app/app/temp"
const tempFile = "temp.json"
const filePath = tempDir + "/" + tempFile

exports.set = (data) => {
  if (!fs.existsSync(filePath)) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data));
    } catch (err) {
      console.error(err)
    }
  } else {
    fs.writeFileSync(filePath, JSON.stringify(data));
  }
}
