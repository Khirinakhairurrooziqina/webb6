const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'your-email@gmail.com', // Your email
        pass: 'your-email-password' // Your email password
    }
});

app.post('/send-email', (req, res) => {
    const { event, quantity, name, email } = req.body;

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email, // Send confirmation to the user
        subject: 'Event Ticket Booking Confirmation',
        text: `Hello ${name},\n\nThank you for booking ${quantity} tickets for ${event}.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
