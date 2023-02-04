import abi from './Identity.json'
import {ethers} from 'ethers'

const contractAddress = import.meta.VITE_CONTRACT_ADDRESS

export const executeFunction = () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi.abi, signer);
    return contract;
};

