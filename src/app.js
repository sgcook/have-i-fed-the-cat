const express = require('express');
const { Cat } = require('../src/models');

const app = express();

app.use(express.json());

app.post('/cats', (req, res) => {
  Cat.create(req.body)
    .then(cat => res.status(201).json(cat))
    .catch(res.status(400));
});

app.get('/cats', (req, res) => {
  Cat.findAll({where: req.query})
    .then(cats => res.status(200).json(cats))
    .catch(res.status(400));
});

app.get('/cats/:catId', (req, res) => {
  Cat.findByPk(req.params.catId)
    .then(cat => res.status(200).json(cat))
    .catch(res.status(400));
});

app.patch('/cats/:catId', (req, res) => {
  Cat.update(req.body, {where: {id: req.params.catId} })
    .then(cat => res.status(200).json(cat))
    .catch(res.status(400));
});

app.delete('/cats/:catId', (req, res) => {
  const ID_TO_DELETE = req.params.catId;
  Cat.destroy({ where: { id: ID_TO_DELETE } })
    .then(cat => res.status(200).json(cat))
    .catch(res.status(400));

});

app.patch('/feed/:catId', (req, res) => {
    Cat.update({lastFed: new Date()}, {where: {id: req.params.catId} })
      .then(cat => res.status(200).json(cat))
      .catch(res.status(400));
})

module.exports = app;