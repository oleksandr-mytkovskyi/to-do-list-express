const db = require("../models");
const List = db.list;
let timerDelete = new Map();

exports.add = async (req, res) => {
    // Create a List
    const list = {
        name: req.body.name,
        status: req.body.status,
        isDeleted: req.body.isDeleted,
        deteteData: req.body.deteteData,
    };
    try {
        const data = await List.create(list);
        res.send(data);
    } catch (e) {
        res.status(500).send({
            message: e.message || "Some error occurred while creating the List."
        });
    }
}

exports.get = async (req, res, query) => {
    try {
        const { limit, offset } = query;
        const data = await List.findAll({
            attributes: ['id', 'name', 'status', 'updatedAt', 'createdAt'],
            where: { isDeleted: false },
            order: [
                ['id', 'ASC'],
            ],
            limit: limit || 10,
            offset: offset,
        });
        res.send(data);
    } catch (e) {
        res.status(500).send({
            message: e.message || "Some error occurred while retrieving Lists."
          });
    }
}

exports.getById = async (req, res, id) => {
    try {
        const data = await List.findAll({
            attributes: ['id', 'name', 'status', 'updatedAt', 'createdAt'],
            where: { id: id, isDeleted: false }
        });
        if (!data[0]) {
            throw new Error(`Not found list with ${id}`);
        } 
        res.send(data[0]);
    } catch (e) {
        res.status(500).send({
            message: e.message || "Some error occurred while retrieving Lists."
          });
    }
}

exports.updata = async (req, res, id) => {
    try {
        const data = await List.update(req.body, {
            where: { id: id }
        });
        if (data != 1) {
            res.status(500).send({
                message: `Cannot update List with id=${id}. Maybe List was not found or req.body is empty!`
            });
            return;
        }
        res.send({
            message: "List was updated successfully.",
            id: id
        })
    } catch (e) {
        res.status(500).send({
            message: e.message || "Error updating List with id=" + id
        });
    }
}

exports.delete = async (req, res, id) => {
    try {
        const data = await List.destroy({
            where: { id: id }
        });
        if (data != 1) {
            throw new Error(`Cannot delete List with id=${id}. Maybe List was not found!`);
        }
        // потрібно записувати десь в логи сервера цю операцію
        console.log(`List with ${id} was deleted successfully!`);
    } catch (e) {
        console.log(e.message || `Could not delete List with id=${id}`);
    }
}

exports.addToTrash = async (req, res, id) => {
    const postData = {
        isDeleted: true,
        deleteData: new Date().toISOString(),
    };
    try {
        const foundList = await List.findOne({
            where: { id: id, isDeleted: true}
        });
        if(foundList) {
            throw new Error(`Cannot delete List with id=${id} because he was deleted`);
        }

        const data = await List.update(postData, {
            where: { id: id }
        });
        if (data != 1) {
            res.status(500).send({
                message: `Cannot delete List with id=${id}. Maybe List was not found!`
            });
            return;
        }
        res.send({
            message: "List was deleted successfully!",
            id: id
        });
        let timerId = setTimeout(() => {
            this.delete(req, res, id);
            timerDelete.delete(id);
        }, 60000);
        timerDelete.set(id, timerId);
    } catch (e) {
        res.status(500).send({
            message: e.message || "Could not delete List with id=" + id
        });
    }
}

exports.removeToTrash = async (req, res, id) => {
    clearTimeout(timerDelete.get(id));
    timerDelete.delete(id);
    const postData = {
        isDeleted: false,
        deleteData: null,
    };
    try {
        const data = await List.update(postData, {
            where: { id: id }
        });
        if (data != 1) {
            res.status(500).send({
                message: `Cannot recovery List with id=${id}. Maybe List was not found!`
            });
            return;
        }
        res.send({
            message: "List was recovery successfully!",
            id: id
        });
    } catch (e) {
        res.status(500).send({
            message: e.message || "Could not recovery List with id=" + id
        });
    }
}

