import { Document } from 'mongoose';

export interface IHabit extends Document {
    name: string;           
    count: number;          
    color?: string;         
    completedCount: number; 
    user: string;
}

export interface CreateHabitInput {
    name: string;
    count: number;
    color?: string;
}