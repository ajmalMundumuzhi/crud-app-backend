const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title : {
        type : String, 
        required : [ true, 'Task title is required'],
        trim : true, 
        maxLength : [ 100, 'Task title cannot exceed 100 characters']
    },
    description : {
        type : String,
        required : [ true, 'Task description is required'],
        trim : true,
        maxLength : [ 500, 'Task description cannot exceed 500 characters'],
    },
    status : {
        type : String, 
        enum : {
            values : ['pending, in-progress, completed'],
            message : 'Status is either: pending, in-progress, completed'
        },
        default : 'pending'
    },
    priority : {
        type : String, 
        enum : {
            values : 'Low, Medium, High',
            message : 'Priority is either : Low , Medium, High'
        },
        default : 'Medium'
    },
    dueDate : {
        type : Date, 
        required : [ true, 'Due date is required'],
    }
},{
    timestamps : true
});

module.exports = mongoose.model('Task', taskSchema);