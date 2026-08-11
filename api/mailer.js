import nodemailer from "nodemailer";
import nodemailerExpressHandlebars from "nodemailer-express-handlebars";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.template_email,
    pass: process.env.template_password,
  },
});

// Handlebars template engine config
const hbsOptions = {
  viewEngine: {
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "templates"),
    partialsDir: path.join(__dirname, "templates", "partials"),
    defaultLayout: false,
  },
  viewPath: path.join(__dirname, "templates"),
  extName: ".hbs",
};

transporter.use("compile", nodemailerExpressHandlebars(hbsOptions));

// Email send function
async function sendEmail(type, to, context) {
  const templateName = type;
  if (!templateName) throw new Error("Invalid email type");

  const mailOptions = {
    from: process.env.template_email,
    to,
    subject: context.subject || "Notification",
    template: templateName,
    context,
  };

  return transporter.sendMail(mailOptions);
}

export default sendEmail;
