const express = require('express');
const router = express.Router();
const Note = require('../models').Note;
const Category = require('../models').Category;
const response = require('../response');

/* Note */
router.get('/', (req, res) =>{
  Note.findAll({
    attributes: ['id', 'title', 'categoryId', 'content', 'createdAt', 'updatedAt' ],
    include: [{ model: Category, attributes: ['name'] }],
    order: [ ['createdAt', 'desc']]
  })
    .then( note => {
      note.length > 0 ? response.success(res, note) : response.notFound(res); 
    })
    .catch(err => response.error(res, err));
});

router.post('/', (req, res) => {
  Note.create({ ...req.body })
    .then(() => response.inserted(res, "inserted"))
    .catch(err => response.error(res, err));
});

/* Note with params */
router.get('/:id', (req, res) => {
  Note.findOne({
    where: { id:req.params.id },
    include: [{ 
      model: Category
    }]
  })
    .then(note => {
      note !== null ? response.success(res, note) : response.notFound(res);
    })
    .catch(err => response.error(res, err));
});

router.patch('/:id', (req,res) => {
  Note.update({ ...req.body }, {where: {id: req.params.id}})
    .then(response.inserted(res, "updated"))
    .catch(err => response.error(res, err));
});

router.delete('/:id', (req,res) => {
  Note.destroy({ where: {id:req.params.id} })
    .then(response.inserted(res, "deleted"))
    .catch(err => response.error(res, err));
});

module.exports = router;
