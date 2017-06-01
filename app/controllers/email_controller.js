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
    subject: 'Halendr Registration Confirmed!',
    html: '<div style="width:700px; background-color:white; font-family: sans-serif"><img src="https://s11.postimg.org/bw1ik7qpf/Halendr_Logo_1.png" style="width: 260px; display: block; margin: auto" /><br/><br/><br/><div style="text-align:center"><b>Registration Confirmed!</b></div><br/><div style="text-align:center">Thank you for signing up. We look forward to connecting you to the things you love.</div><br/><br/><div></div><div style="position: relative; left: 20px;"><div ><b>Didn’t sign up? </b></div>If you didn’t sign up for an account on Halendr, please let us know.<div></div></div><br/><br/><div style="text-align:center">We hope you enjoy your experience on Halendr. If you need help using Halendr, please visit our Help Centre.</div><br/><div style="width: 80%; height: 1px; background-color: rgba(255,65,43, 0.4); margin: auto;"></div></div>',
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
