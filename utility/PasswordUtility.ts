import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';
import { APP_SECRET } from '../config';
import { AuthPayload } from '../dto';
export const GenerateSalt=async ()=>{
    return await bcrypt.genSalt();
}

export const GeneratePassword=async (password:string,salt:string)=>{
    return await bcrypt.hash(password,salt);
}

export const ValidatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {

    return await GeneratePassword(enteredPassword, salt) === savedPassword;
}

export const GenerateSignature=async (payload:AuthPayload)=>{
    return jwt.sign(payload,APP_SECRET, {expiresIn: '1d'});
}

export const ValidateSignature = async (req: Request)=> {
    
    const signature = req.get('Authorization');

    if (signature) {
        try {
            const token = signature.split(' ')[1];
            const payload = jwt.verify(token, APP_SECRET) as AuthPayload;
            req.user = payload;  // Attach user payload to req
            return true;
        } catch (error) {
            return false;
        }
    }
    return false;
};