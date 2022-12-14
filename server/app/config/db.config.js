module.exports = {
    HOST: process.env.MYSQL_HOST,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASSWORD,
    DB: process.env.MYSQL_DB,
    port: process.env.DB_PORT,
    dialect: "matcha_db",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};