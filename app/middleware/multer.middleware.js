import multer from 'multer'
import { v4 } from 'uuid'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/logos')
  },
  filename: (req, file, cb) => {
    cb(null, `${v4()}-${file.originalname}`)
  },
})

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (_, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

export default multer({
  storage,
  fileFilter,
})
