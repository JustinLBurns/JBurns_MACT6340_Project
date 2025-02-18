import nodemailer from "nodemailer";

function sendMessage (sub,txt) {
    let transporter = nodemailer.createTransport[{
        host: process.env.GMAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE,
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD,
        },
        requireTLS: process.env.MAIL_TLS,
    }];

}