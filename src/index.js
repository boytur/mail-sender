import "dotenv/config.js";
import { sendMail } from "./mail/mailer.js";

await sendMail({
  to: "", // your email here
  subject: "Test mail",
  templateName: "welcome",
  data: {
    name: "Smart",
    link: "https://www.bsospace.com",
    previewText: "Welcome to BSO Space!",
    logoUrl: "https://avatars.githubusercontent.com/u/184940873?s=200&v=4"
  },
});