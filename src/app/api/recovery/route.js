"use server"
import connectToDatabase from "@/lib/db";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import User from '@/models/User'; 
import { hashPassword } from "@/lib/hash";

export async function POST(req){
    const cookieStore = cookies()
    const { email } = await req.json();
    
    try{
        connectToDatabase()
        const user = await User.findOne({ email: email });
        if(user){
            const fiveMinutes = 5 * 60 * 1000;
            cookieStore.set('recovering', user.email, { expires: Date.now() + fiveMinutes});
            return NextResponse.json({ signin: 'approved' }, { status: 200 }); 
        }else{
            return NextResponse.json({ error: 'forbidden' }, { status: 403 });
        }
    }catch{
        return NextResponse.json({ error: 'server error' }, { status: 500 });
    }
    
}


export async function GET(){
    const cookieStore = cookies();
    const hasCookie = cookieStore.has('recovering');
    
    
    
    if(hasCookie == true){
        return NextResponse.json({ signin: 'valid' }, { status: 200 });
    }else{
        return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    }
}



export async function PUT(req){

    
    const cookieStore = cookies();
    const hasCookie = cookieStore.has('recovering');
    const cookie = cookieStore.get('recovering')
    const { password } = await req.json();
    const newPassword = await hashPassword(password);
    

    if(hasCookie){
        try{
            connectToDatabase();
            await User.updateOne({email: cookie.value}, {$set: {password: newPassword}});
            return NextResponse.json({ signin: 'success' }, { status: 200 });
        }catch{
            return NextResponse.json({ error: 'server error' }, { status: 500 });
        }
        
    }else{
        return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    }
}
