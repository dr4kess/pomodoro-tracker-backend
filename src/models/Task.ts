import mongoose, { Schema } from 'mongoose';
import { Task } from 'types/models/task.types';


const TaskSchema: Schema = new Schema({
    title: { type: String, required: true },
    dueDate: { type: Date, required: true },
    isCompleted: { type: Boolean, default: false },
    habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: false },
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    },  
    {
        timestamps: true
    }
);

export default mongoose.model<Task>('Task', TaskSchema);