const tasksModel = require('../models/taskModel.js')


const getAll = async (_req, res) => {

    const tasks = await tasksModel.getAll();

    return res.status(200).json(tasks);
};

const createTask = async (req, res) => {
    const createdTask = await tasksModel.createTask(req.body);
    return res.status(201).json(createdTask);
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const deletedTask = await tasksModel.deleteTask(id);
    return res.status(204).json();
}

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;
    const updatedTask = await tasksModel.updateTask(id, { title, status });
    return res.status(204).json();
}


module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask
};
