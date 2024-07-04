"use server"
import connectToDatabase from "@/lib/db";
import settings from '@/models/settings';
import { NextResponse } from "next/server";

export async function GET(){
    connectToDatabase()
    const setting = await settings.find({"Item": false})
    console.log(setting)
    return NextResponse.json(setting, { status: 200 });
}