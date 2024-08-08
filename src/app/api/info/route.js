"use server";
import connectToDatabase from "@/lib/db";
import additionalInfo from '@/models/additionalInfo';
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase(); 
        const info = await additionalInfo.find();
        console.log(info);
        return NextResponse.json(info, { status: 200 });
    } catch (e) {
        console.error('Error al obtener los datos:', e);
        return NextResponse.json({ error: "internal error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { _id, newInfo } = await req.json();
        console.log(newInfo)
        connectToDatabase();
        const info = await additionalInfo.updateOne({_id: _id}, {$set: {Additional_info: newInfo}});
        return NextResponse.json(info, { status: 200 });
    } catch (e) {
        console.error('Error al actualizar los datos:', e);
        return NextResponse.json({ error: "internal error" }, { status: 500 });
    }
}
