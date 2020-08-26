import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../../public/images'),
    filename: (req, file, cb) => {
        cb(null, file.originalname + path.extname(file.originalname));
    }
});

export default multer({storage});