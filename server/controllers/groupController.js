// Importing required modules
const bcrypt = require('bcrypt');
const db = require('../model');

// Assigning the Group model to a constant
const Group = db.groups;

// Creating a group
// The admin_id is the id of the user who created the group
// Admin is the first member of the group
// Group requires an admin to be created
const createGroup = async (req, res) => {
    try {
        const { name, link, admin_id } = req.body;
        const data = { name, link, admin_id };
        const group = await Group.create(data);
        if (group) {
            await GroupUser.create({ group_id: group.id, user_id: admin_id });
            res.status(201).send(group);
        } else {
            res.status(409).send("Group not created");
        }
    } catch (error) {
        console.log(error);
    }
};

// Getting all groups for a user by their id
// GroupUser is a many-to-many relationship between Group and User
const getGroups = async (req, res) => {
    try {
        const { user_id } = req.body;
        const links = await GroupUser.findAll({ where: { user_id: user_id } });
        if (links.length > 0) {
            const groups = await Group.findAll({ where: { id: { $in: links.map(link => link.group_id) } } });
            res.status(200).send(groups);
        } else {
            res.status(404).send("No groups found");
        }
    } catch (error) {
        console.log(error);
    }
};

// Joining a group
// The user_id is the id of the user who is joining the group
// The group_id is the id of the group the user is joining
const joinGroup = async (req, res) => {
    try {
        const { group_id, user_id } = req.body;
        const group = await Group.findByPk(group_id);
        if (group) {
            const link = await GroupUser.create({ group_id: group_id, user_id: user_id });
            res.status(200).send(link);
        } else {
            res.status(404).send("Group not found");
        }
    } catch (error) {
        console.log(error);
    }
};

// Leaving a group
// Only not admin users can leave the group
// The user_id is the id of the user who is leaving the group
// The group_id is the id of the group the user is leaving
const leaveGroup = async (req, res) => {
    try {
        const { id } = req.body;
        const link = await GroupUser.findByPk(id);
        if (link) {
            const deleted_link_id = await GroupUser.destroy({ where: { id: id } });
            res.status(200).send(deleted_link_id);
        } else {
            res.status(404).send("Group not found");
        }
    } catch (error) {
        console.log(error);
    }
};  

// Deleting a group
// The group_id is the id of the group to be deleted
// Only the admin can delete the group
// Deleting a group also deletes all of the group user links
const deleteGroup = async (req, res) => {
    try {
        const { group_id } = req.body;
        const group = await Group.findByPk(group_id);
        if (group) {
            const deleted_group_id = await Group.destroy({ where: { id: group_id } });
            await GroupUser.destroy({ where: { group_id: group_id } });
            res.status(200).send(deleted_group_id);
        } else {
            res.status(404).send("Group not found");
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = { createGroup, getGroups, joinGroup, leaveGroup, deleteGroup };
