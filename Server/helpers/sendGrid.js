const sgMail = require (`@sendgrid/mail`)

function sendEmail (email, data) {
    sgMail.setApiKey(process.env.SENDGRID_ID)
    const content = {
        to: `${email}`,
        from: `judi@bola.com`,
        subject: `Thank you for registering`,
        text: `Here is your username and password`,
        html: `<h1>Thank you for registering</h1><br><br>
        <h5>Here is your username and password</h5>
        <h5>Username</h5>
        <p>${data.username}</p>
        <h5>password</h5>
        <p>${data.password}</p>
        `
    }
    sgMail.send(content)
}

module.exports = sendEmail