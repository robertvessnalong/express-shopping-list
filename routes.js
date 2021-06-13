const express = require('express');
const router = new express.Router();
const db = require('./fakeDb');
const ExpressError = require('./expressError');

router.get('/', (req, res) => {
  return res.json({ db });
});

router.post('/', (req, res) => {
  const newItem = req.body;
  db.push(newItem);
  return res.status(201).json({ added: newItem });
});

router.get('/:name', (req, res) => {
  const foundItem = db.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError('Item Not Found', 404);
  }
  return res.json({ item: foundItem });
});

router.patch('/:name', (req, res) => {
  const foundItem = db.find((item) => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError('Item Not Found', 404);
  }
  foundItem.name = req.body.name || foundItem.name;
  foundItem.price = req.body.price || foundItem.price;
  res.json({ updated: foundItem });
});

router.delete('/:name', (req, res) => {
  const foundItem = db.findIndex((item) => item.name === req.params.name);
  if (foundItem === -1) {
    throw new ExpressError('Item Not Found', 404);
  }
  db.splice(foundItem, 1);
  res.json({ message: 'Deleted' });
});

module.exports = router;
