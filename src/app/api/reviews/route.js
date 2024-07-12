"use server";
import Review from "@/models/review.model";
import connectToDatabase from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    await connectToDatabase();

    try {
        const reviews = await Review.find();
        const scoreCounts = await Review.aggregate([
            {
                $group: {
                    _id: "$score",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Format the score counts into a more readable structure
        const formattedScoreCounts = {};
        scoreCounts.forEach(({ _id, count }) => {
            formattedScoreCounts[_id] = count;
        });

        // Return the reviews and the score counts
        return NextResponse.json({
            reviews,
            scoreCounts: formattedScoreCounts
        }, { status: 200 });
    } catch (e) {
        console.log(e);
        return NextResponse.json({ error: 'Fallo bien sexy' }, { status: 500 });
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
        return NextResponse.json({ error: 'Fallo bien sexy' }, { status: 500 });
    }
}