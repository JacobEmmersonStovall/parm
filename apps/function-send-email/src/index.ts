import { sendgrid as secrets } from '@parm/util';
import sendgrid from '@sendgrid/mail';
sendgrid.setApiKey(secrets.apiKey);

export const functionSendEmail = async (req: any, res?: any) => {
    // using SendGrid's v3 Node.js Library
    // https://github.com/sendgrid/sendgrid-nodejs
    const msg = {
      to: 'michaelsenpatrick@gmail.com',
      from: 'test@example.com',
      subject: 'Sending with SendGrid is Fun',
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sendgrid.send(msg);
    return res.sendStatus(200);
};
