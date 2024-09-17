
import connectToDatabase from './utils/databaseconnection';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
console.log("Inside middleware>>")
  await connectToDatabase();
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*', 
};
