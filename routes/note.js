const express = require('express');
const router = express.Router();
const Note = require('../models').Note;
const Category = require('../models').Category;
const response = require('../response');
const Op = require('sequelize').Op;

/* Note */
router.get('/', (req, res) =>{
  const {search, limit, sort, page, category} = req.query;
  const options = {
    attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
    include: [{ model: Category, attributes: ['id', 'name'] }],
    order: [['createdAt', 'desc']],
    limit: 10,
    offset: 0
  };

  // only pagination active
  if (page && !limit && !search && !sort && !category) {  
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
  else if(search && !page && !limit){
    options.where = { title: { [Op.like] : '%'+search+'%' } };
  }
  // search active pagination active
  else if(search && page && !limit){
    options.where = { title: { [Op.like] : '%'+search+'%' } };
    options.offset = page == 1 ? 0 : (page - 1) * 10;
  }
  // search active pagination active and limit active
  else if(search && page && limit){
    options.where = { title: { [Op.like] : '%'+search+'%' } };
    options.limit = parseInt(limit);
    options.offset = page == 1 ? 0 : (page - 1) * limit;
  }

  else if(category && !page && !limit && !search){
    options.where = { categoryId : category };
    options.limit = 20;
  }

  Note.findAndCountAll(options)
      .then(note => {
        const queryInfo = {
          totalRows: note.count,
          page: parseInt(page) || 1,
          totalPage: limit ? Math.ceil(note.count / limit) : Math.ceil(note.count / 10),
          limit: parseInt(limit) || 10
        }
        response.successWithInfo(res, note.rows, queryInfo); 
      })
      .catch(err => response.error(res, err));
});

router.post('/', (req, res) => {
  Note.create({ ...req.body })
    .then(data => {
      Note.findOne({
        where: {id: data.id},
        attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
        include: [{ model: Category, attributes: ['id', 'name'] }]
      }).then(result => response.inserted(res, result, "inserted"))
    })
    .catch(err => response.error(res, err));
});

/* Note with params */
router.get('/:id', (req, res) => {
  Note.findOne({
    where: { ...req.params },
    include: [{ model: Category }]
  })
    .then(note => {
      note !== null ? response.success(res, note) : response.notFound(res);
    })
    .catch(err => response.error(res, err));
});

router.patch('/:id', (req,res) => {
  Note.update({ ...req.body }, {where: {id: req.params.id}})
    .then(() => {
      Note.findOne({
        where: {id: req.params.id},
        attributes: ['id', 'title', 'content', 'createdAt', 'updatedAt'],
        include: [{ model: Category, attributes: ['id', 'name'] }]
      }).then(result => response.inserted(res, result, "updated"))
    })
    .catch(err => response.error(res, err));
});

router.delete('/:id', (req,res) => {
  Note.findOne({
    where: { ...req.params },
    include: [{ model: Category }]
  })
    .then(note => {
      Note.destroy({ where: {id:req.params.id} })
        .then(result => response.inserted(res, note, "deleted"))
        .catch(err => response.error(res, err));
    })
  
});

module.exports = router;
