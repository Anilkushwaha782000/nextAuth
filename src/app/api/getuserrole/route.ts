import mongoose from "mongoose";
import User from "../../models/user";
import { NextResponse,NextRequest } from "next/server";
import connectToDatabase from "../../utils/databaseconnection";
connectToDatabase()
export async function POST(req: NextRequest) {
  const { email} = await req.json();
    try {
      const user = await User.findOne({email});
      if(!user)return NextResponse.json({ message: "No user found" }, { status: 404 });
      else{
        return NextResponse.json(user.role);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }