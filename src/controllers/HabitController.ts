import { Request, Response } from "express";
import { validationResult } from "express-validator";

import HabitModel from '../models/Habit'

export const create = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }
        
        const doc = new HabitModel({
            title: req.body.title,
            count: req.body.count,
            color: req.body.color || '',
            completedCount: 0,
            user: req.body.userId
        });

        const habit = await doc.save();
        res.status(201).json(habit);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to create habit :('
        });
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const { id } = req.params;

        const habit = await HabitModel.findByIdAndUpdate(
            id,
            {
                title: req.body.title,
                count: req.body.count,
                color: req.body.color,
                completedCount: req.body.completedCount 
            },
            { new: true }
        );

        if (!habit) {
            return res.status(404).json({ message: 'Habit not found' });
        }

        res.status(200).json(habit);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to update habit :('
        });
    }
};

export const getAll = async (req: Request, res: Response) => {
    try {
        const userId = req.body.userId;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const habits = await HabitModel.find({ user: userId });

        res.status(200).json(habits);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: 'Failed to fetch habits :(',
        });
    }
};