require("dotenv").config()
const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === "production"

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction
})

const createStoreTable = async () => {
  try {
    await pool.query(
      'CREATE TABLE IF NOT EXISTS store (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR (255) UNIQUE NOT NULL, slug VARCHAR (255) UNIQUE NOT NULL, description VARCHAR (1000), tags TEXT []);')
  } catch (error) {
    throw(error)
  }
}

createStoreTable()
module.exports = pool 