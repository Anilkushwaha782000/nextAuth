
import mongoose from 'mongoose';
import {customAlphabet} from 'nanoid'
const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8);
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image:{type:String},
  shortId: { type: String, default: nanoid },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
},{ strict: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
