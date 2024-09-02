import mongoose, { Schema } from "mongoose";
import { IHabit } from "types/models/habit.types";

const HabitSchema: Schema = new mongoose.Schema({
        title: {type: String, required: true},
        count: {type: Number, required: true},
        color: {type: String, default: ''},
        completedCount: {type: Number,default: 0},
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}
    }, 
    {
        timestamps: true,
    }
);


export default mongoose.model<IHabit>('Habit', HabitSchema);