const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index.njk', { layout: 'layout.njk', title: 'Express' });
});

module.exports = router;