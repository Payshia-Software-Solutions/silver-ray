
// src/app/api/bookings/route.ts
import {NextResponse} from 'next/server';
import nodemailer from 'nodemailer';

const bookingRecipients = [
    'Reservation@silverray.lk',
    'gm@silverray.lk',
    'pubudug@kdugroup.com',
    'sanjayad@silverray.lk',
    'chalanik@silverray.lk'
];

/**
 * API route to handle booking form submissions by sending an email.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Basic validation
    if (!body.first_name || !body.last_name || !body.email || !body.check_in_date) {
      return new NextResponse('Missing required booking fields', { status: 400 });
    }

    // Nodemailer transporter setup
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const addonsText = body.addons && body.addons.length > 0 
      ? body.addons.join(', ').replace(/_/g, ' ') 
      : 'N/A';

    // Email to Admin
    const adminMailOptions = {
      from: `"${body.first_name} ${body.last_name}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: bookingRecipients.join(','),
      replyTo: body.email,
      subject: `New Room Booking Request: ${body.room_type}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
            <h1 style="margin: 0; color: #333; font-size: 24px;">New Room Booking Request</h1>
            <p style="margin: 5px 0 0; color: #666;">From Grand Silver Ray Website</p>
          </div>
          <div style="padding: 20px;">
            <h2 style="font-size: 18px; color: #333; border-bottom: 2px solid #eee; padding-bottom: 5px; margin-bottom: 15px;">Booking Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold; width: 150px;">Guest Name:</td><td style="padding: 10px 0;">${body.first_name} ${body.last_name}</td></tr>
              <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold;">Email:</td><td style="padding: 10px 0;"><a href="mailto:${body.email}" style="color: #007BFF; text-decoration: none;">${body.email}</a></td></tr>
              <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold;">Phone:</td><td style="padding: 10px 0;">${body.phone_number || 'N/A'}</td></tr>
              <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold;">Room Type:</td><td style="padding: 10px 0;">${body.room_type}</td></tr>
              <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold;">Check-in:</td><td style="padding: 10px 0;">${body.check_in_date}</td></tr>
              <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold;">Check-out:</td><td style="padding: 10px 0;">${body.check_out_date}</td></tr>
              <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold;">Guests:</td><td style="padding: 10px 0;">${body.num_guests}</td></tr>
              <tr style="border-bottom: 1px solid #eee;"><td style="padding: 10px 0; font-weight: bold;">Add-ons:</td><td style="padding: 10px 0; text-transform: capitalize;">${addonsText}</td></tr>
            </table>
            ${body.special_requests ? `
            <div style="margin-top: 20px;">
              <h3 style="font-size: 16px; color: #333; border-bottom: 2px solid #eee; padding-bottom: 5px; margin-bottom: 10px;">Special Requests</h3>
              <p style="white-space: pre-wrap; background-color: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #eee;">${body.special_requests}</p>
            </div>` : ''}
          </div>
          <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 12px; color: #888;">
            This email was sent from the booking form on your website.
          </div>
        </div>
      `,
    };

     // Confirmation Email to Customer
    const customerMailOptions = {
        from: `"Grand Silver Ray" <${process.env.SMTP_FROM_EMAIL}>`,
        to: body.email,
        subject: `We've Received Your Booking Request | Grand Silver Ray`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
                    <h1 style="margin: 0; color: #333; font-size: 24px;">Thank You for Your Booking Request!</h1>
                </div>
                <div style="padding: 20px;">
                    <p>Dear ${body.first_name},</p>
                    <p>Thank you for choosing Grand Silver Ray. We have successfully received your booking request and our reservation team will contact you shortly to confirm your stay.</p>
                    <p>Here is a summary of your request for your records:</p>
                    <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #eee; margin-top: 20px;">
                        <h3 style="font-size: 16px; margin-top: 0; margin-bottom: 10px; color: #555;">Your Booking Details:</h3>
                        <p><strong>Room:</strong> ${body.room_type}</p>
                        <p><strong>Check-in:</strong> ${body.check_in_date}</p>
                        <p><strong>Check-out:</strong> ${body.check_out_date}</p>
                        <p><strong>Guests:</strong> ${body.num_guests}</p>
                        <p><strong>Add-ons:</strong> <span style="text-transform: capitalize;">${addonsText}</span></p>
                    </div>
                    <p style="margin-top: 20px;">We look forward to welcoming you.</p>
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

  } catch (error) {
    console.error('Booking API route error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
