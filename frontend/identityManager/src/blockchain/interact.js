import abi from './Identity.json'
import {ethers} from 'ethers'
import {bcrypt} from 'bcryptjs'

const contractAddress = import.meta.VITE_CONTRACT_ADDRESS

export const executeFunction = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi.abi, signer);
    return contract;
};

export const registerIdentity = async (_adhaar, _name, _dob, _gender, _email, _pwd) => {
    const contract = executeFunction();
    try{
        var salt = bcrypt.genSaltSync(10);
        var _hashedPwd = bcrypt.hashSync(_pwd, salt);
        var date = new Date(_dob);
        var _dobSeconds = date.getTime() / 1000; 
        const txn = await contract.registerIdentity(_adhaar, _name, _dobSeconds, _gender, _email, _hashedPwd);
        txn.wait(1);
        return true;
    }catch(e)
    {
        console.log(e);
        return false;
    }
};