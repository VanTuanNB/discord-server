import { environment } from '@/core/configs/env.config';
import transporter from '@/core/configs/nodemailer.config';

type ISendMail = {
    to: string;
    subject: string;
    message: string;
};

export class CommonService {
    constructor() {}

    public sendMail({ to, subject, message }: ISendMail) {
        console.log('environment.EMAIL_ADDRESS', environment.EMAIL_ADDRESS);
        transporter.sendMail(
            {
                from: environment.EMAIL_ADDRESS,
                to,
                subject,
                html: `<p>${message}</p>`,
            },
            (err, info) => {
                console.log('err', err);
                console.log('info', info);
            },
        );
    }
}
