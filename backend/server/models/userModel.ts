import mongoose from "mongoose";
import { IUser } from "../config/interface";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your name"],
        trim: true,
        maxLength: [20, "Your name is up to 20 chars long"]
    },
    account: {
        type: String,
        required: [true, "Please add your email or phone"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add your password"],
        trim: true
    },
    avatar: {
        type: String,
        default: 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png'
    },
    role:{
        type: String,
        default:'user'
    },
    type: {
        type: String,
        default: 'register'
    },
}, {
    timestamps: true
})

export default mongoose.model<IUser>('User', userSchema)