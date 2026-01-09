
// src/app/api/careers/route.ts
import {NextResponse} from 'next/server';
import nodemailer from 'nodemailer';
import { Readable } from 'stream';

const careerRecipients = ['thilinaruwan112@gmail.com'];

async function streamToBuffer(stream: Readable): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

/**
 * API route to handle career application submissions.
 * This route expects a `multipart/form-data` request.
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const cvFile = formData.get('cv') as File | null;
    
    if (!name || !email || !position || !cvFile) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    if (cvFile.size > 5 * 1024 * 1024) { // 5MB limit
        return new NextResponse('CV file size exceeds 5MB limit.', { status: 400 });
    }

    // Convert file stream to buffer
    const cvBuffer = await streamToBuffer(cvFile.stream() as any);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const adminMailOptions = {
      from: `"${name}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: careerRecipients.join(','),
      replyTo: email,
      subject: `New Job Application: ${position}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>New Job Application Received</h2>
          <p><strong>Position:</strong> ${position}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p>The candidate's CV is attached to this email.</p>
        </div>
      `,
      attachments: [
        {
          filename: cvFile.name,
          content: cvBuffer,
          contentType: cvFile.type,
        },
      ],
    };
    
     // Confirmation Email to Applicant
    const applicantMailOptions = {
        from: `"Grand Silver Ray" <${process.env.SMTP_FROM_EMAIL}>`,
        to: email,
        subject: `We've Received Your Application | Grand Silver Ray`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
            <div style="background-color: #f4f4f4; padding: 20px; text-align: center;">
              <h1 style="margin: 0; color: #333; font-size: 24px;">Thank You for Your Application!</h1>
            </div>
            <div style="padding: 20px;">
              <p>Dear ${name},</p>
              <p>Thank you for your interest in a career at Grand Silver Ray. We have successfully received your application for the <strong>${position}</strong> position.</p>
              <p>Our hiring team will review your qualifications and get in touch with you if your profile matches our current needs. We appreciate your patience during this process.</p>
              <p style="margin-top: 25px;">Best regards,</p>
              <p style="margin: 0;">The Grand Silver Ray HR Team</p>
            </div>
            <div style="background-color: #f4f4f4; padding: 15px 20px; text-align: center; font-size: 12px; color: #888;">
              This is an automated response. Please do not reply to this email.
            </div>
          </div>
        `,
    };


    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(applicantMailOptions)
    ]);


    return NextResponse.json({ message: 'Application submitted successfully' });

  } catch (error) {
    console.error('Careers API route error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
