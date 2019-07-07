const express = require('express');
const router = express.Router();
const response = require('../response');
const Category = require('../models').Category;

/* Category */
router.get('/', (req, res) =>{
  Category.findAll()
    .then(category => {
      category.length > 0 ? response.success(res, category) : response.notFound(res);
    })
    .catch(err => response.error(res, err));
});

router.post('/', (req, res) => {
  Category.create({ ...req.body })
  .then((data) => response.inserted(res, data,"inserted"))
  .catch(err => response.error(res, err));
});

/* Category with params */
router.get('/:id', (req, res) => {
  Category.findOne({where: { id: req.params.id }})
    .then(category => {
      category !== null ? response.success(res, category) : response.notFound(res);
    })
    .catch(err => response.error(res, err));
});

router.patch('/:id', (req,res) => {
  Category.update({ ...req.body }, {where: {id: req.params.id}})
    .then(response.inserted(res, "updated"))
    .catch(err => response.error(res, err));
});

router.delete('/:id', (req,res) => {
  Category.findOne({
    where: { ...req.params }
  })
    .then(category => {
      Category.destroy({ where: {id:req.params.id} })
        .then(result => response.inserted(res, category, "deleted"))
        .catch(err => response.error(res, err));
    })
    .catch(err => response.error(res, err));
});

module.exports = router;