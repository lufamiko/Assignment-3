const { Photo, User } = require("../models")

const {
    generateToken
} = require("../utils/jwt")

const {
    comparePassword
} = require("../utils/bcrypt")
class UserController {
    static async getUser(req, res) {
        try {
            const data = await User.findAll({
                include: Photo
            })
            res.status(201).json(data)
        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })
        }
    }
    static async register(req, res) {
        try {
            const {
                username,
                email,
                password
            } = req.body
            const data = await User.create({
                username,
                email,
                password
            })
            res.status(201).json({
                id: data.id,
                username: data.username,
                email: data.email
            })

        } catch (error) {
            res.status(error.code || 500).json({ message: error.message })
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body

            // find di database
            const data = await User.findOne({
                where: {
                    email: email
                }
            })

            if (!data) {
                return res.status(404).json({ message: 'User not found' })
            }
            //compare password
            const isvalid = comparePassword(password, data.password)
            if (!isvalid) {
                throw {
                    code: 401,
                    message: "Incorrect Password!"
                }
            }
            //generate token
            const token = generateToken({
                id: data.id,
                email: data.email,
                username: data.username
            })

            res.status(200).json({
                token
            })
        } catch (error) {
            res.status(error.code || 500).json(error)
        }
    }
}

module.exports = UserController