import mongoose from "mongoose";

export interface Task extends Document {
    title: string;
    dueDate: Date;
    isCompleted: boolean;
    habitId?: mongoose.Schema.Types.ObjectId;
    user: string
}
