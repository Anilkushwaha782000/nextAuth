import connectToDatabase from "../../utils/databaseconnection";
import User from "../../models/user";
import bcrypt from 'bcryptjs';
import {customAlphabet} from 'nanoid'
const nanoid2 = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 8);
export async function POST(req) {
    await connectToDatabase(); 
  
    try {
      const { username, email, password } = await req.json();

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return new Response(JSON.stringify({ error: 'User already exists' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        shortId:nanoid2(8),
      });
  
      await newUser.save();
  
      return new Response(JSON.stringify({ message: 'User created successfully' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }