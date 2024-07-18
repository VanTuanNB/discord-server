import nodemailer from 'nodemailer';
import { environment } from './env.config';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: environment.EMAIL_ADDRESS,
        pass: environment.EMAIl_PASSCODE,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

export default transporter;
