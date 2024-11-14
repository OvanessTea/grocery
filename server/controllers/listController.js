// Importing required modules
const db = require('../model');

// Assigning the List model to a constant
const List = db.lists;

// Creating a list
// The group_id is the id of the group the list belongs to
// One group can have many lists
// One list could be in one group at a time
// The items is an array of objects, each object representing an item in the list
// Each item has an id, name, quantity, and status
// Where status is a boolean value indicating whether the item has been purchased
// The quantity is an integer value indicating the quantity of the item
const createList = async (req, res) => {
    try {
        const { group_id, name, items } = req.body;
        const data = { group_id, name, items };
        const list = await List.create(data);
        if (list) {
            res.status(201).send(list);
        } else {
            res.status(409).send("List not created");
        }
    } catch (error) {
        console.log(error);
    }
}

// Getting a list by its id
const getLists = async (req, res) => {
    try {
        const { group_id } = req.body;
        const lists = await List.findAll({ where: { group_id: group_id } });
        if (lists.length > 0) {
            res.status(200).send(lists);
        } else {
            res.status(404).send("Lists not found");
        }
    } catch (error) {
        console.log(error);
    }
}

// Adding array of items to a list
// The list_id is the id of the list to add the items to
// The items is an array of objects, each object representing an item to add to the list
const addItemsToList = async (req, res) => {
    try {
        const { list_id, items } = req.body;
        const list = await List.findByPk(list_id);
        if (list) {
            const updatedList = await List.update({ items: [...list.items, ...items] }, { where: { id: list_id } });
            res.status(200).send(updatedList);
        } else {
            res.status(404).send("List not found");
        }
    } catch (error) {
        console.log(error);
    }
}

// Removing array of items from a list
// The list_id is the id of the list to remove the items from
// The item_ids is an array of ids of the items to remove from the list
const removeItemsFromList = async (req, res) => {
    try {
        const { list_id, item_ids } = req.body;
        const list = await List.findByPk(list_id);
        if (list) {
            const updatedList = await List.update({ items: list.items.filter(item => !item_ids.includes(item.id)) }, { where: { id: list_id } });
            res.status(200).send(updatedList);
        } else {
            res.status(404).send("List not found");
        }
    } catch (error) {
        console.log(error);
    }
}

// Deleting a list
// The list_id is the id of the list to be deleted
const deleteList = async (req, res) => {
    try {
        const { list_id } = req.body;
        const list = await List.findByPk(list_id);
        if (list) {
            const deleted_list = await List.destroy({ where: { id: list_id } });
            res.status(200).send(deleted_list);
        } else {
            res.status(404).send("List not found");
        }
    } catch (error) {
        console.log(error);
    }
}

// Updating the name of a list
// The list_id is the id of the list to be updated
// The name is the new name of the list
const updateListName  = async (req, res) => {
    try {
        const { list_id, name } = req.body;
        const list = await List.findByPk(list_id);
        if (list) {
            const updated_list = await List.update({ name: name }, { where: { id: list_id } });
            res.status(200).send(updated_list);
        } else {
            res.status(404).send("List not found");
        }
    } catch (error) {
        console.log(error);
    }
};

// Exporting the functions
module.exports = { createList, addItemsToList, removeItemsFromList, updateListName, deleteList, getLists };
