import nodemailer from "nodemailer";

export const sendEmail = async ({
  email,
  emailType,
  token,
}: {
  email: string;
  emailType: "VERIFY" | "RESET";
  token: string;
}) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_HOST!,
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER!,
        pass: process.env.MAILTRAP_PASS!,
      },
    });

    // Different subject + link for each email type
    const subject =
      emailType === "VERIFY"
        ? "Verify your email"
        : "Reset your password";

    const actionUrl =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyemail?token=${token}`
        : `${process.env.DOMAIN}/resetpassword?token=${token}`;

    const mailOptions = {
      from: "samarthgalhe9@gmail.com",
      to: email,
      subject,
      html: `
        <p>
          ${
            emailType === "VERIFY"
              ? `Click <a href="${actionUrl}">here</a> to verify your email.`
              : `Click <a href="${actionUrl}">here</a> to reset your password.`
          }
          <br/>
          Or copy-paste this link: ${actionUrl}
        </p>
      `,
    };

    return await transport.sendMail(mailOptions);
  } catch (err: any) {
    throw new Error(err.message);
  }
};
