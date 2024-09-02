import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';


export default (req: Request, res: Response, next: NextFunction ) => {
    const token = ((req.headers.authorization || '').split(' '))[1]

    if(token){
        try{
            const decoded = jwt.verify(token, 'secret134') as JwtPayload;


            req.body.userId = decoded._id
            next();
        }catch(err){
            return res.status(403).json({
                message: 'No access!'
            })
        }
    }else{
        return res.status(403).json({
            message: "No access!"
        })
    }    

}