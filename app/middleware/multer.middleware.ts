import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import { v4 } from 'uuid'

const storage = multer.diskStorage({
  destination: (_req, file, cb) => {
    cb(null, 'uploads/logos')
  },
  filename: (_req, file, cb) => {
    cb(null, `${v4()}-${file.originalname}`)
  },
})

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
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
