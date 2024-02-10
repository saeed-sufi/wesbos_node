const { pool } = require('./dbConfig')


const list = async () => {
  const data = await pool.query(`SELECT * FROM tasklist;`)
  console.log(data.rows)
}

list()