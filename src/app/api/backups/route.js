"use server"

import { NextResponse } from "next/server";
import { cookies } from 'next/headers';
import connectToDatabase from "@/lib/db";
import settings from '@/models/settings';
import review from "@/models/review.model";
import additionalInfo from '@/models/additionalInfo';

export async function GET(){
   
    try{

        await connectToDatabase();
        const backupSettings = await settings.find();
        const backupAdditionalInfo = await additionalInfo.find();
        const backupReviews = await review.find();

        const backupTemplate = {
            "settings": backupSettings,
            "additionalInfo": backupAdditionalInfo,
            "reviews": backupReviews
        }

        const blob = new Blob([JSON.stringify(backupTemplate, null, 2)], { type: 'application/json' });


        const response = new NextResponse(blob);
        response.headers.set('Content-Type', 'application/json');
        response.headers.set('Content-Disposition', 'attachment; filename="data.json"');

        return response;

    }catch{
        return NextResponse.json({"error": "internal error"}, { status: 500 });
    }

    
}