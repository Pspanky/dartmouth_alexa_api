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
    html: '<div style="color: blue"> Hey </div>',
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
