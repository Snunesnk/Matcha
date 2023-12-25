import nodemailer from "nodemailer";
import { HOST, FROM, PORT, USER, PASS } from "../config/mail.config.js";

export async function sendEmail(email, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
      host: HOST,
      port: PORT,
      auth: {
        user: USER,
        pass: PASS,
      },
    });

    await transporter.sendMail({
      from: FROM,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent sucessfully");
    console.log(text);

    return true;
  } catch (error) {
    console.log("email not sent");
    console.log(error);
    console.log(text);
    return false;
  }
}
