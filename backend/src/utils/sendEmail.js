import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import dotenv from "dotenv";
dotenv.config();

export const sendreviewEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use any email provider (Gmail, Outlook, etc.)
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email sending error:", error);
  }
};

// sending otp to the user while login
export const SentOtpWhileLogin = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use any email provider (Gmail, Outlook, etc.)
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email app password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP sent to email:", email);
  } catch (error) {
    console.error("Error sending OTP:", error);
  }
};
