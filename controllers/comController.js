/**
 * Created by Kyle Walter on 2/2/2017.
 */
/**
 * Created by Kyle Walter on 2/2/2017.
 */
let exports = {};

exports.email = (email,subject, message,done) => {
    let helper = require('sendgrid').mail;

    let from_email = new helper.Email("reset@kkwalter.com");
    let to_email = new helper.Email(email);
    let content = new helper.Content("text/plain", message);
    let mail = new helper.Mail(from_email, subject, to_email, content);

    console.log(process.env.SENDGRID_API_KEY)
    var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    sg.API(request, function (error, response) {
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
        return done(error,response);
    })
};

export default exports;