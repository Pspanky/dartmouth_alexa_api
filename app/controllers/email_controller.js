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
    subject: 'FINALLY',
    html: '<b>hello world!</b>',
  });

  const newUser = new User();

  newUser.email = 'paulspangfort@gmail.com';


  console.log('does sendEmail function reach here?');

  newUser.save().then((addedUser) => {
    console.log('in te ten');
    res.send(addedUser);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).send('shit');
  });
};
