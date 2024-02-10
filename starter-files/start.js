require('dotenv').config({ path: '.env' });
const { Pool } = require('pg')

const isProduction = process.env.NODE_ENV === "production"

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`

const pool = new Pool({
  connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
  ssl: isProduction
})

// import all of our models
// require('./models/store')
pool.query(
  'CREATE TABLE IF NOT EXISTS store (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name VARCHAR (255) UNIQUE NOT NULL, slug VARCHAR (255) NOT NULL, description VARCHAR (1000), tags TEXT []);', (err, results) => {
    if (err) { console.log(err) }
  })
// Start our app!
const app = require('./app');
app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
