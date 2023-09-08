import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import {v4 as uuidv4} from 'uuid';
import { hashString } from './index.JS';
import verification from '../models/emailVerification';

dotenv.config();

const { AUTH_EMAIL, AUTH_PASSWORD, APP_URL } = process.env;

let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD,
    },
});

export const sendVerificationEmail = async (user, res) => {
    const {_id, email, lastNmae} = user;

const token = _id + uuidv4();

const link = APP_URL + 'users/verify/' + _id + '/' + token;

//mail optioons
const mailOptions = {
    from: AUTH_EMAIL,
    to: email,
    subject: "Email Verification",
    html: `
        <div style="font-family: Arial, sans-serif; background-color: #f2f2f2;">
            <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h1 style="color: #333;">Email Verification</h1>
                <h4 style="color: #333;">Hi ${lastName},</h4>
                <p style="color: #555;">Please verify your email so we can confirm that it's really you.</p>
                <p style="color: #555;">This link expires in 1 hour.</p>
                <a style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;" href="${link}">Verify Email</a>
                <p style="color: #555;">If you did not request this verification, you can safely ignore this email.</p>
            </div>
        </div>
    `,
};

try{
   const hashedToken =  await hashString(token);

   const newVerificatiedEmail = await verification.create({
    userId: _id,
    token: hashedToken,
    createdAt: Date.now(),
    expiresAt: Date.now() + 3600000,
   });

   if (newVerificationEmail) {
    transporter
      .sendMail(mailOptions)
      .then(() => {
        res.status(201).send({
          success: "PENDING",
          message:
            "A verification email has been sent to your account. Please check your email for further instructions on how to complete the verification process."
        });
      })
      .catch((error) => {
        console.error("Error sending verification email:", error);
        res.status(500).send({
          success: "ERROR",
          message: "An error occurred while sending the verification email. Please try again later."
        });
      });
  }
  
}catch (error) {
    console.log(error);
    res.status(404).json({message: "Something went wrong"})
}

};