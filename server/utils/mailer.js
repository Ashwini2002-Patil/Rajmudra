const nodemailer = require('nodemailer');

// Gmail transporter — EMAIL/EMAIL_PASS in .env (EMAIL_PASS must be a Gmail
// "App Password", not the account password, since Gmail blocks plain SMTP
// auth for regular passwords).
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

const sendOtpEmail = async (to, otp) => {
    const heading = 'Admin Login Verification';

    await transporter.sendMail({
        from: `"Rajmudra Global Exim" <${process.env.EMAIL}>`,
        to,
        subject: `${otp} — Your Rajmudra Admin OTP`,
        html: `
            <div style="font-family: sans-serif; max-width: 420px; margin: 0 auto;">
                <h2 style="color:#0f1729;">${heading}</h2>
                <p style="color:#333;">Use the code below to continue. It expires in 10 minutes.</p>
                <p style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color:#c99a3f;">${otp}</p>
                <p style="color:#888; font-size: 12px;">If you did not request this, you can safely ignore this email.</p>
            </div>
        `,
    });
};

// Generic "new lead" notification to the business inbox — used by
// submitContact and (later) other public forms. Renders `fields` as a
// simple label/value table.
const notifyBusiness = async (subject, fields) => {
    const rows = fields
        .filter((f) => f.value)
        .map(
            (f) => `
                <tr>
                    <td style="padding:6px 12px; color:#888; font-size:13px; white-space:nowrap;">${f.label}</td>
                    <td style="padding:6px 12px; color:#0f1729; font-size:14px;">${f.value}</td>
                </tr>`
        )
        .join('');

    await transporter.sendMail({
        from: `"Rajmudra Global Exim Website" <${process.env.EMAIL}>`,
        to: process.env.EMAIL,
        subject,
        html: `
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
                <h2 style="color:#0f1729;">${subject}</h2>
                <table style="border-collapse:collapse; width:100%;">${rows}</table>
            </div>
        `,
    });
};

// @desc  Notify the business inbox of a new Contact form submission.
const sendContactNotification = ({ name, email, phone, subject, message }) =>
    notifyBusiness(`New Contact Message${subject ? `: ${subject}` : ''}`, [
        { label: 'Name', value: name },
        { label: 'Email', value: email },
        { label: 'Phone', value: phone },
        { label: 'Subject', value: subject },
        { label: 'Message', value: message },
    ]);

module.exports = { sendOtpEmail, sendContactNotification };
