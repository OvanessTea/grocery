const express = require('express');
const groupController = require('../controllers/groupController');
const { createGroup, joinGroup, leaveGroup, deleteGroup, getGroups } = groupController;
const router = express.Router();

router.post('/group/create', createGroup);
router.post('/group/join', joinGroup);
router.post('/group/leave', leaveGroup);
router.post('/group/delete', deleteGroup);
router.get('/group/get', getGroups);

module.exports = router;