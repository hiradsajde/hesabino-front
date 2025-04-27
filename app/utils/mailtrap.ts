import { MailtrapClient } from "mailtrap";

const emailClient = new MailtrapClient({
  token: process.env.EMAIL_SERVER_TOKEN!, 
});

export default emailClient