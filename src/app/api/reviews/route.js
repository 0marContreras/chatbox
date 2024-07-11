"use server"
import reviewModel from "@/models/review.model";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        const reviews = await reviewModel.find();
        return NextResponse.json(reviews, { status: 200 });
    }catch (e){
        console.log(e);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
    

}

export async function POST(req){
    const {name, email, score} = await req.json();

    try{
        const newReview = new reviewModel({name: name, email: email, score: score});
        await newReview.save()
        return NextResponse.json(newReview, { status: 200 });
    }catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
    

}