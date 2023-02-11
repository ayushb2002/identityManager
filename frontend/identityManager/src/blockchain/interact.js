import abi from './Identity.json'
import {ethers} from 'ethers'

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS

export const executeFunction = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi.abi, signer);
    return contract;
};

export const registerIdentity = async (_adhaar, _name, _dob, _gender, _email) => {
    const contract = executeFunction();
    try{
        _adhaar = toString(_adhaar);
        var date = new Date(_dob);
        var _dobSeconds = date.getTime() / 1000; 
        const txn = await contract.registerIdentity(_adhaar, _name, _dobSeconds, _gender, _email);
        txn.wait(1);
        return true;
    }catch(e)
    {
        console.log(e);
        return false;
    }
};

export const loginIdentity = async (_adhaar, _pwd) => {
    const contract = executeFunction();
    try
    {
        _adhaar = toString(_adhaar);
        const exists = await contract.loginIdentity(_adhaar);
        if(exists)
            return true;
        else
            return false;
    }
    catch(err)
    {
        console.log(err);
        return false;
    }
}

export const returnIdentity = async (_adhaar) => {
    const contract = executeFunction();
    try
    {
        _adhaar = toString(_adhaar);
        const idty = await contract.returnIdentity(_adhaar);
        return idty;
    }
    catch(err)
    {
        console.log(err);
        return false;
    }
}

export const lastHumanVerified = async (_adhaar) => {
    const contract = executeFunction();
    try
    {
        _adhaar = toString(_adhaar);
        const lastHV = await contract.lastHumanVerified(_adhaar);
        return lastHV;
    }
    catch(err)
    {
        console.log(err);
        return false;
    }
}

export const lastIDVerified = async (_adhaar) => {
    const contract = executeFunction();
    try
    {
        const lastID = await contract.returnIdExpiry(_adhaar);
        return lastID;
    }
    catch(err)
    {
        console.log(err);
        return false;
    }
}

export const returnEmail = async () => {
    const contract = executeFunction();
    try
    {
        const email = await contract.returnEmailAddress();
        return email;
    }
    catch(err)
    {
        console.log(err);
        return false;
    }
} 

export const saveHumanVerification = async (_adhaar) => {
    var _date = new Date();
    var _seconds = parseInt(_date.getTime() / 1000); 
    const contract = executeFunction();
    _adhaar = toString(_adhaar);
    try
    {
        const txn = await contract.humanVerify(_adhaar, _seconds);
        txn.wait(1);
        return true;
    }
    catch(err)
    {
        console.log(err);
        return false;
    }
}

export const saveIDCard = async (_adhaar) => {
    var _date = new Date();
    _date.setFullYear(_date.getFullYear()+1); 
    var _seconds = parseInt(_date.getTime() / 1000); 
    const contract = executeFunction();
    _adhaar = toString(_adhaar);
    try
    {
        const txn = await contract.idCardVerify(_adhaar, _seconds);
        txn.wait(1);
        return true;
    }
    catch(err)
    {
        console.log(err);
        return false;
    }
}