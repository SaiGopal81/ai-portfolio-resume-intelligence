import { NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || 're_mock_key');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = contactFormSchema.parse(body);

    if (process.env.RESEND_API_KEY) {
      await resend.emails.send({
        from: 'Portfolio Contact Form <onboarding@resend.dev>',
        to: 'example@example.com', // Replace with user email
        subject: `New Contact: ${validatedData.subject}`,
        text: `Name: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`,
      });
    } else {
      console.log('Mock email sent (no RESEND_API_KEY):', validatedData);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 });
  }
}
