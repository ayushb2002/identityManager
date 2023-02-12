import abi from './Identity.json' assert { type: "json" };
import ethers from 'ethers'
import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
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
 
app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000');
});

app.get('/', cors(), function (req, res, next) {
  res.json({msg: 'API home page!'});
})

app.get('/lastHumanVerified/:adhaar', cors(), async function (req, res, next) {
  const lastVerified = await contract.lastHumanVerified(req.params.adhaar);
  res.json({lastVerified: lastVerified});
})

app.get('/idExpiry/:adhaar', cors(), async function (req, res, next) {
  const idExp = await contract.returnIdExpiry(req.params.adhaar);
  res.json({expiry: idExp});
})
