import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';


export async function POST(req) {
  try {
    cookies().delete('loged');
    cookies().delete('authenticated');
 
    return NextResponse.json({ signin: 'Success' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
