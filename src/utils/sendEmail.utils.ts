import { createTransport } from "nodemailer";
import { iEmailRequest } from "../interfaces/sendEmail.interface";
import { AppError } from "../errors/AppError";
import Mailgen from "mailgen";

class EmailService {
  async sendEmail({ to, subject, text }: iEmailRequest) {
    const transporter = createTransport({
      host: "smtp.gmail.com",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter
      .sendMail({
        from: "ruppygor@gmail.com",
        to,
        subject,
        html: text,
      })
      .then(() => {
        console.log("Email sent successfully");
      })
      .catch((err) => {
        console.log(err);
        throw new AppError("Email sent failed", 500);
      });
  }
  resetPasswordTemplate(
    userName: string,
    userEmail: string,
    resetToken: string
  ) {
    var mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Kenzie Kars",
        link: "http://localhost:3000/",
      },
    });

    const email = {
      body: {
        name: userName,
        intro:
          "You have received this email because a password reset request for your account was received.",
        action: {
          instructions: "Click the button below to reset your password:",
          button: {
            color: "#DC4D2F",
            text: "Reset your password",
            link: `http://localhost:3000/resetPassword/${resetToken}`,
          },
        },
        outro:
          "If you did not request a password reset, no further action is required on your part.",
      },
    };

    const emailBody = mailGenerator.generate(email);
    const emailTemplate = {
      to: userEmail,
      subject: "Reset Password",
      text: emailBody,
    };

    return emailTemplate;
  }
}

const emailService = new EmailService();

export { emailService };
