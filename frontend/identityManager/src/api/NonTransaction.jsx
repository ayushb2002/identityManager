import React from 'react';

const NonTransaction = () => {
  return (
    <>
    <div className='grid grid-cols-1 p-5'>
      <div className='flex justify-start p-2 mb-5'>
        <span className='text-3xl'>Non Transaction Login</span>
      </div>
      <div className='p-2'>
        <p>
          In this section, the businesses who plan to just receive basic user information for authentication purposes will find the required documentation. If you have not seen the <span className='text-green-400 bg-base-300'>Getting Started</span> section first, head there to find the first step for the authentication procedure. This section picks up from part where user receives the OTP.
          <br /><br />
          After the user received the OTP, you will need to send another POST request to URL <span className='text-green-400 bg-base-300'>`/login_without_transaction`</span> with the following data 
        </p>
      </div>
      <div className='my-5 px-2 py-5 bg-base-300 text-yellow-500'>
        <code>
        {'{'}
        <div className='pl-5'>
          <span>"otp": /* OTP sent by the user */</span>, <br />
          <span>"signer": /* Signer object */</span>, <br />
          <span>"adhaarSigner": /* Adhaar number of the user as a string */</span>
        </div>
        {'}'}
        </code>
      </div>
      <div className='p-2'>
        <p>
          Upon successful POST request and validation of sent OTP, you will receive the user's information as a response in following format
        </p>
      </div>
      <div className='my-5 px-2 py-5 bg-base-300 text-yellow-500'>
        <code>
          {'{'}
            <div className='pl-5'>
              <span>"success": true</span>, <br />
              <span>"transactionAccess": false</span>, <br />
              <span>"name": /* Name of the user */</span>, <br />
              <span>"email": /* Email address of the user */</span>, <br />
              <span>"gender": /* Gender of the user */</span>, <br />
              <span>"dateOfBirth": /* Date of birth of the user */</span>
            </div>
          {'}'}
        </code>
      </div>
    </div>
    </>
  )
}

export default NonTransaction