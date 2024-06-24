import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(){
    const cookieStore = cookies()
    const hasCookie = cookieStore.has('loged')
    
    
    if(hasCookie == true){
        return NextResponse.json({ signin: 'Valid credentials' }, { status: 200 });
    }else{return NextResponse.json({ error: 'forbidden' }, { status: 403 });}
}

export async function POST(req){
    const { token } = await req.json();
    const cookieStore = cookies()
     const coo = cookieStore.get('loged')
    const user = await User.findOne({ email: coo.value });

    if (user.twoFactorSecret == token){
        await User.updateOne({email: user.email}, {$set: {twoFactorSecret: ""}});
        return NextResponse.json({ signin: 'Authenticated' }, { status: 200 });
    }else{
        return NextResponse.json({ error: 'forbidden' }, { status: 403 });
    }

}