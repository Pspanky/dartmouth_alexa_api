import User from '../models/user_model';

const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const os = require('os');
const hostname = os.hostname();

const originalFile = process.argv[2].toString();
const baseDir = process.argv[3].toString();
const recipient = process.argv[4].toString();

const Styliner = require('styliner');


const uncDrive = `\\\\${hostname}\\DevTC`;
const uncPath = baseDir.replace(/.*DevTC/gi, uncDrive);


// prependUNCPath is a function called by Styliner for every
// link that is found in the HTML.
function prependUNCPath(path, type) {
  return uncPath + path;
}

// See http://styliner.slaks.net/#about for Styliner options
const options = { url: prependUNCPath, noCSS: true };
const styliner = new Styliner(baseDir, options);

// // const os = require('os');
// // const hostname = os.hostname();
// //
// // const originalFile = process.argv[2].toString();
// // const baseDir = process.argv[3].toString();
// // const recipient = process.argv[4].toString();
// //
// // const Styliner = require('styliner');
// //
// //
// // const uncDrive = `\\\\${hostname}\\DevTC`;
// // const uncPath = baseDir.replace(/.*DevTC/gi, uncDrive);
// //
// // // See http://styliner.slaks.net/#about for Styliner options
// // const options = { url: prependUNCPath, noCSS: true };
// // const styliner = new Styliner(baseDir, options);
//
//
// // prependUNCPath is a function called by Styliner for every
// // link that is found in the HTML.
// function prependUNCPath(path, type) {
//   return uncPath + path;
// }


const transporter = nodemailer.createTransport(smtpTransport({
  service: 'Gmail',
  auth: {
    user: 'halendrtesting@gmail.com',
    pass: 'Tooshort',
  },
}),
);


function sendEmailFunc(source) {
    // setup e-mail data with unicode symbols
  const mailOptions = {
    from: 'TeamCity <teamcity@company.com>', // sender address
    to: recipient, // list of receivers
    subject: 'Code Coverage results', // Subject line
        // text: 'Hello world ?', // plaintext body, not used
    html: source, // html body
  };

    // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Message sent: ${info.response}`);
    }
  });


    // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Message sent: ${info.response}`);
    }
  });
}


export const sendEmail = (req, res) => {
  console.log(req.body.email);
  transporter.sendMail({
    from: 'halendrtesting@gmail.com',
    to: req.body.email,
    subject: 'Welcome to Halendr!',
    html: '<b> cool beans </b>',
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


const fs = require('fs');

// Do the reading of the original index.html, and kick everything off.
fs.readFile(originalFile, 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  styliner.processHTML(data)
    .then((source) => {
      sendEmail(source);

      fs.writeFile('newindex.html', source, (err) => {
        if (err) {
          return console.log(err);
        } else { return console.log('The file was saved!'); }
      });
    },
    );
  return console.log('as');
});
