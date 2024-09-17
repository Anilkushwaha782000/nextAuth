import mongoose from "mongoose";
import User from "@/app/models/user";
import { NextResponse,NextRequest } from "next/server";
import connectToDatabase from "@/app/utils/databaseconnection";
connectToDatabase()
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  console.log("shortId>>",id)
  const shortId=id
  console.log("shortId>>",shortId)
  if(!shortId){
    return NextResponse.json({message:"User not found"});
  }
  if(shortId){
    try {
        const removedUser=await User.findOneAndDelete({shortId});
        if(removedUser){
          return NextResponse.json({msg:`User removed successfully!`});
        }
        else{
          return NextResponse.json({message:"User not found"});
        }
        } catch (error) {
      console.error("Error in deleting user:", error);
      return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
  }
}