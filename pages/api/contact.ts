import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // --- SMTP для Mail.ru ---
  const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'zekox@mail.ru', // твой email
      pass: 'YE27WfrDiAeZuGBobxf0', // пароль приложения
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
    res.status(200).json({ message: 'OK' });
  } catch (error) {
    res.status(500).json({ message: 'Ошибка отправки', error });
  }
}
