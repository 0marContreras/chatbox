"use server"
import connectToDatabase from "@/lib/db";
import additionalInfo from '@/models/additionalInfo';
import { NextResponse } from "next/server";

export async function GET(){
    connectToDatabase()
    const info = await additionalInfo.find();
    console.log(info)
    return NextResponse.json(info, { status: 200 });
}

export async function PUT(req){
    const {_id, newInfo} = await req.json();
    connectToDatabase()
    try{
        const info = await additionalInfo.findByIdAndUpdate(_id, {$set: {"Additinal_info": newInfo}})
        return NextResponse.json(info, { status: 200 });
    }catch(e){
        return NextResponse.json({"error": "internal error"}, { status: 500 });
    }
    
}