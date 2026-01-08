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
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
            <h1 style="margin: 0; color: #333; font-size: 24px;">New Contact Form Message</h1>
            <p style="margin: 5px 0 0; color: #666;">From Grand Silver Ray Website</p>
          </div>
          <div style="padding: 20px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold; width: 120px;">Name:</td>
                <td style="padding: 10px 0;">${body.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Email:</td>
                <td style="padding: 10px 0;"><a href="mailto:${body.email}" style="color: #007BFF; text-decoration: none;">${body.email}</a></td>
              </tr>
              ${body.eventType ? `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Event Type:</td>
                <td style="padding: 10px 0;">${body.eventType}</td>
              </tr>` : ''}
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 10px 0; font-weight: bold;">Subject:</td>
                <td style="padding: 10px 0;">${body.subject || 'N/A'}</td>
              </tr>
            </table>
            <div style="margin-top: 20px;">
              <h2 style="font-size: 18px; color: #333; border-bottom: 2px solid #eee; padding-bottom: 5px; margin-bottom: 15px;">Message</h2>
              <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #eee;">${body.message}</p>
            </div>
          </div>
          <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #888;">
            This email was sent from the contact form on your website.
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully' });

  } catch (error) {
    console.error('API route error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
