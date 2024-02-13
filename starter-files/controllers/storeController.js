const pool = require('../dbConfig')

exports.homePage = (req, res) => {
  res.render('index')
}

exports.addStore = (req, res) => {
  res.render('editStore', { title: '➕ Add Store' })
}

exports.createStore = async (req, res) => {

  req.body.tags = Array.isArray(req.body.tags) ? req.body.tags : [req.body.tags]

  await pool.query(`INSERT INTO store (name, slug, description, tags) VALUES ($1, $2, $3, $4)`, [req.body.name, req.body.name, req.body.description, req.body.tags])
  req.flash('success', `Successfully Created ${req.body.name}. Care to leave a review?`)
  res.redirect(`/store/${req.body.name}`)
}

exports.getStores = async (req, res) => {
  const stores = await pool.query(`SELECT * FROM store`)
  res.render('stores', { title: 'Stores', stores: stores.rows })
}

exports.editStore = async (req, res) => {
  const store = await pool.query(`SELECT * FROM store WHERE store.id = $1`, [req.params.id])
  res.render('editStore', { title: `Edit ${store.rows[0].name}`, store: store.rows[0] })
}

exports.updateStore = async (req, res) => {
  const store = await pool.query(`SELECT store.slug FROM store WHERE store.id = $1`, [req.params.id])
  await pool.query(`UPDATE store SET name = $1, description = $2, tags = $3 WHERE store.id = $4`, [req.body.name, req.body.description, req.body.tags, req.params.id])

  req.flash('success', `Successfully updated <strong>${req.body.name}</strong>. <a href="/stores/${store.rows[0].slug}"> View Store ➡️ </a>`)
  res.redirect(`/stores/${req.params.id}/edit`)

  // res.json(req.body)
}