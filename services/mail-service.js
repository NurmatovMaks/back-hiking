const nodemailer = require("nodemailer");

const { SMTP_USER, SMTP_PASSWORD, SMTP_HOST, SMTP_PORT } = process.env;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

const sendActivationMail = async (to, link) => {
  await transporter.sendMail({
    from: SMTP_USER,
    to,
    subject: "Accaount activation",
    text: "",
    html: `
        <h1>Click on link to activate an account</h1>
        <a href="${link}">${link}</a>
        `,
  });
};

module.exports = {
  sendActivationMail,
};
