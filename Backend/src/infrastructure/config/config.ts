import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: parseInt(process.env.PORT as string),
    DB_URL: process.env.DB_URL,
    EMAIL: process.env.SMTP_MAIL,
    EMAIL_PASS: process.env.SMTP_PASSWORD,
    JWT_KEY:process.env.JWT_KEY
}

export default config