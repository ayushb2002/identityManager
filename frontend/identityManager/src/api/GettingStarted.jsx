import React from 'react';

const GettingStarted = () => {
  return (
    <>
    <div className='grid grid-cols-2 p-5'>
      <div className="col-span-2 flex justify-start p-2 mb-5">
        <span className='text-3xl'>Getting Started</span>
      </div>
      <div className='col-span-2 p-2'>
        <p>
        Once you are registered with us as a business owner, you can use your passphrase to send a request to our server to retrieve data. We support using Ethers.js and in order to get the user authenticated, we require the <span className='bg-base-300 text-green-400'>`signer`</span> object from you. Whenever you make a POST request to us, you will send this object with the adhaar number of the user willing to authenticate and adhaar number with passphrase of the business owner. The common step for both transaction and non transaction based login will be this. First, a POST request will be sent to the url <span className='bg-base-300 text-green-400'>`/login_step_1`</span> with the following parameters - 
        </p>
      </div>
      <div className='col-span-2 my-5 py-2 px-5 bg-base-300 text-yellow-500'>
        <code>
          {'{'}
          <div className='pl-5'>
            <span>"signer": /* Signer object */</span>, <br />
            <span>"adhaarSigner": /* Adhaar number of the user as a string */</span>, <br />
            <span>"apiKey": /* Passphrase belonging to business owner */</span>, <br />
            <span>"adhaarOwner": /* Adhaar number of the business owner, who has registered the API */</span>
          </div>
          {'}'}
        </code>
      </div>
      <div className='col-span-2 p-2'>
        <p>
          In order to get the <span className='bg-base-300 text-green-400'>`signer`</span> object, you can use the following code from Ethers.js
        </p>
      </div>
      <div className='col-span-2 my-5 py-2 px-5 bg-base-300'>
        <code>
        <div className='pl-5 text-yellow-500'>
          <span>import ethers from 'ethers'</span> <br />
          <span>const provider = new ethers.providers.Web3Provider(window.ethereum);</span> <br />
          <span>const signer = provider.getSigner();</span> <br />
        </div>
        </code>
      </div>
      <div className='col-span-2 p-2'>
        <p>
          Upon successful POST request and verification of data, you will get a response similar to 
        </p>
      </div>
      <div className="col-span-2 my-5 px-5 py-2 bg-base-300 text-yellow-500">
        <code>
      {'{'}
        <div className='pl-5'>
        <span>"Success": "OTP has been sent to the user."</span>
        </div>
      {'}'}
      </code>
      </div>
      <div className='col-span-2 p-2'>
        <p>
          Now you will need to send another POST request to our server with the OTP provided to you by the user. Head to the next section for more specific description.
        </p>
      </div>
    </div>
    </>
  )
}

export default GettingStarted