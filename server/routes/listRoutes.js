const express = require('express');
const listController = require('../controllers/listController');
const { createList, addItemsToList, removeItemsFromList, updateListName, deleteList, getLists } = listController;
const router = express.Router();

router.post('/create', createList);
router.post('/add', addItemsToList);
router.post('/remove', removeItemsFromList);
router.post('/update', updateListName);
router.post('/delete', deleteList);
router.get('/get', getLists);

module.exports = router;