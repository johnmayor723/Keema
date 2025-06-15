const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 7070;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET route to render index.ejs
app.get('/', (req, res) => {
  res.render('index');
});

// POST route for early access form
app.post('/early-access', async (req, res) => {
  const { name, email } = req.body;

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'marketpicks723@gmail.com',       // Replace with your email
      pass: 'yvbqttivjtmvlbhp'         // Replace with your app password or env variable
    }
  });
  
 
  const mailOptions = {
    from: '"Keema Early Access" <marketpicks723@gmail.com>', // Replace with sender email
    to: 'support@keema.com.ng',
    subject: 'New Early Access Signup',
    html: `
      <h3>New Early Access Request</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.render('thanks');
  } catch (error) {
    console.error(error);
    res.render("index");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
