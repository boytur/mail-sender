import nodemailer from "nodemailer";
import { renderMjml } from "./render.js";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendMail({
  to,
  subject,
  templateName,
  data,
}) {
  const html = renderMjml(templateName, data);

  return transporter.sendMail({
    from: `"BSO Mail Sender System" <no-reply@bsospace.com>`,
    to,
    subject,
    html,
  });
}
