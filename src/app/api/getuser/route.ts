import mongoose from "mongoose";
import User from "../../models/user";
import { NextResponse,NextRequest } from "next/server";
import connectToDatabase from "../../utils/databaseconnection";
connectToDatabase()
export async function GET(req: NextRequest) {
    try {
      const allUser = await User.find();
      return NextResponse.json(allUser);
    } catch (error) {
      console.error("Error fetching users:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }