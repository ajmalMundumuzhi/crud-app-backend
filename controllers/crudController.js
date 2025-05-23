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