const express = require('express');
const router = express.Router();
const Category = require('../models').Category;

/* GET home page. */
router.get('/', (req, res) =>{
  res.status(200).json({  
    hallo: "Saya keren"
  })
});

router.post('/', (req, res) => {
  Category.create({
    name : req.body.name
  })
    .then(() => res.json({ status: "ok" }));
})

module.exports = router;