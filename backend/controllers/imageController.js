import Image from '../models/imageModel.js'

class ImageController {
  async getAll(req, res) {
    try {
      const images = await Image.find({}).sort({ createdAt: 'desc' }).exec()
      res.status(200).json(images)
      //console.log(images)
    } catch (error) {
      res.status(500).json(error)
    }
  }

  async addImage(req, res) {
    try {
      const image = {
        name: req.body.name,
        url: req.file.originalname,
      }
      const newImage = await Image.create(image)
      console.log(req.body)

      res.status(200).json(newImage)
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

export default new ImageController()
