const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController')

// Do work here
router.get('/', storeController.myMiddleware, storeController.homePage);

router.get('/reverse/:name', (req, res) => {

  res.render('hello', {
    dog: req.query.dog
  })
  // res.send([...req.params.name].reverse().join(''))

})
module.exports = router;
