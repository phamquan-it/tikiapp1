import nodemailer from "nodemailer";
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILUSER,
      pass: process.env.MAILPASS
    }
  });
  function sendEmail(yourfriend) {
    var mailOptions = {
        from: process.env.MAILUSER,
        to: yourfriend,
        subject: 'SimpleShop',
        html:"<h1>Cảm ơn bạn đã mua hàng của chúng tôi!<h1>",
     //   text: 'Cảm ơn bạn đã mua hàng của chúng tôi!',
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }
  export default sendEmail;