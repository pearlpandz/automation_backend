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

exports.sendEmailForWelcome = async function (req) {
    const data = await ejs.renderFile(`email-templates/welcome.ejs`, {
        name: req.name,
        token: btoa(req.email),
        email: req.email,
        password: req.password
    });
    var mailOptions = {
        from: `"Quantanics" <no-reply@quantanics.in>`,
        to: `${req.email}`,
        subject: `Welcome ${req.name}`,
        html: data
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            return err
        }
        else {
            console.log("Email sent");
            return true
        }
    });

}