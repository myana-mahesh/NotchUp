require("dotenv").config();
const path = require('path');

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
const moment = require('moment')

app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'jade');


 app.get('/',(req,res)=>{
    res.send("Welcome to Booking Section")
});

app.post("/api/bookings", (req, res) => {
  let data = req.body;

  var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    auth: {
      user: "freelancers.flow@gmail.com",
      pass: "{Freelancers@123}",
    },
  });
  let mailOptions = {
    from: "freelancers.flow@gmail.com",
    to: data.parentemail,
    subject: "NotchUp Trial Class Booked Successfully",
    text: `
        Dear ${data.parentname},

        ${data.childname}'s class at ${moment(data.date).format('DD/MM/YYYY  h:mm a')} has been successfully booked.
        
        `,
  };

  smtpTransport.sendMail(mailOptions, (error, data) => {
    if (error) {
      console.log("Error occurs", error);
    } else {
      console.log("Email sent!");
      //res.sendFile(path.join(__dirname,'/public/sucess.html'));
      res.redirect('/')
    }
  });

  smtpTransport.close();
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});