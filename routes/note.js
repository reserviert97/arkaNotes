const express = require('express');
const router = express.Router();
const Note = require('../models').Note;

/* GET home page. */
router.get('/', (req, res) =>{
  Note.findAll().then(category => {
    res.status(200).json(category);
  })
});

router

router.post('/', (req, res) => {
  Note.create({
    title : req.body.title,
    content: req.body.content,
    categoryId: req.params.categoryId
  })
    .then(() => res.json({
      status: "ok"
    }));
});


module.exports = router;