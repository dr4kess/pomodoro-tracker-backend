import  jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt'

import { Request, Response } from "express"

import UserModel from '../models/User'
import { validationResult } from "express-validator"
import { AuthRequest } from 'global';


export const register = async (req: Request, res: Response) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
    
        const password = req.body.password
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
    
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl,
        })
    
        const user = await doc.save()

        const token = jwt.sign({
            _id: user._id
        }, 'secret134', {
           expiresIn: '1h' 
        })

        const {passwordHash, ...userData} = user.toObject();
    
        res.json({
            ...userData,
            token
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to register :('
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try{
        const user = await UserModel.findOne({email: req.body.email})
        console.log(user)

        if(!user){
            return res.status(404).json({
                message: "User not found!"
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash)

        if(!isValidPass){
            return res.status(400).json({
                message: "Invalid login or password!"
            })
        }

        const token = jwt.sign({
            _id: user._id
        }, 'secret134', {
           expiresIn: '1h' 
        })

        const {passwordHash, ...userData} = user.toObject();
    
        res.json({
            ...userData,
            token
        })
    } catch(err){
        console.log(err)
        res.status(500).json({
            message: 'Failed to authorize'
        })
    }
}

export const aboutMe = async (req:AuthRequest, res: Response) => {
    try{
        const user = await UserModel.findById(req.userId)
        
        if(!user) {
            return res.status(404).json({
                message: "User not found!"
            })
        }
        const {passwordHash, ...userData} = user.toObject();

        res.json(userData)
    } 
    catch(err){
        console.log(err)
        res.status(500).json({
            message: 'No access!'
        })
    }
}