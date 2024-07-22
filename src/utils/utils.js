import ejs from "ejs";
import nodemailer from "nodemailer";

import { fileURLToPath } from "url";
import { dirname } from "path";
const currentFilePath = import.meta.url;
const currentDirectory = dirname(fileURLToPath(currentFilePath));

console.log(currentDirectory);

const mail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "chandrasreeharshithalakshmi@gmail.com",
    pass: "okmkecyfowfhvnky",
  },
});

const sendEmailVerificationLink = async (email, token, name) => {
  try {
    const renderedContent = await ejs.renderFile(
      `${currentDirectory}/../templates/confirm_email.ejs`,
      { token, name }
    );

    const mailOptions = {
      from: "chandrasreeharshithalakshmi@gmail.com",
      to: email,
      subject: "Storytime - Email Confirmation",
      html: renderedContent,
    };

    const verificationInfo = await mail.sendMail(mailOptions);
    return verificationInfo;
  } catch (error) {
    return { error };
  }
};

const sendPasswordResetLink = async (email, token, name) => {
  try {
    const renderedContent = await ejs.renderFile(
      `${currentDirectory}/../templates/reset_password.ejs`,
      { token, name }
    );

    const mailOptions = {
      from: "chandrasreeharshithalakshmi@gmail.com",
      to: email,
      subject: "Storytime - Password reset link",
      html: renderedContent,
    };

    const verificationInfo = await mail.sendMail(mailOptions);
    return verificationInfo;
  } catch (error) {
    return { error };
  }
};

export { sendEmailVerificationLink, sendPasswordResetLink };