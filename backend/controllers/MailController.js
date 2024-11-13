const nodemailer = require('nodemailer');
const dotEnv = require("dotenv");
dotEnv.config();
// Email controller function
const sendEmail = async (req, res) => {
  const { recipientEmail, subject, message } = req.body; // Get email data from request body

  try {
    // Create transporter object
    let transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services like Yahoo, Outlook, etc.
      auth: {
        user: process.env.MAILID, // Your email
        pass: process.env.MAILPASS, // Your email password (use app-specific password if using 2FA)
      },
    });

    // Email options
    let mailOptions = {
        from: process.env.MAILID, // Sender address
        to: recipientEmail, // Receiver email address from request body
        subject: subject, // Subject from request body
        text: message, // Plain text message from request body
        html: `<p>${message}</p>`, // Optionally, HTML body
      };

    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    
    // Respond with success
    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Error sending email', error });
  }
};

module.exports = { sendEmail };
