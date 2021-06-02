var nodemailer = require("nodemailer");
var ejs = require("ejs");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'quantanics.in@gmail.com', // your domain email address
        pass: 'keshavan00194' // your password
    }
});

exports.sendEmail = async function (req, res) {
    const data = await ejs.renderFile(`email-templates/welcome.ejs`, { name: 'Stranger' });
    var mailOptions = {
        from: `"Admin" <quantanics.in@gmail.com>`,
        to: 'pearlpandzz@gmail.com',
        subject: `Welcome ${'Stranger'}`,
        html: data
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            return res.send('Error while sending email' + err)
        }
        else {
            console.log("Email sent");
            return res.send('Email sent')
        }
    });

}