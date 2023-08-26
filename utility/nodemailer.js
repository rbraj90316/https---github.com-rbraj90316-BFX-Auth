const nodemailer = require("nodemailer");

    module.exports.sendMail=async function sendMail(str,data) {
    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'rbraj5531@gmail.com',
    pass: 'eqxtvrhjupzuabma'
  }
});
var Osubject,Otext,Ohtml;
if(str=="signup"){
  Osubject=`Thank you for signing BFX Authorization System ${data.name}`;
  Ohtml=`<h1>Welcome to BFX prISM CLUB<h1>
  Hope you have a good time !
  Here are your details-
  Name - ${data.name}
  Email- ${data.email}`
} 
else if(str=="resetpassword"){
  Osubject=`Reset Password`;
  Ohtml=`
  <h1>Resume Your Membership in BFX prISM CLUB<h1>
  Here is your link to reset password !
  ${data.resetPasswordLink}`
}
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'BFX prISM CLUB" <rbraj5531@gmail.com>',
    to: data.email, 
    subject: Osubject, 
    html: Ohtml, 
  });

  console.log("Message sent: %s", info.messageId);
};

