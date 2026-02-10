import multer from "multer"
import path from "node:path"
import { __dirname } from "../config/dirname.js"


export const handleUpload = () => {
    const upload = multer({
        dest: path.resolve(__dirname, "../../public/data/uploads"),
        limits: {fileSize: 3e7}
    })
    return upload.fields([
        {name: "image", maxCount: 1},
    ])
}