import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function verifyEmail(email, otp) {

    try {
        const data = await resend.emails.send({
            from: "Slay Shop <onboarding@resend.dev>",
            to: email ,
            subject: 'Verify your email',
            html: `<h2>Your OTP Code</h2><p>${otp}</p><p>This code will expire in 5 minutes.</p>`
        })
        console.log(data)
        return data;
    }
    catch (error) {
        console.error("Failed to send email", error);
        throw error;
    }
};