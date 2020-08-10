const nodemailer = require("nodemailer");

const host = process.env.HOST;
const user = process.env.USERNAME;
const pass = process.env.PASSWORD;

const stmpTransport = {
  host,
  port: 587,
  secure: false,
  auth: {
    user,
    pass,
  },
};
console.debug("smtpTransport: ", stmpTransport);

const transport = nodemailer.createTransport(stmpTransport);

const getFormattedTime = () => {
  const ts = Date.now();
  const date = new Date(ts);
  return `${date.getHours()}:${date.getMinutes()}`;
};

exports.sendMigrationReport = async (event) => {
  console.log("event: ", event);
  if (event.httpMethod !== "POST") {
    throw new Error(
      `Only POST accepted, you tried: ${event.httpMethod} method.`
    );
  }
  const data = JSON.parse(event.body);
  console.log("data: ", data);

  const subject = data.subject;
  const receipients = data.receipients;
  const text = data.mailBody;
  const title = data.title;


  const message = {
    from: "luismarcilio.deoliveira@amdocs.com",
    to: receipients,
    subject,
    text,
    html: `<h1>${title}</h1>${text}`,
  };
  let result = await transport.sendMail(message);
  console.log("Mail sent: ", result);
  const response = {
    statusCode: 200,
    body: JSON.stringify(result),
  };
  return response;
};
