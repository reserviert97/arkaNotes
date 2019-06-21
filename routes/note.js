const express = require('express');
const router = express.Router();
const Note = require('../models').Note;
const Category = require('../models').Category;
const response = require('../response');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* Note */
router.get('/', (req, res) =>{
  const {search, limit, sort, page} = req.query;
  const options = {
    attributes: ['id', 'title', 'categoryId', 'content', 'createdAt', 'updatedAt' ],
      include: [{ model: Category, attributes: ['name'] }],
      order: [['createdAt', 'desc']],
      limit: 10,
      offset: 0
  };

  // only pagination active
  if (page && !limit && !search && !sort) {  
    options.offset = page == 1 ? 0 : (page - 1) * 10;
  } 
  // pagination and limit active
  else if (page && limit && !search && !sort) { 
    options.limit = parseInt(limit);
    options.offset = page == 1 ? 0 : (page - 1) * limit;
  } 
  // Only sort active
  else if (sort && !page && !limit) { 
    options.order = [['createdAt', sort]];
  } 
  //Sort and pageination active
  else if (sort && page && !limit) { 
    options.order = [['createdAt', sort]];
    options.offset = page == 1 ? 0 : (page - 1) * 10;
  } 
  // Sort, pagination and limit active
  else if (sort && page && limit) {
    options.order = [['createdAt', sort]];
    options.limit = parseInt(limit);
    options.offset = page == 1 ? 0 : (page - 1) * limit;
  }
  // search active
  else if(search && !page){
    options.where = {
      title: {
        [Op.like] : '%'+search+'%'
      }
    };
  }

  Note.count()
    .then(rows => {
      Note.findAll(options)
      .then(note => {
        const queryInfo = {
          totalRows: rows,
          page: page || 1,
          totalPage: limit ? Math.ceil(rows / limit) : Math.ceil(rows / 10),
          limit: limit || 10
        }
        note.length > 0 ? response.withQuery(res, note, queryInfo) : response.notFound(res); 
      })
      .catch(err => response.error(res, err));
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
