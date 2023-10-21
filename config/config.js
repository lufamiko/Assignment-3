require("dotenv").config()
const config = {
    "development": {
        "username": process.env.DB_USERNAME_DEV,
        "password": "001929",
        "database": "PhotoAlbum",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "test": {
        "username": "postgres",
        "password": "001929",
        "database": "PhotoAlbum_test",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
    }
}
module.exports = config