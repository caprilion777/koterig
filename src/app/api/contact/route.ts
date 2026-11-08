import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildEmailContent(name: string, email: string, phone: string, message: string) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

  return {
    subject: `Новая заявка с сайта — ${name}`,
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
  };
}

async function sendViaResend(
  contactTo: string,
  replyTo: string,
  content: ReturnType<typeof buildEmailContent>,
) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.MAIL_FROM ?? 'Koterig <noreply@koterig.eu>';

  const { error } = await resend.emails.send({
    from,
    to: contactTo,
    replyTo,
    subject: content.subject,
    text: content.text,
    html: content.html,
  });

  if (error) {
    throw new Error(error.message);
  }
}

async function sendViaSmtp(
  contactTo: string,
  replyTo: string,
  content: ReturnType<typeof buildEmailContent>,
) {
  const smtpHost = process.env.SMTP_HOST ?? 'smtp.zone.eu';
  const smtpPort = Number(process.env.SMTP_PORT ?? '465');
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    throw new Error('SMTP credentials not configured');
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.zone.ee", // Жестко прописываем текстом
    port: 465,            // Жестко прописываем цифрой
    secure: true,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 10_000,
    family: 4,
  } as any);

  await transporter.sendMail({
    from: `"Koterig website" <${smtpUser}>`,
    to: contactTo,
    replyTo,
    subject: content.subject,
    text: content.text,
    html: content.html,
  });
}

export async function POST(request: NextRequest) {
  const { name, email, phone, message } = await request.json();

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  const contactTo = process.env.CONTACT_TO ?? 'info@koterig.eu';
  const useResend = Boolean(process.env.RESEND_API_KEY);
  const useSmtp = Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);

  if (!useResend && !useSmtp) {
    console.error('Email provider not configured');
    return NextResponse.json({ message: 'Server not configured' }, { status: 500 });
  }

  const content = buildEmailContent(String(name), String(email), String(phone), String(message));

  try {
    if (useResend) {
      await sendViaResend(contactTo, String(email), content);
    } else {
      await sendViaSmtp(contactTo, String(email), content);
    }

    return NextResponse.json({ message: 'OK' });
  } catch (error) {
    console.error('Contact form email error:', error);
    return NextResponse.json({ message: 'Ошибка отправки' }, { status: 500 });
  }
}
