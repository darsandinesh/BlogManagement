import nodemailer from 'nodemailer';
import config from '../infrastructure/config/config';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.EMAIL,
        pass: config.EMAIL_PASS
    }
});


export const sendEmailVerification = async (to: string): Promise<void> => {
    const mailOptions = {
        from: config.EMAIL,
        to: to,
        subject: "Email Verification",
        html: `
        <!DOCTYPE html>
        <html lang="en">
    
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    color: #333;
                }

                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .email-header {
                    background-color: rgb(76, 84, 175);
                    padding: 20px;
                    text-align: center;
                    color: white;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                }

                .email-body {
                    background-color: white;
                    padding: 20px;
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;
                    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
                }

                h2 {
                    color: white;
                }

                h1 {
                    color: rgb(76, 91, 175);
                    text-align: center;
                }

                p {
                    font-size: 16px;
                    line-height: 1.5;
                }

                .verify-button {
                    display: block;
                    color:white;
                    width: 100%;
                    max-width: 200px;
                    margin: 20px auto;
                    padding: 15px;
                    background-color: rgb(76, 83, 175);
                    color: white;
                    text-align: center;
                    text-decoration: none;
                    font-size: 16px;
                    border-radius: 5px;
                }

                .verify-button:hover {
                    background-color: rgb(73, 69, 160);
                }

                .email-footer {
                    text-align: center;
                    font-size: 12px;
                    color: #777;
                    margin-top: 20px;
                }

                .email-footer a {
                    color: rgb(76, 92, 175);
                    text-decoration: none;
                }
            </style>
        </head>

        <body>

            <div class="container">
                <div class="email-header">
                    <h2>Email Verification</h2>
                </div>

                <div class="email-body">
                    <h1>Verify Your Email Address</h1>
                    <p>Hello,</p>
                    <p>Thank you for registering with us! To complete your registration and activate your account, please click the button below to verify your email address.</p>

                    <a target="_blank" href="blog-management-jet.vercel.app/email/${to}" class="verify-button" style='color:white'>Verify Email</a>

                    <p>If the button above doesn't work, please copy and paste the following URL into your web browser:</p>
                    <p><a target="_blank" href="blog-management-jet.vercel.app/email/${to}">blog-management-jet.vercel.app/email/${to}</a></p>


                    <p style='color:red'><strong>Note:</strong> This link will expire in 30 minutes.</p>

                    <p>If you did not create an account, please ignore this email.</p>
                </div>

                <div class="email-footer">
                    <p>Need help? Contact us at <a href="mailto:henryaugustus2001@gmail.com">henryaugustus2001@gmail.com</a></p>
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                </div>
            </div>

        </body>

    
        </html>
        `
    };


    try {
        await transporter.sendMail(mailOptions);
        console.log("Mail sent to ", to);
    } catch (error) {
        console.error("Error sending OTP", error);
        throw new Error("Failed to send OTP email");
    }
}



export const sendForgotPasswordEmail = async (to: string): Promise<void> => {
    const mailOptions = {
        from: config.EMAIL,
        to: to,
        subject: "Password Reset Request",
        html: `
        <!DOCTYPE html>
        <html lang="en">
    
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                    color: #333;
                }

                .container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                }

                .email-header {
                    background-color: rgb(219, 68, 55);
                    padding: 20px;
                    text-align: center;
                    color: white;
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                }

                .email-body {
                    background-color: white;
                    padding: 20px;
                    border-bottom-left-radius: 10px;
                    border-bottom-right-radius: 10px;
                    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
                }

                h2 {
                    color: white;
                }

                h1 {
                    color: rgb(219, 68, 55);
                    text-align: center;
                }

                p {
                    font-size: 16px;
                    line-height: 1.5;
                }

                .reset-button {
                    display: block;
                    color:white;
                    width: 100%;
                    max-width: 200px;
                    margin: 20px auto;
                    padding: 15px;
                    background-color: rgb(219, 68, 55);
                    color: white;
                    text-align: center;
                    text-decoration: none;
                    font-size: 16px;
                    border-radius: 5px;
                }

                .reset-button:hover {
                    background-color: rgb(200, 57, 50);
                }

                .email-footer {
                    text-align: center;
                    font-size: 12px;
                    color: #777;
                    margin-top: 20px;
                }

                .email-footer a {
                    color: rgb(219, 68, 55);
                    text-decoration: none;
                }
            </style>
        </head>

        <body>

            <div class="container">
                <div class="email-header">
                    <h2>Password Reset Request</h2>
                </div>

                <div class="email-body">
                    <h1>Reset Your Password</h1>
                    <p>Hello,</p>
                    <p>We received a request to reset the password for your account. If you made this request, please click the button below to reset your password.</p>

                    <a target="_blank" href="blog-management-jet.vercel.app/reset-password/${to}" class="reset-button" style='color:white'>Reset Password</a>

                    <p>If the button above doesn't work, please copy and paste the following URL into your web browser:</p>
                    <p><a target="_blank" href="blog-management-jet.vercel.app/reset-password/${to}">blog-management-jet.vercel.app/reset-password/${to}</a></p>

                    <p>If you did not request a password reset, please ignore this email.</p>
                </div>

                <div class="email-footer">
                    <p>Need help? Contact us at <a href="mailto:henryaugustus2001@gmail.com">henryaugustus2001@gmail.com</a></p>
                    <p>&copy; 2024 Your Company. All rights reserved.</p>
                </div>
            </div>

        </body>
    
        </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log("Password reset email sent to", to);
    } catch (error) {
        console.error("Error sending password reset email", error);
        throw new Error("Failed to send password reset email");
    }
}


//----------------------------------------------------------------------------------------------------------------------------------