const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: "deolivel@amdocs.com",
    pass: "Iflscience04",
  },
});

const receipients = process.env.RECEIPIENTS;

const getFormattedTime = () => {
  const ts = Date.now();
  const date = new Date(ts);
  return `${date.getHours()}:${date.getMinutes()}`;
};

exports.sendMigrationReport = async (event) => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `Only PUSH accepted, you tried: ${event.httpMethod} method.`
    );
  }

  const subject = `Migration report for ${getFormattedTime()}`;
  const text = event.body;

  const message = {
    from: "luismarcilio.deoliveira@amdocs.com",
    to: receipients,
    subject,
    text,
    html: `<h1>Migration report for ${getFormattedTime()}</h1>${text}`,
  };
  let result = await transport.sendMail(message);
  console.log("Mail sent: ", result);
  const response = {
    statusCode: 200,
    body: JSON.stringify(result),
  };
  return response;
};
