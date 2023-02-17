import React from 'react';

const Transaction = () => {
  return (
    <>
      <div className='grid grid-cols-1 p-5'>
        <div className='flex justify-start p-2 mb-5'>
          <span className='text-3xl'>Transaction Login</span>
        </div>
        <div className='p-2'>
          <p>
            In this section, we will see how to use the authentication portal for performing transactions. If you have not seen the <span className='text-green-400 bg-base-300'>Getting Started</span> section first, head there to find the first step for the authentication procedure. This section picks up from part where user receives the OTP. 
            <br /><br />
            The idea behind our transaction API is that the banks will link to us and supply us with their unique bank IDs, where we will send the information regarding your transactions, so that when they receive the transaction request from your side, they can verify the payable amount from our data. This system will ensure that there are no frauds and no human error in payments. Thus, we have made this a 3 request process. 
            <br /><br />
            The first request has been covered already. In the second request, you will need to send us the OTP supplied by the user as a POST request, so that we can verify the user and then send the security questions to confirm the transaction. The POST request will be sent to the URL <span className='text-green-400 bg-base-300'>`/login_with_transaction_step_1`</span> with the following data
          </p>
        </div>
        <div className='my-5 px-5 py-2 bg-base-300 text-yellow-500'>
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
            Upon successful POST request and validation of sent OTP, you will receive the user's security questions in the following reponse format
          </p>
        </div>
        <div className='my-5 px-5 py-2 bg-base-300 text-yellow-500'>
          <code>
            {'{'}
              <div className='pl-5'>
                <span>"success": true</span>, <br />
                <span>"question1": /* Question 1 set by the user */</span>, <br />
                <span>"question2": /* Question 2 set by the user */</span>
              </div>
            {'}'}
          </code>
        </div>
        <div className='p-2'>
          <p>
            Now you will send us the final POST request on the URL <span className='text-green-400 bg-base-300'>`/login_with_transaction_step_2`</span> with the answers provided by the use, amount payable by the user and name of the bank, which will process the transaction. The request being send to the server should look something like this
          </p>
        </div>
        <div className='my-5 px-5 py-2 bg-base-300 text-yellow-500'>
          <code>
            {'{'}
              <div className='pl-5'>
                <span>"answer1": /* Answer to question 1 from user */</span>, <br />
                <span>"answer2": /* Answer to question 2 from user */</span>, <br />
                <span>"bank": /* Name of the bank responsible to process the transaction */</span>, <br />
                <span>"payableAmount": /* Amount to be paid by user */</span>, <br />
                <span>"signer": /* Signer object */</span>, <br />
                <span>"adhaarSigner": /* Adhaar number of the user as a string */</span>
              </div>
            {'}'}
          </code>
        </div>
        <div className='p-2'>
          <p>
            Upon successful POST request and validation of sent OTP, you will receive a response containing user's data along with a one time use key, which will map to the transaction details. This key can be used by the business holder to logde a complaint to the bank, should the payment fail. Other than that, this key can also be used to get a confirmation on the status of transaction. The successful response will look something like 
          </p>
        </div>
        <div className='my-5 px-2 py-5 bg-base-300 text-yellow-500'>
        <code>
          {'{'}
            <div className='pl-5'>
              <span>"success": true</span>, <br />
              <span>"transactionAccess": true</span>, <br />
              <span>"oneTimeUseKey": /* Key which can be used to map to the transaction on bank's server */</span>, <br />
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

export default Transaction