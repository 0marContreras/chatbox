"use server"
import Review from "@/models/review.model"
import connectToDatabase from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        const reviews = await reviews.find();
        return NextResponse.json(reviews, { status: 200 });
    }catch (e){
        console.log(e);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
    

}

export async function POST(req) {
    await connectToDatabase(); 
    const { name, email, score } = await req.json();
    console.log(name, email, score);
    try {
        const newReview = new Review({ name, email, score });
        await newReview.save();
        return NextResponse.json(newReview, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}