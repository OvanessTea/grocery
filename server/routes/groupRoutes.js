const express = require('express');
const groupController = require('../controllers/groupController');
const { createGroup, joinGroup, leaveGroup, deleteGroup, getGroups, updateGroupName } = groupController;
const router = express.Router();

router.post('/create', createGroup);
router.post('/join', joinGroup);
router.post('/leave', leaveGroup);
router.post('/delete', deleteGroup);
router.get('/get', getGroups);
router.post('/update', updateGroupName);
module.exports = router;