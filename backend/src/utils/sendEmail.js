import nodemailer from 'nodemailer';

export const sendVerificationEmail = async (email, code) => {
  try {
    // 1. Create a Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your Gmail App Password (NOT your real password)
      },
    });

    // 2. Define Email Options
    const mailOptions = {
      from: '"Vexel Mart" <vexelMart@gmail.com>',
      to: email,
      subject: 'Verify your email address',
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2>Verify your email</h2>
          <p>Your verification code is:</p>
          <h1 style="color: #f97316; letter-spacing: 5px;">${code}</h1>
          <p>This code expires in 10 minutes.</p>
        </div>
      `,
    };

    // 3. Send
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

  } catch (error) {
    console.error("Error sending email", error);
    throw new Error("Email could not be sent");
  }
};