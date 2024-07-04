"use server"
import connectToDatabase from "@/lib/db";
import additionalInfo from '@/models/additionalInfo';
import { NextResponse } from "next/server";

export async function GET(){
    connectToDatabase()
    const info = await additionalInfo.find({})
    console.log(info)
    return NextResponse.json(info, { status: 200 });
}