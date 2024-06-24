import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(){
    const cookieStore = cookies()
    const hasCookie = cookieStore.has('loged')
    if(hasCookie == true){
        return NextResponse.json({ signin: 'Valid credentials' }, { status: 200 });
    }else{return NextResponse.json({ error: 'forbidden' }, { status: 403 });}
}

export async function POST(){
    return "holi lindi"
}