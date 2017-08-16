import User from '../models/user_model';
import Candidate from '../models/candidate_model';

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
    to: 'no-reply@halendr.com',
    subject: 'New User Registered',
    text: req.body.email,
  });

  const newUser = new User();
  newUser.email = req.body.email;
  console.log(newUser);

  User.find({ email: req.body.email }).then((response) => {
    console.log(response);
    // Check if user exists already
    if (response.length > 0) {
      console.log(response);
      res.send('user exists');
    } else {
      transporter.sendMail({
        from: 'no-reply@halendr.com',
        to: req.body.email,
        subject: 'Hello from Halendr!',
        html: '<div style="width:550px; background-color:white; font-family: sans-serif"><img src="https://s11.postimg.org/bw1ik7qpf/Halendr_Logo_1.png" style="width: 260px; display: block; margin: auto" /><br/><br/><div style="text-align:center"></div><br/><div style="text-align:center">Thank you for signing up! We\'re excited that you\'re interested in discovering what\'s happening around you and we can\'t wait to see you on 01 September 2017. </div><br/><div></div><div style="position: relative; left: 20px;"><div></div></div><br/><br/><div style="text-align:center">We\'ll be in touch with exciting updates closer to our launch.</div><br/><div style="width: 80%; height: 1px; background-color: rgba(255,65,43, 0.4); margin: auto;"></div></div>',
      });

      newUser.save().then((addedUser) => {
        console.log('User added to database');
        res.send(addedUser);
      });
    }
  });
};

export const sendCandidateEmail = (req, res, history) => {
  console.log(req.body.email);

  const newCandidate = new Candidate();
  newCandidate.email = req.body.email;
  console.log(newCandidate);

  Candidate.find({ email: req.body.email }).then((response) => {
    console.log(response);
    // Check if user exists already
    if (response.length > 0) {
      res.send('user already exists');
    } else {
      // send confirmation email to ourselves
      transporter.sendMail({
        from: 'no-reply@halendr.com',
        to: 'no-reply@halendr.com',
        subject: 'New Candidate Registered',
        text: req.body.email,
      });

      // save new candidate to database
      newCandidate.save().then((addedUser) => {
        console.log('User added to database');
        res.send(addedUser);
      });
    }
  });
};
