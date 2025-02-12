const multer = require("multer");
const crypto = require("crypto");
const path = require('path');
//Disk Storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
      crypto.randomBytes(12, (err, name)=>{
        const fileName = name.toString('hex')+path.extname(file.originalname);
      cb(null, fileName);
      })
    }
  })
  
  const upload = multer({ storage: storage })
  //export
  module.exports = upload;