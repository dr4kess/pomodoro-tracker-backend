import { Request, Response } from "express";
import { validationResult } from "express-validator";

import TaskModel from '../models/Task'

export const create = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const doc = new TaskModel({
            title: req.body.title,
            dueDate: req.body.dueDate,
            isCompleted: false,
            habitId: req.body.habitId,
            user: req.body.userId
        });

        const task = await doc.save();

        res.status(201).json(task);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to create task :('
        });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const tasks = await TaskModel.find({ user: userId });

        res.status(200).json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to fetch tasks :('
        });
    }
};

export const update = async (req: Request, res: Response) => {
    console.log('ll')
}