import User from '../models/user_model';

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');


const transporter = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  auth: {
    user: 'no-reply@halendr.com',
    pass: 'PaulisaQT!',
  },
}),
);


export const sendEmail = (req, res, history) => {
  console.log(req.body.email);
  transporter.sendMail({
    from: 'no-reply@halendr.com',
    to: req.body.email,
    subject: 'Hello from Halendr!',
    html: '<div style="width:700px; background-color:white; font-family: sans-serif"><img src="https://s11.postimg.org/bw1ik7qpf/Halendr_Logo_1.png" style="width: 260px; display: block; margin: auto" /><br/><br/><br/><div style="text-align:center"><b>Registration Confirmed!</b></div><br/><div style="text-align:center">Thank you for signing up! We\'re excited that you\'re interested in discovering everything happening around you and we can\'t wait to see you on 01 July 2017. </div><br/><br/><div></div><div style="position: relative; left: 20px;"><div></div></div><br/><br/><div style="text-align:center">We\'ll be in touch with exciting updates closer to our launch.</div><br/><div style="width: 80%; height: 1px; background-color: rgba(255,65,43, 0.4); margin: auto;"></div></div>',
  });

  transporter.sendMail({
    from: 'no-reply@halendr.com',
    to: 'no-reply@halendr.com',
    subject: 'New User Registered',
    text: req.body.email,
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
