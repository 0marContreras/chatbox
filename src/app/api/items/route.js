"use server"
import connectToDatabase from "@/lib/db";
import settings from '@/models/settings';
import { NextResponse } from "next/server";

export async function GET(){
    connectToDatabase()
    const setting = await settings.find({"Item": true})
    console.log(setting)
    return NextResponse.json(setting, { status: 200 });
}

export async function DELETE(req){
    connectToDatabase()
    const {_id} = await req.json();
    const setting = await settings.findById(_id)
    await settings.findByIdAndDelete(_id)
    console.log(setting)
    return NextResponse.json(setting, { status: 200 });
}

export async function POST(req){
    connectToDatabase()
    const {Nombre, Costo, Fecha_limite, Tiempo_entrega, Medio_entrega} = await req.json();
    const newitem = new settings({Nombre: Nombre, Costo: Costo, Fecha_limite: Fecha_limite, Tiempo_entrega: Tiempo_entrega, Medio_entrega: Medio_entrega});
    await newitem.save()
    return NextResponse.json(newitem, { status: 200 });
}

export async function UPDATE(req){
    connectToDatabase()
    const {_id ,Nombre, Costo, Fecha_limite, Tiempo_entrega, Medio_entrega} = await req.json();
    const updated = await settings.findByIdAndUpdate(_id, {"Nombre": Nombre, "Costo": Costo, "Fecha_limite": Fecha_limite, "Tiempo_entrega": Tiempo_entrega, "Medio_entrega": Medio_entrega,"Item": true})
    return NextResponse.json(updated, { status: 200 });
}