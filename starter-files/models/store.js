exports.pool.query(
  'CREATE TABLE IF NOT EXISTS store (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR (255) UNIQUE NOT NULL), slug VARCHAR (255) NOT NULL, description VARCHAR (1000), tags VARCHAR (255)', (err, results) => {
    if (err) throw err
    console.log(results.rows)
  })
