const { Photo, User } = require('../models');

class PhotoController {
    //bisa di akses siapa saja yang sudah login
    static async getAllPhotos(req, res) {
        try {
            const data = await Photo.findAll({
                include: User
            })

            res.status(200).json(data)
        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })

        }

    }

    // bisa di akses jika user id sama dengan yang login
    static async getPhotoById(req, res) {
        try {
            const { id } = req.params;
            const userData = req.UserData

            const data = await Photo.findOne({
                where: {
                    id: id,
                    UserId: userData.id
                }
            })

            if (!data) {
                throw {
                    code: 404,
                    message: "Data not found!"
                }
            }

            res.status(200).json(data)

        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })

        }
    }
    static async addPhoto(req, res) {
        try {
            const { title, caption, image_url } = req.body;
            const userData = req.UserData

            const data = await Photo.create({
                title,
                caption,
                image_url,
                UserId: userData.id

            })
            res.status(201).json(data)
        } catch (error) {
            res.status(res.code || 500).json(error)
        }
    }

    static async updatePhoto(req, res) {
        try {
            const { id } = req.params;
            const userData = req.UserData
            const { title, caption, image_url } = req.body;
            const data = await Photo.update({
                title,
                caption,
                image_url
            }, {
                where: {
                    id: id,
                    UserId: userData.id
                },
                returning: true
            })
            if (!data[0]) {
                return res.status(404).json({ message: 'Photo not found' })
            }

            res.status(201).json(data)
        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })
        }
    }
    static async deletePhotoById(req, res) {
        try {
            const { id } = req.params
            const userData = req.UserData
            const data = await Photo.destroy({
                where: {
                    id: id,
                    UserId: userData.id
                }
            })
            if (!data) {
                throw {
                    code: 404,
                    message: 'Photo not found'
                }
            }
            res.status(200).json("Photo deleted")
        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })
        }
    }
}

module.exports = PhotoController;