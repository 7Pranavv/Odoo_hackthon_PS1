import Mailgen from 'mailgen';
import nodemailer from 'nodemailer';

const sendMail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {
            name: 'Odoo Hackathon PS3',
            link: 'https://www.odoo.com',
        },
    });

    // Generate email content based on the type of email
    let mailGenContent;
    if (options.type === 'verification') {
        mailGenContent = emailVerificationMailGenContent(options.name, options.verificationUrl);
    } else if (options.type === 'forgotPassword') {
        mailGenContent = forgotpasswordMailGenContent(options.name, options.passwordResetUrl);
    }

    const emailText = mailGenerator.generatePlaintext(mailGenContent);
    const emailHtml = mailGenerator.generate(mailGenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        },
    });

    const mail = {
        from: 'maddison@example.com',
        to: options.email,
        subject: options.subject,
        text: emailText,
        html: emailHtml,
    };

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const emailVerificationMailGenContent = (name, verificationUrl) => {
    return {
        body: {
            name: name,
            intro: 'Welcome to Odoo Hackathon PS3! We are excited to have you on board.',
            action: {
                instructions: 'To get started, please verify your email address by clicking the button below:',
                button: {
                    color: '#22BC66',
                    text: 'Verify your email',
                    link: verificationUrl,
                },
            },
            outro: 'If you did not create an account, no further action is required.',
        },
    };
};

const forgotpasswordMailGenContent = (name, passwordResetUrl) => {
    return {
        body: {
            name: name,
            intro: 'You have requested to reset your password for Odoo Hackathon PS3.',
            action: {
                instructions: 'To get started, please click the button below to reset your password:',
                button: {
                    color: '#22BC66',
                    text: 'Reset your password',
                    link: passwordResetUrl,
                },
            },
            outro: 'If you did not create an account, no further action is required.',
        },
    };
};

const sendPasswordResetEmail = async (email, token) => {
    const resetUrl = `http://localhost:8000/reset-password/${token}`;
    const options = {
        email,
        subject: 'Reset your password',
        type: 'forgotPassword',
        name: email.split('@')[0],
        passwordResetUrl: resetUrl,
    };
    await sendMail(options);
};

const sendVerificationEmail = async (email, token) => {
    const verificationUrl = `http://localhost:8000/verify-email/${token}`;
    const options = {
        email,
        subject: 'Verify your email address',
        type: 'verification',
        name: email.split('@')[0],
        verificationUrl: verificationUrl,
    };
    await sendMail(options);
};

// ✅ Export all mail functions
export {
    sendMail,
    sendVerificationEmail,
    sendPasswordResetEmail,
};
