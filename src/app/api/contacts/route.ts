// src/app/api/contacts/route.ts
import {NextResponse} from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"${body.name}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: 'thilinaruwan112@gmail.com',
      replyTo: body.email,
      subject: `New Contact Form Message: ${body.subject || 'No Subject'}`,
      html: `
        <h1>New Contact Message</h1>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        ${body.eventType ? `<p><strong>Event Type:</strong> ${body.eventType}</p>` : ''}
        <p><strong>Subject:</strong> ${body.subject || 'N/A'}</p>
        <hr>
        <p><strong>Message:</strong></p>
        <p>${body.message.replace(/\n/g, '<br>')}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' });

  } catch (error) {
    console.error('API route error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
