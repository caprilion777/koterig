import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  const { name, email, phone, message } = await request.json();

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'zekox@mail.ru',
      pass: 'YE27WfrDiAeZuGBobxf0',
    },
  });

  try {
    await transporter.sendMail({
      from: '"Заявка с сайта" <zekox@mail.ru>',
      to: 'zekox@mail.ru',
      subject: 'Новая заявка с сайта',
      text: `
Имя: ${name}
Email: ${email}
Телефон: ${phone}
Сообщение: ${message}
      `,
      html: `
        <b>Имя:</b> ${name}<br/>
        <b>Email:</b> ${email}<br/>
        <b>Телефон:</b> ${phone}<br/>
        <b>Сообщение:</b> ${message}
      `,
    });
    return NextResponse.json({ message: 'OK' });
  } catch (error) {
    return NextResponse.json({ message: 'Ошибка отправки', error }, { status: 500 });
  }
}
