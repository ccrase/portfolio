var express = require("express");
var bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
var path = require("path");
var dotenv = require('dotenv');

var app = express();

var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static("public"));

app.post('/send', (req, res) => {
    console.log(req.body);
    const output = `<h4>You have a new message!</h4>
    <h5>Details</h5>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
    </ul>
    <h5>Message</h5>
    <p>${req.body.message}</p>`;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'calli.crase.dev@gmail.com', // generated ethereal user
            pass: 'kiwiFloat44' // generated ethereal password
        }
    });

    // send mail with defined transport object
    const mailOptions = {
        from: 'test@email.com', // sender address
        to: 'calli.crase.dev@gmail.com', // list of receivers
        subject: 'New message from Portfolio page!', // Subject line
        html: output
    };

    transporter.sendMail(mailOptions, function (err, info){
        if(err){
            console.log(err)
        }
        console.log(info);
        res.redirect('/');
    });
});


app.listen(PORT, function () {
    console.log("App listening on http://localhost:" + PORT);
});