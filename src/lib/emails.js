import dotenv from "dotenv";
import nodemailer from "nodemailer"

dotenv.config({ path: "src/.env" })

const emailRegister = async (userData) => {
    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { name, email, token } = userData;

    await transport.sendMail({
        from: "220087@utxicotepec.edu.mx",
        to: email,
        subject: "Welcome to RealState - 220087 - Confirm your account",
        text: `Thank you for chosing us, in our platform, you could sell and buy properties, to continue please follow confirmation link below: link`,
        html: `
            <div class="background-color: red;">
                <p>Hello, ${name}, you are verifying your account on RealState.com</p>
                <p>Your account is almost active please follow the activation link below: <a target="_blank" href="http://localhost:3000/bienes-raices/users/login/confirm/${token}">Click Here to Active Your Account.</a></p>
                <p>If you didnt create this account just ignore this email.</p>
            </div>
        `
    });

    console.log(`
        ######### MailTrap ############ \n 
            Se está intentando enviar un correo electrónico al usuario: ${userData.email}, con el token de validación: ${userData.token} 
        \n #####################`
    );
}


export {
    emailRegister
};