import type {Request,Response, NextFunction } from "express";
import type { HttpError } from "http-errors";

export const errorMiddleware=(err:HttpError,req:Request,res:Response,next:NextFunction)=>{
    console.error("🔥 THIS ERROR MIDDLEWARE RAN");
    const statusCode=err.statusCode||500;
    return res.status(statusCode).json({
        message:err.message,
        errorStack:err.stack
    })

}


