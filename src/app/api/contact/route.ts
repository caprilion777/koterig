import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: NextRequest) {
  const { name, email, phone, message } = await request.json();

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  const smtpHost = process.env.SMTP_HOST ?? 'smtp.zone.eu';
  const smtpPort = Number(process.env.SMTP_PORT ?? '465');
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const contactTo = process.env.CONTACT_TO ?? 'info@koterig.eu';

  if (!smtpUser || !smtpPass) {
    console.error('SMTP credentials not configured');
    return NextResponse.json({ message: 'Server not configured' }, { status: 500 });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const safeName = escapeHtml(String(name));
  const safeEmail = escapeHtml(String(email));
  const safePhone = escapeHtml(String(phone));
  const safeMessage = escapeHtml(String(message)).replace(/\n/g, '<br/>');

  try {
    await transporter.sendMail({
      from: `"Koterig website" <${smtpUser}>`,
      to: contactTo,
      replyTo: String(email),
      subject: `Новая заявка с сайта — ${String(name)}`,
      text: `
Имя: ${name}
Email: ${email}
Телефон: ${phone}

Сообщение:
${message}
      `.trim(),
      html: `
        <h2>Новая заявка с сайта koterig.eu</h2>
        <p><b>Имя:</b> ${safeName}</p>
        <p><b>Email:</b> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p><b>Телефон:</b> ${safePhone}</p>
        <p><b>Сообщение:</b><br/>${safeMessage}</p>
      `,
    });
    return NextResponse.json({ message: 'OK' });
  } catch (error) {
    console.error('Contact form email error:', error);
    return NextResponse.json({ message: 'Ошибка отправки' }, { status: 500 });
  }
}
