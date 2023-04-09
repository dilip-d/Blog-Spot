import nodemailer from 'nodemailer'
import { OAuth2Client } from 'google-auth-library'
import dotenv from 'dotenv'
dotenv.config()

const OAUTH_PLAYGROUND = 'https://developers.google.com/oauthplayground'

const sendEmail = async (to: string, url: string, txt: string) => {
    
    const oAuth2Client = new OAuth2Client(
        process.env.MAIL_CLIENT_ID,
        process.env.MAIL_CLIENT_SECRET,
        OAUTH_PLAYGROUND
    )

    oAuth2Client.setCredentials({ refresh_token: process.env.MAIL_REFRESH_TOKEN })

    try {
        const access_token: any = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.SENDER_EMAIL_ADDRESS,
                clientId: process.env.MAIL_CLIENT_ID,
                clientSecret: process.env.MAIL_CLIENT_SECRET,
                refreshToken: process.env.MAIL_REFRESH_TOKEN,
                accessToken: access_token
            }
        })

        const mailOptions = {
            from: process.env.SENDER_EMAIL_ADDRESS,
            to: to,
            subject: 'Blog Spot',
            html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Blog Spot.</h2>
            <p>Congratulations! You're almost set to start using Blog Spot.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
          `,
        }

        const result = await transport.sendMail(mailOptions)
        return result;
    } catch (error) {
        console.log(error);

    }
}

export default sendEmail;