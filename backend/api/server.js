//import abi from './Identity.json' assert { type: "json" };
import ethers from 'ethers'
import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import bodyParser from 'body-parser';
import nodemailer from "nodemailer";
import * as fs from "fs";
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const loadJSON = (path) => JSON.parse(fs.readFileSync(new URL(path, import.meta.url)));

const json = loadJSON('./Identity.json');
const abi = json.abi 

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

async function sendEmail(to, subject, text) {
    
    var pwd = process.env.EMAIL_PASSWORD;
    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        auth: {
            user: "decentid@outlook.com",
            pass: pwd,
        }
    });

    let info = await transporter.sendMail({
        from: "decentid@outlook.com",
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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi.abi, signer);
    return contract;
};

async function matchAPIKey (_adhaar, _passphrase) {
    const contract = executeFunction();
    _adhaar = toString(_adhaar);
    const _key = bcrypt.hashSync(_passphrase, salt);
    try
    {
        const result = await contract.matchAPIKey(_adhaar, _key);
        return result;
    }
    catch(err)
    {
        console.log(err);
        return false;
    }
}

async function loginIdentity (_adhaar, _signer) {
    const contract = new ethers.Contract(contractAddress, abi.abi, _signer);
    try {
        _adhaar = toString(_adhaar);
        const exists = await contract.loginIdentity(_adhaar);
        if (exists)
            return true;
        else
            return false;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function returnIdentity (_adhaar, _signer) {
    const contract = new ethers.Contract(contractAddress, abi.abi, _signer);
    try {
        _adhaar = toString(_adhaar);
        const idty = await contract.returnIdentity(_adhaar);
        return idty;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function returnQuestions (_adhaar, _signer) {
    const contract = new ethers.Contract(contractAddress, abi.abi, _signer);
    _adhaar = toString(_adhaar);
    try {
        const questionAnswers = await contract.returnSecurityQuestions(_adhaar);
        var questions = questionAnswers[0];
        return questions;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function matchSecurityAnswers (_adhaar, _answers, _signer) {
    const contract = new ethers.Contract(contractAddress, abi.abi, _signer);
    _adhaar = toString(_adhaar);
    try {
        const questionAnswers = await contract.returnSecurityQuestions(_adhaar);
        var answers = questionAnswers[1];
        for(var i=0;i<answers.length;i++)
        {
            if(!bcrypt.compareSync(_answers[i], answers[i]))
                return false;
        }
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function returnEmail (_signer, _adhaar) {
    const contract = new ethers.Contract(contractAddress, abi.abi, _signer);
    _adhaar = toString(_adhaar);
    try {
        const email = await contract.returnEmailAddress(_adhaar);
        return email;
    } catch (err) {
        console.log(err);
        return false;
    }
}

async function linkToHost (_signer, _adhaar, _key) {
    const contract = new ethers.Contract(contractAddress, abi.abi, _signer);
    try {
        const txn = await contract.linkAHost(_adhaar, _key);
        txn.wait(1);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())
app.use(express.json());


let otpDir = new Map();


app.listen(5001, function () {
    console.log('CORS-enabled web server listening on port 5001');
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

app.post('/login_step_1', cors(), async (req, res) => {
    var signer = req.body.signer;   // signer object for the user logging in
    var adhaarSigner = req.body.adhaarSigner; // adhaar number of the user logging in
    var apiKey = req.body.apiKey;   // each api owner has a passphrase set by them during business registration
    var adhaarOwner = req.body.adhaarOwner; // adhaar number of API owner
    const matchAPI = await matchAPIKey(adhaarOwner, apiKey);
    if(!matchAPI)
    {
        res.send({"error": "API key not correct!"});
        return;
    }

    const checkIfUserExists = await loginIdentity(adhaarSigner, signer);

    if(!checkIfUserExists)
    {
        res.send({"error": "User details incorrect!"});
        return;
    }

    var email = await returnEmail(signer, adhaarSigner);
    const link = await linkToHost(signer, adhaarSigner, apiKey);
    if(!link)
    {
        res.send({"error": "Could not link the user to the host!"});
        return;
    }

    let otp = getOtp();
    while(otpDir.has(otp)){
        otp = getOtp();
    }
    otpDir.set(otp,req.body["email"]);
    await sendEmail(email, 'otp', `your otp is ${otp}`);

    res.send({"Success": "OTP has been sent to the user."});
    return;
});

app.post('/login_without_transaction', cors(), async (req, res) => {
    var otp = req.body.otp; 
    var signer = req.body.signer;
    var adhaarSigner = req.body.adhaarSigner;
    var email = await returnEmail(signer, adhaarSigner);
    var otpVerify = true;

    if(!otpDir.has(otp) || otpDir.get(otp) != email)
    {
        otpVerify = false;
    }
    else{
        otpDir.delete(otp);
    }    

    if(!otpVerify)
    {
        res.send({"error": "OTP found incorrect!"});
        return;
    }

    const identity = await returnIdentity(adhaarSigner, signer);
    if(!identity)
    {
        res.send({"error": "Server error!"});
    }

    var date = new Date(1970, 1, 1);
    date.setSeconds(identity[2]);
    var strDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

    res.send({
        "success": true,
        "transactionAccess": false,
        "name": identity[1],
        "email": identity[4],
        "gender": identity[3],
        "dateOfBirth": strDate
    });
    return;
});

app.post('/login_with_transaction_step_1', cors(), async (req, res) => {
    var otp = req.body.otp; // otp by user
    var email = await returnEmail(signer, adhaarSigner);
    var signer = req.body.signer;
    var adhaarSigner = req.body.adhaarSigner;
    var otpVerify = true;
    if(!otpDir.has(otp) || otpDir.get(otp) != email)
    {
        otpVerify = false;
    }
    else{
        otpDir.delete(otp);
    }
    
    if(!otpVerify)
    {
        res.send({"error": "OTP found incorrect!"});
        return;
    }

    const questions = await returnQuestions(adhaarSigner, signer);
    if(!questions)
    {
        res.send({
            "error": "User has not enabled transactions! The user need to set security questions to enable transactions."
        });
        return;
    }

    res.send({
        "success": true,
        "question1": questions[0],
        "question2": questions[1]
    })
    return;
});

app.post('/login_with_transaction_step_2', cors(), async (req, res) => {

    var answer1 = req.body.answer1;
    var answer2 = req.body.answer2;
    const answers = [answer1, answer2];
    var bank = req.body.bank;
    var payableAmount = req.body.payment;
    var signer = req.body.signer;
    var adhaarSigner = req.body.adhaarSigner;

    const verifySecurity = await matchSecurityAnswers(adhaarSigner, answers, signer);
    if(!verifySecurity)
    {
        res.send({
            "error": "Incorrect security answers!"
        });
        return;
    }

    const identity = await returnIdentity(adhaarSigner, signer);
    if(!identity)
    {
        res.send({"error": "Server error!"});
    }

    var date = new Date(1970, 1, 1);
    date.setSeconds(identity[2]);
    var strDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
    var successKey = generateString(20);
    
    /*

    FUTURE SCOPE: SEND THIS REQUEST TO BANK GATEWAY TO PROCESS THE PAYMENT
    Send a request to the requested bank gateway with following details
    {
        "bank": bank,
        "payable": payableAmount,
        "successKey": successKey
    }

    To bring this into production, bank can maintain a mapping successKey -> payableAmount and when the business 
    platform supplies the success key with their bank account, they should receive the payment.

    */

    res.send({
        "success": true,
        "transactionAccess": true,
        "oneTimeUseKey": successKey,    // send this to UPI / Bank portal and receive the payment
        "name": identity[1],
        "email": identity[4],
        "gender": identity[3],
        "dateOfBirth": strDate
    });
    return;

});

app.post('/send_email_verification', cors(), async (req, res) => {
    console.log(req.body.email.toString())
    var email = req.body.email.toString();
    let otp = getOtp();
    while(otpDir.has(otp)){
        otp = getOtp();
    }
    otpDir.set(otp,req.body["email"]);
    await sendEmail(email, 'otp', `your otp is ${otp}`);
    res.json({ res: "code_sent" });
})

app.post('/check_verification_code', cors(), async (req, res) => {
    let otp = req.body.otp.toString();
    let email = req.body.email.toString();
    if(!otpDir.has(otp) || otpDir.get(otp) != email)
    {
        res.status(400)
        res.json({"res":false})
    }
    else{
        otpDir.delete(otp);
        res.json({"res":true})
    }
})