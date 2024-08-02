"use server"
import connectToDatabase from "@/lib/db";
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import User from '@/models/User'; 
import { hashPassword } from "@/lib/hash";
import { Resend } from 'resend';
import { PasswordTemplate } from '@/components/password-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req){
    const cookieStore = cookies()
    const { email } = await req.json();
    
    try{
        connectToDatabase()
        const user = await User.findOne({ email: email });
        if(user){
            const fiveMinutes = 5 * 60 * 1000;
            cookieStore.set('recovering', user.email, { expires: Date.now() + fiveMinutes});

            const { data, error } = await resend.emails.send({
                from: 'Acme <onboarding@resend.dev>',
                to: [user.email],
                subject: 'Chatbox Auth',
                react: PasswordTemplate({ token: 99999}),
              });


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
            cookieStore.delete("recovering");
            return NextResponse.json({ signin: 'success' }, { status: 200 });
        }catch{
            return NextResponse.json({ error: 'server error' }, { status: 500 });
        }
        
    }else{
        return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    }
}
