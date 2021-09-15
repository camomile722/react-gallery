import Router from 'express'
import dotenv from 'dotenv'
import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import ImageController from '../controllers/imageController.js'

dotenv.config()
const router = new Router()

const storage = multer.diskStorage({
  destination:(req, file, callback) => {

callback(null, 'uploads/')

  },
  filename:(req, file, callback) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-')
    callback(null, fileName)
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Wählen Sie .png, .jpg, .jpeg and .gif Format'));
    }
}

})
var s3 = new aws.S3({ 
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey:process.env.SECRET_ACCESS_KEY
 })
 
var uploadS3 = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'img-react-gallery',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, file.originalname.toLowerCase().split(' ').join('-'))
    }
  })
})

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
router.get('/',  ImageController.getAll)
router.post('/', uploadS3.single("url"), ImageController.addImage, (req, res) => {
  res.send(`/${req.file.path}`)})

export default router