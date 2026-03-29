import mongoose, {  Schema } from 'mongoose';

interface Playlist {
  url: string;
  playlistId: string; 
  title: string;
  thumbnail: string;
}

export interface IUser extends Document{
    
    name:string,
    email:string,
    userId:string,
    focusStats:{
        totalFocusMinutes:number,
        completedSessions:number,
        lastCompletedAt?:Date;
    }
    playlists:[Playlist]

}

const UserSchema:Schema<IUser> = new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true

    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    focusStats:{
        totalFocusMinutes:{type:Number,default:0},
        completedSessions:{type:Number,default:0},
        lastCompleted:Date
    },

    playlists:[{
        url:String,
        playlistId:String,
        title:String,
        thumbnail:String

    }]
})

export const User = mongoose.model<IUser>("User",UserSchema)