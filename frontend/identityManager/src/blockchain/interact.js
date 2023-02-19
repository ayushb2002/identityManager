import abi from './Identity.json'
import {
    ethers
} from 'ethers'
import bcrypt from 'bcryptjs';
var salt = bcrypt.genSaltSync(10);

const contractAddress =
    import.meta.env.VITE_CONTRACT_ADDRESS

export const executeFunction = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi.abi, signer);
    return contract;
};

export const registerIdentity = async (_adhaar, _name, _dob, _gender, _email) => {
    const contract = executeFunction();
    try {
        _adhaar = toString(_adhaar);
        var date = new Date(_dob);
        var _dobSeconds = date.getTime() / 1000;
        const txn = await contract.registerIdentity(_adhaar, _name, _dobSeconds, _gender, _email);
        txn.wait(1);
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

export const loginIdentity = async (_adhaar) => {
    const contract = executeFunction();
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

export const returnIdentity = async (_adhaar) => {
    const contract = executeFunction();
    try {
        _adhaar = toString(_adhaar);
        const idty = await contract.returnIdentity(_adhaar);
        return idty;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const lastHumanVerified = async (_adhaar) => {
    const contract = executeFunction();
    try {
        _adhaar = toString(_adhaar);
        const lastHV = await contract.lastHumanVerified(_adhaar);
        return parseInt(lastHV);
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const lastIDVerified = async (_adhaar) => {
    const contract = executeFunction();
    _adhaar = toString(_adhaar);
    try {
        const lastID = await contract.returnIdExpiry(_adhaar);
        return parseInt(lastID);
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const returnEmail = async (_adhaar) => {
    const contract = executeFunction();
    _adhaar = toString(_adhaar);
    try {
        const email = await contract.returnEmailAddress(_adhaar);
        return email;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const saveHumanVerification = async (_adhaar) => {
    var _date = new Date();
    var _seconds = parseInt(_date.getTime() / 1000);
    const contract = executeFunction();
    _adhaar = toString(_adhaar);
    try {
        const txn = await contract.humanVerify(_adhaar, _seconds);
        txn.wait(1);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const saveIDCard = async (_adhaar) => {
    var _date = new Date();
    _date.setFullYear(_date.getFullYear() + 1);
    var _seconds = parseInt(_date.getTime() / 1000);
    const contract = executeFunction();
    _adhaar = toString(_adhaar);
    try {
        const txn = await contract.idCardVerify(_adhaar, _seconds);
        txn.wait(1);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const registerQuestions = async (_adhaar, _questions, _answers) => {
    const contract = executeFunction();
    _adhaar = toString(_adhaar);

    for (var i = 0; i < 2; i++) {
        _answers[i] = bcrypt.hashSync(_answers[i], salt);
    }

    try {
        const txn = await contract.registerSecurityQuestions(_adhaar, _questions, _answers);
        txn.wait(1);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const returnQuestions = async (_adhaar) => {
    const contract = executeFunction();
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

export const deactivate = async (_adhaar) => {
    const contract = executeFunction();
    _adhaar = toString(_adhaar);
    try {
        const txn = await contract.deactivate(_adhaar);
        txn.wait(1);
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}

export const matchSecurityAnswers = async (_adhaar, _answers) => {
    const contract = executeFunction();
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

export const registerBusiness = async (_adhaar, _name, _passphrase) => {
    const contract = executeFunction();
    _adhaar = toString(_adhaar);
    const _key = bcrypt.hashSync(_passphrase, salt);
    try
    {
        const txn = await contract.generateAPIKeyForHost(_adhaar, _name, _key);
        txn.wait(1);
        return true;
    }
    catch(err)
    {
        console.log(err);
        return false;
    }
}

export const matchAPIKey = async (_adhaar, _passphrase) => {
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

export const deactivateBusiness = async (_adhaar, _passphrase) => {
    const contract = executeFunction();
    _adhaar = toString(_adhaar);
    const _key = bcrypt.hashSync(_passphrase, salt);
    try
    {
        const txn = await contract.deactivateHost(_adhaar, _key);
        txn.wait(1);
        return true;
    }
    catch(err)
    {
        console.log(err);
        return false;
    }
}