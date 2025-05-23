const taskModel = require('../models/taskModel');

exports.getAllTasks = async (req, res) => {
    try {
        console.log("Fetching all tasks from database... ");

        const tasks = await taskModel.find({}).sort({ createdAt : -1 })
        console.log(`Fetched ${tasks.length} tasks`);

        res.status(200).json({
            success: true,
            message : 'Tasks fetched successfully',
            data : tasks,
        });
    }
    catch (err) {
        console.log("Error fetching tasks : ", err);
        res.status(500).json({
            success: false,
            message: 'Error fetching tasks', 
            error : err.message
        })
        
    }

}

exports.getTaskById = async (req,res) => {
    try{
        const { id } = req.params;
        console.log(`Fetching task with ID : ${id}`);

        task = await taskModel.findById(id);

        if(!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            })
        }

        console.log(`Task Found successfully : ${task}`);
        res.status(200).json({
            success: true,
            message: 'Task fetched successfully',
            data: task,
        })
    }
    catch (err) {
        console.log("Error fetching task by ID : ", err);
        res.status(500).json({
            success: false,
            message: 'Error fetching task by ID',
            error: err.message
        })
    }
}

exports.createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate } = req.body;
        
        const newTask = new taskModel({
            title,
            description,
            status,
            priority,
            dueDate
        })
        const savedTask = await newTask.save();
        console.log(`Task created successfully : ${savedTask}`);

        res.status(201).json({
            success: true, 
            message: 'Task created successfully',
            data: savedTask,
        })
    }
    catch (err) {
        console.log("Error creating task : ", err);
        res.status(500).json ({
            success: false,
            message: 'Error creating task',
            error: err.message
        })
    }
}

exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        console.log(`Updating task with ID : ${id}`, updatedData);

        const updatedTask = await taskModel.findByIdAndUpdate(
            id, 
            updatedData,
            {
                new: true, // return the updated document
                runValidators: true, // validate the data before updating
            }
        )

        if(!updatedTask) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            })
        }

        console.log(`Task updated successfully : ${updatedTask}`);
        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data : updatedTask
        })

    }
    catch (err) {
        console.log("Error updating task : ", err);
        res.status(500).json({
            success: false,
            message: 'Error updating task',
            error: err.message
        })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`Deleting task with ID : ${id}`);

        const deletedTask = await taskModel.findByIdAndDelete(id);
        if(!deletedTask) {
            return res.status(404).json({
                success: false,
                message: 'Task not found',
            })
        }

        console.log(`Task deleted successfully : ${deletedTask}`);
        res.status(200).json({
            success: true, 
            message: 'Task deleted successfully',
            data: deletedTask,
        })
    }
    catch (err) {
        console.error("Error deleting task : ", err);
        res.status(500).json({
            success: false, 
            message: 'Error deleting task',
            error: err.message
        })
    }
}