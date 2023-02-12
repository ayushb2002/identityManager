import abi from './Identity.json' assert { type: "json" };
import ethers from 'ethers'
import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser';
import nodemailer from "nodemailer";

async function sendEmail(to, subject, text) {

    let testAccount = await nodemailer.createTestAccount();


    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        auth: {
            user: "eth4all@outlook.com",
            pass: "DecentID"
        }
    });


    let info = await transporter.sendMail({
        from: "eth4all@outlook.com",
        to: to,
        subject: subject,
        text: text,
        html: '<b>' + text + '</b>'
    });
    console.log("email should be sent");
}




dotenv.config()
var app = express();

const contractAddress = process.env.CONTRACT_ADDRESS

export const executeFunction = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi.abi, signer);
    return contract;
};


app.use(cors())

let otpDir = new Map();


app.listen(5000, function () {
    console.log('CORS-enabled web server listening on port 5000');
});

app.get('/', cors(), function (req, res, next) {
    res.json({ msg: 'API home page!' });
})

app.get('/lastHumanVerified/:adhaar', cors(), async function (req, res, next) {
    const lastVerified = await contract.lastHumanVerified(req.params.adhaar);
    res.json({ lastVerified: lastVerified });
})

app.get('/idExpiry/:adhaar', cors(), async function (req, res, next) {
    const idExp = await contract.returnIdExpiry(req.params.adhaar);
    res.json({ expiry: idExp });
})


function getOtp(){
    let otp = "";
    for(let i = 0; i<5; i++){
        otp += Math.floor(Math.random()*10);
    }
    return otp
}

app.post('/send_email_verification', cors(), async (req, res) => {
    let otp = getOtp();
    while(otpDir.has(otp)){
        otp = getOtp();
    }
    otpDir.set(otp,req.body["email"]);
    await sendEmail('yathansh@gmail.com', 'otp', `your otp is ${otp}`);
    res.json({ res: "code_sent" });
})

app.post('/check_verification_code/:code', cors(), async (req, res) => {
    let otp = req.body["otp"];
    let email = req.body["email"]
    if(!otpDir.has(otp) || otpDir.get(otp) != email)
    {
        res.status(400)
        res.json({"res":"error"})
    }
    else{
        otpDir.delete(otp);
        res.json({"res":"success"})
    }
})