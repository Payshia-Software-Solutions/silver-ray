
// src/app/api/contacts/route.ts
import {NextResponse} from 'next/server';
import nodemailer from 'nodemailer';

const contactRecipients = [
    'Reservation@silverray.lk',
    'gm@silverray.lk',
    'pubudug@kdugroup.com',
    'sanjayad@silverray.lk',
    'chalanik@silverray.lk'
];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return new NextResponse('Missing required fields', { status: 400 });
    }
    
    // Environment variable check
    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("SMTP environment variables are not set.");
      return new NextResponse('Server configuration error: Email service is not configured.', { status: 500 });
    }

    const port = Number(process.env.SMTP_PORT);

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: port,
      secure: port === 465, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        // This is for testing in environments with self-signed certificates.
        // Do not use in a production environment with a valid certificate.
        rejectUnauthorized: false
      }
    });

    // Email to Admin
    const adminMailOptions = {
      from: `"${body.name}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: contactRecipients.join(','),
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

    // Confirmation Email to Customer
    const customerMailOptions = {
        from: `"Grand Silver Ray" <${process.env.SMTP_FROM_EMAIL}>`,
        to: body.email,
        subject: `We've Received Your Message | Grand Silver Ray`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-w: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
                    <h1 style="margin: 0; color: #333; font-size: 24px;">Thank You for Contacting Us!</h1>
                </div>
                <div style="padding: 20px;">
                    <p>Dear ${body.name},</p>
                    <p>Thank you for reaching out to Grand Silver Ray. We have successfully received your message and one of our team members will get back to you as soon as possible.</p>
                    <p>Here is a copy of your message for your records:</p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #eee; margin-top: 20px;">
                        <h3 style="font-size: 16px; margin-top: 0; margin-bottom: 10px; color: #555;">Your Message:</h3>
                        <p style="white-space: pre-wrap; margin: 0;">${body.message}</p>
                    </div>
                    <p style="margin-top: 20px;">We appreciate your interest in Grand Silver Ray.</p>
                    <p>Best regards,<br/>The Grand Silver Ray Team</p>
                </div>
                <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #888;">
                    This is an automated response. Please do not reply to this email.
                </div>
            </div>
        `,
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions)
    ]);

    return NextResponse.json({ message: 'Emails sent successfully' });

  } catch (error: any) {
    console.error('Contacts API route error:', error);
    // Log the full error for server-side debugging
    console.error(error);
    // Return a more descriptive error in the response
    const errorMessage = error.message || "An unexpected error occurred.";
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error', error: errorMessage }), { status: 500 });
  }
}

    
