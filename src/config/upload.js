const multer = require('multer');
const path = require('path');


module.exports = {
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            const extname = path.extname(file.originalname);
            const name = path.basename(file.originalname, extname);
            cb(null, `${name}-${Date.now()}${extname}`);
        }
    })
}