const nodemailer = require('nodemailer');

// Configurer Nodemailer
const transporter = nodemailer.createTransport({
    service: 'Gmail', // ou un autre service de messagerie
    auth: {
        user: 'mahefatb@gmail.com',
        pass: 'mvexqrnoyuymxpdu'
    }
});

const sendVerificationEmail = (email, code) => {
    const mailOptions = {
        from: 'mahefatb@gmail.com',
        to: email,
        subject: 'Votre code de vérification',
        text: `Votre code de vérification est : ${code}`
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendVerificationEmail
};
