import { Twilio } from "twilio";
import dotenv from 'dotenv'
dotenv.config()

const client = new Twilio(process.env.accountSid, process.env.authToken);

export const sendSms = (to: string, body: string, txt: string) => {
    try {
        client.messages
            .create({
                body: `Blog Spot ${txt} - ${body}`,
                from: process.env.TWILIO_PHONE_NUMBER,
                to
            })
            .then(message => console.log(message.sid));
    } catch (error) {
        console.log(error);

    }
}