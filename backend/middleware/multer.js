// eslint-disable-next-line import/no-extraneous-dependencies
const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    console.log(`${file}================================`);
    cb(null, `${Date.now()}-${file.name}`);
  },
});

const upload = multer({
  storage: multerStorage,
})

module.exports = upload;
