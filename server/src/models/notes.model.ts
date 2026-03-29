import mongoose, { Schema } from "mongoose";

export interface INotes extends Document{
    userID:string;
    title:string;
    content:string;
    createdAt:string;
    updatedAt:string;

}

const NotesSchema=new Schema<INotes>({
    userID:{
        type:String,
        required:true,
        index:true
    },
    title:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    
},{timestamps:true})


export const Note=mongoose.model<INotes>("Note",NotesSchema)