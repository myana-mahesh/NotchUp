require("dotenv").config();
const path = require('path');
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const mongoose = require("mongoose");
const moment = require('moment')

app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'jade');

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
}
 app.get('/',(req,res)=>{
    res.send("Welcome to Booking Section")
});

app.post("/api/bookings", (req, res) => {
  let data = req.body;
  let ttime=moment(data.date).valueOf()
  ttime=new Date(ttime + 19800000)
  console.log(moment(ttime).format('DD/MM/YYYY  h:mm a'))
  //let time =data.date.getTime()+19800000
  var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: "myanamahesh786@gmail.com",
      pass: "gznofzkgelxfvhyx",
    },
  });
  let mailOptions = {
    from: "freelancers.flow@gmail.com",
    to: data.parentemail,
    subject: "NotchUp Trial Class Booked Successfully",
    text: `
        Dear ${data.parentname},

        ${data.childname}'s class at ${moment(ttime).format('DD/MM/YYYY  h:mm a')} has been successfully booked.
        
        `,
  };

  smtpTransport.sendMail(mailOptions, (error, data) => {
    if (error) {
      console.log("Error occurs", error);
    } else {
      console.log("Email sent!");
      window.location.href = 'http://www.google.com';
			window.open('http://www.google.com');
      //res.sendFile(path.join(__dirname,'/public/sucess.html'));
      res.redirect('/')
    }
  });

  smtpTransport.close();
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
