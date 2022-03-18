const express = require('express');
const router = express.Router();
const pool = require('../database');


router.get('/', async (req, res, next) => {
  await pool.promise()
    .query('SELECT * FROM meeps')
    .then(([rows, fields]) => {
      res.render('meeps.njk', {
        meeps: rows,
        title: 'Meeps',
        layout: 'layout.njk'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        meeps: {
          error: 'Error getting meeps'
        }
      })
    });
});

router.get('/:id/delete', async (req, res, next) => {
  const id = req.params.id;
  await pool.promise()
  .query('DELETE FROM meeps WHERE id = ?', [id])
  .then((response) => {
    if (response[0].affectedRows == 1) {
      res.redirect('/meeps');
    } else {
      res.status(400).redirect('/meeps');
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      meep: {
        error: 'Error getting meep'
      }
    })
  });
});

router.post('/', async (req, res, next) => {
  const meep = req.body.body;
  if (meep.length < 3) {
    res.status(400).json({
      meep: {
          error: 'Message is too short'
      }
    });
  }

  await pool.promise()
  .query('INSERT INTO meeps (body) VALUES (?)', [meep])
  .then((response) => {
    console.log(response[0].affectedRows);
    if (response[0].affectedRows == 1) {
      res.redirect('/meeps');
    } else {
      res.send('Message failed to send');
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      meep: {
        error: 'Error getting messages'
      }
    })
  });
});



module.exports = router;