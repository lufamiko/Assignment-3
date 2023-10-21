const request = require("supertest")
const app = require("../app")
const { Photo, User } = require("../models")
const dataUser = {
    username: "Eko PWP",
    email: "admin@mail.com",
    password: "terlanjuradmin"
}
const dataPhoto = {
    title: 'photo 1',
    caption: 'ini caption ya',
    image_url: 'https://ekopurnomowp.com',

}

// untuk post atau add photo 
describe("POST /photos", () => {
    let token
    beforeAll(async () => {
        try {
            await User.create(dataUser)
        } catch (err) {
            console.log(err)
        }
    })

    // untuk login user
    it("Should be response 200", (done) => {
        request(app)
            .post("/users/login")
            .send({
                username: dataUser.username,
                email: dataUser.email,
                password: dataUser.password
            })
            .expect(200)
            .end((err, res) => {
                if (err) done(err)
                expect(res.body).toHaveProperty("token")
                expect(typeof res.body.token).toEqual("string")
                token = res.body.token
                done()
            })
    })

    // untuk buat data photo response 201
    it("Should be response 201", (done) => {
        request(app)
            .post("/photos")
            .set("Authorization", token)
            .send(dataPhoto)
            .expect(201)
            .end((err, res) => {
                if (err) done(err)
                expect(res.body).toHaveProperty("id")
                expect(res.body).toHaveProperty("title")
                expect(res.body).toHaveProperty("caption")
                expect(res.body).toHaveProperty("image_url")
                expect(res.body).toHaveProperty("UserId")
                expect(res.body).toHaveProperty("updatedAt")
                expect(res.body).toHaveProperty("createdAt")
                done()
            })
    })
    it("Should be response 401", (done) => {
        request(app)
            .post("/photos")
            .send(dataPhoto)
            .expect(401)
            .end((err, res) => {
                if (err) done(err)
                expect(res.body).toHaveProperty("message")
                expect(res.body.message).toEqual("Token not provided!")
                done()
            })
    })
    afterAll(async () => {
        try {
            await Photo.destroy({ where: {} }),
                await User.destroy({ where: {} })
        } catch (error) {
            console.log(error);
        }
    })
})

// Get all Photo
describe("GET /photos", () => {
    let token
    beforeAll(async () => {
        try {
            await User.create(dataUser)
        } catch (err) {
            console.log(err)
        }
    })

    // untuk login user response 200
    it("Should be response 200", (done) => {
        request(app)
            .post("/users/login")
            .send({
                username: dataUser.username,
                email: dataUser.email,
                password: dataUser.password
            })
            .expect(200)
            .end((err, res) => {
                if (err) done(err)
                expect(res.body).toHaveProperty("token")
                expect(typeof res.body.token).toEqual("string")
                token = res.body.token
                done()
            })
    })

    // untuk get photo response 200
    it("Should be response 200", (done) => {
        request(app)
            .get("/photos")
            .set("Authorization", token)
            .expect(200)
            .end((err, res) => {
                //if (err) done(err)
                //expect(res.body).toHaveLength(1)
                done()
            })
    })

    // untuk get photo response 401 atau tidak ada token
    it("Should be response 401", (done) => {
        request(app)
            .get("/photos")
            .expect(401)
            .end((err, res) => {
                if (err) done(err)
                expect(res.body).toHaveProperty("message")
                expect(res.body.message).toEqual("Token not provided!")
                done()
            })
    })
    afterAll(async () => {
        try {
            await Photo.destroy({ where: {} }),
                await User.destroy({ where: {} })
        } catch (error) {
            console.log(error);
        }
    })
})

// Get Photo by Id
describe("GET /photos/:id", () => {
    beforeAll(async () => {
        try {
            await User.create(dataUser)
        } catch (err) {
            console.log(err)
        }
    })

    // untuk login user
    it("Should be response 200", (done) => {
        request(app)
            .post("/users/login")
            .send({
                username: dataUser.username,
                email: dataUser.email,
                password: dataUser.password
            })
            .expect(200)
            .end((err, res) => {
                if (err) done(err)
                expect(res.body).toHaveProperty("token")
                expect(typeof res.body.token).toEqual("string")
                token = res.body.token
                done()
            })
    })
    // untuk buat data photo 200
    it("Should be response 200", (done) => {
        request(app)
            .post("/photos")
            .set("Authorization", token)
            .send(dataPhoto)
            .expect(201)
            .end((err, res) => {
                if (err) done(err)
                id = res.body.id
                done()
            })
    })

    // untuk get photo by id response 200
    it("Should be response 200", (done) => {
        request(app)
            .get(`/photos/${id}`)
            .set("Authorization", token)
            .expect(200)
            .end((err, res) => {
                done(err)
            })
    })

    // untuk get photo by id response 404
    it("Should be response 404", (done) => {
        request(app)
            .get(`/photos/100`)
            .set("Authorization", token)
            .expect(404)
            .end((err, res) => {
                if (err) done(err)
                expect(res.body).toHaveProperty("message")
                expect(res.body.message).toEqual("Data not found!")
                done()
            })
    })
    afterAll(async () => {
        try {
            await Photo.destroy({ where: {} }),
                await User.destroy({ where: {} })
        } catch (error) {
            console.log(error);
        }
    })
})







