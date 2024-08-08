"use server"
import connectToDatabase from "@/lib/db";
import settings from '@/models/settings';
import { NextResponse } from "next/server";

export async function GET(){
    connectToDatabase()
    const setting = await settings.find({"Item": false});
    //console.log(setting)
    return NextResponse.json(setting, { status: 200 });
}

export async function DELETE(req){
    connectToDatabase()
    const {_id} = await req.json();
    const setting = await settings.findById(_id)
    await settings.findByIdAndDelete(_id)
    //console.log(setting)
    return NextResponse.json(setting, { status: 200 });
}

export async function POST(req){
    connectToDatabase()
    const {Nombre, Fecha_limite, Hora, Lugar} = await req.json();
    const newitem = new settings({Nombre: Nombre, Fecha_limite: Fecha_limite, Hora: Hora, Lugar: Lugar, Item: false, Contador: 0, Contador_fecha: 0});
    await newitem.save();
    return NextResponse.json(newitem, { status: 200 });
}

export async function PUT(req){
    connectToDatabase()
    const {_id ,Nombre, Fecha_limite, Hora, Lugar} = await req.json();
    const updated = await settings.findByIdAndUpdate(_id, {"Nombre": Nombre, "Fecha_limite": Fecha_limite, "Hora": Hora, "Lugar": Lugar, "Item": false})
    return NextResponse.json(updated, { status: 200 });
}