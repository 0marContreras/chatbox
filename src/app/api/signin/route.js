import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import User from '@/models/User'; 
import bcrypt from 'bcrypt';
import connectToDatabase from "@/lib/db";

export async function POST(req) {
  connectToDatabase()
  try {
    const { email, password } = await req.json(); 

    const user = await User.findOne({ email: email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const oneDay = 24 * 60 * 60 * 1000;
    cookies().set('loged', user.email, { expires: Date.now() + oneDay }); 
    return NextResponse.json({ signin: 'Valid credentials' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
