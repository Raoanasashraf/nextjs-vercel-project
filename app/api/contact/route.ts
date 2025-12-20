import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        // In a real application, you would save this to a database or send an email
        console.log('Contact form submission:', body);

        return NextResponse.json({ message: 'Message sent successfully' });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }
}
