import User from '../models/user_model';

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


const transporter = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  auth: {
    user: 'halendrtesting@gmail.com',
    pass: 'Tooshort',
  },
}),
);


export const sendEmail = (req, res) => {
  console.log(req.body.email);
  transporter.sendMail({
    from: 'halendrtesting@gmail.com',
    to: req.body.email,
    subject: 'Welcome to Halendr!',
    html: '<div style="width:700px; background-color:white; font-family: sans-serif"><div style="text-align:center"><b>Confirm your registration</b></div><br><div style="text-align:center">Thanks for signing up. We look forward to connecting you to the things around you.</div><br><br><div></div><div><div><b>Didn’t sign up? </b></div>If you didn’t sign up for an account on Halendr, please let us know.<div></div></div><br><br><div style="text-align:center">We hope you enjoy your experience on Halendr. If you need help using Halendr, please visit our Help Centre. You can also contact us or report a problem, here.</div></div>',
  });

  const newUser = new User();

  newUser.email = 'paulspangfort@gmail.com';

  console.log('Email was sent');

  newUser.save().then((addedUser) => {
    console.log('User added to database');
    res.send(addedUser);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('shit');
  });
};
